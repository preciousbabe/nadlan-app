import { Routes, Route } from 'react-router-dom'

import Home from '../pages/Home'
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
import RealLayout from '../Layout/RealLayout';
import ScrollToHash from '../components/ScrollToHash'

export default function AppRoutes({ currentSection, setCurrentSection }) {
  return (
  <>
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

      {/* REAL ESTATE — uses your existing Navbar/Footer */}
       <Route path="/properties" element={<RealLayout><Properties /></RealLayout>} />
      <Route path="/developments" element={<RealLayout><Developments /></RealLayout>} />
      <Route path="/investments" element={<RealLayout><Investments /></RealLayout>} />
      <Route path="/about" element={<RealLayout><About /></RealLayout>} />

      {/* GREEN ENERGY — wrapped with GreenLayout (NavbarGreen + FooterGreen) */}
      <Route path="/solar" element={<GreenLayout><Solar /></GreenLayout>} />
      <Route path="/energy" element={<GreenLayout><Energy /></GreenLayout>} />
      <Route path="/sustainability" element={<GreenLayout><Sustainability /></GreenLayout>} />
      <Route path="/projects" element={<GreenLayout><Projects /></GreenLayout>} />

      {/* AUTH — keep as-is or wrap if you want green nav there too */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

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