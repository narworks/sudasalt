'use client'

import { useVideoGallery } from '@/hooks/useVideoGallery'
import WelcomeScreen from './WelcomeScreen'
import VideoPlayer from './VideoPlayer'
import VideoControls from './VideoControls'
import VideoOverlay from './VideoOverlay'
import VideoProgress from './VideoProgress'

interface VideoGalleryProps {
  onClose: () => void
}

export default function VideoGallery({ onClose }: VideoGalleryProps) {
  const {
    state,
    currentVideo,
    totalVideos,
    startWithSound,
    close,
    goToVideo,
    toggleMute,
    skip,
    setDuration,
    onVideoEnded,
  } = useVideoGallery(onClose)

  if (!state.isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black">
      {!state.hasStarted ? (
        <WelcomeScreen onStart={startWithSound} />
      ) : (
        <>
          <VideoPlayer
            youtubeId={currentVideo.youtubeId}
            isMuted={state.isMuted}
            isPlaying={state.isPlaying}
            onDuration={setDuration}
            onEnded={onVideoEnded}
          />
          <VideoOverlay />
          <VideoControls
            isMuted={state.isMuted}
            onToggleMute={toggleMute}
            onClose={close}
            onSkip={skip}
          />
          <VideoProgress
            progress={state.progress}
            currentIndex={state.currentIndex}
            totalVideos={totalVideos}
            onDotClick={goToVideo}
          />
        </>
      )}
    </div>
  )
}
