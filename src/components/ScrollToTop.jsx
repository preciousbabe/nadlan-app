import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    // Only scroll to top if there's NO hash (hash scrolling is handled by ScrollToHash)
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'instant' }) // 'instant' avoids visual jump
    }
  }, [pathname, hash])

  return null
}