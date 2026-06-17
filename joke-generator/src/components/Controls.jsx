import React from 'react'
import { Zap } from 'lucide-react'
import { useJokeStore } from '../store/jokeStore'

/**
 * Controls Component
 */
function Controls() {
  const { loading, fetchRandomJoke, fetchJokeByCategory, category } = useJokeStore()

  const categories = ['any', 'programming', 'general', 'knock-knock']

  return (
    <div className="space-y-4">
      {/* Category Selector */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              if (cat === 'any') {
                fetchRandomJoke()
              } else {
                fetchJokeByCategory(cat)
              }
            }}
            disabled={loading}
            className={`px-4 py-2 rounded-lg font-medium transition capitalize ${
              category === cat
                ? 'bg-primary-500 text-white'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Main Button */}
      <button
        onClick={fetchRandomJoke}
        disabled={loading}
        className="w-full px-6 py-3 bg-gradient-to-r from-primary-400 to-primary-600 text-white font-bold rounded-lg hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        <Zap className="w-5 h-5" />
        {loading ? 'Loading...' : 'Get Joke'}
      </button>
    </div>
  )
}

export default Controls