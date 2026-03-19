'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

interface VideoPlayerProps {
  src: string
  isMuted: boolean
  isPlaying: boolean
  onDuration: (duration: number) => void
  onEnded: () => void
}

export default function VideoPlayer({
  src,
  isMuted,
  isPlaying,
  onDuration,
  onEnded,
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  // Video yüklendiğinde süreyi al
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleLoadedMetadata = () => {
      onDuration(video.duration)
    }

    const handleEnded = () => {
      onEnded()
    }

    video.addEventListener('loadedmetadata', handleLoadedMetadata)
    video.addEventListener('ended', handleEnded)

    // Eğer video zaten yüklendiyse
    if (video.readyState >= 1) {
      onDuration(video.duration)
    }

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata)
      video.removeEventListener('ended', handleEnded)
    }
  }, [src, onDuration, onEnded])

  // Play/Pause kontrolü
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    if (isPlaying) {
      video.currentTime = 0
      video.play().catch(console.error)
    } else {
      video.pause()
    }
  }, [isPlaying])

  // Mute kontrolü
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    video.muted = isMuted
  }, [isMuted])

  return (
    <motion.div
      className="absolute inset-0 overflow-hidden bg-black flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <video
        ref={videoRef}
        src={src}
        className="w-full h-full object-contain"
        playsInline
        muted={isMuted}
        preload="auto"
      />
    </motion.div>
  )
}
