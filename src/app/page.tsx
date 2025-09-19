'use client'

import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import AuthModal from '@/components/AuthModal'

export default function HomePage() {
  const [showAuthModal, setShowAuthModal] = useState(false)
  const { user, signOut, loading } = useAuth()

  if (loading) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
        <div className="text-lg text-gray-600">Loading...</div>
      </main>
    )
  }
  if (user) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 text-center">
        <div className="p-8 max-w-2xl">
          <h1 className="text-5xl font-bold text-gray-800">
            Welcome to Anya&apos;s English Emporium
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Hello, {user.email}! Your learning journey starts here.
          </p>

          <div className="mt-8 mb-8 border-b border-gray-200"></div>

          <div className="space-y-4">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">Your Courses</h2>
              <p className="text-gray-500">Course content coming soon...</p>
            </div>

            <button
              onClick={() => signOut()}
              className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition"
            >
              Sign Out
            </button>
          </div>
        </div>
      </main>
    )
  }

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 text-center">
        <div className="p-8 max-w-2xl">
          <h1 className="text-5xl font-bold text-gray-800">
            Anya&apos;s English Emporium
          </h1>

          <p className="mt-4 text-lg text-gray-600">
            Unlock your potential with engaging video courses designed to make learning English simple and fun. A brand new learning experience is coming soon!
          </p>

          <div className="mt-8 mb-8 border-b border-gray-200"></div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-700">Get started today!</h2>
            <p className="mt-2 text-gray-500">
              Sign up to access exclusive English learning content.
            </p>

            <div className="mt-4 flex flex-col sm:flex-row gap-2 justify-center">
              <button
                onClick={() => setShowAuthModal(true)}
                className="bg-blue-600 text-white font-semibold px-6 py-2 rounded-md hover:bg-blue-700 transition"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </main>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </>
  );
}