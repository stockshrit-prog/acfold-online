import { supabase } from './supabaseClient'

export const projectService = {
  async getUserProjects() {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Not authenticated')

      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false })

      if (error) throw error
      return { success: true, projects: data || [] }
    } catch (error) {
      return { success: false, error: error.message }
    }
  },

  async getProject(projectId) {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', projectId)
        .single()

      if (error) throw error
      return { success: true, project: data }
    } catch (error) {
      return { success: false, error: error.message }
    }
  },

  async createProject(name, description = '') {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Not authenticated')

      const { data, error } = await supabase
        .from('projects')
        .insert([
          {
            name,
            description,
            user_id: user.id,
            data: {},
            status: 'draft',
          },
        ])
        .select()
        .single()

      if (error) throw error
      return { success: true, project: data }
    } catch (error) {
      return { success: false, error: error.message }
    }
  },

  async updateProject(projectId, updates) {
    try {
      const { data, error } = await supabase
        .from('projects')
        .update(updates)
        .eq('id', projectId)
        .select()
        .single()

      if (error) throw error
      return { success: true, project: data }
    } catch (error) {
      return { success: false, error: error.message }
    }
  },

  async deleteProject(projectId) {
    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', projectId)

      if (error) throw error
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  },
}