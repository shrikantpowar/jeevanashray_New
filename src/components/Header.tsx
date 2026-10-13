import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { primaryNavItems } from '../config/navigationConfig';
import { Menu, X, Heart, Phone } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

interface HeaderProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPath, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const handleNavClick = (path: string) => {
    setMobileMenuOpen(false);
    onNavigate(path);
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-200 ${
        isScrolled
          ? 'bg-[#FFFFFF]/95 backdrop-blur-md shadow-sm border-b border-[#424242]/10 py-2.5'
          : 'bg-[#FFFFFF] border-b border-[#424242]/10 py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark & Seal */}
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('/');
            }}
            className="shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C8102E] rounded-lg"
            aria-label="Jeevanashray Foundation Home"
          >
            <Logo />
          </a>

          {/* Zone 2: Navigation Links (Desktop) */}
          <nav
            aria-label="Main Navigation"
            className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-medium text-[#424242]"
          >
            {primaryNavItems.slice(0, 7).map((item) => {
              const isActive = currentPath === item.path;
              return (
                <a
                  key={item.path}
                  href={item.path}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.path);
                  }}
                  className={`relative whitespace-nowrap shrink-0 transition-colors py-1 ${
                    isActive
                      ? 'text-[#C8102E] font-semibold'
                      : 'text-[#424242] hover:text-[#C8102E]'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#C8102E] rounded-full" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Zone 3: Primary Action & Quick Contact */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <a
              href={`tel:${siteConfig.contact.primaryPhone}`}
              className="hidden xl:inline-flex items-center gap-1.5 text-xs text-[#424242] hover:text-[#C8102E] px-3 py-1.5 rounded-lg border border-[#424242]/20 transition-colors"
              title="Call foundation emergency desk"
            >
              <Phone className="w-3.5 h-3.5 text-[#C8102E]" aria-hidden="true" />
              <span>{siteConfig.contact.phoneFormatted}</span>
            </a>

            <button
              type="button"
              onClick={() => handleNavClick('/donate')}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-[#C8102E] hover:bg-[#a50d25] active:scale-[0.98] rounded-lg transition-all shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C8102E] focus-visible:ring-offset-2 whitespace-nowrap shrink-0"
            >
              <Heart className="w-4 h-4 fill-white/20" aria-hidden="true" />
              <span>Donate Now</span>
            </button>
          </div>

          {/* Mobile Menu Hamburger Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              type="button"
              onClick={() => handleNavClick('/donate')}
              className="sm:hidden inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-[#C8102E] rounded-lg shadow-sm"
              aria-label="Make a Donation"
            >
              <Heart className="w-3.5 h-3.5 fill-white/20" aria-hidden="true" />
              <span>Donate</span>
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#424242] hover:bg-[#FFF8ED] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C8102E]"
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-[#C8102E]" aria-hidden="true" />
              ) : (
                <Menu className="w-6 h-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-x-0 top-[calc(100%+1px)] bottom-0 bg-black/40 backdrop-blur-xs z-50 flex flex-col"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="bg-[#FFFFFF] border-b border-[#424242]/10 p-6 shadow-xl max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-xs uppercase tracking-wider text-[#C8102E] font-semibold mb-3">
              Navigation Menu
            </div>
            <nav className="flex flex-col gap-1.5" aria-label="Mobile Navigation">
              {primaryNavItems.map((item) => {
                const isActive = currentPath === item.path;
                return (
                  <a
                    key={item.path}
                    href={item.path}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.path);
                    }}
                    className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center justify-between ${
                      isActive
                        ? 'bg-[#FFF8ED] text-[#C8102E] font-semibold border-l-4 border-[#C8102E]'
                        : 'text-[#424242] hover:bg-[#FFF8ED]'
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive && (
                      <span className="w-2 h-2 rounded-full bg-[#C8102E]" aria-hidden="true" />
                    )}
                  </a>
                );
              })}
            </nav>

            <div className="mt-6 pt-6 border-t border-[#424242]/10 flex flex-col gap-3">
              <button
                type="button"
                onClick={() => handleNavClick('/donate')}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 text-sm font-semibold text-white bg-[#C8102E] rounded-lg shadow-sm"
              >
                <Heart className="w-4 h-4 fill-white/20" aria-hidden="true" />
                <span>Support With a Donation</span>
              </button>

              <div className="text-center text-xs text-[#424242]/70 pt-2">
                Emergency Helpline:{" "}
                <a
                  href={`tel:${siteConfig.contact.primaryPhone}`}
                  className="font-semibold text-[#C8102E] hover:underline"
                >
                  {siteConfig.contact.phoneFormatted}
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
