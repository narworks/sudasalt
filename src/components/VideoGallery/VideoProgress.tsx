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
  // Progress ring hesaplamaları
  const radius = 24
  const circumference = 2 * Math.PI * radius // ~150.8

  return (
    <div className="absolute bottom-16 md:bottom-20 left-0 right-0 z-20 flex flex-col items-center gap-4">
      {/* Video Nokta Navigasyonu */}
      <div className="flex items-center justify-center gap-4">
        {Array.from({ length: totalVideos }).map((_, index) => (
          <button
            key={index}
            onClick={() => onDotClick(index)}
            className="h-14 w-14 md:h-16 md:w-16 flex items-center justify-center cursor-pointer"
            aria-label={`Video ${index + 1}`}
          >
            {index === currentIndex ? (
              // Aktif video - Progress Ring
              <div className="relative flex items-center justify-center">
                <svg className="h-14 w-14 md:h-16 md:w-16 -rotate-90">
                  {/* Arka plan halka */}
                  <circle
                    cx="50%"
                    cy="50%"
                    r={radius}
                    stroke="rgba(212, 175, 55, 0.3)"
                    strokeWidth="3"
                    fill="none"
                  />
                  {/* İlerleme halkası */}
                  <motion.circle
                    cx="50%"
                    cy="50%"
                    r={radius}
                    stroke="#D4AF37"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={circumference - (circumference * progress) / 100}
                    initial={false}
                    transition={{ duration: 0.1, ease: 'linear' }}
                  />
                </svg>
                {/* Merkez nokta */}
                <div className="absolute h-5 w-5 md:h-6 md:w-6 rounded-full bg-gold" />
              </div>
            ) : (
              // Pasif video noktası
              <motion.div
                whileHover={{ scale: 1.2 }}
                className={`h-5 w-5 md:h-6 md:w-6 rounded-full transition-colors ${
                  index < currentIndex
                    ? 'bg-gold/80'
                    : 'bg-white/40 hover:bg-white/60'
                }`}
              />
            )}
          </button>
        ))}
      </div>

      {/* Video Sayacı */}
      <span className="font-accent text-sm md:text-base text-white/70 tracking-widest">
        {currentIndex + 1}/{totalVideos}
      </span>
    </div>
  )
}
