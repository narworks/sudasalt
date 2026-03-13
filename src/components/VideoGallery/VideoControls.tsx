'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface VideoControlsProps {
  isMuted: boolean
  onToggleMute: () => void
  onClose: () => void
  onSkip: () => void
}

export default function VideoControls({
  isMuted,
  onToggleMute,
  onClose,
  onSkip,
}: VideoControlsProps) {
  const [showControls, setShowControls] = useState(true)
  const [showSkip, setShowSkip] = useState(false)
  const [mouseIdle, setMouseIdle] = useState(false)

  // Show skip button after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSkip(true)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  // Hide controls on mouse idle
  const handleMouseMove = useCallback(() => {
    setShowControls(true)
    setMouseIdle(false)
  }, [])

  useEffect(() => {
    const idleTimer = setTimeout(() => {
      setMouseIdle(true)
      setShowControls(false)
    }, 3000)

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      clearTimeout(idleTimer)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [handleMouseMove, mouseIdle])

  return (
    <AnimatePresence>
      {showControls && (
        <>
          {/* Top Right Controls */}
          <motion.div
            className="absolute top-6 right-6 flex items-center gap-4 z-20"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Mute/Unmute */}
            <button
              onClick={onToggleMute}
              className="w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white hover:bg-black/70 transition-colors"
              aria-label={isMuted ? 'Sesi aç' : 'Sesi kapat'}
            >
              {isMuted ? (
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M11 5L6 9H2v6h4l5 4V5z" />
                  <line x1="23" y1="9" x2="17" y2="15" />
                  <line x1="17" y1="9" x2="23" y2="15" />
                </svg>
              ) : (
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M11 5L6 9H2v6h4l5 4V5z" />
                  <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                </svg>
              )}
            </button>

            {/* Close */}
            <button
              onClick={onClose}
              className="w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white hover:bg-black/70 transition-colors"
              aria-label="Kapat"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </motion.div>

          {/* Skip Button - Bottom Right */}
          <AnimatePresence>
            {showSkip && (
              <motion.button
                onClick={onSkip}
                className="absolute bottom-24 right-6 px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium hover:bg-white/20 transition-colors z-20 flex items-center gap-2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                Atla
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 4l10 8-10 8V4z" />
                  <line x1="19" y1="5" x2="19" y2="19" />
                </svg>
              </motion.button>
            )}
          </AnimatePresence>
        </>
      )}
    </AnimatePresence>
  )
}
