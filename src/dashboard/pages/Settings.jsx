import { useAuth } from '../../context/AuthContext'
import useDashboardData from '../../hooks/useDashboardData'
import { supabase } from '../../services/supabase'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function SettingsSection({ title, children }) {
  return (
    <div className="settings-section">
      <h3 className="settings-section-title">{title}</h3>
      <div className="settings-section-content">
        {children}
      </div>
    </div>
  )
}

function InputField({ label, value, onChange, type = 'text', placeholder, disabled = false }) {
  return (
    <div className="input-field">
      <label>{label}</label>
      <input
        type={type}
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
      />
    </div>
  )
}

export default function Settings() {
  const { user, logout } = useAuth()
  const { profile, updateProfile } = useDashboardData(user)
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    full_name: '',
    username: '',
    phone: '',
    country: '',
    email: ''
  })

  const [bankDetails, setBankDetails] = useState({
    bank_name: '',
    account_number: '',
    account_name: ''
  })

  const [notifications, setNotifications] = useState({
    email_roi: true,
    email_installment: true,
    email_marketing: false,
    push_roi: true,
    push_installment: true
  })

  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (profile) {
      setFormData({
        full_name: profile.full_name || '',
        username: profile.username || '',
        phone: profile.phone || '',
        country: profile.country || '',
        email: user?.email || ''
      })
    }
  }, [profile, user])

  function updateForm(field, value) {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  function updateBank(field, value) {
    setBankDetails(prev => ({ ...prev, [field]: value }))
  }

  function toggleNotification(key) {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }))
  }

  async function handleSaveProfile() {
    setSaving(true)
    setMessage('')

    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: formData.full_name,
          username: formData.username,
          phone: formData.phone,
          country: formData.country,
          profile_completed: true
        })
        .eq('id', user.id)

      if (error) throw error

      setProfile(prev => ({
        ...prev,
        ...formData,
        profile_completed: true
      }))

      setMessage('Profile updated successfully!')
    } catch (err) {
      console.error('Save error:', err)
      setMessage('Failed to update profile.')
    } finally {
      setSaving(false)
      setTimeout(() => setMessage(''), 3000)
    }
  }

  async function handleLogout() {
    await logout()
    navigate('/login')
  }

  return (
    <div className="dashboard-page">
      <div className="settings-header">
        <h1>Settings</h1>
        {message && (
          <div className={`message-toast ${message.includes('success') ? 'success' : 'error'}`}>
            {message}
          </div>
        )}
      </div>

      {/* Profile Section */}
      <SettingsSection title="Profile Information">
        <div className="settings-form">
          <div className="form-row">
            <InputField
              label="Full Name"
              value={formData.full_name}
              onChange={(v) => updateForm('full_name', v)}
              placeholder="Enter your full name"
            />
            <InputField
              label="Username"
              value={formData.username}
              onChange={(v) => updateForm('username', v)}
              placeholder="Choose a username"
            />
          </div>
          <div className="form-row">
            <InputField
              label="Email"
              value={formData.email}
              onChange={() => {}}
              disabled={true}
            />
            <InputField
              label="Phone Number"
              value={formData.phone}
              onChange={(v) => updateForm('phone', v)}
              placeholder="+234..."
            />
          </div>
          <div className="form-row">
            <InputField
              label="Country"
              value={formData.country}
              onChange={(v) => updateForm('country', v)}
              placeholder="Nigeria"
            />
          </div>
          <button 
            className="save-btn"
            onClick={handleSaveProfile}
            disabled={saving}
          >
            {saving ? 'Saving...' : 'Save Profile'}
          </button>
        </div>
      </SettingsSection>

      {/* Bank Details Section */}
      <SettingsSection title="Bank Details (For ROI Payouts)">
        <div className="settings-form">
          <div className="form-row">
            <InputField
              label="Bank Name"
              value={bankDetails.bank_name}
              onChange={(v) => updateBank('bank_name', v)}
              placeholder="e.g. First Bank of Nigeria"
            />
            <InputField
              label="Account Number"
              value={bankDetails.account_number}
              onChange={(v) => updateBank('account_number', v)}
              placeholder="10 digit account number"
            />
          </div>
          <div className="form-row">
            <InputField
              label="Account Name"
              value={bankDetails.account_name}
              onChange={(v) => updateBank('account_name', v)}
              placeholder="Name as it appears on bank account"
            />
          </div>
          <p className="bank-hint">
            ⚠️ Ensure these details are accurate. ROI payouts will be sent to this account.
          </p>
          <button 
            className="save-btn secondary"
            onClick={() => setMessage('Bank details saved!')}
          >
            Save Bank Details
          </button>
        </div>
      </SettingsSection>

      {/* Notification Preferences */}
      <SettingsSection title="Notification Preferences">
        <div className="notification-preferences">
          <div className="preference-group">
            <h4>Email Notifications</h4>
            <div className="preference-item">
              <div className="preference-info">
                <span>ROI Payouts</span>
                <p>Get notified when ROI is credited</p>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={notifications.email_roi}
                  onChange={() => toggleNotification('email_roi')}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
            <div className="preference-item">
              <div className="preference-info">
                <span>Installment Reminders</span>
                <p>Reminders before payment due dates</p>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={notifications.email_installment}
                  onChange={() => toggleNotification('email_installment')}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
            <div className="preference-item">
              <div className="preference-info">
                <span>Marketing & Updates</span>
                <p>New investment plans and platform news</p>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={notifications.email_marketing}
                  onChange={() => toggleNotification('email_marketing')}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
          </div>
        </div>
      </SettingsSection>

      {/* Danger Zone */}
      <SettingsSection title="Account Actions">
        <div className="danger-zone">
          <button className="logout-btn" onClick={handleLogout}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            Log Out
          </button>
        </div>
      </SettingsSection>
    </div>
  )
}
