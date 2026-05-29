import { useState, useEffect } from 'react'
import { supabase } from '../../services/supabase'
import { useAuth } from '../../context/AuthContext'
import useDashboardData from '../../hooks/useDashboardData'
import { useNavigate } from 'react-router-dom'
import { getKycDocumentUrl } from '../../services/kycService' 

export default function AdminKYC() {
  const { user } = useAuth()
  const { isAdmin, loading: dashboardLoading } = useDashboardData(user)
  const navigate = useNavigate()
  
  const [pendingDocs, setPendingDocs] = useState([])
  const [loading, setLoading] = useState(true)
  const [processingId, setProcessingId] = useState(null)
  const [selectedDoc, setSelectedDoc] = useState(null)
  const [rejectionReason, setRejectionReason] = useState('')
  const [showRejectModal, setShowRejectModal] = useState(false)
  const [filter, setFilter] = useState('all')
  const [stats, setStats] = useState({
    totalPending: 0,
    totalVerified: 0,
    totalRejected: 0,
    identityPending: 0,
    addressPending: 0,
    selfiePending: 0
  })

  // Redirect non-admin users
  useEffect(() => {
    if (dashboardLoading) return
    if (!isAdmin) {
      navigate('/dashboard')
    }
    console.log('AdminKYC: isAdmin =', isAdmin)
  console.log('AdminKYC: dashboardLoading =', dashboardLoading)
  }, [isAdmin, dashboardLoading, navigate])

  useEffect(() => {
    fetchKYCData()
    
    const subscription = supabase
      .channel('kyc-submissions')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'kyc_documents' },
        () => fetchKYCData()
      )
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  async function fetchKYCData() {
  console.log('AdminKYC: fetchKYCData called')
  setLoading(true)
  try {
    const { data: docs, error: docsError } = await supabase
      .from('kyc_documents')
      .select('*')
      .order('created_at', { ascending: false })

    console.log('AdminKYC: docs =', docs)           // <-- ADD THIS
    console.log('AdminKYC: docsError =', docsError) // <-- ADD THIS
    console.log('AdminKYC: docs length =', docs?.length) // <-- ADD THIS

    if (docsError) throw docsError

    const userIds = [...new Set(docs?.map(d => d.user_id) || [])]
    console.log('AdminKYC: userIds =', userIds)
    console.log('AdminKYC: userIds length =', userIds.length)
    
    
    const { data: profiles, error: profilesError } = await supabase
      .from('profiles')
      .select('id, full_name, phone, kyc_status')
      .in('id', userIds)

      console.log('AdminKYC: profiles =', profiles)
    console.log('AdminKYC: profilesError =', profilesError)


    if (profilesError) throw profilesError

    // 3. Merge them manually
    const profileMap = {}
    profiles?.forEach(p => { profileMap[p.id] = p })

    const mergedData = docs?.map(doc => ({
      ...doc,
      profiles: profileMap[doc.user_id] || null
    })) || []

    setPendingDocs(mergedData)
    
    const pending = mergedData.filter(d => d.status === 'pending')
    const verified = mergedData.filter(d => d.status === 'verified')
    const rejected = mergedData.filter(d => d.status === 'rejected')
    
    setStats({
      totalPending: pending.length,
      totalVerified: verified.length,
      totalRejected: rejected.length,
      identityPending: pending.filter(d => d.document_type === 'identity').length,
      addressPending: pending.filter(d => d.document_type === 'address').length,
      selfiePending: pending.filter(d => d.document_type === 'selfie').length
    })
  } catch (err) {
    console.error('Fetch error:', err)
  } finally {
    setLoading(false)
  }
}


  async function approveDocument(doc) {
    setProcessingId(doc.id)
    try {
      const { error: docError } = await supabase
        .from('kyc_documents')
        .update({ 
          status: 'verified',
          verified_at: new Date().toISOString(),
          verified_by: user.id
        })
        .eq('id', doc.id)

      if (docError) throw docError

      const { data: userDocs } = await supabase
        .from('kyc_documents')
        .select('status')
        .eq('user_id', doc.user_id)

      const allVerified = userDocs?.length >= 3 && userDocs.every(d => d.status === 'verified')

      if (allVerified) {
        await supabase
          .from('profiles')
          .update({ kyc_status: 'verified' })
          .eq('id', doc.user_id)
      }

      await supabase.from('notifications').insert({
        user_id: doc.user_id,
        title: 'KYC Document Approved ✅',
        message: `Your ${getDocTypeLabel(doc.document_type)} has been approved.`,
        type: 'kyc_approved',
        read: false
      })

      setSelectedDoc(null)
      await fetchKYCData()
    } catch (err) {
      console.error('Approval error:', err)
      alert('Failed to approve document: ' + err.message)
    } finally {
      setProcessingId(null)
    }
  }

  async function rejectDocument(doc) {
    if (!rejectionReason.trim()) {
      alert('Please provide a rejection reason')
      return
    }

    setProcessingId(doc.id)
    try {
      const { error: docError } = await supabase
        .from('kyc_documents')
        .update({ 
          status: 'rejected',
          rejection_reason: rejectionReason,
          rejected_at: new Date().toISOString(),
          rejected_by: user.id
        })
        .eq('id', doc.id)

      if (docError) throw docError

      await supabase
        .from('profiles')
        .update({ kyc_status: 'rejected' })
        .eq('id', doc.user_id)

      await supabase.from('notifications').insert({
        user_id: doc.user_id,
        title: 'KYC Document Rejected ❌',
        message: `Your ${getDocTypeLabel(doc.document_type)} was rejected. Reason: ${rejectionReason}`,
        type: 'kyc_rejected',
        read: false
      })

      setShowRejectModal(false)
      setRejectionReason('')
      setSelectedDoc(null)
      await fetchKYCData()
    } catch (err) {
      console.error('Rejection error:', err)
      alert('Failed to reject document: ' + err.message)
    } finally {
      setProcessingId(null)
    }
  }

  function getDocTypeLabel(type) {
    const labels = {
      identity: 'Identity Document',
      address: 'Proof of Address',
      selfie: 'Selfie Verification'
    }
    return labels[type] || type
  }

  function getDocTypeIcon(type) {
    const icons = {
      identity: '🆔',
      address: '🏠',
      selfie: '📸'
    }
    return icons[type] || '📄'
  }

  const filteredDocs = pendingDocs.filter(d => {
    if (filter === 'all') return true
    return d.status === filter
  })

  if (!isAdmin) return null

  return (
    <div className="dashboard-page admin-kyc">
      <div className="admin-header">
        <h1>🔐 KYC Verification Panel</h1>
        <p className="admin-subtitle">Review and approve user identity documents</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card pending">
          <span className="stat-number">{stats.totalPending}</span>
          <span className="stat-label">Pending Review</span>
        </div>
        <div className="stat-card verified">
          <span className="stat-number">{stats.totalVerified}</span>
          <span className="stat-label">Verified</span>
        </div>
        <div className="stat-card rejected">
          <span className="stat-number">{stats.totalRejected}</span>
          <span className="stat-label">Rejected</span>
        </div>
      </div>

      <div className="stats-grid secondary">
        <div className="stat-card">
          <span className="stat-number">{stats.identityPending}</span>
          <span className="stat-label">🆔 ID Pending</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">{stats.addressPending}</span>
          <span className="stat-label">🏠 Address Pending</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">{stats.selfiePending}</span>
          <span className="stat-label">📸 Selfie Pending</span>
        </div>
      </div>

      <div className="filter-tabs">
        <button className={filter === 'all' ? 'active' : ''} onClick={() => setFilter('all')}>
          All Documents
        </button>
        <button className={filter === 'pending' ? 'active' : ''} onClick={() => setFilter('pending')}>
          ⏳ Pending
        </button>
        <button className={filter === 'verified' ? 'active' : ''} onClick={() => setFilter('verified')}>
          ✅ Verified
        </button>
        <button className={filter === 'rejected' ? 'active' : ''} onClick={() => setFilter('rejected')}>
          ❌ Rejected
        </button>
      </div>

      {loading ? (
        <div className="loading-state">Loading KYC documents...</div>
      ) : filteredDocs.length === 0 ? (
        <div className="empty-state">
          <span className="empty-icon">✅</span>
          <h3>No documents found</h3>
          <p>All caught up!</p>
        </div>
      ) : (
        <div className="payments-table-container">
          <table className="payments-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>User</th>
                <th>Document Type</th>
                <th>Status</th>
                <th>Document</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDocs.map(doc => {
                const profile = doc.profiles
                const isPending = doc.status === 'pending'
                
                return (
                  <tr key={doc.id} className={`payment-row ${doc.status}`}>
                    <td className="date-cell">
                      {new Date(doc.created_at).toLocaleDateString('en-NG')}
                      <span className="time">
                        {new Date(doc.created_at).toLocaleTimeString('en-NG', { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </td>
                    <td className="investor-cell">
                      <strong>{profile?.full_name || 'Unknown'}</strong>
                      <span className={`kyc-badge ${profile?.kyc_status}`}>
                        {profile?.kyc_status}
                      </span>
                    </td>
                    <td className="plan-cell">
                      <span className="doc-type">
                        {getDocTypeIcon(doc.document_type)} {getDocTypeLabel(doc.document_type)}
                      </span>
                    </td>
                    <td className="method-cell">
                      <span className={`method-badge ${doc.status}`}>
                        {doc.status === 'pending' ? '⏳ Pending' : 
                         doc.status === 'verified' ? '✅ Verified' : '❌ Rejected'}
                      </span>
                    </td>
                    <td className="proof-cell">
                      <button 
                        className="proof-link"
                        onClick={() => setSelectedDoc(doc)}
                      >
                        👁️ View Document
                      </button>
                    </td>
                    <td className="actions-cell">
                      {isPending && (
                        <>
                          <button
                            className="verify-btn"
                            onClick={() => approveDocument(doc)}
                            disabled={processingId === doc.id}
                          >
                            {processingId === doc.id ? '...' : '✓ Approve'}
                          </button>
                          <button
                            className="reject-btn"
                            onClick={() => {
                              setSelectedDoc(doc)
                              setShowRejectModal(true)
                            }}
                            disabled={processingId === doc.id}
                          >
                            ✕ Reject
                          </button>
                        </>
                      )}
                      {doc.status === 'verified' && (
                        <span className="verified-check">✓ Approved</span>
                      )}
                      {doc.status === 'rejected' && (
                        <span className="rejected-text" title={doc.rejection_reason}>
                          Rejected
                        </span>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Document Preview Modal */}
      {selectedDoc && !showRejectModal && (
        <div className="modal-overlay" onClick={() => setSelectedDoc(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>
                {getDocTypeIcon(selectedDoc.document_type)} {getDocTypeLabel(selectedDoc.document_type)}
              </h3>
              <button className="modal-close" onClick={() => setSelectedDoc(null)}>×</button>
            </div>
            <div className="modal-body">
              <div className="doc-preview">
                <DocumentViewer filePath={selectedDoc.file_path} />
              </div>
              <div className="doc-info">
                <p><strong>User:</strong> {selectedDoc.profiles?.full_name}</p>
                <p><strong>Submitted:</strong> {new Date(selectedDoc.created_at).toLocaleString()}</p>
                <p><strong>Status:</strong> {selectedDoc.status}</p>
              </div>
            </div>
            {selectedDoc.status === 'pending' && (
              <div className="modal-actions">
                <button
                  className="verify-btn large"
                  onClick={() => approveDocument(selectedDoc)}
                  disabled={processingId === selectedDoc.id}
                >
                  {processingId === selectedDoc.id ? 'Approving...' : '✓ Approve Document'}
                </button>
                <button
                  className="reject-btn large"
                  onClick={() => setShowRejectModal(true)}
                  disabled={processingId === selectedDoc.id}
                >
                  ✕ Reject Document
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Rejection Modal */}
      {showRejectModal && selectedDoc && (
        <div className="modal-overlay" onClick={() => setShowRejectModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>❌ Reject Document</h3>
              <button className="modal-close" onClick={() => setShowRejectModal(false)}>×</button>
            </div>
            <div className="modal-body">
              <p>
                Rejecting: <strong>{getDocTypeLabel(selectedDoc.document_type)}</strong> for{' '}
                <strong>{selectedDoc.profiles?.full_name}</strong>
              </p>
              <textarea
                placeholder="Enter rejection reason (required)..."
                value={rejectionReason}
                onChange={e => setRejectionReason(e.target.value)}
                rows={4}
                className="rejection-textarea"
              />
            </div>
            <div className="modal-actions">
              <button className="secondary-btn" onClick={() => setShowRejectModal(false)}>
                Cancel
              </button>
              <button
                className="reject-btn large"
                onClick={() => rejectDocument(selectedDoc)}
                disabled={processingId === selectedDoc.id || !rejectionReason.trim()}
              >
                {processingId === selectedDoc.id ? 'Rejecting...' : 'Confirm Rejection'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// FIXED: DocumentViewer now uses signed URLs for private buckets
function DocumentViewer({ filePath }) {
  const [url, setUrl] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function loadUrl() {
      try {
        setLoading(true)
        setError(null)
        const signedUrl = await getKycDocumentUrl(filePath, 600) // 10 minutes
        setUrl(signedUrl)
      } catch (err) {
        console.error('Failed to get document URL:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    
    if (filePath) {
      loadUrl()
    }
  }, [filePath])

  if (loading) return <div className="doc-loading">Loading document...</div>
  if (error) return <div className="doc-error">Failed to load document: {error}</div>
  if (!url) return <div className="doc-error">Failed to load document</div>

  const isPdf = filePath.toLowerCase().endsWith('.pdf')

  if (isPdf) {
    return (
      <iframe 
        src={url} 
        className="doc-iframe" 
        title="Document Preview"
        style={{ width: '100%', height: '500px', border: 'none' }}
      />
    )
  }

  return (
    <img 
      src={url} 
      alt="KYC Document" 
      className="doc-image"
      style={{ maxWidth: '100%', maxHeight: '500px', objectFit: 'contain' }}
    />
  )
}