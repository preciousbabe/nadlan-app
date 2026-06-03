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
  const [filter, setFilter] = useState('all')
  const [selectedProof, setSelectedProof] = useState(null)
  const [stats, setStats] = useState({
    totalPending: 0,
    totalAmount: 0,
    bankTransferCount: 0,
    flutterwaveCount: 0,
    installmentCount: 0
  })
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!isAdmin) {
      navigate('/dashboard')
    }
  }, [isAdmin, navigate])

  useEffect(() => {
    fetchPendingPayments()

    const subscription = supabase
      .channel('pending-payments')
      .on('postgres_changes',
        { event: '*', schema: 'public', table: 'transactions' },
        () => fetchPendingPayments()
      )
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  async function fetchPendingPayments() {
    setLoading(true)
    setError(null)

    try {  

const { data, error } = await supabase
  .from('transactions')
  .select(`
    *,
    profiles:user_id (full_name, phone),
    payment_proofs (
      id,
      file_url,
      file_path,
      status
    )
  `)
  .eq('status', 'pending')
  .order('created_at', { ascending: false })
      if (error) throw error

      setPendingPayments(data || [])

      const bankTransfers = data?.filter(t => t.payment_method === 'bank_transfer') || []
      const flutterwave = data?.filter(t => t.payment_method === 'flutterwave') || []
      const installments = data?.filter(t => t.type === 'installment_payment') || []

      setStats({
        totalPending: data?.length || 0,
        totalAmount: data?.reduce((sum, t) => sum + (t.amount || 0), 0) || 0,
        bankTransferCount: bankTransfers.length,
        flutterwaveCount: flutterwave.length,
        installmentCount: installments.length
      })
    } catch (err) {
      console.error('Fetch error:', err)
      setError(err.message || 'Failed to load payments')
    } finally {
      setLoading(false)
    }
  }

  async function approvePayment(transaction) {
    setProcessingId(transaction.id)

    try {
      const { data: investment, error: invFetchError } = await supabase
        .from('user_investments')
        .select('*, investment_plan:investment_plan_id (title)')
        .eq('id', transaction.metadata?.investment_id)
        .single()

      if (invFetchError) throw invFetchError

      // 1. Update transaction to completed
      const { error: txError } = await supabase
        .from('transactions')
        .update({
          status: 'completed',
          verified_at: new Date().toISOString(),
          verified_by: user.id
        })
        .eq('id', transaction.id)

      if (txError) throw txError

      // 2. Calculate new totals
      const newTotalPaid = (investment.total_paid || 0) + transaction.amount
      const newBalance = investment.amount - newTotalPaid
      const isFullyPaid = newBalance <= 0

      // 3. Update investment
      const { error: invUpdateError } = await supabase
        .from('user_investments')
        .update({
          status: isFullyPaid ? 'active' : 'active', // stays active once approved
          total_paid: newTotalPaid,
          balance_remaining: Math.max(0, newBalance),
          progress: Math.min(100, Math.round((newTotalPaid / investment.amount) * 100))
        })
        .eq('id', investment.id)

      if (invUpdateError) throw invUpdateError

      // 4. Create installment record for this payment
      const { data: existingInstallments } = await supabase
        .from('installments')
        .select('installment_number')
        .eq('investment_id', investment.id)
        .order('installment_number', { ascending: false })
        .limit(1)

      const nextNumber = (existingInstallments?.[0]?.installment_number || 0) + 1

      const { error: instError } = await supabase
        .from('installments')
        .insert({
          investment_id: investment.id,
          user_id: transaction.user_id,
          amount: transaction.amount,
          paid: true,
          paid_at: new Date().toISOString(),
          transaction_id: transaction.id,
          installment_number: nextNumber
        })

      if (instError) throw instError

      // 5. Update payment_proofs if exists
      if (transaction.payment_proofs?.length > 0) {
        await supabase
          .from('payment_proofs')
          .update({
            status: 'approved',
            reviewed_at: new Date().toISOString(),
            reviewed_by: user.id
          })
          .eq('transaction_id', transaction.id)
      }

      // 6. Notify user
      await supabase.from('notifications').insert({
        user_id: transaction.user_id,
        title: 'Payment Approved ✅',
        message: `Your payment of ₦${transaction.amount.toLocaleString()} for ${investment?.investment_plan?.title || 'investment'} has been approved. ${isFullyPaid ? 'Your investment is now fully paid!' : `Balance remaining: ₦${Math.max(0, newBalance).toLocaleString()}`}`,
        type: 'payment_verified',
        read: false
      })

      await fetchPendingPayments()
    } catch (err) {
      console.error('Approval error:', err)
      alert('Failed to approve payment: ' + err.message)
    } finally {
      setProcessingId(null)
    }
  }

  async function rejectPayment(transaction, reason) {
    if (!reason?.trim()) {
      alert('Please provide a rejection reason')
      return
    }

    setProcessingId(transaction.id)

    try {
      // 1. Update transaction to rejected
      const { error: txError } = await supabase
        .from('transactions')
        .update({
          status: 'rejected',
          rejection_reason: reason,
          rejected_at: new Date().toISOString(),
          rejected_by: user.id
        })
        .eq('id', transaction.id)

      if (txError) throw txError

      // 2. If this is the FIRST payment (initial investment), cancel the investment
      const isInitialPayment = transaction.type === 'investment'

      if (isInitialPayment) {
        await supabase
          .from('user_investments')
          .update({ status: 'cancelled' })
          .eq('id', transaction.metadata?.investment_id)
      }

      // 3. Update payment_proofs if exists
      if (transaction.payment_proofs?.length > 0) {
        await supabase
          .from('payment_proofs')
          .update({
            status: 'rejected',
            reviewed_at: new Date().toISOString(),
            reviewed_by: user.id,
            rejection_reason: reason
          })
          .eq('transaction_id', transaction.id)
      }

      // 4. Notify user
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
    if (filter === 'bank_transfer') return p.payment_method === 'bank_transfer'
    if (filter === 'flutterwave') return p.payment_method === 'flutterwave'
    if (filter === 'installment_payment') return p.type === 'installment_payment'
    if (filter === 'investment') return p.type === 'investment'
    return true
  })

  if (!isAdmin) return null

  return (
    <div className="dashboard-page admin-payments">
      <div className="admin-header">
        <h1>🔐 Payment Verification</h1>
        <p className="admin-subtitle">Review and approve all pending payments</p>
      </div>

      {error && (
        <div className="error-state" style={{ color: '#FF4D4D', padding: '20px', textAlign: 'center', background: 'rgba(255,77,77,0.1)', borderRadius: '10px', margin: '0 20px 20px' }}>
          ⚠️ {error}
        </div>
      )}

      {/* Stats */}
      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-number">{stats.totalPending}</span>
          <span className="stat-label">Pending</span>
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
          <span className="stat-label">Flutterwave</span>
        </div>
      </div>

      {/* Filters */}
      <div className="filter-tabs">
        <button className={filter === 'all' ? 'active' : ''} onClick={() => setFilter('all')}>
          All
        </button>
        <button className={filter === 'investment' ? 'active' : ''} onClick={() => setFilter('investment')}>
          🏗️ New Investments
        </button>
        <button className={filter === 'installment_payment' ? 'active' : ''} onClick={() => setFilter('installment_payment')}>
          💳 Installments
        </button>
        <button className={filter === 'bank_transfer' ? 'active' : ''} onClick={() => setFilter('bank_transfer')}>
          🏦 Bank Transfer
        </button>
        <button className={filter === 'flutterwave' ? 'active' : ''} onClick={() => setFilter('flutterwave')}>
          💳 Flutterwave
        </button>
      </div>

      {/* Table */}
      {loading ? (
        <div className="loading-state">Loading...</div>
      ) : filteredPayments.length === 0 ? (
        <div className="empty-state">
          <span className="empty-icon">✅</span>
          <h3>No pending payments</h3>
        </div>
      ) : (
        <div className="payments-table-container">
          <table className="payments-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Investor</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Method</th>
                <th>Proof</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.map(tx => {
                const profile = tx.profiles
                const proof = tx.payment_proofs?.[0]
                const isInstallment = tx.type === 'installment_payment'

                return (
                  <tr key={tx.id} className={`payment-row ${tx.payment_method} ${isInstallment ? 'installment' : ''}`}>
                    <td className="date-cell">
                      {new Date(tx.created_at).toLocaleDateString('en-NG')}
                      <span className="time">
                        {new Date(tx.created_at).toLocaleTimeString('en-NG', { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </td>
                    <td className="investor-cell">
                      <strong>{profile?.full_name || 'Unknown'}</strong>
                      <span>{profile?.email}</span>
                      <span>{profile?.phone}</span>
                    </td>
                    <td className="plan-cell">
                      <span className={`type-badge ${tx.type}`}>
                        {isInstallment ? '💳 Installment' : '🏗️ New Investment'}
                      </span>
                      <span className="payment-type">{tx.payment_method}</span>
                    </td>
                    <td className="amount-cell">
                      ₦{tx.amount.toLocaleString()}
                    </td>
                    <td className="method-cell">
                      <span className={`method-badge ${tx.payment_method}`}>
                        {tx.payment_method === 'bank_transfer' ? '🏦 Bank' : '💳 Card'}
                      </span>
                    </td>
                    <td className="proof-cell">
                      {proof?.file_url ? (
                        <button
                          className="proof-link"
                          onClick={() => setSelectedProof(proof)}
                        >
                          👁 View Proof
                        </button>
                      ) : tx.payment_method === 'flutterwave' ? (
                        <span className="no-proof">Flutterwave</span>
                      ) : (
                        <span className="no-proof">No proof</span>
                      )}
                    </td>
                    <td className="actions-cell">
                      <button
                        className="verify-btn"
                        onClick={() => approvePayment(tx)}
                        disabled={processingId === tx.id}
                      >
                        {processingId === tx.id ? '...' : '✓ Approve'}
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

      {/* Proof Modal */}
      {selectedProof && (
        <div className="modal-overlay" onClick={() => setSelectedProof(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Payment Proof</h2>
              <button className="modal-close" onClick={() => setSelectedProof(null)}>×</button>
            </div>
            <div className="modal-body" style={{ textAlign: 'center' }}>
              {selectedProof.file_url?.includes('.pdf') ? (
                <iframe src={selectedProof.file_url} width="100%" height="500px" />
              ) : (
                <img src={selectedProof.file_url} alt="Proof" style={{ maxWidth: '100%', borderRadius: '10px' }} />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}