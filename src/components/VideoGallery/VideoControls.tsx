'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface VideoControlsProps {
  isMuted: boolean
  onToggleMute: () => void
}

export default function VideoControls({
  isMuted,
  onToggleMute,
}: VideoControlsProps) {
  const [showControls, setShowControls] = useState(true)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Auto-hide: Mouse 3 saniye hareketsiz kalırsa kontrolleri gizle
  const resetTimer = useCallback(() => {
    setShowControls(true)
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    timeoutRef.current = setTimeout(() => {
      setShowControls(false)
    }, 3000)
  }, [])

  useEffect(() => {
    resetTimer()

    const handleMouseMove = () => resetTimer()
    const handleTouch = () => resetTimer()

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('touchstart', handleTouch)

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('touchstart', handleTouch)
    }
  }, [resetTimer])

  return (
    <AnimatePresence>
      {showControls && (
        <motion.div
          className="absolute top-6 right-6 z-20"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {/* Ses Kontrolü */}
          <motion.button
            onClick={onToggleMute}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="h-14 w-14 md:h-16 md:w-16 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-gold/80 transition-colors"
            aria-label={isMuted ? 'Sesi aç' : 'Sesi kapat'}
          >
            {isMuted ? (
              <svg className="h-7 w-7 md:h-8 md:w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M11 5L6 9H2v6h4l5 4V5z" />
                <line x1="23" y1="9" x2="17" y2="15" />
                <line x1="17" y1="9" x2="23" y2="15" />
              </svg>
            ) : (
              <svg className="h-7 w-7 md:h-8 md:w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M11 5L6 9H2v6h4l5 4V5z" />
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
              </svg>
            )}
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
