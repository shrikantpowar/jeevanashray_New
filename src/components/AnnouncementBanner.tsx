import React, { useState, useEffect } from 'react';
import { announcementConfig } from '../config/announcementConfig';
import { X, ArrowRight, ShieldCheck } from 'lucide-react';

interface AnnouncementBannerProps {
  onNavigate?: (path: string) => void;
}

export const AnnouncementBanner: React.FC<AnnouncementBannerProps> = ({ onNavigate }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!announcementConfig.enabled || !announcementConfig.message.trim()) {
      setIsVisible(false);
      return;
    }

    // Check optional date windows
    const now = new Date();
    if (announcementConfig.startDate && new Date(announcementConfig.startDate) > now) {
      setIsVisible(false);
      return;
    }
    if (announcementConfig.endDate && new Date(announcementConfig.endDate) < now) {
      setIsVisible(false);
      return;
    }

    // Check sessionStorage dismissal
    try {
      const isDismissed = sessionStorage.getItem(announcementConfig.sessionStorageKey);
      if (isDismissed === 'true') {
        setIsVisible(false);
        return;
      }
    } catch {
      // In case of restricted storage environments
    }

    setIsVisible(true);
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    try {
      sessionStorage.setItem(announcementConfig.sessionStorageKey, 'true');
    } catch {
      // Ignore storage errors
    }
  };

  const handleCtaClick = (e: React.MouseEvent) => {
    if (announcementConfig.ctaUrl) {
      if (announcementConfig.isExternalLink) {
        return; // default anchor behavior handles it safely
      }
      e.preventDefault();
      if (onNavigate) {
        onNavigate(announcementConfig.ctaUrl);
      } else {
        window.location.href = announcementConfig.ctaUrl;
      }
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <aside
      aria-label="Global Foundation Announcement"
      className="relative z-50 bg-[#C8102E] text-white border-b border-[#C8102E]/40 px-4 py-2 transition-all duration-300 ease-out"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 text-xs sm:text-sm font-medium">
        <div className="flex-1 flex flex-wrap items-center justify-center sm:justify-start gap-x-3 gap-y-1 text-center sm:text-left">
          {announcementConfig.goldAccentText && (
            <span className="inline-flex items-center gap-1 text-[#D4A72C] font-semibold tracking-wide uppercase text-[11px] sm:text-xs bg-black/20 px-2 py-0.5 rounded">
              <ShieldCheck className="w-3.5 h-3.5 text-[#D4A72C]" aria-hidden="true" />
              {announcementConfig.goldAccentText}
            </span>
          )}
          <span className="text-white/95 leading-snug">
            {announcementConfig.message}
          </span>
          {announcementConfig.ctaText && announcementConfig.ctaUrl && (
            <a
              href={announcementConfig.ctaUrl}
              onClick={handleCtaClick}
              target={announcementConfig.isExternalLink ? "_blank" : undefined}
              rel={announcementConfig.isExternalLink ? "noopener noreferrer" : undefined}
              className="inline-flex items-center gap-1 text-[#D4A72C] hover:text-white underline underline-offset-2 transition-colors font-semibold ml-1 cursor-pointer"
            >
              <span>{announcementConfig.ctaText}</span>
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </a>
          )}
        </div>

        {announcementConfig.allowDismissal && (
          <button
            type="button"
            onClick={handleDismiss}
            aria-label="Dismiss announcement banner for this session"
            className="shrink-0 p-1 rounded hover:bg-black/20 text-white/80 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        )}
      </div>
    </aside>
  );
};
