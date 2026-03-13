'use client'

import { motion } from 'framer-motion'

interface VideoProgressProps {
  progress: number
  currentIndex: number
  totalVideos: number
  onDotClick: (index: number) => void
}

export default function VideoProgress({
  progress,
  currentIndex,
  totalVideos,
  onDotClick,
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
      <div className="flex items-center justify-center gap-3">
        {Array.from({ length: totalVideos }).map((_, index) => (
          <button
            key={index}
            onClick={() => onDotClick(index)}
            className={`h-3 rounded-full transition-all duration-300 cursor-pointer hover:scale-125 ${
              index === currentIndex
                ? 'bg-gold w-8'
                : index < currentIndex
                ? 'bg-gold/80 w-3'
                : 'bg-white/30 w-3 hover:bg-white/50'
            }`}
            aria-label={`Video ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
