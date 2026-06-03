import { useAuth } from '../../context/AuthContext'
import useDashboardData from '../../hooks/useDashboardData'
import { useState, useEffect } from 'react'
import { supabase } from '../../services/supabase'

function ROICard({ investment, roiRecords }) {
  const plan = investment?.investment_plan
  const amount = investment?.amount || 0
  const totalPaid = investment?.total_paid || 0
  const roiPercent = plan?.roi_percent || 0
  const durationMonths = plan?.duration_months || 12
  
  // Only calculate ROI on fully paid investments
  const isFullyPaid = (investment?.balance_remaining || 0) <= 0
  
  // Actual ROI earned from records
  const totalEarned = roiRecords?.reduce((sum, r) => r.status === 'paid' ? sum + (r.roi_amount || 0) : sum, 0) || 0
  const totalAccrued = roiRecords?.reduce((sum, r) => sum + (r.roi_amount || 0), 0) || 0
  
  // Projected total ROI (only meaningful if fully paid)
  const totalProjectedRoi = isFullyPaid ? Math.round(amount * (roiPercent / 100)) : 0
  
  // Monthly ROI rate (if fully paid)
  const monthlyRoi = isFullyPaid ? Math.round(totalProjectedRoi / durationMonths) : 0

  return (
    <div className={`roi-detail-card ${!isFullyPaid ? 'not-fully-paid' : ''}`}>
      <div className="roi-card-header">
        <h3>{plan?.title || 'Investment'}</h3>
        <div className="roi-badges">
          <span className="roi-badge">{roiPercent}% ROI</span>
          {!isFullyPaid && <span className="payment-badge">Payment Pending</span>}
        </div>
      </div>

      {!isFullyPaid && (
        <div className="payment-notice">
          <p>⚠️ ROI accrual begins after full payment. Balance remaining: ₦{(investment?.balance_remaining || 0).toLocaleString()}</p>
        </div>
      )}

      <div className="roi-metrics-grid">
        <div className="roi-metric">
          <span className="metric-label">Total Invested</span>
          <span className="metric-value">₦{amount.toLocaleString()}</span>
        </div>
        <div className="roi-metric">
          <span className="metric-label">Total Paid</span>
          <span className="metric-value">₦{totalPaid.toLocaleString()}</span>
        </div>
        <div className="roi-metric">
          <span className="metric-label">ROI Earned</span>
          <span className="metric-value earned">₦{totalEarned.toLocaleString()}</span>
        </div>
        <div className="roi-metric">
          <span className="metric-label">Accrued (Pending)</span>
          <span className="metric-value pending">₦{(totalAccrued - totalEarned).toLocaleString()}</span>
        </div>
        <div className="roi-metric">
          <span className="metric-label">Projected Total</span>
          <span className="metric-value">
            ₦{isFullyPaid ? totalProjectedRoi.toLocaleString() : 'Pending full payment'}
          </span>
        </div>
        <div className="roi-metric">
          <span className="metric-label">Monthly ROI</span>
          <span className="metric-value">
            {isFullyPaid ? `₦${monthlyRoi.toLocaleString()}/month` : 'N/A'}
          </span>
        </div>
      </div>

      {/* ROI Period History */}
      {roiRecords && roiRecords.length > 0 && (
        <div className="roi-history">
          <h4>ROI Period History</h4>
          <div className="roi-periods">
            {roiRecords.map(record => (
              <div key={record.id} className={`roi-period ${record.status}`}>
                <span className="period-date">
                  {new Date(record.period_start).toLocaleDateString('en-NG', { month: 'short', year: 'numeric' })}
                </span>
                <span className="period-amount">₦{(record.roi_amount || 0).toLocaleString()}</span>
                <span className={`period-status ${record.status}`}>
                  {record.status === 'paid' ? '✓ Paid' : record.status === 'pending' ? '⏳ Pending' : '⏳ Accrued'}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function EarningsSummary({ investments, roiRecords }) {
  // Only count fully paid investments for ROI
  const fullyPaidInvestments = investments?.filter(inv => (inv?.balance_remaining || 0) <= 0) || []
  
  const totalPrincipal = fullyPaidInvestments.reduce((sum, inv) => sum + (inv.amount || 0), 0)
  const totalEarned = roiRecords?.filter(r => r.status === 'paid').reduce((sum, r) => sum + (r.roi_amount || 0), 0) || 0
  const totalAccrued = roiRecords?.reduce((sum, r) => sum + (r.roi_amount || 0), 0) || 0
  
  const avgRoiRate = fullyPaidInvestments.length > 0 
    ? (fullyPaidInvestments.reduce((sum, inv) => sum + (inv.investment_plan?.roi_percent || 0), 0) / fullyPaidInvestments.length).toFixed(1)
    : 0

  return (
    <div className="earnings-summary">
      <div className="earnings-card">
        <div className="earnings-icon">💰</div>
        <div className="earnings-info">
          <span className="earnings-label">Fully Paid Investments</span>
          <span className="earnings-value">{fullyPaidInvestments.length}</span>
        </div>
      </div>
      <div className="earnings-card">
        <div className="earnings-icon">📈</div>
        <div className="earnings-info">
          <span className="earnings-label">ROI Paid Out</span>
          <span className="earnings-value earned">₦{totalEarned.toLocaleString()}</span>
        </div>
      </div>
      <div className="earnings-card">
        <div className="earnings-icon">⏳</div>
        <div className="earnings-info">
          <span className="earnings-label">Accrued (Pending)</span>
          <span className="earnings-value pending">₦{(totalAccrued - totalEarned).toLocaleString()}</span>
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
  const { investments, loading, stats } = useDashboardData(user)
  const [roiRecords, setRoiRecords] = useState([])
  const [view, setView] = useState('summary')

  useEffect(() => {
    if (!user || !investments?.length) return
    
    async function fetchROIRecords() {
      const investmentIds = investments.map(i => i.id)
      if (investmentIds.length === 0) return
      
      const { data, error } = await supabase
        .from('roi_records')
        .select('*')
        .in('investment_id', investmentIds)
        .order('period_start', { ascending: false })
      
      if (error) {
        console.error('ROI records fetch error:', error)
        return
      }
      
      setRoiRecords(data || [])
    }
    
    fetchROIRecords()
  }, [user, investments])

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

  const fullyPaidInvestments = investments?.filter(inv => (inv?.balance_remaining || 0) <= 0) || []
  const pendingPaymentInvestments = investments?.filter(inv => (inv?.balance_remaining || 0) > 0) || []

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

      <EarningsSummary investments={investments} roiRecords={roiRecords} />

      {view === 'summary' ? (
  <div className="roi-summary-view">
    {/* Pending Payment Notice */}
    {pendingPaymentInvestments.length > 0 && (
      <div className="kyc-status-banner pending" style={{ marginBottom: '30px' }}>
        <div className="kyc-status-icon">⏳</div>
        <div className="kyc-status-info">
          <h3>Pending Full Payment</h3>
          <p>ROI accrual begins after these investments are fully paid:</p>
          <div className="kyc-steps-list" style={{ marginTop: '16px', marginBottom: '0' }}>
            {pendingPaymentInvestments.map(inv => (
              <div key={inv.id} className="kyc-step-card" style={{ padding: '14px 18px' }}>
                <div className="detail-row">
                  <span style={{ fontSize: '14px', fontWeight: 500 }}>
                    {inv.investment_plan?.title || 'Investment'}
                  </span>
                  <span style={{ color: '#FF9800', fontWeight: 600, fontSize: '14px' }}>
                    Balance: ₦{(inv.balance_remaining || 0).toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )}

    <h3 style={{ fontSize: '20px', fontWeight: 500, marginBottom: '20px', marginTop: '30px' }}>
      Investment Insights
    </h3>
    <div className="insights-grid">
      <div className="insight-card">
        <h4>🏆 Top Earner</h4>
        {roiRecords.filter(r => r.status === 'paid').length > 0 ? (
          <>
            <p>{fullyPaidInvestments.reduce((max, inv) => {
              const invEarned = roiRecords.filter(r => r.investment_id === inv.id && r.status === 'paid').reduce((s, r) => s + (r.roi_amount || 0), 0)
              const maxEarned = roiRecords.filter(r => r.investment_id === max.id && r.status === 'paid').reduce((s, r) => s + (r.roi_amount || 0), 0)
              return invEarned > maxEarned ? inv : max
            }).investment_plan?.title}</p>
            <span className="insight-value">
              ₦{Math.max(...roiRecords.filter(r => r.status === 'paid').map(r => r.roi_amount || 0)).toLocaleString()} paid
            </span>
          </>
        ) : (
          <p>No ROI paid yet</p>
        )}
      </div>
      <div className="insight-card">
        <h4>📅 Next Payout</h4>
        <p>Estimated based on accrued ROI</p>
        <span className="insight-value">
          ₦{roiRecords.filter(r => r.status === 'accrued').reduce((sum, r) => sum + (r.roi_amount || 0), 0).toLocaleString()}
        </span>
      </div>
      <div className="insight-card">
        <h4>🎯 Fully Paid Rate</h4>
        <p>Investments ready for ROI</p>
        <span className="insight-value">
          {investments?.length > 0 ? Math.round((fullyPaidInvestments.length / investments.length) * 100) : 0}%
        </span>
      </div>
    </div>
  </div>
) : ( 
        <div className="roi-breakdown-view">
          <h3>Investment Breakdown</h3>
          {fullyPaidInvestments.length > 0 ? (
            fullyPaidInvestments.map(inv => (
              <ROICard 
                key={inv.id} 
                investment={inv} 
                roiRecords={roiRecords.filter(r => r.investment_id === inv.id)}
              />
            ))
          ) : (
            <div className="empty-state-large">
              <div className="empty-icon">📈</div>
              <h3>No fully paid investments</h3>
              <p>ROI breakdown will appear once investments are fully paid</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}