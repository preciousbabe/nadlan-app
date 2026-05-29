import { useAuth } from '../../context/AuthContext'
import { useDashboard } from '../../context/DashboardContext'
import useDashboardData from '../../hooks/useDashboardData'
import { supabase } from '../../services/supabase'
import { useState, useRef, useEffect } from 'react'

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

function KYCStep({ step, status, onUpload, uploading, progress }) {
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
    if (!file) return

    const maxSize = 5 * 1024 * 1024
    if (file.size > maxSize) {
      alert('File too large. Max 5MB.')
      return
    }
    const allowed = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf']
    if (!allowed.includes(file.type)) {
      alert('Only JPG, PNG, or PDF allowed.')
      return
    }

    onUpload(step.id, file)
  }

  const isUploading = uploading[step.id] || false
  const currentProgress = progress[step.id] || 0

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
            accept="image/jpeg,image/png,image/jpg,application/pdf"
            style={{ display: 'none' }}
          />
          
          {/* Progress bar */}
          {isUploading && (
            <div className="kyc-progress-bar-container">
              <div 
                className="kyc-progress-bar-fill" 
                style={{ width: `${currentProgress}%` }}
              />
              <span className="kyc-progress-text">{Math.round(currentProgress)}%</span>
            </div>
          )}
          
          <button 
            className="upload-doc-btn"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
          >
            {isUploading ? '⏳ Uploading...' : status === 'rejected' ? '🔄 Re-upload Document' : '📎 Upload Document'}
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
  const { profile: contextProfile, updateProfile: updateContextProfile } = useDashboard()
  const { profile, updateProfile } = useDashboardData(user)
  const [message, setMessage] = useState('')

  // Per-type state instead of single boolean
  const [uploading, setUploading] = useState({})
  const [progress, setProgress] = useState({})

  const kycStatus = profile?.kyc_status || 'unverified'
  
  const [docStatuses, setDocStatuses] = useState({
    identity: 'not_submitted',
    address: 'not_submitted',
    selfie: 'not_submitted'
  })

  // Fetch real doc statuses from Supabase on mount
  useEffect(() => {
    if (!user) return
    async function fetchDocs() {
      const { data } = await supabase
        .from('kyc_documents')
        .select('document_type, status')
        .eq('user_id', user.id)
      
      if (data) {
        const statuses = { identity: 'not_submitted', address: 'not_submitted', selfie: 'not_submitted' }
        data.forEach(doc => {
          statuses[doc.document_type] = doc.status
        })
        setDocStatuses(statuses)
      }
    }
    fetchDocs()
  }, [user])

  if (!user) return <div>Loading...</div>

  async function handleUpload(stepId, file) {
    // Set only THIS document type as uploading
    setUploading(prev => ({ ...prev, [stepId]: true }))
    setProgress(prev => ({ ...prev, [stepId]: 0 }))
    setMessage('')

    // Simulate progress animation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        const current = prev[stepId] || 0
        return { ...prev, [stepId]: Math.min(current + Math.random() * 20 + 5, 85) }
      })
    }, 200)

    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${user.id}/${stepId}_${Date.now()}.${fileExt}`
      
      // 1. Upload to storage
      const { error: uploadError } = await supabase.storage
        .from('kyc-documents')
        .upload(fileName, file, { upsert: true })

      if (uploadError) throw uploadError

      setProgress(prev => ({ ...prev, [stepId]: 90 }))

      // 2. Update or insert DB record
     const { data: existingDocs, error: selectError } = await supabase
  .from('kyc_documents')
  .select('id')
  .eq('user_id', user.id)
  .eq('document_type', stepId)

if (selectError) {
  console.error('Select error:', selectError)
  throw selectError
}

const existing = existingDocs?.[0] || null
      let dbError

      if (existing) {
        // Update existing record
        const { error } = await supabase
          .from('kyc_documents')
          .update({
            file_path: fileName,
            status: 'pending',
            rejection_reason: null,
            rejected_at: null,
            rejected_by: null,
          })
          .eq('id', existing.id)
        dbError = error
      } else {
        // Insert new record
        const { error } = await supabase
          .from('kyc_documents')
          .insert({
            user_id: user.id,
            document_type: stepId,
            file_path: fileName,
            status: 'pending'
          })
        dbError = error
      }

      if (dbError) {
        // Rollback: delete uploaded file
        await supabase.storage.from('kyc-documents').remove([fileName])
        throw dbError
      }

      setProgress(prev => ({ ...prev, [stepId]: 100 }))

      // Update local state
      const newStatuses = { ...docStatuses, [stepId]: 'pending' }
      setDocStatuses(newStatuses)

      setMessage('✅ Document uploaded successfully! Pending verification.')

      // Update profile kyc_status if all required docs submitted
      const allRequiredSubmitted = KYC_STEPS
        .filter(s => s.required)
        .every(s => newStatuses[s.id] === 'pending' || newStatuses[s.id] === 'verified')

      if (allRequiredSubmitted && (kycStatus === 'unverified' || kycStatus === 'rejected')) {
  await supabase
    .from('profiles')
    .update({ kyc_status: 'pending' })
    .eq('id', user.id)
  
  updateProfile({ kyc_status: 'pending' })
  updateContextProfile({ kyc_status: 'pending' })
}
      // Reset progress after success
      setTimeout(() => {
        setProgress(prev => ({ ...prev, [stepId]: 0 }))
        setUploading(prev => ({ ...prev, [stepId]: false }))
      }, 1500)

    } catch (err) {
      clearInterval(progressInterval)
      console.error('Upload error:', err)
      setMessage('❌ Upload failed: ' + (err.message || 'Please try again.'))
      setProgress(prev => ({ ...prev, [stepId]: 0 }))
      setUploading(prev => ({ ...prev, [stepId]: false }))
    } finally {
      clearInterval(progressInterval)
    }
  }

  const completedSteps = Object.values(docStatuses).filter(s => s === 'verified').length
  const totalRequired = KYC_STEPS.filter(s => s.required).length
  const progressPercent = Math.round((completedSteps / totalRequired) * 100)

  return (
    <div className="dashboard-page">
      <div className="kyc-header">
        <h1>🔐 KYC Verification</h1>
        {message && (
          <div className={`message-toast ${message.includes('✅') ? 'success' : 'error'}`}>
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
          <span>{progressPercent}%</span>
        </div>
        <div className="progress-bar-bg">
          <div 
            className="progress-bar-fill"
            style={{ width: `${progressPercent}%` }}
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
            progress={progress}
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