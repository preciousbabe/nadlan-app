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

if ('serviceWorker' in navigator) {

  window.addEventListener('load', () => {

    navigator.serviceWorker.register('/sw.js')
      .then(() => {
        console.log('SW registered')
      })
      .catch((err) => {
        console.log(err)
      })

  })
}