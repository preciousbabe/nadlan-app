import { useAuth } from '../../context/AuthContext'
import useDashboardData from '../../hooks/useDashboardData'
import { supabase } from '../../services/supabase'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'


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
          className={`pay-installment-btn ${isOverdue ? 'overdue-btn' : ''}`}
          onClick={handlePay}
          disabled={paying || isOverdue}
          title={isOverdue ? 'Contact support for overdue payments' : ''}
        >
          {paying ? 'Opening Payment...' : isOverdue ? 'Contact Support' : `Pay Installment`}
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
  const navigate = useNavigate()

   useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(''), 5000)
      return () => clearTimeout(timer)
    }
  }, [message])

   async function handlePayInstallment(installment) {
    const investment = investments.find(inv => inv.id === installment.investment_id)
    const method = window.confirm('Pay with Flutterwave (Card)? Click Cancel for Bank Transfer.') 
         ? 'flutterwave' : 'bank_transfer'
    
    try {
      // 1. Create a pending transaction for this installment payment
      const { data: tx, error: txError } = await supabase
        .from('transactions')
        .insert({
          user_id: user.id,
          type: 'installment_payment',
          amount: installment.amount,
          status: 'pending',
          reference: `INST-${installment.id}-${Date.now()}`,
         payment_method: method, 
          metadata: {
            installment_id: installment.id,
            investment_id: investment.id,
            tier: investment?.investment_plan?.title || 'Investment'
          }
        })
        .select()
        .single()

      if (txError) throw txError

            // After creating transaction:
      await supabase
        .from('installments')
        .update({ transaction_id: tx.id })
        .eq('id', installment.id)

      // 2. Redirect to payment page or open payment modal
      setMessage('Installment payment submitted. Awaiting admin approval.')
      
      // 3. Refresh data after a moment
           setTimeout(() => {
        if (typeof refresh === 'function') refresh()
        else window.location.reload()
       }, 2000)
      
    } catch (err) {
      console.error('Installment payment error:', err)
      setMessage('Payment failed: ' + (err.message || 'Unknown error'))
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
