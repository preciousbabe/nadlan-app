import { useAuth } from '../../context/AuthContext'
import { useDashboard } from '../../context/DashboardContext'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'

export default function Topbar() {
  const { user } = useAuth()
  const { setSidebarOpen, profile, unreadCount, refreshProfile } = useDashboard()  // ← get refreshProfile

  // Refresh profile on mount to catch any DB updates (like KYC status)
  useEffect(() => {
    refreshProfile?.()
  }, [])  // run once on mount

  const kycStatus = profile?.kyc_status || 'pending'
  const kycColor = kycStatus === 'verified' ? '#4CAF50' : kycStatus === 'pending' ? '#FFC107' : '#FF4D4D'

  return (
    <div className="topbar">
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <button
          className="dashboard-menu-btn"
          onClick={() => setSidebarOpen(true)}
        >
          ☰
        </button>

        <div className="topbar-greeting">
          <h2>{profile?.full_name || user?.email?.split('@')[0] || 'Investor'}</h2>
          <p>Welcome back</p>
        </div>
      </div>

      <div className="topbar-actions">
        <Link to="/dashboard/notifications" className="notification-bell">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>

          {unreadCount > 0 && (
            <span className="notification-badge">
              {unreadCount}
            </span>
          )}
        </Link>

        <div className="topbar-user">
          <div className="user-email">{user?.email}</div>
          <div 
            className="kyc-badge" 
            style={{ 
              background: `${kycColor}20`, 
              color: kycColor,
              border: `1px solid ${kycColor}40`
            }}
          >
            {kycStatus === 'verified' ? '✓ Verified' : kycStatus === 'pending' ? '⏳ Pending' : '✗ Unverified'}
          </div>
        </div>
      </div>
    </div>
  )
}