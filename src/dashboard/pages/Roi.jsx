import { useAuth } from '../../context/AuthContext'
import useDashboardData from '../../hooks/useDashboardData'
import { useState } from 'react'

function ROICard({ investment }) {
  const plan = investment.investment_plan
  const amount = investment.amount || 0
  const roiPercent = plan?.roi_percent || 0
  const durationMonths = plan?.duration_months || 12
  const roiEarned = investment.roi_earned || 0
  const progress = investment.progress || 0

  // Calculate projected monthly ROI
  const totalProjectedRoi = Math.round(amount * (roiPercent / 100))
  const monthlyRoi = Math.round(totalProjectedRoi / durationMonths)
  const remainingRoi = totalProjectedRoi - roiEarned

  // Calculate completion percentage
  const monthsElapsed = Math.round((progress / 100) * durationMonths)
  const monthsRemaining = durationMonths - monthsElapsed

  return (
    <div className="roi-detail-card">
      <div className="roi-card-header">
        <h3>{plan?.title || 'Investment'}</h3>
        <span className="roi-badge">{roiPercent}% ROI</span>
      </div>

      <div className="roi-metrics-grid">
        <div className="roi-metric">
          <span className="metric-label">Principal</span>
          <span className="metric-value">₦{amount.toLocaleString()}</span>
        </div>
        <div className="roi-metric">
          <span className="metric-label">ROI Earned</span>
          <span className="metric-value earned">₦{roiEarned.toLocaleString()}</span>
        </div>
        <div className="roi-metric">
          <span className="metric-label">Projected Total</span>
          <span className="metric-value">₦{totalProjectedRoi.toLocaleString()}</span>
        </div>
        <div className="roi-metric">
          <span className="metric-label">Remaining</span>
          <span className="metric-value pending">₦{remainingRoi.toLocaleString()}</span>
        </div>
      </div>

      <div className="roi-timeline">
        <div className="timeline-header">
          <span>Progress: {progress}%</span>
          <span>{monthsElapsed} of {durationMonths} months</span>
        </div>
        <div className="progress-bar-bg">
          <div 
            className="progress-bar-fill"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="timeline-footer">
          <span>~₦{monthlyRoi.toLocaleString()}/month</span>
          <span>{monthsRemaining} months remaining</span>
        </div>
      </div>
    </div>
  )
}

function EarningsSummary({ investments }) {
  const totalPrincipal = investments.reduce((sum, inv) => sum + (inv.amount || 0), 0)
  const totalEarned = investments.reduce((sum, inv) => sum + (inv.roi_earned || 0), 0)
  const totalProjected = investments.reduce((sum, inv) => {
    const roi = (inv.amount || 0) * ((inv.investment_plan?.roi_percent || 0) / 100)
    return sum + roi
  }, 0)
  const avgRoiRate = investments.length > 0 
    ? (investments.reduce((sum, inv) => sum + (inv.investment_plan?.roi_percent || 0), 0) / investments.length).toFixed(1)
    : 0

  return (
    <div className="earnings-summary">
      <div className="earnings-card">
        <div className="earnings-icon">💰</div>
        <div className="earnings-info">
          <span className="earnings-label">Total Principal</span>
          <span className="earnings-value">₦{totalPrincipal.toLocaleString()}</span>
        </div>
      </div>
      <div className="earnings-card">
        <div className="earnings-icon">📈</div>
        <div className="earnings-info">
          <span className="earnings-label">ROI Earned</span>
          <span className="earnings-value earned">₦{totalEarned.toLocaleString()}</span>
        </div>
      </div>
      <div className="earnings-card">
        <div className="earnings-icon">🎯</div>
        <div className="earnings-info">
          <span className="earnings-label">Projected Total</span>
          <span className="earnings-value">₦{totalProjected.toLocaleString()}</span>
        </div>
      </div>
      <div className="earnings-card">
        <div className="earnings-icon">📊</div>
        <div className="earnings-info">
          <span className="earnings-label">Avg ROI Rate</span>
          <span className="earnings-value">{avgRoiRate}%</span>
        </div>
      </div>
    </div>
  )
}

export default function ROI() {
  const { user } = useAuth()
  const { investments, loading } = useDashboardData(user)
  const [view, setView] = useState('summary') // summary | breakdown

  if (loading) {
    return (
      <div className="dashboard-page">
        <div className="dashboard-loading">
          <div className="spinner"></div>
          <p>Loading ROI data...</p>
        </div>
      </div>
    )
  }

  const activeInvestments = investments.filter(inv => inv.status === 'active')

  return (
    <div className="dashboard-page">
      <div className="roi-header">
        <h1>ROI Earnings</h1>
        <div className="view-toggle">
          <button 
            className={view === 'summary' ? 'active' : ''}
            onClick={() => setView('summary')}
          >
            Summary
          </button>
          <button 
            className={view === 'breakdown' ? 'active' : ''}
            onClick={() => setView('breakdown')}
          >
            Breakdown
          </button>
        </div>
      </div>

      <EarningsSummary investments={investments} />

      {view === 'summary' ? (
        <div className="roi-summary-view">
          <div className="roi-chart-section">
            <h3>Earnings Overview</h3>
            <div className="earnings-breakdown">
              <div className="breakdown-item">
                <div className="breakdown-bar">
                  <div 
                    className="breakdown-fill earned"
                    style={{ 
                      width: `${investments.length > 0 ? (investments.reduce((s, i) => s + (i.roi_earned || 0), 0) / investments.reduce((s, i) => s + ((i.amount || 0) * ((i.investment_plan?.roi_percent || 0) / 100)), 0)) * 100 : 0}%` 
                    }}
                  />
                </div>
                <div className="breakdown-labels">
                  <span>Earned</span>
                  <span>Projected</span>
                </div>
              </div>
            </div>
          </div>

          <div className="roi-insights">
            <h3>Investment Insights</h3>
            <div className="insights-grid">
              <div className="insight-card">
                <h4>🏆 Top Performer</h4>
                {activeInvestments.length > 0 ? (
                  <>
                    <p>{activeInvestments.reduce((max, inv) => 
                      (inv.roi_earned || 0) > (max.roi_earned || 0) ? inv : max
                    ).investment_plan?.title}</p>
                    <span className="insight-value">
                      ₦{Math.max(...activeInvestments.map(i => i.roi_earned || 0)).toLocaleString()} earned
                    </span>
                  </>
                ) : (
                  <p>No active investments</p>
                )}
              </div>
              <div className="insight-card">
                <h4>📅 Next Payout</h4>
                <p>Estimated monthly distribution</p>
                <span className="insight-value">
                  ₦{Math.round(activeInvestments.reduce((sum, inv) => {
                    const monthly = ((inv.amount || 0) * ((inv.investment_plan?.roi_percent || 0) / 100)) / (inv.investment_plan?.duration_months || 12)
                    return sum + monthly
                  }, 0)).toLocaleString()}/month
                </span>
              </div>
              <div className="insight-card">
                <h4>🎯 Completion Rate</h4>
                <p>Average across all investments</p>
                <span className="insight-value">
                  {investments.length > 0 
                    ? Math.round(investments.reduce((sum, inv) => sum + (inv.progress || 0), 0) / investments.length)
                    : 0}%
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="roi-breakdown-view">
          <h3>Investment Breakdown</h3>
          {activeInvestments.length > 0 ? (
            activeInvestments.map(inv => (
              <ROICard key={inv.id} investment={inv} />
            ))
          ) : (
            <div className="empty-state-large">
              <div className="empty-icon">📈</div>
              <h3>No active investments</h3>
              <p>Your ROI breakdown will appear here once you have active investments</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
