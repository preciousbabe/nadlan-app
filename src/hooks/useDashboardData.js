import { useEffect, useState } from 'react'
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
      totalRoi: 0,
      activeInvestments: 0,
      pendingInstallments: 0
    },
    loading: true
  })

  useEffect(() => {
    if (!user) {
      setData(prev => ({
        ...prev,
        loading: false,
        profile: null,
        isAdmin: false,
        investments: [],
        transactions: [],
        installments: [],
        plans: []
      }))
      return
    }

    fetchAllData()

  }, [user])

  async function fetchAllData() {

    setData(prev => ({
      ...prev,
      loading: true
    }))

    try {

      const [
        profileRes,
        investmentsRes,
        transactionsRes,
        plansRes
      ] = await Promise.all([

        supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .maybeSingle(),

        supabase
          .from('user_investments')
          .select(`*, investment_plan:investment_plan_id (*)`)
          .eq('user_id', user.id),

        supabase
          .from('transactions')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false }),

        supabase
          .from('investment_plans')
          .select('*')
          .eq('status', 'active')
      ])

      const investments = investmentsRes.data || []
      const investmentIds = investments.map(i => i.id)

      let installments = []

      if (investmentIds.length > 0) {
        const { data: instData } = await supabase
          .from('installments')
          .select('*')
          .in('investment_id', investmentIds)

        installments = instData || []
      }

      const totalInvested =
        investments.reduce((sum, inv) => sum + (inv.amount || 0), 0)

      const totalRoi =
        investments.reduce((sum, inv) => sum + (inv.roi_earned || 0), 0)

      const activeInvestments =
        investments.filter(inv => inv.status === 'active').length

      const pendingInstallments =
        installments.filter(inst => !inst.paid).length

      setData({
        profile: profileRes.data || null,
        isAdmin: profileRes.data?.role === 'admin',
        investments,
        transactions: transactionsRes.data || [],
        installments,
        plans: plansRes.data || [],
        stats: {
          totalInvested,
          totalRoi,
          activeInvestments,
          pendingInstallments
        },
        loading: false
      })

    } catch (error) {

      console.error('Dashboard error:', error)

      setData(prev => ({
        ...prev,
        loading: false
      }))
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