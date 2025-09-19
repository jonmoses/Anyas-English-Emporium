// Video-related TypeScript types
export type VideoLevel = 'beginner' | 'intermediate' | 'advanced'

export interface Video {
  id: string
  vimeo_id: string
  title: string
  description: string | null
  duration: number | null
  level: VideoLevel
  category: string
  thumbnail_url: string | null
  embed_url: string | null
  is_published: boolean
  created_at: string
  updated_at: string
}

export interface VideoProgress {
  id: string
  user_id: string
  video_id: string
  progress: number // 0 to 1
  completed_at: string | null
  last_watched_at: string
  created_at: string
  updated_at: string
}

export interface VideoWithProgress extends Video {
  progress?: VideoProgress
}

export interface VideoFilters {
  search?: string
  level?: VideoLevel | 'all'
  category?: string | 'all'
  completed?: boolean
}

export interface VideoPlayerProps {
  video: Video
  onProgress?: (progress: number) => void
  onComplete?: () => void
  autoplay?: boolean
  controls?: boolean
}

// API response types
export interface VideoAPIResponse {
  data: Video[]
  count: number
  error?: string
}

export interface VideoProgressAPIResponse {
  data: VideoProgress | null
  error?: string
}