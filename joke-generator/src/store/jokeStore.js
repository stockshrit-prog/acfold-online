import { create } from 'zustand'
import { jokeService } from '../services/jokeService'

/**
 * Joke Store with Local Storage History
 */
export const useJokeStore = create((set, get) => ({
  joke: null,
  loading: false,
  error: null,
  history: [],
  favorites: [],
  category: 'any',

  // Initialize from localStorage
  initialize: () => {
    try {
      const stored = localStorage.getItem('jokeHistory')
      const favorites = localStorage.getItem('jokesFavorites')
      if (stored) set({ history: JSON.parse(stored) })
      if (favorites) set({ favorites: JSON.parse(favorites) })
    } catch (error) {
      console.error('Failed to load from localStorage:', error)
    }
  },

  // Fetch random joke
  fetchRandomJoke: async () => {
    set({ loading: true, error: null })
    try {
      const joke = await jokeService.getRandomJoke()
      set((state) => {
        const updated = [{ ...joke, id: Date.now() }, ...state.history]
        localStorage.setItem('jokeHistory', JSON.stringify(updated.slice(0, 50)))
        return { joke, history: updated, loading: false }
      })
    } catch (error) {
      set({ error: error.message, loading: false })
    }
  },

  // Fetch joke by category
  fetchJokeByCategory: async (category) => {
    set({ loading: true, error: null, category })
    try {
      const joke = await jokeService.getJokeByCategory(category)
      set((state) => {
        const updated = [{ ...joke, id: Date.now() }, ...state.history]
        localStorage.setItem('jokeHistory', JSON.stringify(updated.slice(0, 50)))
        return { joke, history: updated, loading: false }
      })
    } catch (error) {
      set({ error: error.message, loading: false })
    }
  },

  // Add to favorites
  addToFavorites: (joke) => {
    set((state) => {
      const alreadyFavorited = state.favorites.some((fav) => fav.id === joke.id)
      if (alreadyFavorited) return state

      const updated = [...state.favorites, joke]
      localStorage.setItem('jokesFavorites', JSON.stringify(updated))
      return { favorites: updated }
    })
  },

  // Remove from favorites
  removeFromFavorites: (jokeId) => {
    set((state) => {
      const updated = state.favorites.filter((fav) => fav.id !== jokeId)
      localStorage.setItem('jokesFavorites', JSON.stringify(updated))
      return { favorites: updated }
    })
  },

  // Clear history
  clearHistory: () => {
    localStorage.removeItem('jokeHistory')
    set({ history: [] })
  },

  // Clear favorites
  clearFavorites: () => {
    localStorage.removeItem('jokesFavorites')
    set({ favorites: [] })
  },

  // Check if joke is favorited
  isFavorited: (jokeId) => {
    return get().favorites.some((fav) => fav.id === jokeId)
  },
}))