import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'

import '../styles/dashboard.css'
import '../styles/sidebar.css'
import '../styles/topbar.css'

export default function DashboardLayout({ children }) {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="dashboard-main">
        <Topbar />
        <div className="dashboard-content">
          {children}
        </div>
      </div>
    </div>
  )
}
