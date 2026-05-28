import { createContext, useContext, useState } from 'react'

const DashboardContext = createContext()

export function DashboardProvider({ children }) {

  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <DashboardContext.Provider
      value={{
        sidebarOpen,
        setSidebarOpen
      }}
    >
      {children}
    </DashboardContext.Provider>
  )
}

export function useDashboard() {
  return useContext(DashboardContext)
}