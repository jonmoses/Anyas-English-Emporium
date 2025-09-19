'use client'

import { useState } from 'react'
import { VideoWithProgress } from '@/types/video'

interface VideoDebugHelperProps {
  video: VideoWithProgress
}

export default function VideoDebugHelper({ video }: VideoDebugHelperProps) {
  const [showGuide, setShowGuide] = useState(false)

  if (process.env.NODE_ENV !== 'development') {
    return null
  }

  const vimeoVideoUrl = `https://vimeo.com/${video.vimeo_id}`
  const vimeoEmbedUrl = `https://player.vimeo.com/video/${video.vimeo_id}`
  const vimeoSettingsUrl = `https://vimeo.com/${video.vimeo_id}/settings/privacy`

  return (
    <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
      <h3 className="text-lg font-semibold text-blue-800 mb-3">🛠️ Video Debug Helper</h3>

      <div className="space-y-3 text-sm">
        <div>
          <strong>Video ID:</strong> {video.vimeo_id}
        </div>
        <div>
          <strong>React-Player URL:</strong>
          <code className="ml-2 px-2 py-1 bg-white rounded text-xs">{vimeoVideoUrl}</code>
        </div>
        <div>
          <strong>Embed URL:</strong>
          <code className="ml-2 px-2 py-1 bg-white rounded text-xs">{vimeoEmbedUrl}</code>
        </div>

        <div className="pt-2 border-t border-blue-200">
          <div className="flex items-center space-x-2">
            <strong>Quick Tests:</strong>
          </div>
          <div className="mt-2 space-x-2">
            <a
              href={vimeoVideoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-3 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700"
            >
              Test on Vimeo
            </a>
            <a
              href={vimeoSettingsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-3 py-1 bg-purple-600 text-white rounded text-xs hover:bg-purple-700"
            >
              Privacy Settings
            </a>
            <button
              onClick={() => setShowGuide(!showGuide)}
              className="inline-block px-3 py-1 bg-green-600 text-white rounded text-xs hover:bg-green-700"
            >
              {showGuide ? 'Hide' : 'Show'} Fix Guide
            </button>
          </div>
        </div>

        {showGuide && (
          <div className="mt-4 p-3 bg-white rounded border border-blue-300">
            <h4 className="font-semibold text-blue-800 mb-2">🔧 Troubleshooting Steps:</h4>
            <ol className="list-decimal list-inside space-y-2 text-xs text-gray-700">
              <li>
                <strong>Test direct access:</strong> Click &quot;Test on Vimeo&quot; above - does the video play on Vimeo?
              </li>
              <li>
                <strong>Check privacy settings:</strong> Click &quot;Privacy Settings&quot; above, then:
                <ul className="list-disc list-inside ml-4 mt-1 space-y-1">
                  <li>Ensure video is &quot;Public&quot; or &quot;Unlisted&quot; (not &quot;Private&quot;)</li>
                  <li>In &quot;Where can this video be embedded?&quot; - select &quot;Anywhere&quot; or add your domain</li>
                  <li>Add your domains: <code>localhost:3000</code>, your Vercel domain, etc.</li>
                </ul>
              </li>
              <li>
                <strong>For Unlisted videos:</strong> You need to include the privacy hash parameter (h=xxxxx)
              </li>
              <li>
                <strong>Check the iframe test:</strong> Look for the yellow debug box above - does the iframe work?
              </li>
              <li>
                <strong>Check browser console:</strong> Look for 403/404 errors or CORS issues
              </li>
            </ol>

            <div className="mt-3 p-2 bg-yellow-100 rounded">
              <strong className="text-yellow-800">Common Issue:</strong>
              <p className="text-xs text-yellow-700 mt-1">
                If you see a black screen, it&apos;s usually because your domain (localhost:3000, your-app.vercel.app)
                is not whitelisted in the Vimeo video&apos;s &quot;Where can this video be embedded?&quot; privacy settings.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}