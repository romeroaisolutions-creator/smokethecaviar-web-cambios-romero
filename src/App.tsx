import Nav from './components/Nav'
import Hero from './components/Hero'
import Enneagram from './components/Enneagram'
import Manifesto from './components/Manifesto'
import Products from './components/Products'
import Artists from './components/Artists'
import SocialProof from './components/SocialProof'
import Process from './components/Process'
import CallToAction from './components/CallToAction'
import Consciousness from './components/Consciousness'
import Explore from './components/Explore'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ShaderBackground from './components/ui/shader-background'
import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function App() {
  useEffect(() => {
    // Global scroll animations setup can go here
  }, [])

  return (
    <div className="bg-transparent text-white-ivory min-h-screen relative">
      <ShaderBackground />
      <Nav />
      <main className="relative z-10">
        <Hero />
        <Enneagram />
        <Manifesto />
        <Consciousness />
        <Explore />
        <Artists />
        <Products />
        <SocialProof />
        <Process />
        <About />
        <CallToAction />
        <Contact />
      </main>

      <Footer />
    </div>
  )
}

export default App
