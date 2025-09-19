// This is the main component for our homepage
export default function HomePage() {
  return (
    // Main container that fills the screen and centers content
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 text-center">
      
      {/* A container to hold our content */}
      <div className="p-8 max-w-2xl">

        {/* The main headline */}
        <h1 className="text-5xl font-bold text-gray-800">
          Anya&apos;s English Emporium
        </h1>

        {/* The subheading */}
        <p className="mt-4 text-lg text-gray-600">
          Unlock your potential with engaging video courses designed to make learning English simple and fun. A brand new learning experience is coming soon!
        </p>

        {/* A simple divider */}
        <div className="mt-8 mb-8 border-b border-gray-200"></div>

        {/* A section for email signup */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-700">Be the first to know.</h2>
          <p className="mt-2 text-gray-500">
            Sign up to get notified the moment we launch.
          </p>
          
          {/* Simple form for email capture */}
          <div className="mt-4 flex flex-col sm:flex-row gap-2 justify-center">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="px-4 py-2 border border-gray-300 rounded-md w-full sm:w-auto flex-grow"
            />
            <button className="bg-blue-600 text-white font-semibold px-6 py-2 rounded-md hover:bg-blue-700 transition">
              Notify Me
            </button>
          </div>
        </div>

      </div>
    </main>
  );
}