import { Link, useLocation } from 'react-router-dom'
import { useDashboard } from '../../context/DashboardContext'

export default function Sidebar() {
  const location = useLocation()
  const { sidebarOpen, setSidebarOpen } = useDashboard()

  const navItems = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Portfolio', path: '/dashboard/portfolio' },
    { name: 'Investment Plans', path: '/dashboard/investment-plans' },
    { name: 'Installments', path: '/dashboard/installments' },
    { name: 'ROI Earnings', path: '/dashboard/roi' },
    { name: 'Transactions', path: '/dashboard/transactions' },
    { name: 'AI Advisor', path: '/dashboard/advisor' },
    { name: 'KYC', path: '/dashboard/kyc' },
    { name: 'Settings', path: '/dashboard/settings' }
  ]

  const isActive = (path) => {
    if (path === '/dashboard') {
      return location.pathname === '/dashboard' || location.pathname === '/dashboard/'
    }
    return location.pathname === path
  }

  return (
    <>
      <div
        className={sidebarOpen ? 'sidebar-overlay visible' : 'sidebar-overlay'}
        onClick={() => setSidebarOpen(false)}
      />

      <aside className={sidebarOpen ? 'sidebar mobile-open' : 'sidebar'}>
        <div className="sidebar-logo">NADLAN</div>

        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={isActive(item.path) ? 'sidebar-link active' : 'sidebar-link'}
              onClick={() => setSidebarOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </aside>
    </>
  )
}
