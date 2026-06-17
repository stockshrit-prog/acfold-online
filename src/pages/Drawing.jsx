import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { projectService } from '../services/projectService'
import toast from 'react-hot-toast'

function Drawing() {
  const { projectId } = useParams()
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadProject()
  }, [projectId])

  const loadProject = async () => {
    try {
      const result = await projectService.getProject(projectId)
      if (result.success) {
        setProject(result.project)
      } else {
        toast.error('Failed to load project')
      }
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-dark-900">
        <p className="text-dark-400">Loading project...</p>
      </div>
    )
  }

  return (
    <div className="h-screen bg-dark-900 flex flex-col">
      <header className="border-b border-dark-700 bg-dark-800 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <a href="/" className="p-2 hover:bg-dark-700 rounded-lg transition">
            <ArrowLeft className="w-5 h-5" />
          </a>
          <h1 className="text-lg font-semibold">{project?.name}</h1>
        </div>
        <button
          onClick={() => toast.success('Saved!')}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm transition"
        >
          Save
        </button>
      </header>

      <div className="flex-1 bg-gradient-to-br from-dark-800 to-dark-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-2xl font-bold mb-2">🎨 Drawing Workspace</p>
          <p className="text-dark-400 text-sm">Canvas implementation coming next...</p>
          <p className="text-dark-500 text-xs mt-4">Project: {projectId}</p>
        </div>
      </div>
    </div>
  )
}

export default Drawing