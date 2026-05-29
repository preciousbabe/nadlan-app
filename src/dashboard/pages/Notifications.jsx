import { useAuth } from '../../context/AuthContext'
import { useDashboard } from '../../context/DashboardContext'
import { supabase } from '../../services/supabase'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const TYPE_CONFIG = {
  success: { icon: '✓', color: '#4CAF50', bg: '#4CAF5020' },
  warning: { icon: '⚠', color: '#FF9800', bg: '#FF980020' },
  info: { icon: 'ℹ', color: '#2196F3', bg: '#2196F320' },
  error: { icon: '✕', color: '#FF4D4D', bg: '#FF4D4D20' }
}

function NotificationItem({ notification, onRead }) {
  const config = TYPE_CONFIG[notification.type] || TYPE_CONFIG.info

  return (
    <div className={`notification-item ${!notification.read ? 'unread' : ''}`}>
      <div
        className="notification-icon"
        style={{ background: config.bg, color: config.color }}
      >
        {config.icon}
      </div>

      <div className="notification-content">
        <div className="notification-header">
          <h4>{notification.title}</h4>
          <span className="notification-time">
            {new Date(notification.created_at).toLocaleString()}
          </span>
        </div>

        <p>{notification.message}</p>

        <div className="notification-actions">
          {notification.action_path && (
            <Link to={notification.action_path}>
              View →
            </Link>
          )}

          {!notification.read && (
            <button onClick={() => onRead(notification.id)}>
              Mark as read
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default function Notifications() {
  const { user } = useAuth()
  const { notifications } = useDashboard()
  const [filter, setFilter] = useState('all')

  // Guard against undefined/null
  const safeNotifications = notifications || []

  const filtered = safeNotifications.filter(n => {
    if (filter === 'all') return true
    if (filter === 'unread') return !n.read
    return n.type === filter
  })

  const unreadCount = safeNotifications.filter(n => !n.read).length

  async function markAsRead(id) {
    const { error } = await supabase
      .from('notifications')
      .update({ read: true })
      .eq('id', id)

    if (error) console.error('Mark as read error:', error)
    // useBootstrap will refetch on next mount, or you can trigger a refresh
  }

  async function markAllAsRead() {
    const { error } = await supabase
      .from('notifications')
      .update({ read: true })
      .eq('user_id', user.id)
      .eq('read', false)

    if (error) console.error('Mark all as read error:', error)
  }

  return (
    <div className="dashboard-page">

      <div className="notifications-header">
        <h1>Notifications</h1>

        {unreadCount > 0 && (
          <button onClick={markAllAsRead}>
            Mark all as read
          </button>
        )}
      </div>

      <div className="filter-tabs">
        {['all', 'unread', 'success', 'warning', 'info'].map(type => (
          <button
            key={type}
            className={filter === type ? 'active' : ''}
            onClick={() => setFilter(type)}
          >
            {type}
          </button>
        ))}
      </div>

      <div className="notification-warning">
        Notifications older than 14 days are automatically removed.
      </div>

      <div className="notifications-list">
        {filtered.length > 0 ? (
          filtered.map(n => (
            <NotificationItem
              key={n.id}
              notification={n}
              onRead={markAsRead}
            />
          ))
        ) : (
          <p>No notifications</p>
        )}
      </div>
    </div>
  )
}