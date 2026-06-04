import { useEffect, useState } from 'react'

export default function usePWAInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [isInstalled, setIsInstalled] = useState(false)
  const [showPrompt, setShowPrompt] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    // Detect mobile
    const isMobile = window.innerWidth < 768

    // Detect if already installed
    const isStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      window.navigator.standalone

    if (isStandalone) {
      setIsInstalled(true)
      return
    }

    const handler = (e) => {
      e.preventDefault()
      setDeferredPrompt(e)

      // ⏱️ DELAY BEFORE SHOWING UI (UX upgrade)
      setTimeout(() => {
        if (isMobile) {
          setShowPrompt(true)
        }
      }, 15000) // 15 seconds
    }

    window.addEventListener('beforeinstallprompt', handler)

    window.addEventListener('appinstalled', () => {
      setIsInstalled(true)
      setShowPrompt(false)
      setDeferredPrompt(null)
    })

    return () => {
      window.removeEventListener('beforeinstallprompt', handler)
    }
  }, [])

  const installApp = async () => {
    if (!deferredPrompt) return

    deferredPrompt.prompt()
    const choice = await deferredPrompt.userChoice

    if (choice.outcome === 'accepted') {
      setDeferredPrompt(null)
      setShowPrompt(false)
    }
  }

  const dismiss = () => {
    setDismissed(true)
    setShowPrompt(false)
  }

  return {
    installApp,
    isInstalled,
    showPrompt,
    dismissed,
    dismiss
  }
}