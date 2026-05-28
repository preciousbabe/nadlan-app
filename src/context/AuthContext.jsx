import {
  createContext,
  useContext,
  useEffect,
  useState
} from 'react'

import { supabase } from '../services/supabase'

const AuthContext = createContext()

export function AuthProvider({ children }) {

  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [notifications, setNotifications] = useState([])

  // ADMIN STATE
  const [isAdmin, setIsAdmin] = useState(false)

  const [loading, setLoading] = useState(true)

  // computed
  const unreadCount = notifications.filter(n => !n.read).length

  // -------------------------
  // FETCH USER DATA (CORE)
  // -------------------------
  async function loadUserData(userId) {

    if (!userId) return

    // PROFILE
    const { data: profileData } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()

    setProfile(profileData)

    // ADMIN CHECK
    setIsAdmin(profileData?.is_admin || false)

    // NOTIFICATIONS
    const { data: notifData } = await supabase
      .from('notifications')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    setNotifications(notifData || [])
  }

  // -------------------------
  // INIT SESSION
  // -------------------------
  useEffect(() => {

    supabase.auth.getSession()
      .then(({ data }) => {

        const sessionUser = data.session?.user ?? null

        setUser(sessionUser)

        if (sessionUser) {
          loadUserData(sessionUser.id)
        } else {
          setProfile(null)
          setNotifications([])
          setIsAdmin(false)
        }

        setLoading(false)
      })

    // AUTH CHANGES
    const { data: listener } =
      supabase.auth.onAuthStateChange(async (_event, session) => {

        const sessionUser = session?.user ?? null

        setUser(sessionUser)

        if (sessionUser) {

          await loadUserData(sessionUser.id)

        } else {

          setProfile(null)
          setNotifications([])
          setIsAdmin(false)

        }

        setLoading(false)
      })

    return () => {
      listener.subscription.unsubscribe()
    }

  }, [])

  // -------------------------
  // AUTH ACTIONS
  // -------------------------
  async function signup(email, password, fullName, username) {
    return await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          username: username
        }
      }
    })
  }

  async function login(email, password) {
    return await supabase.auth.signInWithPassword({
      email,
      password
    })
  }

  async function logout() {

    await supabase.auth.signOut()

    setUser(null)
    setProfile(null)
    setNotifications([])
    setIsAdmin(false)
  }

  // -------------------------
  // NOTIFICATION ACTIONS
  // -------------------------
  async function markAsRead(id) {

    await supabase
      .from('notifications')
      .update({ read: true })
      .eq('id', id)
      .eq('user_id', user.id)

    setNotifications(prev =>
      prev.map(n =>
        n.id === id ? { ...n, read: true } : n
      )
    )
  }

  async function markAllAsRead() {

    await supabase
      .from('notifications')
      .update({ read: true })
      .eq('user_id', user.id)

    setNotifications(prev =>
      prev.map(n => ({ ...n, read: true }))
    )
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        notifications,
        unreadCount,

        // ADMIN
        isAdmin,

        loading,

        signup,
        login,
        logout,

        markAsRead,
        markAllAsRead,

        setNotifications
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}