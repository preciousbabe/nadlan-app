import { useState } from 'react'
import AppRoutes from './routes/AppRoutes'

function App() {

  const [currentSection, setCurrentSection] =
    useState('real-estate')

  return (
    <AppRoutes
      currentSection={currentSection}
      setCurrentSection={setCurrentSection}
    />
  )
}

export default App