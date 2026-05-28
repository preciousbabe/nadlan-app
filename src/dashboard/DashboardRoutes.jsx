import { Routes, Route } from 'react-router-dom'
import DashboardLayout from './layouts/DashboardLayout'
import AdminPayments from "./admin/AdminPayments";
import DashboardHome from './pages/DashboardHome'
import InvestmentPlans from './pages/InvestmentPlans'
import Portfolio from './pages/Portfolio'
import Installments from './pages/Installments'
import ROI from './pages/ROI'
import Advisor from './pages/Advisor'
import KYC from './pages/KYC'
import Settings from './pages/Settings'
import Notifications from './pages/Notifications'
import Transactions from './pages/Transactions'

export default function DashboardRoutes() {
  return (
    <DashboardLayout>
      <Routes>
        <Route path="/" element={<DashboardHome />} />
        <Route path="investment-plans" element={<InvestmentPlans />} />
        <Route path="portfolio" element={<Portfolio />} />
        <Route path="installments" element={<Installments />} />
        <Route path="roi" element={<ROI />} />
        <Route path="advisor" element={<Advisor />} />
        <Route path="kyc" element={<KYC />} />
        <Route path="settings" element={<Settings />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="transactions" element={<Transactions />} />
        <Route path="/dashboard/admin/payments" element={<AdminPayments />} />
      </Routes>
    </DashboardLayout>
  )
}
