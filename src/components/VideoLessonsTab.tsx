'use client'

import { useState, useEffect, useCallback } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { videoService } from '@/lib/videos'
import { VideoWithProgress, VideoFilters, VideoLevel } from '@/types/video'
import VideoModal from './VideoModal'
import VimeoAPI from '@/lib/vimeo'

export default function VideoLessonsTab() {
  const { user } = useAuth()
  const [videos, setVideos] = useState<VideoWithProgress[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedVideo, setSelectedVideo] = useState<VideoWithProgress | null>(null)
  const [showVideoModal, setShowVideoModal] = useState(false)

  // Filter state
  const [filters, setFilters] = useState<VideoFilters>({
    search: '',
    level: 'all',
    category: 'all'
  })

  const getLevelColor = (level: VideoLevel) => {
    switch (level) {
      case 'beginner': return 'bg-green-100 text-green-800'
      case 'intermediate': return 'bg-yellow-100 text-yellow-800'
      case 'advanced': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getProgressColor = (progress: number) => {
    if (progress >= 1) return 'bg-green-500'
    if (progress >= 0.5) return 'bg-yellow-500'
    if (progress > 0) return 'bg-blue-500'
    return 'bg-gray-300'
  }

  const loadVideos = useCallback(async () => {
    try {
      setLoading(true)
      let videoData: VideoWithProgress[]

      if (user) {
        videoData = await videoService.getVideosWithProgress(user.id, filters)
      } else {
        const basicVideos = await videoService.getVideos(filters)
        videoData = basicVideos.map(video => ({ ...video, progress: undefined }))
      }

      setVideos(videoData)
    } catch (error) {
      console.error('Error loading videos:', error)
    } finally {
      setLoading(false)
    }
  }, [user, filters])

  // Load videos and categories on component mount
  useEffect(() => {
    loadVideos()
    loadCategories()
  }, [loadVideos])

  const loadCategories = async () => {
    try {
      const categoryData = await videoService.getCategories()
      setCategories(categoryData)
    } catch (error) {
      console.error('Error loading categories:', error)
    }
  }

  const handleVideoClick = (video: VideoWithProgress) => {
    setSelectedVideo(video)
    setShowVideoModal(true)
  }

  const handleVideoProgress = async (progress: number) => {
    if (user && selectedVideo) {
      try {
        await videoService.updateVideoProgress(user.id, selectedVideo.id, progress)
        // Refresh videos to show updated progress
        loadVideos()
      } catch (error) {
        console.error('Error updating video progress:', error)
      }
    }
  }

  const handleVideoComplete = async () => {
    if (user && selectedVideo) {
      try {
        await videoService.updateVideoProgress(user.id, selectedVideo.id, 1.0)
        // Refresh videos to show completion
        loadVideos()
      } catch (error) {
        console.error('Error marking video as complete:', error)
      }
    }
  }

  const formatDuration = (seconds: number | null): string => {
    if (!seconds) return 'Unknown'
    return VimeoAPI.formatDuration(seconds)
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Video Lessons</h2>
        <p className="text-gray-600">
          Explore our comprehensive collection of English learning videos.
          Track your progress as you learn!
        </p>
      </div>

      {/* Filter/Search Bar */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search lessons..."
              value={filters.search || ''}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            value={filters.level || 'all'}
            onChange={(e) => setFilters({ ...filters, level: e.target.value as VideoLevel | 'all' })}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Levels</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
          <select
            value={filters.category || 'all'}
            onChange={(e) => setFilters({ ...filters, category: e.target.value })}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden animate-pulse">
              <div className="aspect-video bg-gray-200"></div>
              <div className="p-4">
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-3/4 mb-3"></div>
                <div className="flex justify-between">
                  <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                  <div className="h-6 bg-gray-200 rounded w-1/5"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Video Grid */}
      {!loading && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <div
              key={video.id}
              onClick={() => handleVideoClick(video)}
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
            >
              {/* Video Thumbnail */}
              <div className="aspect-video bg-gray-200 flex items-center justify-center relative overflow-hidden">
                {video.thumbnail_url ? (
                  <>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={video.thumbnail_url}
                      alt={video.title}
                      className="w-full h-full object-cover"
                    />
                    {/* Play button overlay */}
                    <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                      <div className="w-16 h-16 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center mx-auto mb-2">
                      <svg className="w-8 h-8 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-sm text-gray-500">Video Thumbnail</p>
                  </div>
                )}

                {/* Progress indicator */}
                {user && video.progress && video.progress.progress > 0 && (
                  <div className="absolute bottom-0 left-0 right-0 h-1">
                    <div
                      className={`h-full ${getProgressColor(video.progress.progress)}`}
                      style={{ width: `${video.progress.progress * 100}%` }}
                    ></div>
                  </div>
                )}

                {/* Completed badge */}
                {user && video.progress?.completed_at && (
                  <div className="absolute top-2 right-2">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>

              {/* Video Info */}
              <div className="p-4">
                <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">{video.title}</h3>

                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-gray-500">{formatDuration(video.duration)}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(video.level)}`}>
                    {video.level.charAt(0).toUpperCase() + video.level.slice(1)}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-blue-600 font-medium">
                    {video.category.charAt(0).toUpperCase() + video.category.slice(1)}
                  </span>

                  {user && video.progress ? (
                    <div className="text-xs text-gray-500">
                      {video.progress.completed_at ? (
                        <span className="text-green-600 font-medium">Completed</span>
                      ) : video.progress.progress > 0 ? (
                        <span className="text-blue-600 font-medium">
                          {Math.round(video.progress.progress * 100)}% watched
                        </span>
                      ) : (
                        <span>Not started</span>
                      )}
                    </div>
                  ) : (
                    <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors">
                      Watch
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State Message */}
      {!loading && videos.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-800 mb-2">
            {filters.search || filters.level !== 'all' || filters.category !== 'all'
              ? 'No videos found'
              : 'No Videos Yet'
            }
          </h3>
          <p className="text-gray-600">
            {filters.search || filters.level !== 'all' || filters.category !== 'all'
              ? 'Try adjusting your search or filters to find more videos.'
              : 'Videos will appear here once they are uploaded to Vimeo and added to the database.'
            }
          </p>
        </div>
      )}

      {/* Video Modal */}
      <VideoModal
        video={selectedVideo}
        isOpen={showVideoModal}
        onClose={() => {
          setShowVideoModal(false)
          setSelectedVideo(null)
        }}
        onProgress={handleVideoProgress}
        onComplete={handleVideoComplete}
      />

      {/* Coming Soon Notice - only show when there are videos */}
      {!loading && videos.length > 0 && (
        <div className="mt-12 bg-blue-50 rounded-lg p-6 text-center">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">More Content Coming Soon!</h3>
          <p className="text-gray-600">
            We&apos;re regularly adding new English learning videos.
            Check back often for fresh content and lessons!
          </p>
        </div>
      )}
    </div>
  )
}