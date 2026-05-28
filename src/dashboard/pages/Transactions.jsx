import { useAuth } from '../../context/AuthContext'
import useDashboardData from '../../hooks/useDashboardData'
import { useState } from 'react'

const TYPE_ICONS = {
  investment: '🏗️',
  deposit: '💰',
  withdrawal: '💸',
  roi_payout: '📈',
  installment_payment: '💳',
  refund: '↩️'
}

const TYPE_COLORS = {
  investment: '#C9A962',
  deposit: '#4CAF50',
  withdrawal: '#FF4D4D',
  roi_payout: '#2196F3',
  installment_payment: '#FF9800',
  refund: '#9C27B0'
}

function TransactionRow({ transaction }) {
  const isCredit = ['deposit', 'roi_payout', 'refund'].includes(transaction.type)
  const icon = TYPE_ICONS[transaction.type] || '💱'
  const color = TYPE_COLORS[transaction.type] || '#888'

  return (
    <div className="transaction-row">
      <div className="transaction-icon" style={{ background: `${color}20`, color }}>
        {icon}
      </div>
      <div className="transaction-details">
        <h4>{transaction.type?.replace('_', ' ')?.toUpperCase()}</h4>
        <p className="transaction-ref">Ref: {transaction.reference || 'N/A'}</p>
        <p className="transaction-date">
          {new Date(transaction.created_at).toLocaleDateString('en-NG', {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}
        </p>
      </div>
      <div className="transaction-amount-section">
        <span className={`transaction-amount ${isCredit ? 'credit' : 'debit'}`}>
          {isCredit ? '+' : '-'}₦{transaction.amount?.toLocaleString()}
        </span>
        <span className={`transaction-status ${transaction.status}`}>
          {transaction.status}
        </span>
      </div>
    </div>
  )
}

export default function Transactions() {
  const { user } = useAuth()
  const { transactions, loading } = useDashboardData(user)
  const [filter, setFilter] = useState('all')
  const [sortBy, setSortBy] = useState('newest')

  const filteredTransactions = transactions.filter(tx => {
    if (filter === 'all') return true
    if (filter === 'credit') return ['deposit', 'roi_payout', 'refund'].includes(tx.type)
    if (filter === 'debit') return ['investment', 'withdrawal', 'installment_payment'].includes(tx.type)
    return tx.type === filter
  })

  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    if (sortBy === 'newest') return new Date(b.created_at) - new Date(a.created_at)
    if (sortBy === 'oldest') return new Date(a.created_at) - new Date(b.created_at)
    if (sortBy === 'highest') return b.amount - a.amount
    if (sortBy === 'lowest') return a.amount - b.amount
    return 0
  })

  const totalCredit = transactions
    .filter(tx => ['deposit', 'roi_payout', 'refund'].includes(tx.type))
    .reduce((sum, tx) => sum + (tx.amount || 0), 0)

  const totalDebit = transactions
    .filter(tx => ['investment', 'withdrawal', 'installment_payment'].includes(tx.type))
    .reduce((sum, tx) => sum + (tx.amount || 0), 0)

  if (loading) {
    return (
      <div className="dashboard-page">
        <div className="dashboard-loading">
          <div className="spinner"></div>
          <p>Loading transactions...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="dashboard-page">
      <div className="transactions-header">
        <h1>Transaction History</h1>
      </div>

      {/* Summary Cards */}
      <div className="transactions-summary">
        <div className="summary-card">
          <span className="summary-label">Total Transactions</span>
          <span className="summary-value">{transactions.length}</span>
        </div>
        <div className="summary-card">
          <span className="summary-label">Total Inflow</span>
          <span className="summary-value" style={{ color: '#4CAF50' }}>
            ₦{totalCredit.toLocaleString()}
          </span>
        </div>
        <div className="summary-card">
          <span className="summary-label">Total Outflow</span>
          <span className="summary-value" style={{ color: '#FF4D4D' }}>
            ₦{totalDebit.toLocaleString()}
          </span>
        </div>
        <div className="summary-card">
          <span className="summary-label">Net Flow</span>
          <span className="summary-value" style={{ color: totalCredit - totalDebit >= 0 ? '#4CAF50' : '#FF4D4D' }}>
            ₦{(totalCredit - totalDebit).toLocaleString()}
          </span>
        </div>
      </div>

      {/* Filters */}
      <div className="transactions-filters">
        <div className="filter-group">
          <label>Filter:</label>
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">All Transactions</option>
            <option value="credit">Inflow Only</option>
            <option value="debit">Outflow Only</option>
            <option value="investment">Investments</option>
            <option value="deposit">Deposits</option>
            <option value="roi_payout">ROI Payouts</option>
            <option value="installment_payment">Installments</option>
          </select>
        </div>
        <div className="filter-group">
          <label>Sort:</label>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="highest">Highest Amount</option>
            <option value="lowest">Lowest Amount</option>
          </select>
        </div>
      </div>

      {/* Transactions List */}
      <div className="transactions-list">
        {sortedTransactions.length > 0 ? (
          sortedTransactions.map(tx => (
            <TransactionRow key={tx.id} transaction={tx} />
          ))
        ) : (
          <div className="empty-state-large">
            <div className="empty-icon">📋</div>
            <h3>No transactions yet</h3>
            <p>Your transaction history will appear here</p>
          </div>
        )}
      </div>
    </div>
  )
}
