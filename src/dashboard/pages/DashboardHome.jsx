import { useAuth } from '../../context/AuthContext'
import useDashboardData from '../../hooks/useDashboardData'
import useBootstrap from '../../hooks/useBootstrap'
import { Link } from 'react-router-dom'

function StatCard({ title, value, subtitle, icon, color }) {
  return (
    <div className="stat-card" style={{ borderLeft: `4px solid ${color}` }}>
      <div className="stat-icon" style={{ color }}>{icon}</div>
      <div className="stat-info">
        <h3>{title}</h3>
        <p className="stat-value">{value}</p>
        <span className="stat-subtitle">{subtitle}</span>
      </div>
    </div>
  )
}

function RecentInvestment({ investment }) {
  const plan = investment.investment_plan
  const progress = investment.progress || 0

  return (
    <div className="recent-investment-item">
      <div className="recent-investment-info">
        <h4>{plan?.title || 'Investment'}</h4>
        <p>₦{investment.amount?.toLocaleString()}</p>
      </div>
      <div className="recent-investment-progress">
        <div className="progress-bar-bg">
          <div 
            className="progress-bar-fill" 
            style={{ width: `${progress}%` }}
          />
        </div>
        <span>{progress}%</span>
      </div>
      <div className={`status-badge ${investment.status}`}>
        {investment.status}
      </div>
    </div>
  )
}

function RecentTransaction({ transaction }) {
  const isCredit = transaction.type === 'deposit' || transaction.type === 'roi_payout'

  return (
    <div className="recent-transaction-item">
      <div className={`transaction-type-icon ${isCredit ? 'credit' : 'debit'}`}>
        {isCredit ? '↓' : '↑'}
      </div>
      <div className="transaction-info">
        <h4>{transaction.type?.replace('_', ' ')?.toUpperCase()}</h4>
        <p>{new Date(transaction.created_at).toLocaleDateString()}</p>
      </div>
      <div className={`transaction-amount ${isCredit ? 'credit' : 'debit'}`}>
        {isCredit ? '+' : '-'}₦{transaction.amount?.toLocaleString()}
      </div>
    </div>
  )
}

import { useDashboard } from '../../context/DashboardContext'

export default function DashboardHome() {
  const { user } = useAuth()
  const { profile } = useDashboard() 
  const {
    stats,
    investments,
    transactions,
    loading,
    refresh
  } = useDashboardData(user)

  if (loading) {
    return (
      <div className="dashboard-page">
        <div className="dashboard-loading">
          <div className="spinner"></div>
          <p>Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  const recentInvestments = investments.slice(0, 3)
  const recentTransactions = transactions.slice(0, 5)

  return (
    <div className="dashboard-page dashboard-home">
      <div className="dashboard-header">
        <h1>Dashboard Overview</h1>
        <button onClick={refresh} className="refresh-btn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="23 4 23 10 17 10" />
            <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
          </svg>
          Refresh
        </button>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        <StatCard
          title="Total Invested"
          value={`₦${stats.totalInvested.toLocaleString()}`}
          subtitle="Across all plans"
          icon="💰"
          color="#C9A962"
        />
        <StatCard
          title="ROI Earned"
          value={`₦${stats.totalRoi.toLocaleString()}`}
          subtitle="Total returns"
          icon="📈"
          color="#4CAF50"
        />
        <StatCard
          title="Active Investments"
          value={stats.activeInvestments}
          subtitle="Running plans"
          icon="🏗️"
          color="#2196F3"
        />
        <StatCard
          title="Pending Installments"
          value={stats.pendingInstallments}
          subtitle="Upcoming payments"
          icon="⏰"
          color="#FF9800"
        />
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <h2>Quick Actions</h2>
        <div className="quick-actions-grid">
          <Link to="/dashboard/investment-plans" className="quick-action-card">
            <span className="quick-action-icon">🎯</span>
            <h3>Browse Plans</h3>
            <p>Explore investment opportunities</p>
          </Link>
          <Link to="/dashboard/portfolio" className="quick-action-card">
            <span className="quick-action-icon">📊</span>
            <h3>View Portfolio</h3>
            <p>Track your investments</p>
          </Link>
          <Link to="/dashboard/installments" className="quick-action-card">
            <span className="quick-action-icon">💳</span>
            <h3>Pay Installment</h3>
            <p>Manage your payments</p>
          </Link>
          <Link to="/dashboard/kyc" className="quick-action-card">
            <span className="quick-action-icon">📝</span>
            <h3>Complete KYC</h3>
            <p>Verify your identity</p>
          </Link>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="dashboard-columns">
        {/* Recent Investments */}
        <div className="dashboard-column">
          <div className="column-header">
            <h2>Recent Investments</h2>
            <Link to="/dashboard/portfolio" className="view-all-link">View All →</Link>
          </div>
          <div className="recent-list">
            {recentInvestments.length > 0 ? (
              recentInvestments.map(inv => (
                <RecentInvestment key={inv.id} investment={inv} />
              ))
            ) : (
              <div className="empty-state">
                <p>No investments yet</p>
                <Link to="/dashboard/investment-plans" className="invest-btn">
                  Start Investing
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="dashboard-column">
          <div className="column-header">
            <h2>Recent Transactions</h2>
            <Link to="/dashboard/transactions" className="view-all-link">View All →</Link>
          </div>
          <div className="recent-list">
            {recentTransactions.length > 0 ? (
              recentTransactions.map(tx => (
                <RecentTransaction key={tx.id} transaction={tx} />
              ))
            ) : (
              <div className="empty-state">
                <p>No transactions yet</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
