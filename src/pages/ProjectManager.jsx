import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { projectService } from '../services/projectService'
import toast from 'react-hot-toast'

function ProjectManager() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadProjects()
  }, [])

  const loadProjects = async () => {
    try {
      const result = await projectService.getUserProjects()
      if (result.success) {
        setProjects(result.projects)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-dark-900 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">All Projects</h1>
        {loading ? (
          <p className="text-dark-400">Loading...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((project) => (
              <Link
                key={project.id}
                to={`/drawing/${project.id}`}
                className="bg-dark-800 border border-dark-700 rounded-lg p-4 hover:border-blue-500 transition"
              >
                <h3 className="font-semibold">{project.name}</h3>
                <p className="text-sm text-dark-400 mt-2">{project.description}</p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default ProjectManager