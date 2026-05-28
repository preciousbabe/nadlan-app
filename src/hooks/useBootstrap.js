import { useEffect } from 'react'
import { supabase } from '../lib/supabase'

export default function useBootstrap(user, setProfile, setNotifications) {
  useEffect(() => {
    if (!user) return

    async function load() {
      // PROFILE
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      setProfile(profile)

      // NOTIFICATIONS
      const { data: notifications } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      setNotifications(notifications || [])
    }

    load()
  }, [user])
}