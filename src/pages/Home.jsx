import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import About from '../components/About'
import WhyInvest from '../components/WhyInvest'
import InvestmentTiers from '../components/InvestmentTiers'
import Team from '../components/Team'
import MissionVision from '../components/MissionVision'
import Contact from '../components/Contact'
import Footer from '../components/Footer'

export default function Home({
  currentSection,
  setCurrentSection
}) {

  return (
    <>
      <Navbar
        currentSection={currentSection}
      />

      <Hero
        currentSection={currentSection}
        setCurrentSection={setCurrentSection}
      />

      <About />
      <WhyInvest />
      <InvestmentTiers />
      <Team />
      <MissionVision/>
      <Contact />
      <Footer />
    </>
  )
}