import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Mail, Lock, User, LogIn } from 'lucide-react'
import { authService } from '../services/authService'
import { useAuthStore } from '../stores/authStore'
import toast from 'react-hot-toast'

function AuthPage() {
  const navigate = useNavigate()
  const { setUser } = useAuthStore()
  const [isLogin, setIsLogin] = useState(true)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      let result

      if (isLogin) {
        result = await authService.signIn(formData.email, formData.password)
      } else {
        result = await authService.signUp(
          formData.email,
          formData.password,
          formData.fullName
        )
      }

      if (result.success) {
        setUser(result.user)
        toast.success('Success!')
        navigate('/')
      } else {
        toast.error(result.error)
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-block p-3 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg mb-4">
            <span className="text-2xl font-bold">🏭</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">AcFold Online</h1>
          <p className="text-dark-400">Professional Fabrication Software</p>
        </div>

        <div className="bg-dark-800 border border-dark-700 rounded-lg p-8">
          <h2 className="text-xl font-semibold mb-6 text-center">
            {isLogin ? 'Sign In' : 'Create Account'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium mb-2">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-5 h-5 text-dark-500" />
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                    className="w-full bg-dark-700 border border-dark-600 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-dark-500" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                  className="w-full bg-dark-700 border border-dark-600 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-dark-500" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                  className="w-full bg-dark-700 border border-dark-600 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 rounded-lg py-2 font-medium text-white flex items-center justify-center gap-2 transition"
            >
              <LogIn className="w-4 h-4" />
              {loading ? 'Processing...' : isLogin ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          <div className="text-center mt-6 pt-6 border-t border-dark-700">
            <p className="text-dark-400 text-sm mb-2">
              {isLogin ? "Don't have an account?" : 'Already have an account?'}
            </p>
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-blue-400 hover:text-blue-300 font-medium transition"
            >
              {isLogin ? 'Sign Up' : 'Sign In'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthPage