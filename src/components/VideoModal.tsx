'use client'

import { useEffect, useCallback } from 'react'
import { Video } from '@/types/video'
import VideoPlayer from './VideoPlayer'

interface VideoModalProps {
  video: Video | null
  isOpen: boolean
  onClose: () => void
  onProgress?: (progress: number) => void
  onComplete?: () => void
}

export default function VideoModal({ video, isOpen, onClose, onProgress, onComplete }: VideoModalProps) {
  // Close modal on Escape key press
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      onClose()
    }
  }, [onClose])

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    } else {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, handleKeyDown])

  if (!isOpen || !video) {
    return null
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-6xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 truncate pr-4">
            {video.title}
          </h2>
          <button
            onClick={onClose}
            className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Close video"
          >
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Video Player */}
        <div className="p-6">
          <VideoPlayer
            video={video}
            onProgress={onProgress}
            onComplete={onComplete}
            autoplay={true}
            controls={true}
          />
        </div>

        {/* Additional Video Info */}
        <div className="px-6 pb-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
              <span className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                Level: <span className="ml-1 capitalize font-medium">{video.level}</span>
              </span>

              <span className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                Category: <span className="ml-1 font-medium">{video.category}</span>
              </span>

              {video.duration && (
                <span className="flex items-center">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                  Duration: <span className="ml-1 font-medium">{Math.floor(video.duration / 60)} minutes</span>
                </span>
              )}
            </div>

            {video.description && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <h3 className="text-sm font-semibold text-gray-700 mb-2">About this lesson</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{video.description}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}