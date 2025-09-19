import { createClient } from '@/lib/supabase/client'
import { Video, VideoProgress, VideoFilters, VideoWithProgress } from '@/types/video'

export class VideoService {
  private supabase = createClient()

  // Get all published videos
  async getVideos(filters?: VideoFilters): Promise<Video[]> {
    let query = this.supabase
      .from('videos')
      .select('*')
      .eq('is_published', true)
      .order('created_at', { ascending: false })

    // Apply filters
    if (filters?.search) {
      query = query.ilike('title', `%${filters.search}%`)
    }

    if (filters?.level && filters.level !== 'all') {
      query = query.eq('level', filters.level)
    }

    if (filters?.category && filters.category !== 'all') {
      query = query.eq('category', filters.category)
    }

    const { data, error } = await query

    if (error) {
      console.error('Error fetching videos:', error)
      throw new Error('Failed to fetch videos')
    }

    return data || []
  }

  // Get videos with user progress
  async getVideosWithProgress(userId: string, filters?: VideoFilters): Promise<VideoWithProgress[]> {
    let query = this.supabase
      .from('videos')
      .select(`
        *,
        user_video_progress!left (
          id,
          progress,
          completed_at,
          last_watched_at
        )
      `)
      .eq('is_published', true)
      .eq('user_video_progress.user_id', userId)
      .order('created_at', { ascending: false })

    // Apply filters
    if (filters?.search) {
      query = query.ilike('title', `%${filters.search}%`)
    }

    if (filters?.level && filters.level !== 'all') {
      query = query.eq('level', filters.level)
    }

    if (filters?.category && filters.category !== 'all') {
      query = query.eq('category', filters.category)
    }

    const { data, error } = await query

    if (error) {
      console.error('Error fetching videos with progress:', error)
      throw new Error('Failed to fetch videos')
    }

    // Transform the data to include progress as a single object
    const videosWithProgress = data?.map(video => ({
      ...video,
      progress: video.user_video_progress?.[0] || null
    })) || []

    // Apply completed filter if specified
    if (filters?.completed !== undefined) {
      return videosWithProgress.filter(video => {
        const isCompleted = video.progress?.completed_at != null
        return filters.completed ? isCompleted : !isCompleted
      })
    }

    return videosWithProgress
  }

  // Get a single video by ID
  async getVideo(id: string): Promise<Video | null> {
    const { data, error } = await this.supabase
      .from('videos')
      .select('*')
      .eq('id', id)
      .eq('is_published', true)
      .single()

    if (error) {
      console.error('Error fetching video:', error)
      return null
    }

    return data
  }

  // Update or create video progress
  async updateVideoProgress(userId: string, videoId: string, progress: number): Promise<VideoProgress | null> {
    const { data, error } = await this.supabase
      .from('user_video_progress')
      .upsert({
        user_id: userId,
        video_id: videoId,
        progress,
        last_watched_at: new Date().toISOString()
      })
      .select('*')
      .single()

    if (error) {
      console.error('Error updating video progress:', error)
      return null
    }

    return data
  }

  // Get user's progress for a specific video
  async getVideoProgress(userId: string, videoId: string): Promise<VideoProgress | null> {
    const { data, error } = await this.supabase
      .from('user_video_progress')
      .select('*')
      .eq('user_id', userId)
      .eq('video_id', videoId)
      .single()

    if (error && error.code !== 'PGRST116') { // PGRST116 is "not found"
      console.error('Error fetching video progress:', error)
      return null
    }

    return data
  }

  // Get user's overall progress statistics
  async getUserStats(userId: string): Promise<{
    totalVideos: number
    completedVideos: number
    inProgressVideos: number
    completionRate: number
  }> {
    // Get total published videos
    const { count: totalVideos } = await this.supabase
      .from('videos')
      .select('*', { count: 'exact', head: true })
      .eq('is_published', true)

    // Get user's completed videos
    const { count: completedVideos } = await this.supabase
      .from('user_video_progress')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId)
      .not('completed_at', 'is', null)

    // Get user's in-progress videos
    const { count: inProgressVideos } = await this.supabase
      .from('user_video_progress')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId)
      .is('completed_at', null)
      .gt('progress', 0)

    const total = totalVideos || 0
    const completed = completedVideos || 0
    const inProgress = inProgressVideos || 0
    const completionRate = total > 0 ? (completed / total) * 100 : 0

    return {
      totalVideos: total,
      completedVideos: completed,
      inProgressVideos: inProgress,
      completionRate: Math.round(completionRate)
    }
  }

  // Get unique categories
  async getCategories(): Promise<string[]> {
    const { data, error } = await this.supabase
      .from('videos')
      .select('category')
      .eq('is_published', true)

    if (error) {
      console.error('Error fetching categories:', error)
      return []
    }

    const uniqueCategories = [...new Set(data.map(item => item.category))].sort()
    return uniqueCategories
  }

  // Search videos by title or description
  async searchVideos(searchTerm: string): Promise<Video[]> {
    const { data, error } = await this.supabase
      .from('videos')
      .select('*')
      .eq('is_published', true)
      .or(`title.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error searching videos:', error)
      throw new Error('Failed to search videos')
    }

    return data || []
  }
}

export const videoService = new VideoService()