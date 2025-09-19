export default function HomeTab() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Welcome Section */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">
          Welcome to Your English Learning Journey!
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Master English with engaging video lessons designed to make learning simple, effective, and fun.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-3 gap-8 mb-12">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Video Lessons</h3>
          <p className="text-gray-600">
            High-quality video content covering grammar, vocabulary, pronunciation, and conversation skills.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Learn at Your Pace</h3>
          <p className="text-gray-600">
            Access lessons anytime, anywhere. Learn at a pace that works for your schedule and learning style.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Expert Instruction</h3>
          <p className="text-gray-600">
            Learn from experienced English teachers with proven methods for language acquisition.
          </p>
        </div>
      </div>

      {/* Getting Started Section */}
      <div className="bg-blue-50 rounded-lg p-8 text-center">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">
          Ready to Start Learning?
        </h3>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Begin your English learning journey with our comprehensive video lessons.
          Start with the basics or jump into advanced topics - it&apos;s up to you!
        </p>
        <div className="space-y-2">
          <p className="text-sm text-gray-500">Click on &quot;Video Lessons&quot; to browse available content</p>
          <p className="text-sm text-gray-500">New lessons are added regularly</p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
        <div className="text-center">
          <div className="text-3xl font-bold text-blue-600">100+</div>
          <div className="text-sm text-gray-600">Video Lessons</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-green-600">50+</div>
          <div className="text-sm text-gray-600">Topics Covered</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-purple-600">24/7</div>
          <div className="text-sm text-gray-600">Access</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-orange-600">HD</div>
          <div className="text-sm text-gray-600">Quality</div>
        </div>
      </div>
    </div>
  )
}