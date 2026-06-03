import {
  createContext,
  useContext,
  useEffect,
  useState
} from 'react'

import { supabase } from '../services/supabase'
import useBootstrap from '../hooks/useBootstrap'

const AuthContext = createContext()

// Splash Loader Component
function SplashLoader({ progress, fadeOut }) {
  return (
    <div className={`splash-screen ${fadeOut ? 'fade-out' : ''}`}>
      <div className="splash-content">
        <h1 className="splash-logo">NADLAN</h1>
        <div className="splash-progress-track">
          <div 
            className="splash-progress-fill" 
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="splash-tagline">Real Estate & Green Energy</p>
      </div>
    </div>
  )
}

export function AuthProvider({ children }) {

  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [authReady, setAuthReady] = useState(false)
  const [splashProgress, setSplashProgress] = useState(0)
  const [showSplash, setShowSplash] = useState(true)
  const [fadeOut, setFadeOut] = useState(false)

  // Bootstrap profile, notifications, isAdmin from useBootstrap hook
  const {
    profile,
    notifications,
    isAdmin,
    loading: bootstrapLoading
  } = useBootstrap(user)

  // -------------------------
  // PROGRESS BAR ANIMATION
  // -------------------------
  useEffect(() => {
    const duration = 2500
    const interval = 30
    const steps = duration / interval
    let current = 0
    const stepSize = 100 / steps

    const timer = setInterval(() => {
      current += stepSize
      if (current >= 100) {
        setSplashProgress(100)
        clearInterval(timer)
      } else {
        const eased = 100 - (100 - current) * 0.98
        setSplashProgress(Math.min(eased, 95))
      }
    }, interval)

    return () => clearInterval(timer)
  }, [])

  

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

  // Complete splash with fade-out when everything is ready
  useEffect(() => {
    if (authReady && !bootstrapLoading && !loading) {
      setSplashProgress(100)
      const fadeTimer = setTimeout(() => setFadeOut(true), 300)
      const removeTimer = setTimeout(() => setShowSplash(false), 800)
      return () => {
        clearTimeout(fadeTimer)
        clearTimeout(removeTimer)
      }
    }
  }, [authReady, bootstrapLoading, loading])

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
      {showSplash && <SplashLoader progress={splashProgress} fadeOut={fadeOut} />}
      {!showSplash && children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}