import { Routes, Route } from 'react-router-dom'

import Home from '../pages/Home'
import Confirm from '../auth/Confirm'
import Properties from '../pages/Properties'
import Developments from '../pages/Developments'
import Investments from '../pages/Investments'
import About from '../pages/About'
import Solar from '../pages/Solar'
import Energy from '../pages/Energy'
import Sustainability from '../pages/Sustainability'
import Projects from '../pages/Projects'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import DashboardRoutes from '../dashboard/DashboardRoutes'
import ProtectedRoute from '../components/ProtectedRoute'
import GreenLayout from '../Layout/GreenLayout'
import RealLayout from '../Layout/RealLayout'
import FooterLayout from '../Layout/FooterLayout'
import ScrollToHash from '../components/ScrollToHash'
import ScrollToTop from '../components/ScrollToTop'

import Blog from '../pages/Blog'
import MarketReports from '../pages/MarketReports'
import FAQs from '../pages/FAQs'
import PrivacyPolicy from '../pages/PrivacyPolicy'
import TermsOfService from '../pages/TermsOfService'
import RiskDisclosure from '../pages/RiskDisclosure'
import CookiePolicy from '../pages/CookiePolicy'

export default function AppRoutes({ currentSection, setCurrentSection }) {
  return (
    <>
      <ScrollToTop />
      <ScrollToHash />

      <Routes>
        <Route
          path="/"
          element={
            <Home
              currentSection={currentSection}
              setCurrentSection={setCurrentSection}
            />
          }
        />
        <Route path="/auth/confirm" element={<Confirm />} />

        {/* REAL ESTATE */}
        <Route path="/properties" element={<RealLayout><Properties /></RealLayout>} />
        <Route path="/developments" element={<RealLayout><Developments /></RealLayout>} />
        <Route path="/investments" element={<RealLayout><Investments /></RealLayout>} />
        <Route path="/about" element={<RealLayout><About /></RealLayout>} />

        {/* GREEN ENERGY */}
        <Route path="/solar" element={<GreenLayout><Solar /></GreenLayout>} />
        <Route path="/energy" element={<GreenLayout><Energy /></GreenLayout>} />
        <Route path="/sustainability" element={<GreenLayout><Sustainability /></GreenLayout>} />
        <Route path="/projects" element={<GreenLayout><Projects /></GreenLayout>} />

        {/* AUTH */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* LEGAL & INFO PAGES — FooterLayout */}
        <Route element={<FooterLayout />}>
          <Route path="/blog" element={<Blog />} />
          <Route path="/market-reports" element={<MarketReports />} />
          <Route path="/faqs" element={<FAQs />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/risk" element={<RiskDisclosure />} />
          <Route path="/cookies" element={<CookiePolicy />} />
        </Route>

        {/* DASHBOARD */}
        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute>
              <DashboardRoutes />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  )
}