import React from 'react'
import { Heart, Trash2, X } from 'lucide-react'
import { useJokeStore } from '../store/jokeStore'

/**
 * Favorites Panel Component
 */
function FavoritesPanel({ isOpen, onClose }) {
  const { favorites, removeFromFavorites, clearFavorites } = useJokeStore()

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-md max-h-96 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-red-500 fill-current" />
            <h2 className="text-xl font-bold text-gray-800">
              Favorites ({favorites.length})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-lg transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {favorites.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              No favorite jokes yet. Like jokes to save them!
            </p>
          ) : (
            favorites.map((fav) => (
              <div
                key={fav.id}
                className="p-3 bg-gray-50 rounded-lg border border-gray-200 hover:border-primary-300 transition group"
              >
                <p className="text-sm text-gray-700 line-clamp-3 group-hover:line-clamp-none">
                  {fav.joke}
                </p>
                <button
                  onClick={() => removeFromFavorites(fav.id)}
                  className="mt-2 text-xs text-red-500 hover:text-red-700 font-medium flex items-center gap-1"
                >
                  <Trash2 className="w-3 h-3" />
                  Remove
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {favorites.length > 0 && (
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={clearFavorites}
              className="w-full px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition font-medium flex items-center justify-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Clear All
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default FavoritesPanel