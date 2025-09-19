'use client'

import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import AuthModal from '@/components/AuthModal'
import Navigation from '@/components/Navigation'
import HomeTab from '@/components/HomeTab'
import VideoLessonsTab from '@/components/VideoLessonsTab'

export default function HomePage() {
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [currentTab, setCurrentTab] = useState('home')
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
        <div className="text-lg text-gray-600">Loading...</div>
      </main>
    )
  }
  if (user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation
          currentTab={currentTab}
          onTabChange={setCurrentTab}
          onShowAuth={() => setShowAuthModal(true)}
        />

        <main className="pt-4">
          {currentTab === 'home' && <HomeTab />}
          {currentTab === 'lessons' && <VideoLessonsTab />}
        </main>
      </div>
    )
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <Navigation
          currentTab=""
          onTabChange={() => {}}
          onShowAuth={() => setShowAuthModal(true)}
        />

        <main className="flex min-h-screen flex-col items-center justify-center -mt-16 text-center">
          <div className="p-8 max-w-2xl">
            <h1 className="text-5xl font-bold text-gray-800">
              Anya&apos;s English Emporium
            </h1>

            <p className="mt-4 text-lg text-gray-600">
              Unlock your potential with engaging video courses designed to make learning English simple and fun.
              Join our community of English learners today!
            </p>

            <div className="mt-8 mb-8 border-b border-gray-200"></div>

            <div>
              <h2 className="text-2xl font-semibold text-gray-700">Get started today!</h2>
              <p className="mt-2 text-gray-500">
                Sign up to access exclusive English learning content and start your journey.
              </p>

              <div className="mt-6 flex flex-col sm:flex-row gap-2 justify-center">
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="bg-blue-600 text-white font-semibold px-8 py-3 rounded-md hover:bg-blue-700 transition"
                >
                  Get Started
                </button>
              </div>

              <div className="mt-8 grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-800">Video Lessons</h3>
                  <p className="text-sm text-gray-600">Comprehensive English courses</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-800">Learn at Your Pace</h3>
                  <p className="text-sm text-gray-600">Flexible learning schedule</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-800">Expert Instruction</h3>
                  <p className="text-sm text-gray-600">Professional English teachers</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </>
  );
}