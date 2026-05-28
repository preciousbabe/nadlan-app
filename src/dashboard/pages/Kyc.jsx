import { useAuth } from '../../context/AuthContext'
import useDashboardData from '../../hooks/useDashboardData'
import { supabase } from '../../services/supabase'
import { useState, useRef } from 'react'

const KYC_STEPS = [
  {
    id: 'identity',
    title: 'Identity Verification',
    description: 'Upload a valid government-issued ID (Passport, Drivers License, or National ID / NINSLIP)',
    required: true
  },
  {
    id: 'address',
    title: 'Proof of Address',
    description: 'Upload a recent utility bill or bank statement (not older than 3 months)',
    required: true
  },
  {
    id: 'selfie',
    title: 'Selfie Verification',
    description: 'Take a clear selfie of your face for biometric verification',
    required: true
  }
]


function KYCStep({ step, status, onUpload, uploading }) {
  const fileInputRef = useRef(null)
  const statusConfig = {
    pending: { color: '#FFC107', bg: '#FFC10720', label: 'Pending' },
    verified: { color: '#4CAF50', bg: '#4CAF5020', label: 'Verified' },
    rejected: { color: '#FF4D4D', bg: '#FF4D4D20', label: 'Rejected' },
    not_submitted: { color: '#888', bg: '#88888820', label: 'Not Submitted' }
  }
  const config = statusConfig[status] || statusConfig.not_submitted

  function handleFileChange(e) {
    const file = e.target.files[0]
    if (file) {
      onUpload(step.id, file)
    }
  }

  return (
    <div className="kyc-step-card">
      <div className="kyc-step-header">
        <div className="kyc-step-number">{step.required ? '*' : ''}{KYC_STEPS.indexOf(step) + 1}</div>
        <div className="kyc-step-info">
          <h3>{step.title}</h3>
          <p>{step.description}</p>
        </div>
        <div 
          className="kyc-step-status"
          style={{ background: config.bg, color: config.color }}
        >
          {config.label}
        </div>
      </div>
      
      {status !== 'verified' && (
        <div className="kyc-step-actions">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*,.pdf"
            style={{ display: 'none' }}
          />
          <button 
            className="upload-doc-btn"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
          >
            {uploading ? 'Uploading...' : status === 'rejected' ? 'Re-upload Document' : 'Upload Document'}
          </button>
        </div>
      )}
      
      {status === 'verified' && (
        <div className="kyc-step-verified">
          <span>✓ Document verified</span>
        </div>
      )}
    </div>
  )
}

export default function KYC() {
  const { user } = useAuth()
  const { profile, updateProfile } = useDashboardData(user)
  const [uploading, setUploading] = useState(false)
  const [message, setMessage] = useState('')

  const kycStatus = profile?.kyc_status || 'unverified'
  
  const [docStatuses, setDocStatuses] = useState({
    identity: 'not_submitted',
    address: 'not_submitted',
    selfie: 'not_submitted'
  })

  async function handleUpload(stepId, file) {
    setUploading(true)
    setMessage('')

    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${user.id}/${stepId}_${Date.now()}.${fileExt}`
      
      const { error: uploadError } = await supabase.storage
        .from('kyc-documents')
        .upload(fileName, file)

      if (uploadError) throw uploadError

      setDocStatuses(prev => ({ ...prev, [stepId]: 'pending' }))
      setMessage('Document uploaded successfully! Pending verification.')
      
      const allRequiredSubmitted = KYC_STEPS
        .filter(s => s.required)
        .every(s => {
          const status = docStatuses[s.id]
          return status === 'pending' || status === 'verified' || (s.id === stepId)
        })
      
      if (allRequiredSubmitted && kycStatus === 'unverified') {
        await supabase
          .from('profiles')
          .update({ kyc_status: 'pending' })
          .eq('id', user.id)
        
        // FIX: Use updateProfile instead of undefined setProfile
        updateProfile({ kyc_status: 'pending' })
      }
    } catch (err) {
      console.error('Upload error:', err)
      setMessage('Upload failed. Please try again.')
    } finally {
      setUploading(false)
      setTimeout(() => setMessage(''), 5000)
    }
  }

  const completedSteps = Object.values(docStatuses).filter(s => s === 'verified').length
  const totalRequired = KYC_STEPS.filter(s => s.required).length
  const progress = Math.round((completedSteps / totalRequired) * 100)

  return (
    <div className="dashboard-page">
      <div className="kyc-header">
        <h1>KYC Verification</h1>
        {message && (
          <div className={`message-toast ${message.includes('success') ? 'success' : 'error'}`}>
            {message}
          </div>
        )}
      </div>

      <div className={`kyc-status-banner ${kycStatus}`}>
        <div className="kyc-status-icon">
          {kycStatus === 'verified' ? '✓' : kycStatus === 'pending' ? '⏳' : '⚠'}
        </div>
        <div className="kyc-status-info">
          <h3>
            {kycStatus === 'verified' 
              ? 'Verification Complete' 
              : kycStatus === 'pending' 
                ? 'Verification In Progress' 
                : 'Verification Required'}
          </h3>
          <p>
            {kycStatus === 'verified'
              ? 'Your identity has been verified. You have full access to all investment features.'
              : kycStatus === 'pending'
                ? 'Your documents are under review. This usually takes 1-2 business days.'
                : 'Complete the steps below to verify your identity and start investing.'}
          </p>
        </div>
      </div>

      <div className="kyc-progress-section">
        <div className="kyc-progress-header">
          <span>Completion Progress</span>
          <span>{progress}%</span>
        </div>
        <div className="progress-bar-bg">
          <div 
            className="progress-bar-fill"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="kyc-progress-hint">
          {completedSteps} of {totalRequired} required steps completed
        </p>
      </div>

      <div className="kyc-steps-list">
        {KYC_STEPS.map(step => (
          <KYCStep
            key={step.id}
            step={step}
            status={docStatuses[step.id]}
            onUpload={handleUpload}
            uploading={uploading}
          />
        ))}
      </div>

      <div className="kyc-info-box">
        <h4>🔒 Why we need this</h4>
        <p>
          KYC verification is required by Nigerian financial regulations (SEC guidelines). 
          It helps us protect your account, prevent fraud, and ensure compliance. 
          Your documents are encrypted and stored securely.
        </p>
      </div>
    </div>
  )
}