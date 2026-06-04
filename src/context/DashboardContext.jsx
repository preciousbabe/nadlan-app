import { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { useAuth } from './AuthContext'
import useBootstrap from '../hooks/useBootstrap'
import { supabase } from '../services/supabase'

const DashboardContext = createContext()

export function DashboardProvider({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { user } = useAuth()
  const { profile: bootProfile, notifications, loading: bootLoading } = useBootstrap(user)
  
  const [profile, setProfile] = useState(bootProfile)
  const [localNotifications, setLocalNotifications] = useState(notifications || [])
  const [profileReady, setProfileReady] = useState(false)  // ← ADD THIS

  // Sync when bootstrap data changes
  useEffect(() => {
    setProfile(bootProfile)
  }, [bootProfile])

  useEffect(() => {
    setLocalNotifications(notifications || [])
  }, [notifications])

  const unreadCount = localNotifications.filter(n => !n.read).length

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
      setProfileReady(true)  // ← MARK AS READY
    }
  }, [user])

  // Refresh notifications from DB
  const refreshNotifications = useCallback(async () => {
    if (!user?.id) {
      setLocalNotifications([])
      return
    }
    
    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
    
    if (!error && data) {
      setLocalNotifications(data)
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
        profileReady,  // ← EXPOSE THIS
        notifications: localNotifications,
        unreadCount,
        bootLoading,
        updateProfile,
        refreshProfile,
        refreshNotifications
      }}
    >
      {children}
    </DashboardContext.Provider>
  )
}

export function useDashboard() {
  return useContext(DashboardContext)
}