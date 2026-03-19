'use client'

import { useEffect, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'

declare global {
  interface Window {
    YT: {
      Player: new (
        elementId: string,
        config: {
          videoId: string
          playerVars?: Record<string, number | string>
          events?: {
            onReady?: (event: { target: YTPlayer }) => void
            onStateChange?: (event: { data: number; target: YTPlayer }) => void
          }
        }
      ) => YTPlayer
      PlayerState: {
        ENDED: number
        PLAYING: number
        PAUSED: number
        BUFFERING: number
        CUED: number
      }
    }
    onYouTubeIframeAPIReady?: () => void
  }
}

interface YTPlayer {
  playVideo: () => void
  pauseVideo: () => void
  mute: () => void
  unMute: () => void
  getDuration: () => number
  destroy: () => void
}

interface VideoPlayerProps {
  youtubeId: string
  isMuted: boolean
  isPlaying: boolean
  onDuration: (duration: number) => void
  onEnded: () => void
}

export default function VideoPlayer({
  youtubeId,
  isMuted,
  isPlaying,
  onDuration,
  onEnded,
}: VideoPlayerProps) {
  const playerRef = useRef<YTPlayer | null>(null)
  const containerRef = useRef<string>(`yt-player-${Date.now()}`)

  const onPlayerReady = useCallback(
    (event: { target: YTPlayer }) => {
      const player = event.target
      const duration = player.getDuration()
      onDuration(duration)

      // Video otomatik başlasın
      player.playVideo()

      // Kullanıcı etkileşiminden sonra sesi aç/kapat
      if (isMuted) {
        player.mute()
      } else {
        player.unMute()
      }
    },
    [onDuration, isMuted]
  )

  const onPlayerStateChange = useCallback(
    (event: { data: number }) => {
      if (event.data === window.YT.PlayerState.ENDED) {
        onEnded()
      }
    },
    [onEnded]
  )

  useEffect(() => {
    const loadYouTubeAPI = () => {
      if (window.YT && window.YT.Player) {
        createPlayer()
        return
      }

      const existingScript = document.querySelector(
        'script[src="https://www.youtube.com/iframe_api"]'
      )
      if (!existingScript) {
        const tag = document.createElement('script')
        tag.src = 'https://www.youtube.com/iframe_api'
        const firstScriptTag = document.getElementsByTagName('script')[0]
        firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag)
      }

      window.onYouTubeIframeAPIReady = () => {
        createPlayer()
      }
    }

    const createPlayer = () => {
      if (playerRef.current) {
        playerRef.current.destroy()
      }

      playerRef.current = new window.YT.Player(containerRef.current, {
        videoId: youtubeId,
        playerVars: {
          autoplay: 1,
          mute: 1, // Mobilde autoplay için başlangıçta sessiz
          controls: 0,
          showinfo: 0,
          rel: 0,
          modestbranding: 1,
          playsinline: 1,
          loop: 0,
          enablejsapi: 1,
        },
        events: {
          onReady: onPlayerReady,
          onStateChange: onPlayerStateChange,
        },
      })
    }

    loadYouTubeAPI()

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy()
        playerRef.current = null
      }
    }
  }, [youtubeId, onPlayerReady, onPlayerStateChange])

  // Handle mute/unmute changes
  useEffect(() => {
    if (playerRef.current) {
      if (isMuted) {
        playerRef.current.mute()
      } else {
        playerRef.current.unMute()
      }
    }
  }, [isMuted])

  // Handle play/pause changes
  useEffect(() => {
    if (playerRef.current) {
      if (isPlaying) {
        playerRef.current.playVideo()
      } else {
        playerRef.current.pauseVideo()
      }
    }
  }, [isPlaying])

  return (
    <motion.div
      className="absolute inset-0 overflow-hidden bg-black flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Video Container - contains video within screen, maintains 16:9 aspect ratio */}
      <div
        className="relative"
        style={{
          width: '100%',
          height: '100%',
          maxWidth: '177.78vh', // 16:9: width = height * 16/9
          maxHeight: '56.25vw', // 16:9: height = width * 9/16
        }}
      >
        <div id={containerRef.current} className="w-full h-full" />
      </div>
    </motion.div>
  )
}
