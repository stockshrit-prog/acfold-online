import React, { useState, useEffect } from 'react'
import { Laugh, Heart, Clock } from 'lucide-react'
import { useJokeStore } from './store/jokeStore'
import JokeCard from './components/JokeCard'
import Controls from './components/Controls'
import FavoritesPanel from './components/FavoritesPanel'
import HistoryPanel from './components/HistoryPanel'

/**
 * Main App Component
 */
function App() {
  const [showFavorites, setShowFavorites] = useState(false)
  const [showHistory, setShowHistory] = useState(false)
  const { initialize, favorites, history, fetchRandomJoke } = useJokeStore()

  useEffect(() => {
    initialize()
    fetchRandomJoke()
  }, [initialize, fetchRandomJoke])

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-100 via-yellow-50 to-orange-100 p-4 sm:p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Laugh className="w-10 h-10 text-primary-600 animate-bounce" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
              Joke Generator
            </h1>
            <Laugh className="w-10 h-10 text-primary-600 animate-bounce" style={{ animationDelay: '0.2s' }} />
          </div>
          <p className="text-gray-600 text-lg">
            Get random jokes from multiple sources and laugh out loud! 😂
          </p>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <button
            onClick={() => setShowFavorites(true)}
            className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition border-l-4 border-red-500 cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <Heart className="w-6 h-6 text-red-500 fill-current" />
              <div className="text-left">
                <p className="text-sm text-gray-600">Favorites</p>
                <p className="text-2xl font-bold text-gray-800">{favorites.length}</p>
              </div>
            </div>
          </button>

          <button
            onClick={() => setShowHistory(true)}
            className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition border-l-4 border-blue-500 cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <Clock className="w-6 h-6 text-blue-500" />
              <div className="text-left">
                <p className="text-sm text-gray-600">History</p>
                <p className="text-2xl font-bold text-gray-800">{history.length}</p>
              </div>
            </div>
          </button>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-lg shadow-xl p-6 mb-6">
          <JokeCard />
        </div>

        {/* Controls */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <Controls />
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-gray-600">
          <p>✨ Powered by multiple joke APIs with automatic fallback</p>
          <p className="mt-2 text-xs text-gray-500">
            💾 Your favorites and history are saved locally • 🌍 Works offline • 🚀 No sign-up needed
          </p>
        </div>
      </div>

      {/* Panels */}
      <FavoritesPanel isOpen={showFavorites} onClose={() => setShowFavorites(false)} />
      <HistoryPanel isOpen={showHistory} onClose={() => setShowHistory(false)} />
    </div>
  )
}

export default App