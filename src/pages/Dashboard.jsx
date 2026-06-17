import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Plus, FileText, MoreVertical } from 'lucide-react'
import { projectService } from '../services/projectService'
import { authService } from '../services/authService'
import { useAuthStore } from '../stores/authStore'
import toast from 'react-hot-toast'

function Dashboard() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuthStore()

  useEffect(() => {
    loadProjects()
  }, [])

  const loadProjects = async () => {
    try {
      setLoading(true)
      const result = await projectService.getUserProjects()
      if (result.success) {
        setProjects(result.projects)
      } else {
        toast.error('Failed to load projects')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleCreateProject = async () => {
    const name = prompt('Enter project name:')
    if (!name) return

    try {
      const result = await projectService.createProject(name)
      if (result.success) {
        setProjects([result.project, ...projects])
        toast.success('Project created')
      } else {
        toast.error('Failed to create project')
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const handleDeleteProject = async (id) => {
    if (!confirm('Are you sure?')) return

    try {
      const result = await projectService.deleteProject(id)
      if (result.success) {
        setProjects(projects.filter((p) => p.id !== id))
        toast.success('Project deleted')
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const handleSignOut = async () => {
    const result = await authService.signOut()
    if (result.success) {
      toast.success('Signed out')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 to-dark-800">
      <header className="border-b border-dark-700 bg-dark-900/50 backdrop-blur">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">AcFold Online</h1>
            <p className="text-dark-400 text-sm">Professional Fabrication Software</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-medium">{user?.email}</p>
              <p className="text-xs text-dark-400">Engineer</p>
            </div>
            <button
              onClick={handleSignOut}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-sm transition"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4 text-white">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <button
              onClick={handleCreateProject}
              className="p-6 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg hover:shadow-lg transition"
            >
              <Plus className="w-8 h-8 mb-2" />
              <p className="font-medium">New Project</p>
            </button>
            <Link
              to="/projects"
              className="p-6 bg-dark-800 border border-dark-700 rounded-lg hover:border-dark-600 transition flex flex-col"
            >
              <FileText className="w-8 h-8 mb-2" />
              <p className="font-medium">All Projects</p>
            </Link>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4 text-white">Recent Projects</h2>
          {loading ? (
            <div className="text-center py-12 text-dark-400">Loading...</div>
          ) : projects.length === 0 ? (
            <div className="text-center py-12 bg-dark-800 rounded-lg">
              <p className="text-dark-400 mb-4">No projects yet</p>
              <button
                onClick={handleCreateProject}
                className="px-4 py-2 bg-blue-600 rounded-lg transition"
              >
                Create First Project
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="bg-dark-800 border border-dark-700 rounded-lg p-4 hover:border-dark-600 transition"
                >
                  <Link
                    to={`/drawing/${project.id}`}
                    className="font-medium hover:text-blue-400 transition"
                  >
                    {project.name}
                  </Link>
                  <p className="text-sm text-dark-400 mt-2">{project.description}</p>
                  <div className="flex items-center justify-between text-xs text-dark-500 mt-3">
                    <span>{project.status}</span>
                    <button
                      onClick={() => handleDeleteProject(project.id)}
                      className="text-red-400 hover:text-red-300"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  )
}

export default Dashboard