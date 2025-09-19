// Vimeo API utility functions
export interface VimeoVideo {
  uri: string
  name: string
  description: string
  duration: number
  created_time: string
  modified_time: string
  pictures: {
    sizes: Array<{
      width: number
      height: number
      link: string
    }>
  }
  embed: {
    html: string
    badges: {
      hdr: boolean
      live: boolean
      staff_pick: boolean
      vod: boolean
      weekend_challenge: boolean
    }
  }
  player_embed_url: string
}

export interface VimeoAPIResponse<T> {
  data: T[]
  total: number
  page: number
  per_page: number
  paging: {
    next: string | null
    previous: string | null
    first: string
    last: string
  }
}

class VimeoAPI {
  private accessToken: string
  private baseURL = 'https://api.vimeo.com'

  constructor() {
    this.accessToken = process.env.VIMEO_ACCESS_TOKEN || ''
    if (!this.accessToken) {
      console.warn('VIMEO_ACCESS_TOKEN not found in environment variables')
    }
  }

  private async makeRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    if (!this.accessToken) {
      throw new Error('Vimeo access token is required')
    }

    const url = `${this.baseURL}${endpoint}`
    const headers = {
      'Authorization': `Bearer ${this.accessToken}`,
      'Content-Type': 'application/json',
      ...options.headers,
    }

    const response = await fetch(url, {
      ...options,
      headers,
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Vimeo API error (${response.status}): ${errorText}`)
    }

    return response.json()
  }

  // Get a single video by ID
  async getVideo(videoId: string): Promise<VimeoVideo> {
    return this.makeRequest<VimeoVideo>(`/videos/${videoId}`)
  }

  // Get videos from a user's account
  async getUserVideos(page = 1, perPage = 25): Promise<VimeoAPIResponse<VimeoVideo>> {
    return this.makeRequest<VimeoAPIResponse<VimeoVideo>>(`/me/videos?page=${page}&per_page=${perPage}`)
  }

  // Search for videos
  async searchVideos(query: string, page = 1, perPage = 25): Promise<VimeoAPIResponse<VimeoVideo>> {
    const encodedQuery = encodeURIComponent(query)
    return this.makeRequest<VimeoAPIResponse<VimeoVideo>>(`/videos?query=${encodedQuery}&page=${page}&per_page=${perPage}`)
  }

  // Get video thumbnail URL (best quality available)
  getThumbnailUrl(video: VimeoVideo, width = 640): string {
    if (!video.pictures?.sizes?.length) {
      return '/placeholder-thumbnail.jpg' // fallback thumbnail
    }

    // Find the thumbnail closest to desired width
    const sizes = video.pictures.sizes.sort((a, b) => Math.abs(a.width - width) - Math.abs(b.width - width))
    return sizes[0].link
  }

  // Extract video ID from Vimeo URL
  static extractVideoId(url: string): string | null {
    const patterns = [
      /vimeo\.com\/(\d+)/,
      /player\.vimeo\.com\/video\/(\d+)/,
      /vimeo\.com\/channels\/[\w-]+\/(\d+)/,
      /vimeo\.com\/groups\/[\w-]+\/videos\/(\d+)/,
    ]

    for (const pattern of patterns) {
      const match = url.match(pattern)
      if (match) {
        return match[1]
      }
    }

    return null
  }

  // Get embed URL for a video
  static getEmbedUrl(videoId: string, options: {
    autoplay?: boolean
    muted?: boolean
    loop?: boolean
    title?: boolean
    byline?: boolean
    portrait?: boolean
  } = {}): string {
    const params = new URLSearchParams()

    if (options.autoplay) params.set('autoplay', '1')
    if (options.muted) params.set('muted', '1')
    if (options.loop) params.set('loop', '1')
    if (options.title === false) params.set('title', '0')
    if (options.byline === false) params.set('byline', '0')
    if (options.portrait === false) params.set('portrait', '0')

    const queryString = params.toString()
    return `https://player.vimeo.com/video/${videoId}${queryString ? `?${queryString}` : ''}`
  }

  // Format duration from seconds to readable format
  static formatDuration(seconds: number): string {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const remainingSeconds = seconds % 60

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
    }
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }
}

export const vimeoAPI = new VimeoAPI()
export default VimeoAPI