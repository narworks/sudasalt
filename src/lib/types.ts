// Video Gallery Types
export interface Video {
  id: string
  title: string
  src: string // local video path
  duration: number // seconds
}

export interface VideoGalleryState {
  isOpen: boolean
  hasStarted: boolean
  currentIndex: number
  isPlaying: boolean
  isMuted: boolean
  progress: number
  duration: number
}

export type VideoGalleryAction =
  | { type: 'START_WITH_SOUND' }
  | { type: 'CLOSE' }
  | { type: 'NEXT_VIDEO' }
  | { type: 'GO_TO_VIDEO'; payload: number }
  | { type: 'TOGGLE_MUTE' }
  | { type: 'SET_PROGRESS'; payload: number }
  | { type: 'SET_PLAYING'; payload: boolean }
  | { type: 'SET_DURATION'; payload: number }
  | { type: 'VIDEO_ENDED' }

// Value Card Types
export interface ValueCard {
  icon: string
  title: string
  description: string
}

// Contact Form Types
export interface ContactFormData {
  name: string
  email: string
  message: string
}

export interface ContactResponse {
  success?: boolean
  error?: string
  message?: string
}
