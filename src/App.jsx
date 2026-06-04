import { useState } from 'react'
import AppRoutes from './routes/AppRoutes'
import InstallPrompt from './components/InstallPrompt'

function App() {
  const [currentSection, setCurrentSection] = useState('real-estate')

  return (
    <>
      <AppRoutes
        currentSection={currentSection}
        setCurrentSection={setCurrentSection}
      />

      {/* 🔥 GLOBAL PWA INSTALL UI */}
      <InstallPrompt />
    </>
  )
}

export default App