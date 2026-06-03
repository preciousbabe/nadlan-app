import { useAuth } from '../../context/AuthContext'
import useDashboardData from '../../hooks/useDashboardData'
import { supabase } from '../../services/supabase'
import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'

function InstallmentHistory({ installments }) {
  if (!installments || installments.length === 0) return null

  return (
    <div className="installment-history">
      <h4>Payment History</h4>
      {installments.map(inst => (
        <div key={inst.id} className={`installment-row ${inst.paid ? 'paid' : 'pending'}`}>
          <div className="installment-info">
            <span className="installment-number">#{inst.installment_number}</span>
            <span className="installment-amount">₦{(inst.amount || 0).toLocaleString()}</span>
            <span className="installment-date">
              {inst.paid_at ? new Date(inst.paid_at).toLocaleDateString('en-NG') : 'Pending'}
            </span>
          </div>
          <div className={`installment-status ${inst.paid ? 'paid' : 'pending'}`}>
            {inst.paid ? '✓ Paid' : '⏳ Pending'}
          </div>
        </div>
      ))}
    </div>
  )
}

export default function Installments() {
  const { user } = useAuth()
  const { investments, loading, refresh } = useDashboardData(user)
  const [selectedInvestment, setSelectedInvestment] = useState(null)
  const [payAmount, setPayAmount] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('flutterwave')
  const [showPayModal, setShowPayModal] = useState(false)
  const [message, setMessage] = useState('')
  const [proofFile, setProofFile] = useState(null)
  const [uploading, setUploading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(''), 5000)
      return () => clearTimeout(timer)
    }
  }, [message])

  const activeInvestments = investments?.filter(inv =>
    inv.status === 'active' && (inv.balance_remaining || 0) > 0
  ) || []

  async function handlePayClick(investment) {
    setSelectedInvestment(investment)
    setPayAmount('')
    setPaymentMethod('flutterwave')
    setProofFile(null)
    setShowPayModal(true)
  }

  async function handleSubmitPayment() {
    if (!payAmount || Number(payAmount) <= 0) {
      alert('Please enter a valid amount')
      return
    }
    if (Number(payAmount) > selectedInvestment.balance_remaining) {
      alert(`Amount cannot exceed remaining balance: ₦${selectedInvestment.balance_remaining.toLocaleString()}`)
      return
    }

    setUploading(true)
    setMessage('')

    try {
      const amount = Number(payAmount)
      const txRef = `INST-${selectedInvestment.id}-${Date.now()}`

      let paymentData = {
        txRef,
        amount,
        paymentMethod,
        status: 'pending'
      }

      if (paymentMethod === 'bank_transfer') {
        if (!proofFile) {
          alert('Please upload proof of payment')
          setUploading(false)
          return
        }

        const fileExt = proofFile.name.split('.').pop()
        const fileName = `installment-proofs/${user.id}/${Date.now()}.${fileExt}`

        const { error: uploadError } = await supabase.storage
          .from('payment-proofs')
          .upload(fileName, proofFile)

        if (uploadError) throw new Error(`Upload failed: ${uploadError.message}`)

        const { data, error: signedError } = await supabase.storage
          .from('payment-proofs')
          .createSignedUrl(fileName, 60 * 60 * 24 * 7)

        if (signedError) throw new Error(`Signed URL failed: ${signedError.message}`)

        paymentData.proof_path = fileName
        paymentData.proof_url = data.signedUrl
      }

      const { data: txRecord, error: txError } = await supabase
        .from('transactions')
        .insert({
          user_id: user.id,
          type: 'installment_payment',
          amount: amount,
          status: 'pending',
          reference: txRef,
          payment_method: paymentMethod,
          metadata: {
            investment_id: selectedInvestment.id,
            investment_plan: selectedInvestment.investment_plan?.title,
            ...(paymentData.proof_url && { proof_url: paymentData.proof_url }),
            ...(paymentData.proof_path && { proof_path: paymentData.proof_path })
          }
        })
        .select()
        .single()

      if (txError) throw new Error(`Transaction failed: ${txError.message}`)

      if (paymentMethod === 'bank_transfer' && paymentData.proof_path) {
        const { error: proofError } = await supabase.from('payment_proofs').insert({
          user_id: user.id,
          transaction_id: txRecord.id,
          investment_id: selectedInvestment.id,
          file_path: paymentData.proof_path,
          file_url: paymentData.proof_url,
          status: 'pending'
        })

        if (proofError) throw new Error(`Proof save failed: ${proofError.message}`)
      }

      setMessage('✅ Payment submitted! Awaiting admin approval.')
      setShowPayModal(false)
      setPayAmount('')
      setProofFile(null)

      setTimeout(() => {
        if (typeof refresh === 'function') refresh()
      }, 2000)

    } catch (err) {
      setMessage('❌ Payment failed: ' + (err.message || 'Unknown error'))
      alert('Payment failed: ' + (err.message || 'Unknown error'))
    } finally {
      setUploading(false)
    }
  }

  function handleFlutterwavePayment() {
    if (!payAmount || Number(payAmount) <= 0) {
      alert('Please enter amount first')
      return
    }

    const amount = Number(payAmount)
    const txRef = `INST-${selectedInvestment.id}-${Date.now()}`

    if (!window.FlutterwaveCheckout) {
      const script = document.createElement('script')
      script.src = 'https://checkout.flutterwave.com/v3.js'
      script.async = true
      script.onload = () => openFlutterwave(amount, txRef)
      script.onerror = () => alert('Failed to load payment system. Please check your internet connection.')
      document.body.appendChild(script)
      return
    }

    openFlutterwave(amount, txRef)
  }

  function openFlutterwave(amount, txRef) {
    if (!window.FlutterwaveCheckout) {
      alert('Payment system still loading... please try again.')
      return
    }

    window.FlutterwaveCheckout({
      public_key: import.meta.env.VITE_FLUTTERWAVE_PUBLIC_KEY,
      tx_ref: txRef,
      amount: amount,
      currency: 'NGN',
      payment_options: 'card,ussd,banktransfer,account',
      customer: {
        email: user.email,
        phone_number: '',
        name: user.email?.split('@')[0] || 'NADLAN Investor',
      },
      customizations: {
        title: 'NADLAN Installment',
        description: `Installment payment of ₦${amount.toLocaleString()} for ${selectedInvestment.investment_plan?.title}`,
      },
      callback: function (response) {
        supabase.from('transactions').insert({
          user_id: user.id,
          type: 'installment_payment',
          amount: amount,
          status: 'pending',
          reference: txRef,
          payment_method: 'flutterwave',
          metadata: {
            investment_id: selectedInvestment.id,
            investment_plan: selectedInvestment.investment_plan?.title,
            flutterwave_tx_id: response.transaction_id
          }
        }).then(() => {
          setMessage('✅ Payment submitted! Awaiting admin approval.')
          setShowPayModal(false)
          setPayAmount('')
          setTimeout(() => refresh(), 2000)
        })
      },
      onclose: function () { }
    })
  }

  if (loading) {
    return (
      <div className="dashboard-page">
        <div className="dashboard-loading">
          <div className="spinner"></div>
          <p>Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="dashboard-page">
      <div className="installments-header">
        <h1>💳 My Installments</h1>
        {message && (
          <div className={`message-toast ${message.includes('✅') ? 'success' : 'error'}`}>
            {message}
          </div>
        )}
      </div>

      {activeInvestments.length === 0 ? (
        <div className="empty-state-large">
          <div className="empty-icon">🏗️</div>
          <h3>No Active Investments with Balance</h3>
          <p>You don't have any active investments with a remaining balance to pay.</p>
          <Link to="/dashboard/plans" className="new-investment-btn">
            Browse Investment Plans
          </Link>
        </div>
      ) : (
        <div className="investments-list">
          {activeInvestments.map(inv => {
            const plan = inv.investment_plan
            const progress = ((inv.total_paid || 0) / inv.amount) * 100

            return (
              <div key={inv.id} className="installment-card">
                <div className="installment-header">
                  <div className="installment-plan-info">
                    <h4>{plan?.title || 'Investment'}</h4>
                  </div>
                  <span className={`investment-status-badge ${inv.status}`}>{inv.status}</span>
                </div>

                <div className="progress-section">
                  <div className="progress-header">
                    <span>Payment Progress</span>
                    <span>{Math.round(progress)}%</span>
                  </div>
                  <div className="progress-bar-bg">
                    <div
                      className="progress-bar-fill"
                      style={{ width: `${Math.min(progress, 100)}%` }}
                    />
                  </div>
                </div>

                <div className="detail-grid">
                  <div className="detail-item">
                    <span className="detail-label">Total Amount</span>
                    <span className="detail-value">₦{(inv.amount || 0).toLocaleString()}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Total Paid</span>
                    <span className="detail-value" style={{ color: '#4CAF50' }}>
                      ₦{(inv.total_paid || 0).toLocaleString()}
                    </span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Balance</span>
                    <span className="detail-value" style={{ color: '#FF9800' }}>
                      ₦{(inv.balance_remaining || 0).toLocaleString()}
                    </span>
                  </div>
                </div>

                <InstallmentHistory installments={inv.installments} />

                <button
                  className="pay-installment-btn"
                  onClick={() => handlePayClick(inv)}
                  disabled={(inv.balance_remaining || 0) <= 0}
                >
                  💳 Make Payment
                </button>
              </div>
            )
          })}
        </div>
      )}

      {/* Payment Modal */}
      {showPayModal && selectedInvestment && (
        <div className="modal-overlay" onClick={() => setShowPayModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Make Payment</h2>
              <button className="modal-close" onClick={() => setShowPayModal(false)}>×</button>
            </div>
            <div className="modal-body">
              <div className="investment-summary">
                <div className="summary-row">
                  <span>Investment</span>
                  <span>{selectedInvestment.investment_plan?.title}</span>
                </div>
                <div className="summary-row">
                  <span>Balance Remaining</span>
                  <span style={{ color: '#FF9800', fontWeight: 600 }}>
                    ₦{(selectedInvestment.balance_remaining || 0).toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="amount-input-group">
                <label>Amount to Pay (₦)</label>
                <input
                  type="number"
                  value={payAmount}
                  onChange={(e) => setPayAmount(e.target.value)}
                  min="1"
                  max={selectedInvestment.balance_remaining}
                  placeholder="Enter amount"
                  className="amount-input"
                />
                <button
                  className="refresh-btn"
                  onClick={() => setPayAmount((selectedInvestment.balance_remaining || 0).toString())}
                >
                  Max
                </button>
              </div>

              {payAmount && Number(payAmount) > 0 && (
                <div className="earnings-card">
                  <div className="earnings-info">
                    <span className="earnings-label">You will pay</span>
                    <span className="earnings-value" style={{ color: '#4CAF50' }}>
                      ₦{Number(payAmount).toLocaleString()}
                    </span>
                  </div>
                </div>
              )}

              <div className="payment-type-group">
                <label>Payment Method</label>
                <div className="payment-options">
                  <button
                    className={paymentMethod === 'flutterwave' ? 'active' : ''}
                    onClick={() => setPaymentMethod('flutterwave')}
                  >
                    💳 Flutterwave
                  </button>
                  <button
                    className={paymentMethod === 'bank_transfer' ? 'active' : ''}
                    onClick={() => setPaymentMethod('bank_transfer')}
                  >
                    🏦 Bank Transfer
                  </button>
                </div>
              </div>

              {paymentMethod === 'bank_transfer' && (
                <>
                  <div className="bank-transfer-section">
                    <h4>🏦 Bank Transfer Details</h4>
                    <p className="bank-transfer-note">
                      Transfer <strong>₦{(payAmount && Number(payAmount) > 0) ? Number(payAmount).toLocaleString() : '0'}</strong> to:
                    </p>
                    
                    <div className="bank-account-card primary">
                      <span className="bank-label">Bank</span>
                      <p className="bank-name">Guaranty Trust Bank (GTBank)</p>
                      <span className="bank-label">Account Name</span>
                      <p className="account-name">NADLAN Investment Limited</p>
                      <span className="bank-label">Account Number</span>
                      <div className="account-number-row">
                        <span className="account-number">0123456789</span>
                        <button className="copy-btn" onClick={() => navigator.clipboard.writeText('0123456789')}>
                          Copy
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="proof-upload-section">
                    <label className="proof-label">Upload Proof of Payment</label>
                    <p className="proof-hint">Screenshot, receipt, or bank transfer confirmation</p>
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      onChange={(e) => setProofFile(e.target.files[0])}
                    />
                    {proofFile && <p className="file-selected">✓ {proofFile.name}</p>}
                  </div>
                </>
              )}

              <div className="bank-transfer-actions">
                <button
                  className="cancel-btn"
                  onClick={() => setShowPayModal(false)}
                >
                  Cancel
                </button>
                {paymentMethod === 'flutterwave' ? (
                  <button
                    className="confirm-invest-btn"
                    onClick={handleFlutterwavePayment}
                    disabled={!payAmount || Number(payAmount) <= 0 || uploading}
                  >
                    {uploading ? 'Processing...' : `💳 Pay ₦${(payAmount && Number(payAmount) > 0) ? Number(payAmount).toLocaleString() : '0'} with Flutterwave`}
                  </button>
                ) : (
                  <button
                    className="confirm-invest-btn"
                    onClick={handleSubmitPayment}
                    disabled={!payAmount || !proofFile || uploading}
                  >
                    {uploading ? 'Uploading...' : 'Submit Payment'}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}