import {
  createContext,
  useContext,
  useEffect,
  useState
} from 'react'

import { supabase } from '../services/supabase'
import useBootstrap from '../hooks/useBootstrap'

const AuthContext = createContext()

export function AuthProvider({ children }) {

  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [authReady, setAuthReady] = useState(false)

  // Bootstrap profile, notifications, isAdmin from useBootstrap hook
  const {
    profile,
    notifications,
    isAdmin,
    loading: bootstrapLoading
  } = useBootstrap(user)

  // -------------------------
  // INIT AUTH (FAST ONLY)
  // -------------------------
  useEffect(() => {

    let mounted = true

    async function init() {

      const { data, error } = await supabase.auth.getSession()

      if (error) console.error(error)

      if (!mounted) return

      setUser(data?.session?.user ?? null)
      setLoading(false)
      setAuthReady(true)
    }

    init()

    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_event, session) => {

      setUser(session?.user ?? null)
      setAuthReady(true)

    })

    return () => {
      mounted = false
      subscription.unsubscribe()
    }

  }, [])


  
  // -------------------------
  // AUTH ACTIONS
  // -------------------------
async function signup(email, password, fullName, username) {

  try {

    const res = await fetch('/.netlify/functions/send-auth-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password,
        fullName,
        username,
        type: 'signup'
      })
    })

    const result = await res.json()

    if (!res.ok) {
      return {
        error: new Error(result.error || 'Signup failed')
      }
    }

    return {
      data: {
        user: {
          id: result.userId
        }
      }
    }

  } catch (err) {

    return {
      error: new Error(
        err.message || 'Network error. Please try again.'
      )
    }
  }
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
  }

  // Combined loading state: auth init OR bootstrap loading
  const isLoading = loading || bootstrapLoading

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        isAdmin,
        notifications,
        loading: isLoading,
        authReady,
        signup,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}