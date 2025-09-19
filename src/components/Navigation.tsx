'use client'

import { useAuth } from '@/contexts/AuthContext'

interface NavigationProps {
  currentTab: string
  onTabChange: (tab: string) => void
  onShowAuth: () => void
}

export default function Navigation({ currentTab, onTabChange, onShowAuth }: NavigationProps) {
  const { user, signOut } = useAuth()

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-gray-800">
              Anya&apos;s English Emporium
            </h1>
          </div>

          {/* Navigation tabs (only show if user is logged in) */}
          {user && (
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <button
                  onClick={() => onTabChange('home')}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    currentTab === 'home'
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Home
                </button>
                <button
                  onClick={() => onTabChange('lessons')}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    currentTab === 'lessons'
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Video Lessons
                </button>
              </div>
            </div>
          )}

          {/* User menu */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <span className="text-sm text-gray-700">
                  Welcome, {user.email?.split('@')[0]}
                </span>
                <button
                  onClick={() => signOut()}
                  className="bg-red-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-red-700 transition-colors"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <button
                onClick={onShowAuth}
                className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                Login
              </button>
            )}
          </div>
        </div>

        {/* Mobile navigation tabs */}
        {user && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <button
                onClick={() => onTabChange('home')}
                className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  currentTab === 'home'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                }`}
              >
                Home
              </button>
              <button
                onClick={() => onTabChange('lessons')}
                className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  currentTab === 'lessons'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                }`}
              >
                Video Lessons
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}