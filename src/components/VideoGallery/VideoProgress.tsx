'use client'

import { motion } from 'framer-motion'

interface VideoProgressProps {
  progress: number
  currentIndex: number
  totalVideos: number
}

export default function VideoProgress({
  progress,
  currentIndex,
  totalVideos,
}: VideoProgressProps) {
  return (
    <div className="absolute bottom-0 left-0 right-0 z-20 p-6">
      {/* Progress Bar */}
      <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden mb-4">
        <motion.div
          className="h-full bg-gradient-to-r from-gold to-gold-light rounded-full"
          style={{ width: `${progress}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>

      {/* Video Dots */}
      <div className="flex items-center justify-center gap-2">
        {Array.from({ length: totalVideos }).map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'bg-gold w-6'
                : index < currentIndex
                ? 'bg-gold/80'
                : 'bg-white/30'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
