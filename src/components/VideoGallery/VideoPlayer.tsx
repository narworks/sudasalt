'use client'

import { motion } from 'framer-motion'

interface VideoPlayerProps {
  youtubeId: string
  isMuted: boolean
  isPlaying: boolean
}

export default function VideoPlayer({ youtubeId, isMuted, isPlaying }: VideoPlayerProps) {
  // Construct YouTube embed URL with parameters
  const embedUrl = `https://www.youtube.com/embed/${youtubeId}?autoplay=${isPlaying ? 1 : 0}&mute=${isMuted ? 1 : 0}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&loop=0&enablejsapi=1`

  return (
    <motion.div
      className="absolute inset-0 overflow-hidden bg-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Video Container - maintains aspect ratio while filling screen */}
      <div
        className="absolute"
        style={{
          minWidth: '100vw',
          minHeight: '100vh',
          width: '177.78vh', // 16:9 aspect ratio
          height: '56.25vw', // 16:9 aspect ratio
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <iframe
          src={embedUrl}
          title="Video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full border-0"
        />
      </div>
    </motion.div>
  )
}
