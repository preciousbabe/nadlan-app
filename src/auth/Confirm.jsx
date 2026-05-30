// src/auth/Confirm.jsx
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../services/supabase'

export default function Confirm() {
  const navigate = useNavigate()

  useEffect(() => {
    const handleAuth = async () => {
      const { data } = await supabase.auth.getSession()

      if (data?.session) {
        navigate('/dashboard')
      } else {
        // fallback if session is not ready yet
        const { error } = await supabase.auth.getUser()
        if (!error) {
          navigate('/dashboard')
        }
      }
    }

    handleAuth()
  }, [navigate])

  return (
    <div style={{ padding: 20 }}>
      <p>Signing you in...</p>
    </div>
  )
}