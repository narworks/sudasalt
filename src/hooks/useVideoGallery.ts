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
  duration: 0,
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
    case 'GO_TO_VIDEO':
      return {
        ...state,
        currentIndex: action.payload,
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
    case 'SET_DURATION':
      return {
        ...state,
        duration: action.payload,
      }
    case 'VIDEO_ENDED':
      const nextIdx = state.currentIndex + 1
      if (nextIdx >= GALLERY_VIDEOS.length) {
        return {
          ...state,
          isOpen: false,
          isPlaying: false,
        }
      }
      return {
        ...state,
        currentIndex: nextIdx,
        progress: 0,
        duration: 0,
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

  const goToVideo = useCallback((index: number) => {
    dispatch({ type: 'GO_TO_VIDEO', payload: index })
    startTimeRef.current = Date.now()
  }, [])

  const skip = useCallback(() => {
    if (state.currentIndex >= GALLERY_VIDEOS.length - 1) {
      close()
    } else {
      nextVideo()
    }
  }, [state.currentIndex, close, nextVideo])

  const setDuration = useCallback((duration: number) => {
    dispatch({ type: 'SET_DURATION', payload: duration })
  }, [])

  const onVideoEnded = useCallback(() => {
    dispatch({ type: 'VIDEO_ENDED' })
    startTimeRef.current = Date.now()
  }, [])

  // Timer-based progress tracking
  useEffect(() => {
    if (!state.isPlaying || !state.hasStarted || state.duration === 0) return

    timerRef.current = setInterval(() => {
      const elapsed = (Date.now() - startTimeRef.current) / 1000
      const progress = Math.min((elapsed / state.duration) * 100, 100)

      dispatch({ type: 'SET_PROGRESS', payload: progress })
    }, 100)

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [state.isPlaying, state.hasStarted, state.currentIndex, state.duration])

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
    goToVideo,
    toggleMute,
    skip,
    setDuration,
    onVideoEnded,
  }
}
