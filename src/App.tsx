import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Nav from './components/Nav';
import Footer from './components/Footer';
import ShaderBackground from './components/ui/shader-background';
import HomePage from './pages/HomePage';
import HistoriaPage from './pages/HistoriaPage';
import EneagramaPage from './pages/EneagramaPage';
import SentirPage from './pages/SentirPage';
import ExplorarPage from './pages/ExplorarPage';
import SonidoPage from './pages/SonidoPage';
import RitualesPage from './pages/RitualesPage';
import NosotrosPage from './pages/NosotrosPage';
import ContactoPage from './pages/ContactoPage';

gsap.registerPlugin(ScrollTrigger);

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
    ScrollTrigger.refresh();
  }, [pathname]);
  return null;
};

const Shell = () => (
  <div className="bg-transparent text-white-ivory min-h-screen relative">
    <ShaderBackground />
    <Nav />
    <ScrollToTop />
    <div className="relative z-10">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/historia" element={<HistoriaPage />} />
        <Route path="/eneagrama" element={<EneagramaPage />} />
        <Route path="/sentir" element={<SentirPage />} />
        <Route path="/explorar" element={<ExplorarPage />} />
        <Route path="/sonido" element={<SonidoPage />} />
        <Route path="/rituales" element={<RitualesPage />} />
        <Route path="/nosotros" element={<NosotrosPage />} />
        <Route path="/contacto" element={<ContactoPage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </div>
    <Footer />
  </div>
);

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Shell />
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
