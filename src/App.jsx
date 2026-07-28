import React from 'react';
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

export function App() {
  return (
    <div className="min-h-screen bg-[#0B0B11] text-slate-100 selection:bg-cyan-500 selection:text-black py-8 w-full relative">
      
      {/* Monolithic Seamless Grid Container Frame */}
      <div className="monolithic-frame">
        {/* Top Navbar Row */}
        <Navbar />

        {/* Hero 2-Column Grid Row */}
        <Hero />

        {/* Sub Nav Category Tabs Row */}
        <SubNavTabs />

        {/* Section 1: Bento Grid Feature Showcase Row */}
        <BentoGrid />

        {/* Section 2: Architecture & Foundation Grid Row */}
        <FoundationGrid />

        {/* Section 3: Framework Integration Flow */}
        <FrameworkFlow />

        {/* Section 4: Testimonials & Community Stats */}
        <Testimonials />

        {/* Section 5: Dedicated Unikorn Vietnam Feature Section */}
        <UnikornSection />

        {/* Section 6: Dedicated I2FLabs Development Team Section */}
        <I2FLabsSection />

        {/* Section 7: Open Source Sponsors */}
        <Sponsors />

        {/* Section 8: CTA Banner */}
        <CtaBanner />

        {/* Footer */}
        <Footer />
      </div>

      {/* Floating Fixed Scroll To Top Button */}
      <ScrollToTop />

    </div>
  );
}

export default App;
