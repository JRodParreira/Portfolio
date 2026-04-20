import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useLanguage } from './context/LanguageContext';

// Importação dos Componentes Globais
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

// Importação das Páginas
import Home from './pages/Home';
import About from './pages/About';
import HospitalityOS from './pages/HospitalityOS';
import FoodBridge from './pages/FoodBridge';
import Projects from './pages/Projects';

function App() {
  const location = useLocation();
  const { language } = useLanguage();

  return (
    <div className="theme-page min-h-screen bg-white font-inter text-gray-900 flex flex-col">
      <ScrollToTop />
      <Navbar />

      <main className="flex-grow">
        {/* A key garante que a animação CSS fade-up reinicie em cada clique */}
        <div key={location.pathname + language}>
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/hospitality-os" element={<HospitalityOS />} />
            <Route path="/projects/foodbridge" element={<FoodBridge />} />
          </Routes>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
