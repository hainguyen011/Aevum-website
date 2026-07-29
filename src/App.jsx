import { useEffect, useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SubNavTabs } from './components/SubNavTabs';
import { BentoGrid } from './components/BentoGrid';
import { FoundationGrid } from './components/FoundationGrid';
import { FrameworkFlow } from './components/FrameworkFlow';
import { Testimonials } from './components/Testimonials';
import { UnikornSection } from './components/UnikornSection';
import { I2FLabsSection } from './components/I2FLabsSection';
import { Sponsors } from './components/Sponsors';
import { CtaBanner } from './components/CtaBanner';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { Docs } from './components/Docs';
import { About } from './components/About';
import { TrialModal } from './components/TrialModal';
import logoImg from '../assets/logos/AevumOS-transparent.png';

export function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [isTrialModalOpen, setIsTrialModalOpen] = useState(false);

  // Dynamically set favicon using compiled Vite asset to bypass manual filesystem operations
  useEffect(() => {
    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.getElementsByTagName('head')[0].appendChild(link);
    }
    link.href = logoImg;
    link.type = 'image/png';
  }, []);

  // Detect browser language (default to 'vi' if Vietnamese, otherwise default to 'en')
  const getInitialLanguage = () => {
    const browserLang = navigator.language || navigator.userLanguage || '';
    return browserLang.toLowerCase().startsWith('vi') ? 'vi' : 'en';
  };

  const [activeLang, setActiveLang] = useState(getInitialLanguage());

  // Full Hash Routing Listener (supports #about, #docs, #landing, #architecture, etc.)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (hash === 'about') {
        setCurrentPage('about');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === 'docs') {
        setCurrentPage('docs');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === 'landing' || hash === 'home' || hash === '') {
        setCurrentPage('landing');
      } else {
        // Landing anchor section (#breakthroughs, #architecture, #orchestration, #cli)
        setCurrentPage('landing');
        setTimeout(() => {
          const el = document.getElementById(hash);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      }
    };

    // Initialize on mount
    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Handle routing navigation and scroll to top
  const handleNavigate = (page) => {
    setCurrentPage(page);
    if (page === 'landing') {
      window.history.pushState(null, '', window.location.pathname);
    } else {
      window.location.hash = page;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#0B0B11] text-slate-100 selection:bg-cyan-500 selection:text-black py-8 w-full relative">
      
      {/* Monolithic Seamless Grid Container Frame */}
      <div className="monolithic-frame">
        {/* Top Navbar Row */}
        <Navbar 
          currentPage={currentPage} 
          onNavigate={handleNavigate} 
          activeLang={activeLang} 
          onChangeLang={setActiveLang} 
        />

        {currentPage === 'landing' && (
          <>
            {/* Hero 2-Column Grid Row */}
            <Hero 
              onNavigate={handleNavigate} 
              onOpenTrialModal={() => setIsTrialModalOpen(true)}
              activeLang={activeLang} 
            />

            {/* Sub Nav Category Tabs Row */}
            <SubNavTabs activeLang={activeLang} />

            {/* Section 1: Bento Grid Feature Showcase Row */}
            <BentoGrid activeLang={activeLang} />

            {/* Section 2: Architecture & Foundation Grid Row */}
            <FoundationGrid activeLang={activeLang} />

            {/* Section 3: Framework Integration Flow */}
            <FrameworkFlow activeLang={activeLang} />

            {/* Section 4: Testimonials & Community Stats */}
            <Testimonials activeLang={activeLang} />

            {/* Section 5: Dedicated Unikorn Vietnam Feature Section */}
            <UnikornSection activeLang={activeLang} />

            {/* Section 6: Dedicated I2FLabs Development Team Section */}
            <I2FLabsSection activeLang={activeLang} />

            {/* Section 7: Open Source Sponsors */}
            <Sponsors />

            {/* Section 8: CTA Banner */}
            <CtaBanner 
              onNavigate={handleNavigate} 
              onOpenTrialModal={() => setIsTrialModalOpen(true)}
              activeLang={activeLang} 
            />
          </>
        )}

        {currentPage === 'docs' && (
          <Docs activeLang={activeLang} />
        )}

        {currentPage === 'about' && (
          <About activeLang={activeLang} />
        )}

        {/* Footer */}
        <Footer onNavigate={handleNavigate} activeLang={activeLang} />
      </div>

      {/* Early Access Trial Modal */}
      <TrialModal 
        isOpen={isTrialModalOpen}
        onClose={() => setIsTrialModalOpen(false)}
        activeLang={activeLang}
      />

      {/* Floating Fixed Scroll To Top Button */}
      <ScrollToTop />

    </div>
  );
}

export default App;
