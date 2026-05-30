import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import useDashboardData from '../../hooks/useDashboardData'
import { supabase } from '../../services/supabase'

const TIERS = [
  {
    id: 'bronze',
    name: 'Bronze',
    tagline: 'Foundation Builder',
    minAmount: 500000,
    maxAmount: 2000000,
    roiPercent: 15,
    durationMonths: 12,
    color: '#CD7F32',
    gradient: 'linear-gradient(135deg, #CD7F32 0%, #B87333 100%)',
    icon: '🥉',
    features: ['Quarterly Reports', 'Email Support', 'Basic Portfolio Tracking']
  },
  {
    id: 'silver',
    name: 'Silver',
    tagline: 'Growth Accelerator',
    minAmount: 2000000,
    maxAmount: 5000000,
    roiPercent: 18,
    durationMonths: 18,
    color: '#C0C0C0',
    gradient: 'linear-gradient(135deg, #C0C0C0 0%, #A8A8A8 100%)',
    icon: '🥈',
    features: ['Monthly Reports', 'Priority Support', 'Advanced Analytics', 'Investment Advisor Access']
  },
  {
    id: 'gold',
    name: 'Gold',
    tagline: 'Wealth Maximizer',
    minAmount: 5000000,
    maxAmount: 15000000,
    roiPercent: 22,
    durationMonths: 24,
    color: '#C9A962',
    gradient: 'linear-gradient(135deg, #C9A962 0%, #B8954E 100%)',
    icon: '🥇',
    features: ['Weekly Reports', 'Dedicated Manager', 'Premium Analytics', 'Early Access to Deals', 'Tax Optimization']
  },
  {
    id: 'platinum',
    name: 'Platinum',
    tagline: 'Elite Portfolio',
    minAmount: 15000000,
    maxAmount: 30000000,
    roiPercent: 25,
    durationMonths: 30,
    color: '#E5E4E2',
    gradient: 'linear-gradient(135deg, #E5E4E2 0%, #D3D3D3 100%)',
    icon: '💎',
    features: ['Real-time Dashboard', 'VIP Support 24/7', 'Custom Strategies', 'Private Deal Access', 'Estate Planning', 'Family Account']
  },
  {
    id: 'diamond',
    name: 'Diamond',
    tagline: 'Legacy Creator',
    minAmount: 30000000,
    maxAmount: 50000000,
    roiPercent: 30,
    durationMonths: 36,
    color: '#B9F2FF',
    gradient: 'linear-gradient(135deg, #B9F2FF 0%, #A8E6FF 100%)',
    icon: '👑',
    features: ['White-glove Service', 'Board Representation', 'Bespoke Portfolios', 'Global Market Access', 'Succession Planning', 'Charitable Trust Setup']
  },
  {
    id: 'global',
    name: 'Global',
    tagline: 'World Dominator',
    minAmount: 50000000,
    maxAmount: 100000000,
    roiPercent: 35,
    durationMonths: 48,
    color: '#FFD700',
    gradient: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
    icon: '🌍',
    features: ['Concierge Service', 'Global Board Seat', 'Custom Real Estate Portfolios', 'International Market Access', 'Dynasty Trust Setup', 'Private Jet Access', 'Dedicated Family Office']
  }
]

// NADLAN corporate bank account details
const BANK_DETAILS = {
  bankName: 'Guaranty Trust Bank (GTBank)',
  accountName: 'NADLAN Investment Limited',
  accountNumber: '0123456789',
  // Add more banks if needed
  alternativeBanks: [
    { bankName: 'Zenith Bank', accountNumber: '0987654321' },
    { bankName: 'First Bank of Nigeria', accountNumber: '1122334455' }
  ]
}

function PlanCard({ tier, onSelect, profile }) {
  const projectedReturn = Math.round(tier.minAmount * (tier.roiPercent / 100))
  const isVerified = profile?.kyc_status === 'verified'
  
  return (
    <div className="plan-card-tiered" style={{ borderColor: tier.color }}>
      <div className="plan-header" style={{ background: tier.gradient }}>
        <span className="plan-icon">{tier.icon}</span>
        <h3>{tier.name}</h3>
        <p className="plan-tagline">{tier.tagline}</p>
      </div>
      
      <div className="plan-body">
        <div className="plan-amount-range">
          <span className="amount-label">Investment Range</span>
          <p className="amount-value">
            ₦{tier.minAmount.toLocaleString()} - ₦{tier.maxAmount.toLocaleString()}
          </p>
        </div>
        
        <div className="plan-metrics">
          <div className="metric">
            <span className="metric-label">ROI</span>
            <span className="metric-value" style={{ color: tier.color }}>{tier.roiPercent}%</span>
          </div>
          <div className="metric">
            <span className="metric-label">Duration</span>
            <span className="metric-value">{tier.durationMonths} months</span>
          </div>
          <div className="metric">
            <span className="metric-label">Projected Return</span>
            <span className="metric-value" style={{ color: '#4CAF50' }}>
              ₦{projectedReturn.toLocaleString()}
            </span>
          </div>
        </div>
        
        <div className="plan-features">
          {tier.features.map((feature, i) => (
            <div key={i} className="feature-item">
              <span className="feature-check" style={{ color: tier.color }}>✓</span>
              {feature}
            </div>
          ))}
        </div>
        
        {isVerified ? (
          <button 
            className="invest-btn-tiered"
            style={{ background: tier.gradient }}
            onClick={() => onSelect(tier)}
          >
            Invest Now
          </button>
        ) : (
          <Link 
            to="/dashboard/kyc" 
            className="invest-btn-tiered"
            style={{ 
              background: 'rgba(255,255,255,0.08)', 
              color: '#fff', 
              textDecoration: 'none', 
              textAlign: 'center', 
              display: 'block',
              border: '1px solid rgba(255,255,255,0.15)'
            }}
          >
            🔒 Complete KYC to Invest
          </Link>
        )}
      </div>
    </div>
  )
}

function FlutterwavePayment({ amount, email, phone, name, onSuccess, onClose }) {
  const [scriptLoaded, setScriptLoaded] = useState(false)

  useEffect(() => {
    if (window.FlutterwaveCheckout) {
      setScriptLoaded(true)
      return
    }
    const script = document.createElement('script')
    script.src = 'https://checkout.flutterwave.com/v3.js'
    script.async = true
    script.onload = () => setScriptLoaded(true)
    document.body.appendChild(script)
    return () => {}
  }, [])

  function makePayment() {
    if (!window.FlutterwaveCheckout) {
      alert('Payment system loading... please try again in a moment.')
      return
    }

    const txRef = `TX-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

    window.FlutterwaveCheckout({
      public_key: import.meta.env.VITE_FLUTTERWAVE_PUBLIC_KEY,
      tx_ref: txRef,
      amount: amount,
      currency: 'NGN',
      // Added 'account' for bank transfer via Flutterwave
      payment_options: 'card,ussd,banktransfer,account',
      customer: {
        email: email,
        phone_number: phone || '',
        name: name || 'NADLAN Investor',
      },
      customizations: {
        title: 'NADLAN Investment',
        description: `Investment payment of ₦${amount.toLocaleString()}`,
        logo: 'https://your-logo-url.com/logo.png',
      },
        callback: function (response) {
  if (response.status === 'successful') {
    setTimeout(() => {
      onSuccess({
        transactionId: response.transaction_id,
        txRef: txRef,
        amount: amount,
        status: 'pending',  
        paymentMethod: 'flutterwave'
      })
    }, 500)
  }
},

      onclose: function () {
        onClose()
      },
    })
  }

  return (
    <button
      className="confirm-invest-btn flutterwave-btn"
      onClick={makePayment}
      disabled={!scriptLoaded}
    >
      {!scriptLoaded ? 'Loading Payment...' : `💳 Pay ₦${amount.toLocaleString()} with Flutterwave`}
    </button>
  )
}

function BankTransferOption({ amount, onSubmit, onCancel, user }) {
  const [proofFile, setProofFile] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [copied, setCopied] = useState(false)

  async function handleSubmit() {
    if (!proofFile) {
      alert('Please upload proof of payment (screenshot or receipt)')
      return
    }
    setUploading(true)
    try {
      const fileExt = proofFile.name.split('.').pop()
      const fileName = `proof-of-payment/${user.id}/${Date.now()}.${fileExt}`
      
      const { error: uploadError } = await supabase.storage
        .from('payment-proofs')
        .upload(fileName, proofFile)

      if (uploadError) throw uploadError

     const { data, error: signedError } = await supabase.storage
     .from('payment-proofs')
     .createSignedUrl(fileName, 60 * 60 * 24 * 7) // 7 days

     if (signedError) throw signedError

      const signedUrl = data.signedUrl

          onSubmit({
      proof_path: fileName,
      proof_url: signedUrl,
      amount: amount,
      paymentMethod: 'bank_transfer'
     })

    } catch (err) {
      console.error('Upload error:', err)
      alert('Failed to upload proof. Please try again.')
    } finally {
      setUploading(false)
    }
  }

  function copyAccountNumber(number) {
    navigator.clipboard.writeText(number)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="bank-transfer-section">
      <h4>🏦 Bank Transfer</h4>
      <p className="bank-transfer-note">
        Transfer <strong>₦{amount.toLocaleString()}</strong> to any of the accounts below, then upload your proof of payment.
      </p>

      <div className="bank-accounts-list">
        <div className="bank-account-card primary">
          <div className="bank-info">
            <span className="bank-label">Primary Account</span>
            <p className="bank-name">{BANK_DETAILS.bankName}</p>
            <p className="account-name">{BANK_DETAILS.accountName}</p>
          </div>
          <div className="account-number-row">
            <code className="account-number">{BANK_DETAILS.accountNumber}</code>
            <button 
              className="copy-btn"
              onClick={() => copyAccountNumber(BANK_DETAILS.accountNumber)}
            >
              {copied ? '✓ Copied' : '📋 Copy'}
            </button>
          </div>
        </div>

        {BANK_DETAILS.alternativeBanks.map((bank, i) => (
          <div key={i} className="bank-account-card">
            <div className="bank-info">
              <span className="bank-label">Alternative {i + 1}</span>
              <p className="bank-name">{bank.bankName}</p>
              <p className="account-name">{BANK_DETAILS.accountName}</p>
            </div>
            <div className="account-number-row">
              <code className="account-number">{bank.accountNumber}</code>
              <button 
                className="copy-btn"
                onClick={() => copyAccountNumber(bank.accountNumber)}
              >
                📋 Copy
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="proof-upload-section">
        <label className="proof-label">Upload Proof of Payment</label>
        <p className="proof-hint">Screenshot, receipt, or bank transfer confirmation</p>
        <input
          type="file"
          accept="image/*,.pdf"
          onChange={(e) => setProofFile(e.target.files[0])}
          className="proof-input"
        />
        {proofFile && (
          <p className="file-selected">✓ {proofFile.name}</p>
        )}
      </div>

      <div className="bank-transfer-actions">
        <button
          className="submit-proof-btn"
          onClick={handleSubmit}
          disabled={uploading || !proofFile}
        >
          {uploading ? 'Uploading...' : 'Submit Proof & Continue'}
        </button>
        <button className="cancel-btn" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  )
}

function InvestmentModal({ tier, onClose, user, profile }) {
  const [amount, setAmount] = useState(tier.minAmount)
  const [paymentType, setPaymentType] = useState('full')
  const [paymentMethod, setPaymentMethod] = useState('flutterwave') // 'flutterwave' | 'bank_transfer'
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [pendingProof, setPendingProof] = useState(false)
  const navigate = useNavigate()

  const projectedRoi = Math.round(amount * (tier.roiPercent / 100))
  const totalReturn = amount + projectedRoi

  const installmentCount = 6
  const firstInstallmentAmount = paymentType === 'installment'
    ? Math.round(amount / installmentCount)
    : amount

  async function handlePaymentSuccess(paymentData) {
    setLoading(true)
    setError('')

    try {
      // 1. Find or create investment plan
      const { data: existingPlan } = await supabase
        .from('investment_plans')
        .select('id')
        .eq('title', `${tier.name} Plan`)
        .single()

      let planId = existingPlan?.id

      if (!planId) {
        const { data: newPlan, error: planError } = await supabase
          .from('investment_plans')
          .insert({
            title: `${tier.name} Plan`,
            category: 'real_estate',
            description: `${tier.tagline} - ${tier.durationMonths} months at ${tier.roiPercent}% ROI`,
            roi_percent: tier.roiPercent,
            duration_months: tier.durationMonths,
            minimum_amount: tier.minAmount,
            status: 'active'
          })
          .select()
          .single()

        if (planError) throw planError
        planId = newPlan.id
      }

      // 2. Create user investment
      
      const { data: investment, error: invError } = await supabase
        .from('user_investments')
        .insert({
          user_id: user.id,
          investment_plan_id: planId,
          amount: amount,
          payment_type: paymentType,
          status: 'pending_payment',  
          progress: 0,
          roi_earned: 0
        })
        .select()
        .single()

      if (invError) throw invError

      // 3. Record transaction — ALWAYS pending
            const transactionData = {
        user_id: user.id,
        type: 'investment',
        amount: amount,
        status: 'pending',  
        reference: paymentData.txRef || `BT-${Date.now()}`,
        payment_method: paymentData.paymentMethod,
        metadata: { 
          tier: tier.name, 
          payment_type: paymentType,
          flutterwave_tx_id: paymentData.transactionId || null,
          ...(paymentData.proof_url && { proof_url: paymentData.proof_url }),
          ...(paymentData.proof_path && { proof_path: paymentData.proof_path })
        }
      }

      
      const { data: txRecord, error: txError } = await supabase
        .from('transactions')
        .insert(transactionData)
        .select()
        .single()
      
      if (txError) throw txError

      // 4. For bank transfer: also insert into payment_proofs table
      if (paymentData.paymentMethod === 'bank_transfer' && paymentData.proof_path) {
        const { error: proofError } = await supabase
  .from('payment_proofs')
  .insert({
    user_id: user.id,
    transaction_id: txRecord.id,
    investment_id: investment.id,
    file_path: paymentData.proof_path,
    file_url: paymentData.proof_url,
    status: 'pending'
  })

if (proofError) {
  console.error('PAYMENT_PROOF ERROR:', proofError)
  throw proofError
}
      }

      // 5. Create installments (same as before)
      if (paymentType === 'installment') {
        const installmentAmount = Math.round(amount / installmentCount)
        const installments = []
        for (let i = 1; i <= installmentCount; i++) {
          const dueDate = new Date()
          dueDate.setMonth(dueDate.getMonth() + i)
          installments.push({
            investment_id: investment.id,
            amount: i === installmentCount 
              ? amount - (installmentAmount * (installmentCount - 1)) 
              : installmentAmount,
            due_date: dueDate.toISOString().split('T')[0],
            paid: false
          })
        }
        const { error: installmentError } = await supabase
  .from('installments')
  .insert(installments)

if (installmentError) {
  console.error('INSTALLMENT ERROR:', installmentError)
  throw installmentError
}
      }

      // 6. Update profile (same)
      await supabase
        .from('profiles')
        .update({ investment_goal: tier.name })
        .eq('id', user.id)

      // 7. Show pending state for BOTH methods
      setPendingProof(true)  

    } catch (err) {
      console.error('Investment error:', err)
      setError(err.message || 'Failed to create investment. Please contact support.')
    } finally {
      setLoading(false)
    }
  }


  if (pendingProof) {
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={e => e.stopPropagation()}>
          <div className="modal-header" style={{ background: 'linear-gradient(135deg, #FF9800, #F57C00)' }}>
            <h2>⏳ Awaiting Verification</h2>
          </div>
          <div className="modal-body" style={{ textAlign: 'center', padding: '40px' }}>
            <div style={{ fontSize: '64px', marginBottom: '20px' }}>🏦</div>
                        <h3>Payment submitted for verification</h3>
            <p style={{ color: '#aaa', marginTop: '10px', lineHeight: '1.6' }}>
              Our team will verify your payment within 1-2 business hours.<br/>
              You'll receive a notification once confirmed.
            </p>
            <button 
              className="confirm-invest-btn"
              onClick={() => navigate('/dashboard/portfolio')}
              style={{ marginTop: '20px' }}
            >
              Go to Portfolio
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header" style={{ background: tier.gradient }}>
          <h2>{tier.icon} {tier.name} Investment</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        
        <div className="modal-body">
          {error && <div className="error-message">{error}</div>}
          
          <div className="amount-input-group">
            <label>Investment Amount (₦)</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              min={tier.minAmount}
              max={tier.maxAmount}
              className="amount-input"
            />
            <div className="amount-hint">
              Min: ₦{tier.minAmount.toLocaleString()} | Max: ₦{tier.maxAmount.toLocaleString()}
            </div>
          </div>

          <div className="payment-type-group">
            <label>Payment Type</label>
            <div className="payment-options">
              <button
                className={paymentType === 'full' ? 'active' : ''}
                onClick={() => setPaymentType('full')}
              >
                Full Payment
              </button>
              <button
                className={paymentType === 'installment' ? 'active' : ''}
                onClick={() => setPaymentType('installment')}
              >
                6-Month Installments
              </button>
            </div>
          </div>

          <div className="investment-summary">
            <div className="summary-row">
              <span>Principal</span>
              <span>₦{amount.toLocaleString()}</span>
            </div>
            <div className="summary-row">
              <span>ROI ({tier.roiPercent}%)</span>
              <span style={{ color: '#4CAF50' }}>₦{projectedRoi.toLocaleString()}</span>
            </div>
            <div className="summary-row">
              <span>Duration</span>
              <span>{tier.durationMonths} months</span>
            </div>
            {paymentType === 'installment' && (
              <div className="summary-row">
                <span>First Installment</span>
                <span>₦{firstInstallmentAmount.toLocaleString()}</span>
              </div>
            )}
            <div className="summary-row total">
              <span>Total Return</span>
              <span>₦{totalReturn.toLocaleString()}</span>
            </div>
          </div>

          {/* Payment Method Selection */}
          <div className="payment-method-group">
            <label>Payment Method</label>
            <div className="payment-method-options">
              <button
                className={paymentMethod === 'flutterwave' ? 'active' : ''}
                onClick={() => setPaymentMethod('flutterwave')}
              >
                💳 Flutterwave (Card/Transfer/USSD)
              </button>
              <button
                className={paymentMethod === 'bank_transfer' ? 'active' : ''}
                onClick={() => setPaymentMethod('bank_transfer')}
              >
                🏦 Bank Transfer (Manual)
              </button>
            </div>
          </div>

          {paymentMethod === 'flutterwave' ? (
            <FlutterwavePayment
              amount={firstInstallmentAmount}
              email={user.email}
              phone={profile?.phone}
              name={profile?.full_name}
              onSuccess={handlePaymentSuccess}
              onClose={() => setLoading(false)}
            />
          ) : (
            <BankTransferOption
  amount={firstInstallmentAmount}
  user={user}
  onSubmit={handlePaymentSuccess}
  onCancel={() => setPaymentMethod('flutterwave')}
/>
          )}
        </div>
      </div>
    </div>
  )
}


export default function InvestmentPlans() {
  const { user } = useAuth()
  const { plans: dbPlans, profile, loading } = useDashboardData(user)
  const [selectedTier, setSelectedTier] = useState(null)

  const displayPlans = dbPlans.length > 0 
    ? dbPlans.map(plan => {
        const tier = TIERS.find(t => t.name === plan.title?.split(' ')[0]) || TIERS[0]
        return { ...tier, ...plan, id: plan.id }
      })
    : TIERS

  return (
    <div className="dashboard-page">
      <div className="plans-header">
        <h1>Investment Plans</h1>
        <p className="plans-subtitle">
          Choose from our curated real estate investment tiers, designed to maximize your returns
        </p>
        {profile?.kyc_status !== 'verified' && (
          <div style={{ 
            background: 'rgba(255, 152, 0, 0.1)', 
            border: '1px solid rgba(255, 152, 0, 0.3)', 
            color: '#FF9800',
            padding: '12px 20px',
            borderRadius: '10px',
            marginBottom: '20px',
            fontSize: '14px'
          }}>
            ⚠️ Complete your KYC verification to unlock investments. <Link to="/dashboard/kyc" style={{ color: '#C9A962', textDecoration: 'underline' }}>Go to KYC →</Link>
          </div>
        )}
      </div>

      <div className="plans-grid-tiered">
        {displayPlans.map((tier) => (
          <PlanCard key={tier.id} tier={tier} onSelect={setSelectedTier} profile={profile} />
        ))}
      </div>

      {selectedTier && (
        <InvestmentModal
          tier={selectedTier}
          onClose={() => setSelectedTier(null)}
          user={user}
          profile={profile}
        />
      )}
    </div>
  )
}