import React, { useState } from 'react';
import { siteConfig } from '../config/siteConfig';

interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark' | 'footer';
  maxHeight?: string;
}

// Ordered list of paths to look for the original uploaded brand logo
const CANDIDATE_LOGO_PATHS = [
  '/img/logo.png',
  '/logo.png',
  'img/logo.png',
  'logo.png',
  siteConfig.logo.uploadedLogoPath,
  '/src/assets/logo/logo.png',
  'Flame Emblem and Marathi Foundation Logo.png',
  '/Flame Emblem and Marathi Foundation Logo.png',
  'Image_Logo.jpeg',
  '/Image_Logo.jpeg',
  '/public/img/logo.png',
  '/public/logo.png',
  '/public/Image_Logo.jpeg',
  '/src/assets/logo/Image_Logo.jpeg',
  'WhatsApp Image 2026-10-02 at 5.19.06 PM.jpeg',
  '/WhatsApp Image 2026-10-02 at 5.19.06 PM.jpeg'
].filter((path): path is string => Boolean(path && path.trim().length > 0));

export const Logo: React.FC<LogoProps> = ({
  className = '',
  variant = 'light',
  maxHeight = '60px'
}) => {
  const [candidateIndex, setCandidateIndex] = useState(0);
  const [allFailed, setAllFailed] = useState(false);

  const isFooter = variant === 'footer';
  const currentSrc = CANDIDATE_LOGO_PATHS[candidateIndex];

  const handleImgError = () => {
    if (candidateIndex + 1 < CANDIDATE_LOGO_PATHS.length) {
      setCandidateIndex((prev) => prev + 1);
    } else {
      setAllFailed(true);
    }
  };

  // If a valid original logo image is found and successfully renders:
  // Strict compliance: No filters, no cropping, no distortion, no recoloring, 
  // exact original source file rendered with proportional CSS.
  if (!allFailed && currentSrc) {
    return (
      <div className={`flex items-center ${className}`}>
        <img
          src={currentSrc}
          alt={siteConfig.logo.altText || "Jeevanashray Foundation — Official Brand Logo"}
          onError={handleImgError}
          style={{
            width: 'auto',
            height: 'auto',
            maxHeight: maxHeight,
            objectFit: 'contain'
          }}
          className="transition-all duration-200"
          referrerPolicy="no-referrer"
        />
      </div>
    );
  }

  // Clear, honest, compliant placeholder when the original logo asset is awaiting upload:
  // Strictly complies with:
  // 1. "Never generate a replacement logo."
  // 2. "Do not replace it with a similar logo, text-based logo, icon, or AI-generated version."
  // 3. "If the logo file is unavailable or cannot be loaded, display a clear placeholder and report the issue."
  return (
    <div
      className={`inline-flex items-center gap-2.5 select-none px-3 py-2 rounded-lg border border-dashed transition-all ${
        isFooter
          ? 'bg-white/5 border-[#D4A72C]/40 text-white'
          : 'bg-[#FFF8ED] border-[#C8102E]/30 text-[#424242]'
      } ${className}`}
      title="Official Brand Logo asset is awaiting upload. Drop Image_Logo.jpeg into /public/Image_Logo.jpeg or /src/assets/logo/Image_Logo.jpeg"
      role="img"
      aria-label="Jeevanashray Foundation Brand Logo Placeholder — Awaiting Original Upload"
    >
      <div className="flex flex-col text-left">
        <div className="flex items-center gap-1.5 font-bold text-sm tracking-tight">
          <span className="text-[#C8102E]">Jeevanashray</span>
          <span className={isFooter ? 'text-white' : 'text-[#424242]'}>Foundation</span>
        </div>
        <div className="flex items-center gap-1.5 mt-0.5">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#D4A72C] animate-pulse" />
          <span className="text-[10px] text-[#D4A72C] font-semibold tracking-wider uppercase">
            Logo: Upload Required
          </span>
        </div>
      </div>
    </div>
  );
};
