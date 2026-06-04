import { useEffect, useState, useCallback } from 'react'
import { supabase } from '../services/supabase'

export default function useDashboardData(user) {
  const [data, setData] = useState({
    profile: null,
    isAdmin: false,
    investments: [],
    transactions: [],
    installments: [],
    plans: [],
    stats: {
      totalInvested: 0,
      totalPaid: 0,
      totalBalance: 0,
      activeInvestments: 0,
      pendingPayments: 0
    },
    loading: true
  })

  // Extract fetch logic into useCallback so it can be called manually
  const fetchAllData = useCallback(async () => {
    if (!user) {
      setData({
        profile: null,
        isAdmin: false,
        investments: [],
        transactions: [],
        installments: [],
        plans: [],
        stats: {
          totalInvested: 0,
          totalPaid: 0,
          totalBalance: 0,
          activeInvestments: 0,
          pendingPayments: 0
        },
        loading: false
      })
      return
    }

    setData(prev => ({ ...prev, loading: true }))

    try {
      // 1. Fetch profile
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .maybeSingle()

      if (profileError) throw profileError

      // 2. Fetch investment plans
      const { data: plans, error: plansError } = await supabase
        .from('investment_plans')
        .select('*')
        .eq('status', 'active')

      if (plansError) throw plansError

      // 3. Fetch user investments
      const { data: investments, error: investmentsError } = await supabase
        .from('user_investments')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (investmentsError) throw investmentsError

      // 4. Fetch transactions
      const { data: transactions, error: transactionsError } = await supabase
        .from('transactions')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (transactionsError) throw transactionsError

      // 5. Fetch installments
      let allInstallments = []
      const investmentIds = (investments || []).map(i => i.id)

      if (investmentIds.length > 0) {
        const { data: instData, error: instError } = await supabase
          .from('installments')
          .select('*')
          .in('investment_id', investmentIds)
          .order('installment_number', { ascending: true })

        if (instError) {
          console.error('Installments fetch error:', instError)
        } else {
          allInstallments = instData || []
        }
      }

      // 6. Enrich investments
      const enrichedInvestments = (investments || []).map(inv => {
        const plan = (plans || []).find(p => p.id === inv.investment_plan_id)
        const invInstallments = allInstallments.filter(inst => inst.investment_id === inv.id)
        return {
          ...inv,
          investment_plan: plan || null,
          installments: invInstallments
        }
      })

      // 7. Calculate stats
      const totalInvested = enrichedInvestments.reduce((sum, inv) => sum + (inv.amount || 0), 0)
      const totalPaid = enrichedInvestments.reduce((sum, inv) => sum + (inv.total_paid || 0), 0)
      const totalBalance = enrichedInvestments.reduce((sum, inv) => sum + (inv.balance_remaining || 0), 0)
      const activeInvestments = enrichedInvestments.filter(inv => inv.status === 'active').length
      const pendingPayments = (transactions || []).filter(tx => tx.status === 'pending').length

      setData({
        profile: profile || null,
        isAdmin: profile?.role === 'admin' || profile?.is_admin === true,
        investments: enrichedInvestments,
        transactions: transactions || [],
        installments: allInstallments,
        plans: plans || [],
        stats: {
          totalInvested,
          totalPaid,
          totalBalance,
          activeInvestments,
          pendingPayments
        },
        loading: false
      })

    } catch (error) {
      console.error('Dashboard error:', error)
      setData(prev => ({ ...prev, loading: false }))
    }
  }, [user])

  // Auto-fetch on mount / user change
  useEffect(() => {
    fetchAllData()
  }, [fetchAllData])

  async function refresh() {
    await fetchAllData()
  }

  async function updateProfile(updates) {
    const { error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', user.id)

    if (!error) {
      setData(prev => ({
        ...prev,
        profile: { ...prev.profile, ...updates }
      }))
    }

    return { error }
  }

  return { ...data, refresh, updateProfile }
}