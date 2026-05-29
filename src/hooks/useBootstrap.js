import { useEffect, useState } from 'react'
import { supabase } from '../services/supabase'

export default function useBootstrap(user) {

  const [profile, setProfile] = useState(null)
  const [notifications, setNotifications] = useState([])
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {

    let active = true

    async function load() {

      // If no user, reset everything
      if (!user) {
        setProfile(null)
        setNotifications([])
        setIsAdmin(false)
        setLoading(false)
        return
      }

      setLoading(true)

      try {

        const [{ data: profile }, { data: notifications }] =
          await Promise.all([

            supabase
              .from('profiles')
              .select('*')
              .eq('id', user.id)
              .maybeSingle(),

            supabase
              .from('notifications')
              .select('*')
              .eq('user_id', user.id)
              .order('created_at', { ascending: false })
     
          ])

        if (!active) return

        setProfile(profile)
        setNotifications(notifications || [])
        setIsAdmin(profile?.role === 'admin')

      } catch (error) {
        console.error('Bootstrap error:', error)
      } finally {
        if (active) setLoading(false)
      }
    }

    load()

    return () => {
      active = false
    }

  }, [user])

  return {
    profile,
    notifications,
    isAdmin,
    loading
  }
}