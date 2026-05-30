import { useState, useEffect } from 'react'
import { supabase } from '../../services/supabase'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function AdminProofs() {
  const { user, isAdmin } = useAuth()
  const navigate = useNavigate()

  const [proofs, setProofs] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedProof, setSelectedProof] = useState(null)
  const [processingId, setProcessingId] = useState(null)
  const [filter, setFilter] = useState('all') 
  const [error, setError] = useState(null)

  // redirect non-admin
  useEffect(() => {
    if (!isAdmin) navigate('/dashboard')
  }, [isAdmin, navigate])

  useEffect(() => {
    fetchProofs()

    const channel = supabase
      .channel('admin-proofs')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'transactions' },
        () => fetchProofs()
      )
      .subscribe()

    return () => supabase.removeChannel(channel)
  }, [])

  async function fetchProofs() {
    setLoading(true)

    try {
           const { data, error } = await supabase
        .from('transactions')
        .select(`
          *,
          profiles:user_id (full_name, phone),
          user_investments!inner (
            id,
            amount,
            payment_type,
            status,
            investment_plan:investment_plan_id (title)
          ),
          payment_proofs!left (
          id,
          file_url,
          status,
          transaction_id
        )
        `)
        .eq('payment_method', 'bank_transfer')
        .order('created_at', { ascending: false })

      if (error) throw error
      console.log('PROOFS DATA:', data)
      setProofs(data || [])
       } catch (err) {
      console.error('Proof fetch error:', err)
      setError(err.message || 'Failed to load proofs')
    } finally {
      setLoading(false)
    }
  }

  function openProof(proof) {
    setSelectedProof(proof)
  }

  async function approveProof(tx) {
    setProcessingId(tx.id)

    try {
      const investment = tx.user_investments?.[0] || tx.user_investments

      // 1. mark transaction completed
      await supabase
        .from('transactions')
        .update({
          status: 'completed',
          verified_at: new Date().toISOString(),
          verified_by: user.id
        })
        .eq('id', tx.id)

      // 2. activate investment
      await supabase
        .from('user_investments')
        .update({ status: 'active' })
        .eq('id', investment.id)


              // 2b. mark first installment paid if installment plan
      if (investment?.payment_type === 'installment') {
        await supabase
          .from('installments')
          .update({ paid: true, paid_at: new Date().toISOString() })
          .eq('investment_id', investment.id)
          .order('due_date', { ascending: true })
          .limit(1)
      }

            // 2c. update payment_proofs status
      await supabase
        .from('payment_proofs')
        .update({ status: 'approved', reviewed_at: new Date().toISOString(), reviewed_by: user.id })
        .eq('transaction_id', tx.id)


      // 3. notify user
      await supabase.from('notifications').insert({
        user_id: tx.user_id,
        title: 'Proof Approved ✅',
        message: `Your bank transfer of ₦${tx.amount.toLocaleString()} has been approved.`,
        type: 'proof_approved',
        read: false
      })

      await fetchProofs()
    } catch (err) {
      console.error(err)
      alert('Approval failed')
    } finally {
      setProcessingId(null)
    }
  }

  async function rejectProof(tx) {
    const reason = prompt('Enter rejection reason:')
    if (!reason) return

    setProcessingId(tx.id)

    try {
      const investment = tx.user_investments?.[0] || tx.user_investments

      await supabase
        .from('transactions')
        .update({
          status: 'rejected',
          rejection_reason: reason,
          rejected_at: new Date().toISOString(),
          rejected_by: user.id
        })
        .eq('id', tx.id)

              // update payment_proofs status
      await supabase
        .from('payment_proofs')
        .update({ status: 'rejected', reviewed_at: new Date().toISOString(), reviewed_by: user.id, rejection_reason: reason })
        .eq('transaction_id', tx.id)

      await supabase
        .from('user_investments')
        .update({ status: 'cancelled' })
        .eq('id', investment.id)

      await supabase.from('notifications').insert({
        user_id: tx.user_id,
        title: 'Proof Rejected ❌',
        message: reason,
        type: 'proof_rejected',
        read: false
      })

      await fetchProofs()
    } catch (err) {
      console.error(err)
      alert('Rejection failed')
    } finally {
      setProcessingId(null)
    }
  }

    const filtered = proofs.filter(p => {
    if (filter === 'all') return true
    return p.status === 'pending'
     })

  if (!isAdmin) return null

  return (
    <div className="dashboard-page admin-payments">
      <div className="admin-header">
        <h1>📄 Payment Proof Verification</h1>
        <p className="admin-subtitle">
          Review and approve uploaded bank transfer proofs
        </p>
      </div>

            {error && (
        <div className="error-state" style={{ color: '#FF4D4D', padding: '20px', textAlign: 'center', background: 'rgba(255,77,77,0.1)', borderRadius: '10px', margin: '0 20px 20px' }}>
          ⚠️ {error}
        </div>
      )}

      {/* FILTERS */}
           <div className="filter-tabs">
        <button className={filter === 'all' ? 'active' : ''} onClick={() => setFilter('all')}>
          All Proofs
        </button>
        <button className={filter === 'pending' ? 'active' : ''} onClick={() => setFilter('pending')}>
          Pending
        </button>
      </div>

      {/* LIST */}
      {loading ? (
        <div className="loading-state">Loading proofs...</div>
      ) : filtered.length === 0 ? (
        <div className="empty-state">
          <span className="empty-icon">📄</span>
          <h3>No proofs found</h3>
        </div>
      ) : (
        <div className="payments-table-container">
          <table className="payments-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>User</th>
                <th>Plan</th>
                <th>Amount</th>
                <th>Proof</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map(tx => {
                const investment = Array.isArray(tx.user_investments) 
                 ? tx.user_investments[0] 
                 : tx.user_investments
                const profile = tx.profiles
                const proof = tx.metadata?.proof_url

                return (
                  <tr key={tx.id} className="payment-row bank_transfer">

                    <td>
                      {new Date(tx.created_at).toLocaleDateString('en-NG')}
                    </td>

                    <td>
                      <strong>{profile?.full_name}</strong>
                      <div>{profile?.email}</div>
                    </td>

                    <td>
                      {investment?.investment_plan?.title || 'N/A'}
                      <div className="payment-type">
                        {investment?.payment_type}
                      </div>
                    </td>

                    <td>₦{tx.amount?.toLocaleString()}</td>

                                       <td>
                      {tx.payment_proofs?.[0]?.file_url || tx.metadata?.proof_url ? (
                        <button
                          className="verify-btn"
                          onClick={() => openProof(tx.payment_proofs?.[0])}
                        >
                          👁 View Proof
                        </button>
                      ) : (
                        <span className="no-proof">No proof</span>
                      )}
                    </td>

                    <td>
                      <span className={`method-badge ${tx.status}`}>
                        {tx.status}
                      </span>
                    </td>

                    <td className="actions-cell">
                      <button
                        className="verify-btn"
                        onClick={() => approveProof(tx)}
                        disabled={processingId === tx.id}
                      >
                        ✓ Approve
                      </button>

                      <button
                        className="reject-btn"
                        onClick={() => rejectProof(tx)}
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

      {/* PROOF MODAL */}
      {selectedProof && (
        <div className="modal-overlay" onClick={() => setSelectedProof(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>

            <div className="modal-header">
              <h2>Payment Proof</h2>
              <button className="modal-close" onClick={() => setSelectedProof(null)}>×</button>
            </div>

                  <div className="modal-body" style={{ textAlign: 'center' }}>
  {selectedProof?.file_url?.includes('.pdf') ? (
    <iframe
      src={selectedProof.file_url}
      width="100%"
      height="500px"
    />
  ) : (
    <img
      src={selectedProof.file_url}
      alt="Proof"
      style={{ maxWidth: '100%', borderRadius: '10px' }}
    />
  )}
</div>

          </div>
        </div>
      )}

    </div>
  )
}