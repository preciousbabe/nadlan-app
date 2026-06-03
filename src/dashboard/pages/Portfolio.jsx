import { useAuth } from '../../context/AuthContext'
import useDashboardData from '../../hooks/useDashboardData'
import { useState } from 'react'
import { Link } from 'react-router-dom'

function PortfolioChart({ investments }) {
  const total = (investments || []).reduce((sum, inv) => sum + (inv.amount || 0), 0)

  return (
    <div className="portfolio-chart">
      <h3>Portfolio Allocation</h3>
      <div className="chart-bars">
        {(investments || []).map((inv, i) => {
          const percentage = total > 0 ? ((inv.amount || 0) / total) * 100 : 0
          const colors = ['#C9A962', '#4CAF50', '#2196F3', '#FF9800', '#9C27B0']
          return (
            <div key={inv.id} className="chart-bar-item">
              <div className="chart-bar-label">
                {inv?.investment_plan?.title || 'Investment'}
              </div>
              <div className="chart-bar-track">
                <div 
                  className="chart-bar-fill"
                  style={{ 
                    width: `${percentage}%`,
                    background: colors[i % colors.length]
                  }}
                />
              </div>
              <div className="chart-bar-value">
                ₦{(inv.amount || 0).toLocaleString()} ({percentage.toFixed(1)}%)
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function InvestmentRow({ investment }) {
  const [expanded, setExpanded] = useState(false)
  const plan = investment?.investment_plan
  const progress = investment?.progress || 0
  const roiEarned = investment?.roi_earned || 0
  const projectedTotal = (investment?.amount || 0) + ((investment?.amount || 0) * (plan?.roi_percent || 0) / 100)

  const statusColors = {
    active: '#4CAF50',
    completed: '#2196F3',
    paused: '#FF9800',
    cancelled: '#FF4D4D',
    pending_approval: '#FF9800'
  }

  // SAFE date formatting
  const startedDate = investment?.started_at 
    ? new Date(investment.started_at).toLocaleDateString() 
    : 'N/A'

  // Use payment_mode (new name) or payment_type (old fallback)
  const paymentMode = investment?.payment_mode || investment?.payment_type || 'full'

  return (
    <div className="investment-row">
      <div className="investment-row-header" onClick={() => setExpanded(!expanded)}>
        <div className="investment-info">
          <h4>{plan?.title || 'Investment Plan'}</h4>
          <span className="investment-date">
            Started {startedDate}
          </span>
        </div>
        <div className="investment-amount">
          ₦{(investment?.amount || 0).toLocaleString()}
        </div>
        <div 
          className="investment-status-badge"
          style={{ 
            background: `${statusColors[investment?.status] || '#888'}20`,
            color: statusColors[investment?.status] || '#888',
            border: `1px solid ${statusColors[investment?.status] || '#888'}40`
          }}
        >
          {investment?.status || 'pending'}
        </div>
        <span className="expand-icon">{expanded ? '▼' : '▶'}</span>
      </div>

      {expanded && (
        <div className="investment-details">
          <div className="detail-grid">
            <div className="detail-item">
              <span className="detail-label">Principal</span>
              <span className="detail-value">₦{(investment?.amount || 0).toLocaleString()}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">ROI Rate</span>
              <span className="detail-value" style={{ color: '#C9A962' }}>
                {plan?.roi_percent || 0}%
              </span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Duration</span>
              <span className="detail-value">{plan?.duration_months || 0} months</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">ROI Earned</span>
              <span className="detail-value" style={{ color: '#4CAF50' }}>
                ₦{(roiEarned).toLocaleString()}
              </span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Projected Total</span>
              <span className="detail-value">₦{(projectedTotal).toLocaleString()}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Total Paid</span>
              <span className="detail-value" style={{ color: '#4CAF50' }}>
                ₦{(investment?.total_paid || 0).toLocaleString()}
              </span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Balance</span>
              <span className="detail-value" style={{ color: '#FF9800' }}>
                ₦{(investment?.balance_remaining || 0).toLocaleString()}
              </span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Payment Mode</span>
              <span className="detail-value capitalize">{paymentMode}</span>
            </div>
          </div>

          <div className="progress-section">
            <div className="progress-header">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <div className="progress-bar-bg">
              <div 
                className="progress-bar-fill"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Show installment history if any */}
          {investment?.installments && investment.installments.length > 0 && (
            <div className="installment-history-mini">
              <h5>Payment History</h5>
              {investment.installments.map(inst => (
                <div key={inst.id} className="mini-installment">
                  <span>#{inst.installment_number}</span>
                  <span>₦{(inst.amount || 0).toLocaleString()}</span>
                  <span className={inst.paid ? 'paid' : 'pending'}>
                    {inst.paid ? '✓ Paid' : '⏳ Pending'}
                  </span>
                </div>
              ))}
            </div>
          )}

          {paymentMode === 'installment' && (investment?.balance_remaining || 0) > 0 && (
            <Link 
              to="/dashboard/installments" 
              className="view-installments-link"
            >
              Make Payment →
            </Link>
          )}
        </div>
      )}
    </div>
  )
}

export default function Portfolio() {
  const { user } = useAuth()
  const { investments, stats, loading } = useDashboardData(user)
  const [filter, setFilter] = useState('all')

  // SAFE stats with fallbacks
  const safeStats = {
    totalInvested: stats?.totalInvested || 0,
    totalRoi: stats?.totalRoi || 0,
    activeInvestments: stats?.activeInvestments || 0,
    totalPaid: stats?.totalPaid || 0,
    totalBalance: stats?.totalBalance || 0
  }

  const filteredInvestments = (investments || []).filter(inv => {
    if (filter === 'all') return true
    return inv.status === filter
  })

  if (loading) {
    return (
      <div className="dashboard-page">
        <div className="dashboard-loading">
          <div className="spinner"></div>
          <p>Loading portfolio...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="dashboard-page">
      <div className="portfolio-header">
        <h1>My Portfolio</h1>
        <Link to="/dashboard/investment-plans" className="new-investment-btn">
          + New Investment
        </Link>
      </div>

      {/* Summary Cards */}
      <div className="portfolio-summary">
        <div className="summary-card">
          <span className="summary-label">Total Invested</span>
          <span className="summary-value">₦{safeStats.totalInvested.toLocaleString()}</span>
        </div>
        <div className="summary-card">
          <span className="summary-label">Total ROI Earned</span>
          <span className="summary-value" style={{ color: '#4CAF50' }}>
            ₦{safeStats.totalRoi.toLocaleString()}
          </span>
        </div>
        <div className="summary-card">
          <span className="summary-label">Active Plans</span>
          <span className="summary-value">{safeStats.activeInvestments}</span>
        </div>
        <div className="summary-card">
          <span className="summary-label">Total Paid</span>
          <span className="summary-value" style={{ color: '#4CAF50' }}>
            ₦{safeStats.totalPaid.toLocaleString()}
          </span>
        </div>
      </div>

      {(investments || []).length > 0 && <PortfolioChart investments={investments} />}

      {/* Filter Tabs */}
      <div className="filter-tabs">
        {['all', 'active', 'completed', 'pending_approval', 'cancelled'].map(status => (
          <button
            key={status}
            className={filter === status ? 'active' : ''}
            onClick={() => setFilter(status)}
          >
            {status === 'pending_approval' ? 'Pending' : status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {/* Investments List */}
      <div className="investments-list">
        {filteredInvestments.length > 0 ? (
          filteredInvestments.map(inv => (
            <InvestmentRow key={inv.id} investment={inv} />
          ))
        ) : (
          <div className="empty-state-large">
            <div className="empty-icon">📊</div>
            <h3>No {filter !== 'all' ? filter : ''} investments yet</h3>
            <p>Start building your real estate portfolio today</p>
            <Link to="/dashboard/investment-plans" className="invest-btn">
              Browse Investment Plans
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}