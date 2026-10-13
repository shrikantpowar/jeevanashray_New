import React, { useState, useEffect } from 'react';
import { AnnouncementBanner } from './components/AnnouncementBanner';
import { Header } from './components/Header';
import { GlobalHeroCarousel } from './components/GlobalHeroCarousel';
import { Footer } from './components/Footer';

// Pages
import { Home } from './pages/Home';
import { About } from './pages/About';
import { ProgramsPage } from './pages/ProgramsPage';
import { ImpactPage } from './pages/ImpactPage';
import { GalleryPage } from './pages/GalleryPage';
import { TeamPage } from './pages/TeamPage';
import { ReviewsPage } from './pages/ReviewsPage';
import { VolunteerPage } from './pages/VolunteerPage';
import { DonatePage } from './pages/DonatePage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsPage } from './pages/TermsPage';
import { RefundPolicyPage } from './pages/RefundPolicyPage';
import { DonationSuccessPage } from './pages/DonationSuccessPage';
import { DonationPendingPage } from './pages/DonationPendingPage';
import { NotFoundPage } from './pages/NotFoundPage';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname || '/';
  });

  const navigate = (path: string) => {
    // If navigating to hash on current page
    if (path.includes('#')) {
      const [basePath, hash] = path.split('#');
      if (basePath && basePath !== currentPath) {
        window.history.pushState({}, '', path);
        setCurrentPath(basePath);
        setTimeout(() => {
          const el = document.getElementById(hash);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
        return;
      } else {
        window.history.pushState({}, '', path);
        const el = document.getElementById(hash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }

    if (path !== currentPath) {
      window.history.pushState({}, '', path);
      setCurrentPath(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Sync browser back and forward button navigation
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Sync document title dynamically per route
  useEffect(() => {
    const titleMap: Record<string, string> = {
      '/': 'Jeevanashray Foundation — Empowering Communities in Maharashtra',
      '/about': 'About Us — Jeevanashray Foundation (Est. 2013)',
      '/programs': 'Programs & Community Initiatives — Jeevanashray Foundation',
      '/impact': 'Impact & Accountability — Jeevanashray Foundation',
      '/gallery': 'Photo Gallery & Field Documentary — Jeevanashray Foundation',
      '/team': 'Our Team & Leadership — Jeevanashray Foundation',
      '/reviews': 'Reviews & Community Comments — Jeevanashray Foundation',
      '/volunteer': 'Volunteer With Us — Jeevanashray Foundation',
      '/donate': 'Make a Donation (80G Tax Deductible) — Jeevanashray Foundation',
      '/contact': 'Contact Field Office — Jeevanashray Foundation',
      '/privacy': 'Privacy Policy — Jeevanashray Foundation',
      '/terms': 'Terms and Conditions — Jeevanashray Foundation',
      '/refund-policy': 'Refund and Cancellation Policy — Jeevanashray Foundation',
      '/donation-success': 'Donation Confirmation — Jeevanashray Foundation',
      '/donation-pending': 'Donation Status — Jeevanashray Foundation'
    };

    document.title = titleMap[currentPath] || 'Jeevanashray Foundation — Maharashtra';
  }, [currentPath]);

  // Handle route matching
  const renderCurrentPage = () => {
    // Normalise pathname by removing trailing slash if not root
    const cleanPath = currentPath.length > 1 && currentPath.endsWith('/')
      ? currentPath.slice(0, -1)
      : currentPath;

    switch (cleanPath) {
      case '/':
        return <Home onNavigate={navigate} />;
      case '/about':
        return <About onNavigate={navigate} />;
      case '/programs':
        return <ProgramsPage onNavigate={navigate} />;
      case '/impact':
        return <ImpactPage onNavigate={navigate} />;
      case '/gallery':
        return <GalleryPage onNavigate={navigate} />;
      case '/team':
        return <TeamPage onNavigate={navigate} />;
      case '/reviews':
        return <ReviewsPage />;
      case '/volunteer':
        return <VolunteerPage />;
      case '/donate':
        return <DonatePage onNavigate={navigate} />;
      case '/contact':
        return <ContactPage onNavigate={navigate} />;
      case '/privacy':
        return <PrivacyPolicyPage />;
      case '/terms':
        return <TermsPage />;
      case '/refund-policy':
        return <RefundPolicyPage />;
      case '/donation-success':
        return <DonationSuccessPage onNavigate={navigate} />;
      case '/donation-pending':
        return <DonationPendingPage onNavigate={navigate} />;
      default:
        return <NotFoundPage onNavigate={navigate} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#424242] selection:bg-[#C8102E]/10 selection:text-[#C8102E]">
      {/* 1. Global Announcement Banner: Appears above navigation on EVERY public route */}
      <AnnouncementBanner onNavigate={navigate} />

      {/* 2. Global Header & Navigation */}
      <Header currentPath={currentPath} onNavigate={navigate} />

      {/* 3. Global Hero Carousel Banner: Displayed on EVERY page with responsive pictures and touch gestures */}
      <GlobalHeroCarousel currentPath={currentPath} onNavigate={navigate} />

      {/* 4. Main Content Area */}
      <main id="main-content" className="flex-1 flex flex-col focus:outline-none">
        {renderCurrentPage()}
      </main>

      {/* 4. Global Footer */}
      <Footer onNavigate={navigate} />
    </div>
  );
}
