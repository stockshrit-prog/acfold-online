import React, { useState, useEffect } from 'react'
import { Heart, Share2, Copy, Loader } from 'lucide-react'
import { useJokeStore } from '../store/jokeStore'

/**
 * Joke Card Component
 */
function JokeCard() {
  const [copied, setCopied] = useState(false)
  const { joke, loading, addToFavorites, removeFromFavorites, isFavorited } = useJokeStore()
  const isLiked = joke && isFavorited(joke.id)

  const handleCopy = async () => {
    if (joke) {
      try {
        await navigator.clipboard.writeText(joke.joke)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } catch (error) {
        console.error('Failed to copy:', error)
      }
    }
  }

  const handleShare = async () => {
    if (joke) {
      try {
        if (navigator.share) {
          await navigator.share({
            title: 'Check out this joke!',
            text: joke.joke,
          })
        } else {
          handleCopy()
        }
      } catch (error) {
        console.error('Failed to share:', error)
      }
    }
  }

  const handleLike = () => {
    if (joke) {
      if (isLiked) {
        removeFromFavorites(joke.id)
      } else {
        addToFavorites(joke)
      }
    }
  }

  return (
    <div className="animate-slide-down bg-white rounded-lg shadow-xl p-8 min-h-64 flex flex-col justify-between">
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <Loader className="w-8 h-8 text-primary-500 animate-spin" />
        </div>
      ) : joke ? (
        <>
          <div>
            <p className="text-lg md:text-xl text-gray-800 leading-relaxed whitespace-pre-line">
              {joke.joke}
            </p>
            <div className="mt-4 flex items-center gap-2">
              <span className="px-3 py-1 text-xs font-semibold text-primary-700 bg-primary-100 rounded-full">
                {joke.type === 'twopart' ? 'Two-Part' : 'Single'}
              </span>
              <span className="px-3 py-1 text-xs font-semibold text-gray-600 bg-gray-100 rounded-full">
                {joke.source}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 mt-6 pt-6 border-t border-gray-200">
            <button
              onClick={handleLike}
              className={`p-2 rounded-lg transition ${
                isLiked
                  ? 'bg-red-100 text-red-600'
                  : 'bg-gray-100 text-gray-600 hover:bg-red-100 hover:text-red-600'
              }`}
              title="Add to favorites"
            >
              <Heart className="w-5 h-5" fill={isLiked ? 'currentColor' : 'none'} />
            </button>

            <button
              onClick={handleShare}
              className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-blue-100 hover:text-blue-600 transition"
              title="Share joke"
            >
              <Share2 className="w-5 h-5" />
            </button>

            <button
              onClick={handleCopy}
              className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-green-100 hover:text-green-600 transition"
              title="Copy to clipboard"
            >
              <Copy className="w-5 h-5" />
            </button>
          </div>

          {copied && (
            <div className="mt-2 text-sm text-green-600 text-center">
              ✓ Copied to clipboard!
            </div>
          )}
        </>
      ) : (
        <div className="flex items-center justify-center h-64 text-gray-400">
          <p>Click "Get Joke" to start laughing!</p>
        </div>
      )}
    </div>
  )
}

export default JokeCard