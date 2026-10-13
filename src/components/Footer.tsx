import React from 'react';
import { Logo } from './Logo';
import { siteConfig } from '../config/siteConfig';
import { footerSections, allPagesList } from '../config/navigationConfig';
import { Heart, MapPin, Phone, Mail, Clock, ShieldCheck, ArrowUp } from 'lucide-react';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#262626] text-[#FFF8ED] border-t border-[#D4A72C]/30 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Institutional Banner Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          {/* Column 1: Organization & Identity */}
          <div className="flex flex-col gap-4">
            <Logo variant="footer" />
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed mt-2">
              {footerSections.about.description}
            </p>
            <div className="inline-flex items-center gap-2 text-xs text-[#D4A72C] font-semibold bg-white/5 px-3 py-1.5 rounded border border-[#D4A72C]/20 w-fit">
              <ShieldCheck className="w-4 h-4 text-[#D4A72C]" aria-hidden="true" />
              <span>{siteConfig.legal.taxExemption80G}</span>
            </div>
          </div>

          {/* Column 2: Key Initiatives */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C8102E]" />
              Core Initiatives
            </h3>
            <ul className="flex flex-col gap-2.5 text-xs sm:text-sm text-white/75">
              {footerSections.initiatives.map((item) => (
                <li key={item.path}>
                  <a
                    href={item.path}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate(item.path);
                    }}
                    className="hover:text-[#D4A72C] transition-colors hover:underline underline-offset-4"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Organization & Governance */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4A72C]" />
              Organization & Trust
            </h3>
            <ul className="flex flex-col gap-2.5 text-xs sm:text-sm text-white/75">
              {footerSections.organization.map((item) => (
                <li key={item.path}>
                  <a
                    href={item.path}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate(item.path);
                    }}
                    className="hover:text-[#D4A72C] transition-colors hover:underline underline-offset-4"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Field Offices & Helpline */}
          <div className="flex flex-col gap-3 text-xs sm:text-sm text-white/80">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-1 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C8102E]" />
              Contact & Helpline
            </h3>

            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-[#D4A72C] shrink-0 mt-0.5" aria-hidden="true" />
              <span className="text-xs text-white/75 leading-relaxed">
                {siteConfig.location.operatingAddress}
              </span>
            </div>

            <div className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-[#D4A72C] shrink-0" aria-hidden="true" />
              <a
                href={`tel:${siteConfig.contact.primaryPhone}`}
                className="hover:text-[#D4A72C] transition-colors"
              >
                {siteConfig.contact.phoneFormatted}
              </a>
            </div>

            <div className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-[#D4A72C] shrink-0" aria-hidden="true" />
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="hover:text-[#D4A72C] transition-colors break-all"
              >
                {siteConfig.contact.email}
              </a>
            </div>

            <div className="flex items-center gap-2.5 text-white/60 text-[11px] mt-1">
              <Clock className="w-3.5 h-3.5 text-[#D4A72C] shrink-0" aria-hidden="true" />
              <span>{siteConfig.contact.operatingHours}</span>
            </div>
          </div>
        </div>

        {/* 15 Pages Quick Directory & Legal Strip */}
        <div className="py-8 border-b border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs text-white/60">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="font-semibold text-white/80 uppercase text-[10px] tracking-wider">
              Site Index:
            </span>
            {allPagesList.map((page, idx) => (
              <span key={page.path} className="inline-flex items-center gap-2">
                <a
                  href={page.path}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate(page.path);
                  }}
                  className="hover:text-white transition-colors"
                >
                  {page.title}
                </a>
                {idx < allPagesList.length - 1 && (
                  <span aria-hidden="true" className="opacity-30">·</span>
                )}
              </span>
            ))}
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Scroll back to top of the page"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A72C]"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" aria-hidden="true" />
          </button>
        </div>

        {/* Bottom Legal Disclosures & Statutory Note */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/60 text-center md:text-left">
          <div className="flex flex-col gap-1">
            <p>
              © 2013–{new Date().getFullYear()} {siteConfig.name}. All rights reserved.
            </p>
            <p className="text-[11px] text-white/50">
              Registered Public Charitable Trust in Nallasopara, Maharashtra, India. Donations eligible for 80G tax deductions.
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <a
              href="/privacy"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/privacy');
              }}
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </a>
            <span aria-hidden="true">·</span>
            <a
              href="/terms"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/terms');
              }}
              className="hover:text-white transition-colors"
            >
              Terms & Conditions
            </a>
            <span aria-hidden="true">·</span>
            <a
              href="/refund-policy"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/refund-policy');
              }}
              className="hover:text-white transition-colors"
            >
              Refund Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
