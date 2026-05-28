import { useEffect, useState } from 'react'
import { supabase } from '../services/supabase'

export default function useDashboardData(user) {
  const [data, setData] = useState({
    profile: null,
    investments: [],
    transactions: [],
    installments: [],
    plans: [],
    stats: {
      totalInvested: 0,
      totalRoi: 0,
      activeInvestments: 0,
      pendingInstallments: 0
    },
    loading: true
  })

  useEffect(() => {
    if (!user) return
    fetchAllData()
  }, [user])

  async function fetchAllData() {
    try {
      // 1. Fetch profile
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      // 2. Fetch investments with plan details
      const { data: investments } = await supabase
        .from('user_investments')
        .select(`*, investment_plan:investment_plan_id (*)`)
        .eq('user_id', user.id)
        .order('started_at', { ascending: false })

      // 3. Fetch transactions
      const { data: transactions } = await supabase
        .from('transactions')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      // 4. Fetch installments
      const investmentIds = investments?.map(i => i.id) || []
      let installments = []
      if (investmentIds.length > 0) {
        const { data: instData } = await supabase
          .from('installments')
          .select('*')
          .in('investment_id', investmentIds)
          .order('due_date', { ascending: true })
        installments = instData || []
      }

      // 5. Fetch plans
      const { data: plans } = await supabase
        .from('investment_plans')
        .select('*')
        .eq('status', 'active')
        .order('minimum_amount', { ascending: true })

      // Calculate stats
      const totalInvested = investments?.reduce((sum, inv) => sum + (inv.amount || 0), 0) || 0
      const totalRoi = investments?.reduce((sum, inv) => sum + (inv.roi_earned || 0), 0) || 0
      const activeInvestments = investments?.filter(inv => inv.status === 'active').length || 0
      const pendingInstallments = installments?.filter(inst => !inst.paid).length || 0

      setData({
        profile: profile || null,
        investments: investments || [],
        transactions: transactions || [],
        installments: installments || [],
        plans: plans || [],
        stats: { totalInvested, totalRoi, activeInvestments, pendingInstallments },
        loading: false
      })
    } catch (error) {
      console.error('Dashboard data fetch error:', error)
      setData(prev => ({ ...prev, loading: false }))
    }
  }

  async function refresh() {
    setData(prev => ({ ...prev, loading: true }))
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