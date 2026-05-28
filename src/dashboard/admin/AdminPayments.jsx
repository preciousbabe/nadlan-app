import { useState, useEffect } from 'react'
import { supabase } from '../../services/supabase'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function AdminPayments() {
  const { user, isAdmin } = useAuth()
  const navigate = useNavigate()
  const [pendingPayments, setPendingPayments] = useState([])
  const [loading, setLoading] = useState(true)
  const [processingId, setProcessingId] = useState(null)
  const [filter, setFilter] = useState('all') // 'all' | 'bank_transfer' | 'flutterwave'
  const [stats, setStats] = useState({
    totalPending: 0,
    totalAmount: 0,
    bankTransferCount: 0,
    flutterwaveCount: 0
  })

  // Redirect non-admin users
  useEffect(() => {
    if (!isAdmin) {
      navigate('/dashboard')
    }
  }, [isAdmin, navigate])

  useEffect(() => {
    fetchPendingPayments()
    
    // Real-time subscription for new pending payments
    const subscription = supabase
      .channel('pending-payments')
      .on('postgres_changes', 
        { event: 'INSERT', schema: 'public', table: 'transactions' },
        () => fetchPendingPayments()
      )
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  async function fetchPendingPayments() {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('transactions')
        .select(`
          *,
          profiles:user_id (full_name, email, phone),
          user_investments!inner (
            id,
            amount,
            payment_type,
            status,
            investment_plan_id,
            investment_plan:investment_plan_id (title)
          )
        `)
        .eq('status', 'pending')
        .order('created_at', { ascending: false })

      if (error) throw error

      setPendingPayments(data || [])
      
      // Calculate stats
      const bankTransfers = data?.filter(t => t.payment_method === 'bank_transfer') || []
      const flutterwave = data?.filter(t => t.payment_method === 'flutterwave') || []
      setStats({
        totalPending: data?.length || 0,
        totalAmount: data?.reduce((sum, t) => sum + (t.amount || 0), 0) || 0,
        bankTransferCount: bankTransfers.length,
        flutterwaveCount: flutterwave.length
      })
    } catch (err) {
      console.error('Fetch error:', err)
    } finally {
      setLoading(false)
    }
  }

  async function verifyPayment(transaction) {
    setProcessingId(transaction.id)
    try {
      // 1. Update transaction status
      const { error: txError } = await supabase
        .from('transactions')
        .update({ 
          status: 'completed',
          verified_at: new Date().toISOString(),
          verified_by: user.id
        })
        .eq('id', transaction.id)

      if (txError) throw txError

      // 2. Activate the investment
      const { error: invError } = await supabase
        .from('user_investments')
        .update({ status: 'active' })
        .eq('id', transaction.user_investments[0]?.id || transaction.user_investments.id)

      if (invError) throw invError

      // 3. Mark first installment as paid if installment plan
      const investment = transaction.user_investments[0] || transaction.user_investments
      if (investment?.payment_type === 'installment') {
        await supabase
          .from('installments')
          .update({ paid: true, paid_at: new Date().toISOString() })
          .eq('investment_id', investment.id)
          .order('due_date', { ascending: true })
          .limit(1)
      }

      // 4. Send notification to user (you can integrate email/SMS here)
      await supabase.from('notifications').insert({
        user_id: transaction.user_id,
        title: 'Payment Verified ✅',
        message: `Your payment of ₦${transaction.amount.toLocaleString()} for ${investment?.investment_plan?.title || 'investment'} has been verified.`,
        type: 'payment_verified',
        read: false
      })

      // Refresh list
      await fetchPendingPayments()
    } catch (err) {
      console.error('Verification error:', err)
      alert('Failed to verify payment: ' + err.message)
    } finally {
      setProcessingId(null)
    }
  }

  async function rejectPayment(transaction, reason) {
    setProcessingId(transaction.id)
    try {
      // 1. Update transaction status
      await supabase
        .from('transactions')
        .update({ 
          status: 'failed',
          rejection_reason: reason,
          rejected_at: new Date().toISOString(),
          rejected_by: user.id
        })
        .eq('id', transaction.id)

      // 2. Cancel the investment
      const investment = transaction.user_investments[0] || transaction.user_investments
      await supabase
        .from('user_investments')
        .update({ status: 'cancelled' })
        .eq('id', investment.id)

      // 3. Notify user
      await supabase.from('notifications').insert({
        user_id: transaction.user_id,
        title: 'Payment Rejected ❌',
        message: `Your payment of ₦${transaction.amount.toLocaleString()} was rejected. Reason: ${reason}`,
        type: 'payment_rejected',
        read: false
      })

      await fetchPendingPayments()
    } catch (err) {
      console.error('Rejection error:', err)
      alert('Failed to reject payment: ' + err.message)
    } finally {
      setProcessingId(null)
    }
  }

  const filteredPayments = pendingPayments.filter(p => {
    if (filter === 'all') return true
    return p.payment_method === filter
  })

  if (!isAdmin) return null

  return (
    <div className="dashboard-page admin-payments">
      <div className="admin-header">
        <h1>🔐 Payment Verification</h1>
        <p className="admin-subtitle">Review and verify pending investment payments</p>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-number">{stats.totalPending}</span>
          <span className="stat-label">Pending Payments</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">₦{stats.totalAmount.toLocaleString()}</span>
          <span className="stat-label">Total Amount</span>
        </div>
        <div className="stat-card bank">
          <span className="stat-number">{stats.bankTransferCount}</span>
          <span className="stat-label">Bank Transfers</span>
        </div>
        <div className="stat-card flutterwave">
          <span className="stat-number">{stats.flutterwaveCount}</span>
          <span className="stat-label">Flutterwave Issues</span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="filter-tabs">
        <button 
          className={filter === 'all' ? 'active' : ''} 
          onClick={() => setFilter('all')}
        >
          All Pending
        </button>
        <button 
          className={filter === 'bank_transfer' ? 'active' : ''} 
          onClick={() => setFilter('bank_transfer')}
        >
          🏦 Bank Transfers
        </button>
        <button 
          className={filter === 'flutterwave' ? 'active' : ''} 
          onClick={() => setFilter('flutterwave')}
        >
          💳 Flutterwave
        </button>
      </div>

      {/* Payments Table */}
      {loading ? (
        <div className="loading-state">Loading pending payments...</div>
      ) : filteredPayments.length === 0 ? (
        <div className="empty-state">
          <span className="empty-icon">✅</span>
          <h3>No pending payments</h3>
          <p>All payments have been verified.</p>
        </div>
      ) : (
        <div className="payments-table-container">
          <table className="payments-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Investor</th>
                <th>Plan</th>
                <th>Amount</th>
                <th>Method</th>
                <th>Proof</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.map(tx => {
                const investment = tx.user_investments?.[0] || tx.user_investments
                const profile = tx.profiles
                const proofUrl = tx.metadata?.proof_url
                
                return (
                  <tr key={tx.id} className={`payment-row ${tx.payment_method}`}>
                    <td className="date-cell">
                      {new Date(tx.created_at).toLocaleDateString('en-NG')}
                      <span className="time">{new Date(tx.created_at).toLocaleTimeString('en-NG', { hour: '2-digit', minute: '2-digit' })}</span>
                    </td>
                    <td className="investor-cell">
                      <strong>{profile?.full_name || 'Unknown'}</strong>
                      <span>{profile?.email}</span>
                      <span>{profile?.phone}</span>
                    </td>
                    <td className="plan-cell">
                      {investment?.investment_plan?.title || 'N/A'}
                      <span className="payment-type">{investment?.payment_type}</span>
                    </td>
                    <td className="amount-cell">
                      ₦{tx.amount.toLocaleString()}
                    </td>
                    <td className="method-cell">
                      <span className={`method-badge ${tx.payment_method}`}>
                        {tx.payment_method === 'bank_transfer' ? '🏦 Bank' : '💳 Flutterwave'}
                      </span>
                    </td>
                    <td className="proof-cell">
                      {proofUrl ? (
                        <a 
                          href={proofUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="proof-link"
                        >
                          📄 View Proof
                        </a>
                      ) : (
                        <span className="no-proof">No proof</span>
                      )}
                    </td>
                    <td className="actions-cell">
                      <button
                        className="verify-btn"
                        onClick={() => verifyPayment(tx)}
                        disabled={processingId === tx.id}
                      >
                        {processingId === tx.id ? '...' : '✓ Verify'}
                      </button>
                      <button
                        className="reject-btn"
                        onClick={() => {
                          const reason = prompt('Enter rejection reason:')
                          if (reason) rejectPayment(tx, reason)
                        }}
                        disabled={processingId === tx.id}
                      >
                        ✕
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}