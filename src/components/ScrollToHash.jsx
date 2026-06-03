import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function ScrollToHash() {
  const location = useLocation()

  useEffect(() => {
    const hash = location.hash

    // Ignore empty hash
    if (!hash) return

    // Ignore Supabase auth hashes
    if (
      hash.includes('access_token') ||
      hash.includes('refresh_token') ||
      hash.includes('type=signup') ||
      hash.includes('error_description')
    ) {
      return
    }

    const id = hash.replace('#', '')
    if (!id) return

    // Delay to ensure DOM is ready after route change
    const timer = setTimeout(() => {
      const element = document.getElementById(id)
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        })
      }
    }, 150)

    return () => clearTimeout(timer)
  }, [location])

  return null
}