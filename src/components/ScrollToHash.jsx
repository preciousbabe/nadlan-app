import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function ScrollToHash() {
  const location = useLocation()

  useEffect(() => {
    const hash = location.hash

    // 🚨 Ignore empty hash
    if (!hash) return

    // 🚨 Ignore Supabase auth hashes (VERY IMPORTANT)
    if (
      hash.includes('access_token') ||
      hash.includes('refresh_token') ||
      hash.includes('type=signup') ||
      hash.includes('error_description')
    ) {
      return
    }

    // Clean hash safely
    const id = hash.replace('#', '')

    if (!id) return

    // Try safe selection
    const element = document.getElementById(id)

    if (element) {
      setTimeout(() => {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        })
      }, 100)
    }
  }, [location])

  return null
}