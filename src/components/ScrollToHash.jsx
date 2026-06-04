import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function ScrollToHash() {
  const { hash, pathname } = useLocation()

  useEffect(() => {
    // Ignore empty hash
    if (!hash) return

    // Ignore Supabase auth hashes
    const hashStr = hash.toLowerCase()
    if (
      hashStr.includes('access_token') ||
      hashStr.includes('refresh_token') ||
      hashStr.includes('type=signup') ||
      hashStr.includes('error_description')
    ) {
      return
    }

    const id = hash.replace('#', '')
    if (!id) return

    // Longer delay to ensure DOM is fully rendered after route change
    const timer = setTimeout(() => {
      const element = document.getElementById(id)
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        })
      }
    }, 300) // Increased from 150ms to 300ms

    return () => clearTimeout(timer)
  }, [hash, pathname]) // Depend on both so it re-runs when navigating between pages with same hash

  return null
}