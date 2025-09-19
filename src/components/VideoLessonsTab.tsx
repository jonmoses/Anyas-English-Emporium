export default function VideoLessonsTab() {
  // Placeholder data for video lessons - replace with real data later
  const placeholderLessons = [
    {
      id: 1,
      title: "Introduction to English Grammar",
      duration: "15 min",
      level: "Beginner",
      category: "Grammar"
    },
    {
      id: 2,
      title: "Common English Phrases",
      duration: "20 min",
      level: "Intermediate",
      category: "Conversation"
    },
    {
      id: 3,
      title: "Pronunciation Fundamentals",
      duration: "25 min",
      level: "Beginner",
      category: "Pronunciation"
    },
    {
      id: 4,
      title: "Business English Essentials",
      duration: "30 min",
      level: "Advanced",
      category: "Business"
    },
    {
      id: 5,
      title: "Vocabulary Building Techniques",
      duration: "18 min",
      level: "Intermediate",
      category: "Vocabulary"
    },
    {
      id: 6,
      title: "Advanced Grammar Concepts",
      duration: "35 min",
      level: "Advanced",
      category: "Grammar"
    }
  ]

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'bg-green-100 text-green-800'
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800'
      case 'Advanced': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Video Lessons</h2>
        <p className="text-gray-600">
          Explore our comprehensive collection of English learning videos.
          More content will be added as videos are uploaded.
        </p>
      </div>

      {/* Filter/Search Bar - Future Enhancement */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search lessons..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">All Levels</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
          <select className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">All Categories</option>
            <option value="grammar">Grammar</option>
            <option value="vocabulary">Vocabulary</option>
            <option value="pronunciation">Pronunciation</option>
            <option value="conversation">Conversation</option>
            <option value="business">Business</option>
          </select>
        </div>
      </div>

      {/* Video Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {placeholderLessons.map((lesson) => (
          <div key={lesson.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
            {/* Video Thumbnail Placeholder */}
            <div className="aspect-video bg-gray-200 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center mx-auto mb-2">
                  <svg className="w-8 h-8 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-sm text-gray-500">Video Thumbnail</p>
                <p className="text-xs text-gray-400">Coming Soon</p>
              </div>
            </div>

            {/* Video Info */}
            <div className="p-4">
              <h3 className="font-semibold text-gray-800 mb-2">{lesson.title}</h3>

              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-gray-500">{lesson.duration}</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(lesson.level)}`}>
                  {lesson.level}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-blue-600 font-medium">{lesson.category}</span>
                <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors">
                  Watch
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State Message */}
      {placeholderLessons.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-800 mb-2">No Videos Yet</h3>
          <p className="text-gray-600">Videos will appear here once they are uploaded.</p>
        </div>
      )}

      {/* Coming Soon Notice */}
      <div className="mt-12 bg-blue-50 rounded-lg p-6 text-center">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">More Content Coming Soon!</h3>
        <p className="text-gray-600">
          We&apos;re working hard to bring you high-quality English learning videos.
          Check back regularly for new lessons and content updates.
        </p>
      </div>
    </div>
  )
}