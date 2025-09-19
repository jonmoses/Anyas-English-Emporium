'use client'

import { useState, useCallback, useRef } from 'react'
import ReactPlayer from 'react-player'
import { Video, VideoPlayerProps } from '@/types/video'
import VimeoAPI from '@/lib/vimeo'

export default function VideoPlayer({
  video,
  onProgress,
  onComplete,
  autoplay = false,
  controls = true,
}: VideoPlayerProps) {
  const [playing, setPlaying] = useState(autoplay)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [duration, setDuration] = useState<number | null>(null)
  const [playedSeconds, setPlayedSeconds] = useState(0)

  const playerRef = useRef<ReactPlayer>(null)

  // Create the Vimeo URL for react-player
  const vimeoUrl = `https://vimeo.com/${video.vimeo_id}`

  const handleReady = useCallback(() => {
    setLoading(false)
    setError(null)
  }, [])

  const handleError = useCallback((error: any) => {
    setLoading(false)
    setError('Failed to load video. Please try again.')
    console.error('Video player error:', error)
  }, [])

  const handleProgress = useCallback((state: { played: number; playedSeconds: number; loaded: number }) => {
    setPlayedSeconds(state.playedSeconds)
    onProgress?.(state.played)

    // Auto-mark as complete when 95% watched (to account for credits, etc.)
    if (state.played >= 0.95) {
      onComplete?.()
    }
  }, [onProgress, onComplete])

  const handleDuration = useCallback((duration: number) => {
    setDuration(duration)
  }, [])

  const handlePlay = useCallback(() => {
    setPlaying(true)
  }, [])

  const handlePause = useCallback(() => {
    setPlaying(false)
  }, [])

  const togglePlayPause = useCallback(() => {
    setPlaying(!playing)
  }, [playing])

  const formatTime = (seconds: number): string => {
    return VimeoAPI.formatDuration(Math.floor(seconds))
  }

  if (error) {
    return (
      <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
        <div className="text-center p-6">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Video Error</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => {
              setError(null)
              setLoading(true)
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="relative">
      {/* Video Player */}
      <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden relative">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">Loading video...</p>
            </div>
          </div>
        )}

        <ReactPlayer
          ref={playerRef}
          url={vimeoUrl}
          width="100%"
          height="100%"
          playing={playing}
          controls={controls}
          onReady={handleReady}
          onError={handleError}
          onProgress={handleProgress}
          onDuration={handleDuration}
          onPlay={handlePlay}
          onPause={handlePause}
          config={{
            vimeo: {
              playerOptions: {
                title: false,
                byline: false,
                portrait: false,
                responsive: true,
              },
            },
          }}
        />
      </div>

      {/* Video Info */}
      <div className="mt-4 p-4 bg-white rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">{video.title}</h2>

        {video.description && (
          <p className="text-gray-600 mb-3">{video.description}</p>
        )}

        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-4">
            <span className="capitalize">{video.level}</span>
            <span>{video.category}</span>
            {duration && <span>{formatTime(duration)}</span>}
          </div>

          <div className="flex items-center space-x-2">
            {playedSeconds > 0 && duration && (
              <span>
                {formatTime(playedSeconds)} / {formatTime(duration)}
              </span>
            )}
          </div>
        </div>

        {/* Progress bar */}
        {duration && playedSeconds > 0 && (
          <div className="mt-3">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(playedSeconds / duration) * 100}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>

      {/* Custom Play Button Overlay (when not using built-in controls) */}
      {!controls && (
        <button
          onClick={togglePlayPause}
          className="absolute inset-0 flex items-center justify-center group"
        >
          <div className="w-20 h-20 bg-black bg-opacity-50 rounded-full flex items-center justify-center group-hover:bg-opacity-70 transition-all">
            {playing ? (
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
            )}
          </div>
        </button>
      )}
    </div>
  )
}