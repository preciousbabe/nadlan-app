import { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { useAuth } from './AuthContext'
import useBootstrap from '../hooks/useBootstrap'
import { supabase } from '../services/supabase'

const DashboardContext = createContext()

export function DashboardProvider({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { user } = useAuth()
  const { profile: bootProfile, notifications, loading: bootLoading } = useBootstrap(user)
  
  // Store profile in state so we can update it
  const [profile, setProfile] = useState(bootProfile)

  // Sync when bootstrap profile changes
  useEffect(() => {
    setProfile(bootProfile)
  }, [bootProfile])

  const unreadCount = notifications.filter(n => !n.read).length

  // Refresh profile from DB
  const refreshProfile = useCallback(async () => {
    if (!user?.id) return
    
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()
    
    if (!error && data) {
      setProfile(data)
    }
  }, [user])

  // Update profile and refresh
  const updateProfile = useCallback(async (updates) => {
    if (!user?.id) return { error: new Error('No user') }
    
    const { error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', user.id)
    
    if (!error) {
      await refreshProfile()
    }
    
    return { error }
  }, [user, refreshProfile])

  return (
    <DashboardContext.Provider
      value={{
        sidebarOpen,
        setSidebarOpen,
        profile,
        notifications,
        unreadCount,
        bootLoading,
        updateProfile,
        refreshProfile
      }}
    >
      {children}
    </DashboardContext.Provider>
  )
}

export function useDashboard() {
  return useContext(DashboardContext)
}