import { useReducer, useCallback, useEffect, useRef } from 'react'
import { VideoGalleryState, VideoGalleryAction } from '@/lib/types'
import { GALLERY_VIDEOS } from '@/lib/constants'

const initialState: VideoGalleryState = {
  isOpen: true,
  hasStarted: false,
  currentIndex: 0,
  isPlaying: false,
  isMuted: false,
  progress: 0,
}

function reducer(state: VideoGalleryState, action: VideoGalleryAction): VideoGalleryState {
  switch (action.type) {
    case 'START_WITH_SOUND':
      return {
        ...state,
        hasStarted: true,
        isPlaying: true,
        isMuted: false,
      }
    case 'CLOSE':
      return {
        ...state,
        isOpen: false,
        isPlaying: false,
      }
    case 'NEXT_VIDEO':
      const nextIndex = state.currentIndex + 1
      if (nextIndex >= GALLERY_VIDEOS.length) {
        return {
          ...state,
          isOpen: false,
          isPlaying: false,
        }
      }
      return {
        ...state,
        currentIndex: nextIndex,
        progress: 0,
      }
    case 'TOGGLE_MUTE':
      return {
        ...state,
        isMuted: !state.isMuted,
      }
    case 'SET_PROGRESS':
      return {
        ...state,
        progress: action.payload,
      }
    case 'SET_PLAYING':
      return {
        ...state,
        isPlaying: action.payload,
      }
    default:
      return state
  }
}

export function useVideoGallery(onClose?: () => void) {
  const [state, dispatch] = useReducer(reducer, initialState)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const startTimeRef = useRef<number>(0)

  const currentVideo = GALLERY_VIDEOS[state.currentIndex]

  const startWithSound = useCallback(() => {
    dispatch({ type: 'START_WITH_SOUND' })
    startTimeRef.current = Date.now()
  }, [])

  const close = useCallback(() => {
    dispatch({ type: 'CLOSE' })
    onClose?.()
  }, [onClose])

  const nextVideo = useCallback(() => {
    dispatch({ type: 'NEXT_VIDEO' })
    startTimeRef.current = Date.now()
  }, [])

  const toggleMute = useCallback(() => {
    dispatch({ type: 'TOGGLE_MUTE' })
  }, [])

  const skip = useCallback(() => {
    if (state.currentIndex >= GALLERY_VIDEOS.length - 1) {
      close()
    } else {
      nextVideo()
    }
  }, [state.currentIndex, close, nextVideo])

  // Timer-based progress tracking
  useEffect(() => {
    if (!state.isPlaying || !state.hasStarted) return

    timerRef.current = setInterval(() => {
      const elapsed = (Date.now() - startTimeRef.current) / 1000
      const duration = currentVideo?.duration || 30
      const progress = Math.min((elapsed / duration) * 100, 100)

      dispatch({ type: 'SET_PROGRESS', payload: progress })

      if (progress >= 100) {
        nextVideo()
      }
    }, 100)

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [state.isPlaying, state.hasStarted, state.currentIndex, currentVideo, nextVideo])

  // Cleanup on close
  useEffect(() => {
    if (!state.isOpen && onClose) {
      onClose()
    }
  }, [state.isOpen, onClose])

  return {
    state,
    currentVideo,
    totalVideos: GALLERY_VIDEOS.length,
    startWithSound,
    close,
    nextVideo,
    toggleMute,
    skip,
  }
}
