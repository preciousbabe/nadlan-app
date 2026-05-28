import { useAuth } from '../../context/AuthContext'
import useDashboardData from '../../hooks/useDashboardData'
import { supabase } from '../../services/supabase'
import { useState } from 'react'

function InstallmentCard({ installment, investment, onPay }) {
  const [paying, setPaying] = useState(false)
  const isOverdue = new Date(installment.due_date) < new Date() && !installment.paid

  async function handlePay() {
    setPaying(true)
    await onPay(installment)
    setPaying(false)
  }

  return (
    <div className={`installment-card ${installment.paid ? 'paid' : ''} ${isOverdue ? 'overdue' : ''}`}>
      <div className="installment-header">
        <div className="installment-plan-info">
          <h4>{investment?.investment_plan?.title || 'Investment'}</h4>
          <span className="installment-amount">₦{installment.amount?.toLocaleString()}</span>
        </div>
        <div className={`installment-status ${installment.paid ? 'paid' : isOverdue ? 'overdue' : 'pending'}`}>
          {installment.paid ? '✓ Paid' : isOverdue ? '⚠ Overdue' : '⏳ Pending'}
        </div>
      </div>

      <div className="installment-details">
        <div className="detail-row">
          <span>Due Date</span>
          <span>{new Date(installment.due_date).toLocaleDateString('en-NG', { 
            weekday: 'short', 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
          })}</span>
        </div>
        <div className="detail-row">
          <span>Investment Amount</span>
          <span>₦{investment?.amount?.toLocaleString()}</span>
        </div>
        <div className="detail-row">
          <span>Payment Type</span>
          <span className="capitalize">{investment?.payment_type}</span>
        </div>
      </div>

      {!installment.paid && (
        <button 
          className="pay-installment-btn"
          onClick={handlePay}
          disabled={paying}
        >
          {paying ? 'Processing...' : `Pay ₦${installment.amount?.toLocaleString()}`}
        </button>
      )}
    </div>
  )
}

export default function Installments() {
  const { user } = useAuth()
  const { installments, investments, loading, refresh } = useDashboardData(user)
  const [filter, setFilter] = useState('all')
  const [message, setMessage] = useState('')

  async function handlePayInstallment(installment) {
    try {
      // Update installment as paid
      const { error } = await supabase
        .from('installments')
        .update({ paid: true })
        .eq('id', installment.id)

      if (error) throw error

      // Create transaction record
      await supabase.from('transactions').insert({
        user_id: user.id,
        type: 'installment_payment',
        amount: installment.amount,
        status: 'completed',
        reference: `INST-${installment.id.slice(0, 8)}`
      })

      // Update investment progress
      const investment = investments.find(inv => inv.id === installment.investment_id)
      if (investment) {
        const totalInstallments = installments.filter(i => i.investment_id === investment.id).length
        const paidInstallments = installments.filter(i => i.investment_id === investment.id && (i.id === installment.id || i.paid)).length
        const newProgress = Math.round((paidInstallments / totalInstallments) * 100)

        await supabase
          .from('user_investments')
          .update({ progress: newProgress })
          .eq('id', investment.id)
      }

      setMessage('Payment successful!')
      setTimeout(() => setMessage(''), 3000)
      refresh()
    } catch (err) {
      console.error('Payment error:', err)
      setMessage('Payment failed. Please try again.')
      setTimeout(() => setMessage(''), 3000)
    }
  }

  const filteredInstallments = installments.filter(inst => {
    if (filter === 'all') return true
    if (filter === 'paid') return inst.paid
    if (filter === 'pending') return !inst.paid
    return true
  })

  const upcomingTotal = installments
    .filter(i => !i.paid)
    .reduce((sum, i) => sum + i.amount, 0)

  const paidTotal = installments
    .filter(i => i.paid)
    .reduce((sum, i) => sum + i.amount, 0)

  if (loading) {
    return (
      <div className="dashboard-page">
        <div className="dashboard-loading">
          <div className="spinner"></div>
          <p>Loading installments...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="dashboard-page">
      <div className="installments-header">
        <h1>Payment Schedule</h1>
        {message && <div className={`message-toast ${message.includes('successful') ? 'success' : 'error'}`}>{message}</div>}
      </div>

      {/* Summary */}
      <div className="installments-summary">
        <div className="summary-card">
          <span className="summary-label">Total Installments</span>
          <span className="summary-value">{installments.length}</span>
        </div>
        <div className="summary-card">
          <span className="summary-label">Paid</span>
          <span className="summary-value" style={{ color: '#4CAF50' }}>
            ₦{paidTotal.toLocaleString()}
          </span>
        </div>
        <div className="summary-card">
          <span className="summary-label">Upcoming</span>
          <span className="summary-value" style={{ color: '#FF9800' }}>
            ₦{upcomingTotal.toLocaleString()}
          </span>
        </div>
        <div className="summary-card">
          <span className="summary-label">Pending</span>
          <span className="summary-value">
            {installments.filter(i => !i.paid).length}
          </span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="filter-tabs">
        {['all', 'pending', 'paid'].map(status => (
          <button
            key={status}
            className={filter === status ? 'active' : ''}
            onClick={() => setFilter(status)}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {/* Installments Grid */}
      <div className="installments-grid">
        {filteredInstallments.length > 0 ? (
          filteredInstallments.map(inst => {
            const investment = investments.find(inv => inv.id === inst.investment_id)
            return (
              <InstallmentCard
                key={inst.id}
                installment={inst}
                investment={investment}
                onPay={handlePayInstallment}
              />
            )
          })
        ) : (
          <div className="empty-state-large">
            <div className="empty-icon">💳</div>
            <h3>No installments found</h3>
            <p>Your payment schedule will appear here when you make an installment-based investment</p>
          </div>
        )}
      </div>
    </div>
  )
}
