import React from 'react'
import { Clock, Trash2, X } from 'lucide-react'
import { useJokeStore } from '../store/jokeStore'

/**
 * History Panel Component
 */
function HistoryPanel({ isOpen, onClose }) {
  const { history, clearHistory } = useJokeStore()

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-md max-h-96 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-blue-500" />
            <h2 className="text-xl font-bold text-gray-800">
              History ({history.length})
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
          {history.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              No history yet. Get some jokes to see them here!
            </p>
          ) : (
            history.map((item) => (
              <div
                key={item.id}
                className="p-3 bg-gray-50 rounded-lg border border-gray-200 hover:border-blue-300 transition"
              >
                <p className="text-sm text-gray-700 line-clamp-3">
                  {item.joke}
                </p>
                <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
                  <span>{item.source}</span>
                  <span>{new Date(item.id).toLocaleDateString()}</span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {history.length > 0 && (
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={clearHistory}
              className="w-full px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition font-medium flex items-center justify-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Clear History
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default HistoryPanel