import React from 'react'
import ReactDOM from 'react-dom/client'

import { BrowserRouter } from 'react-router-dom'

import App from './App'

import { AuthProvider } from './context/AuthContext'
import { DashboardProvider } from './context/DashboardContext'

import './styles/global.css'
import './styles/navbar.css'
import './styles/hero.css'
import './dashboard/styles/dashboard.css'
import './styles/auth.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

    <AuthProvider>

  <DashboardProvider>

    <BrowserRouter>
      <App />
    </BrowserRouter>

  </DashboardProvider>

</AuthProvider>

  </React.StrictMode>
)

if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then((reg) => {
      console.log('SW registered')

      // New version detected → take control immediately
      reg.addEventListener('updatefound', () => {
        const newWorker = reg.installing
        newWorker?.addEventListener('statechange', () => {
          if (
            newWorker.state === 'installed' &&
            navigator.serviceWorker.controller
          ) {
            newWorker.postMessage({ type: 'SKIP_WAITING' })
          }
        })
      })
    })

    // When the new SW takes over, reload once to serve fresh assets
    let refreshing = false
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (!refreshing) {
        refreshing = true
        window.location.reload()
      }
    })
  })
}