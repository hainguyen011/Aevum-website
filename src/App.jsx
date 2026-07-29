import { useState } from 'react';
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

export function App() {
  const [currentPage, setCurrentPage] = useState('landing');

  // Detect browser language (default to 'vi' if Vietnamese, otherwise default to 'en')
  const getInitialLanguage = () => {
    const browserLang = navigator.language || navigator.userLanguage || '';
    return browserLang.toLowerCase().startsWith('vi') ? 'vi' : 'en';
  };

  const [activeLang, setActiveLang] = useState(getInitialLanguage());

  // Handle routing navigation and scroll to top
  const handleNavigate = (page) => {
    setCurrentPage(page);
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

        {currentPage === 'landing' ? (
          <>
            {/* Hero 2-Column Grid Row */}
            <Hero onNavigate={handleNavigate} activeLang={activeLang} />

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
            <CtaBanner onNavigate={handleNavigate} activeLang={activeLang} />
          </>
        ) : (
          <Docs activeLang={activeLang} />
        )}

        {/* Footer */}
        <Footer onNavigate={handleNavigate} activeLang={activeLang} />
      </div>

      {/* Floating Fixed Scroll To Top Button */}
      <ScrollToTop />

    </div>
  );
}

export default App;
