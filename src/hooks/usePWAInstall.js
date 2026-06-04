import { useEffect, useState, useCallback } from 'react'

const DISMISS_KEY = 'nadlan-install-dismissed'

export default function usePWAInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [isInstalled, setIsInstalled] = useState(false)
  const [showPrompt, setShowPrompt] = useState(false)
  const [dismissed, setDismissed] = useState(() => {
    // Check localStorage on init
    return localStorage.getItem(DISMISS_KEY) === 'true'
  })

  const isStandalone = useCallback(() => {
    return (
      window.matchMedia('(display-mode: standalone)').matches ||
      window.navigator.standalone === true
    )
  }, [])

  useEffect(() => {
    // Immediately check if already installed
    if (isStandalone()) {
      setIsInstalled(true)
      return
    }

    const handler = (e) => {
      e.preventDefault()
      setDeferredPrompt(e)
      // Only show if not dismissed and not installed
      if (!dismissed && !isStandalone()) {
        setShowPrompt(true)
      }
    }

    const appInstalledHandler = () => {
      setIsInstalled(true)
      setShowPrompt(false)
      setDeferredPrompt(null)
      localStorage.removeItem(DISMISS_KEY) // Clean up if they reinstall
    }

    // Listen for display-mode changes (useful if installed while app is open)
    const standaloneMedia = window.matchMedia('(display-mode: standalone)')
    const standaloneHandler = (e) => {
      if (e.matches) {
        setIsInstalled(true)
        setShowPrompt(false)
      }
    }

    window.addEventListener('beforeinstallprompt', handler)
    window.addEventListener('appinstalled', appInstalledHandler)
    
    // Modern browsers
    if (standaloneMedia.addEventListener) {
      standaloneMedia.addEventListener('change', standaloneHandler)
    } else if (standaloneMedia.addListener) {
      // Legacy Safari
      standaloneMedia.addListener(standaloneHandler)
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handler)
      window.removeEventListener('appinstalled', appInstalledHandler)
      if (standaloneMedia.removeEventListener) {
        standaloneMedia.removeEventListener('change', standaloneHandler)
      } else if (standaloneMedia.removeListener) {
        standaloneMedia.removeListener(standaloneHandler)
      }
    }
  }, [dismissed, isStandalone])

  const installApp = useCallback(async () => {
    if (!deferredPrompt) return

    try {
      deferredPrompt.prompt()
      const choice = await deferredPrompt.userChoice

      if (choice.outcome === 'accepted') {
        setIsInstalled(true)
        setShowPrompt(false)
      }

      setDeferredPrompt(null)
    } catch (err) {
      console.error('Install error:', err)
    }
  }, [deferredPrompt])

  const dismiss = useCallback(() => {
    setDismissed(true)
    setShowPrompt(false)
    localStorage.setItem(DISMISS_KEY, 'true')
  }, [])

  return {
    installApp,
    isInstalled,
    showPrompt,
    dismissed,
    dismiss
  }
}