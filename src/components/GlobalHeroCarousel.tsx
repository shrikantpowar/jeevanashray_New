import React, { useState, useEffect, useRef, useCallback } from 'react';
import { pageCarouselData, carouselSettings, CarouselSlide } from '../config/carouselConfig';
import { ChevronLeft, ChevronRight, ArrowRight, Heart } from 'lucide-react';

interface GlobalHeroCarouselProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export const GlobalHeroCarousel: React.FC<GlobalHeroCarouselProps> = ({ currentPath, onNavigate }) => {
  // Normalize path by stripping trailing slash
  const cleanPath = currentPath.length > 1 && currentPath.endsWith('/')
    ? currentPath.slice(0, -1)
    : currentPath;

  const pageConfig = pageCarouselData[cleanPath] || pageCarouselData['/'];
  const slides: CarouselSlide[] = pageConfig?.slides || [];
  const isCompact = Boolean(pageConfig?.isCompact);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);

  // Reset to first slide whenever route changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [cleanPath]);

  const slideCount = slides.length;

  const nextSlide = useCallback(() => {
    if (slideCount <= 1) return;
    setCurrentIndex((prev) => (prev + 1) % slideCount);
  }, [slideCount]);

  const prevSlide = useCallback(() => {
    if (slideCount <= 1) return;
    setCurrentIndex((prev) => (prev - 1 + slideCount) % slideCount);
  }, [slideCount]);

  // Autoplay effect
  useEffect(() => {
    if (!carouselSettings.enableAutoplay || slideCount <= 1 || isPaused) return;

    // Check prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) return;

    const interval = setInterval(() => {
      nextSlide();
    }, carouselSettings.autoplayIntervalMs);

    return () => clearInterval(interval);
  }, [slideCount, isPaused, nextSlide]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      prevSlide();
    } else if (e.key === 'ArrowRight') {
      nextSlide();
    }
  };

  // Touch Swipe Handlers for Mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.targetTouches[0].clientX);
    setTouchEndX(null);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStartX === null || touchEndX === null) return;
    const distance = touchStartX - touchEndX;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
    setTouchStartX(null);
    setTouchEndX(null);
  };

  if (!slides || slides.length === 0) return null;

  return (
    <section
      aria-label="Featured Visual Banner Carousel"
      className={`relative w-full overflow-hidden bg-[#262626] select-none ${
        isCompact
          ? 'h-[220px] sm:h-[260px] md:h-[300px]'
          : 'h-[440px] sm:h-[500px] md:h-[560px] lg:h-[620px]'
      }`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onKeyDown={handleKeyDown}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      tabIndex={0}
    >
      {/* Slides Container */}
      <div className="relative w-full h-full">
        {slides.map((slide, idx) => {
          const isActive = idx === currentIndex;
          return (
            <div
              key={slide.id}
              aria-hidden={!isActive}
              className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              {/* Responsive Image via HTML <picture> */}
              <picture className="w-full h-full block">
                {slide.mobileImage && (
                  <source
                    media="(max-width: 640px)"
                    srcSet={slide.mobileImage}
                  />
                )}
                <img
                  src={slide.desktopImage}
                  alt={slide.alt}
                  loading={idx === 0 ? 'eager' : 'lazy'}
                  decoding="async"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center transform scale-100 motion-safe:transition-transform motion-safe:duration-7000 ease-out"
                />
              </picture>

              {/* Corporate Scrim Overlay ensuring WCAG 4.5:1 text legibility */}
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/55 to-black/30"
                aria-hidden="true"
              />

              {/* Text Overlay & Call-to-Action Content */}
              <div className="absolute inset-0 flex items-center z-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                  <div
                    className={`max-w-3xl flex flex-col gap-3 text-left ${
                      isCompact ? 'max-w-2xl' : ''
                    }`}
                  >
                    {/* Tagline / Department Kicker */}
                    {slide.tagline && (
                      <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-wide uppercase text-[#D4A72C]">
                        <span className="w-2 h-2 rounded-full bg-[#C8102E]" />
                        <span>{slide.tagline}</span>
                      </div>
                    )}

                    {/* Headline */}
                    <h1
                      className={`font-serif font-bold text-white tracking-tight leading-[1.15] drop-shadow-sm ${
                        isCompact
                          ? 'text-2xl sm:text-3xl md:text-4xl'
                          : 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl'
                      }`}
                    >
                      {slide.title}
                    </h1>

                    {/* Description */}
                    {slide.description && (
                      <p
                        className={`text-white/90 leading-relaxed font-sans line-clamp-3 sm:line-clamp-none ${
                          isCompact
                            ? 'text-xs sm:text-sm max-w-xl'
                            : 'text-sm sm:text-base lg:text-lg max-w-2xl'
                        }`}
                      >
                        {slide.description}
                      </p>
                    )}

                    {/* Action Buttons (Full Carousel Variant) */}
                    {!isCompact && (slide.ctaText || slide.secondaryCtaText) && (
                      <div className="flex flex-wrap items-center gap-3 pt-3">
                        {slide.ctaText && slide.ctaUrl && (
                          <button
                            type="button"
                            onClick={() => onNavigate(slide.ctaUrl!)}
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs sm:text-sm text-white bg-[#C8102E] hover:bg-[#a50d25] transition-all shadow-md active:scale-[0.98] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                          >
                            <Heart className="w-4 h-4 fill-white/20" />
                            <span>{slide.ctaText}</span>
                          </button>
                        )}

                        {slide.secondaryCtaText && slide.secondaryCtaUrl && (
                          <button
                            type="button"
                            onClick={() => onNavigate(slide.secondaryCtaUrl!)}
                            className="inline-flex items-center gap-1.5 px-5 py-3 rounded-xl font-semibold text-xs sm:text-sm text-white bg-white/15 hover:bg-white/25 backdrop-blur-xs border border-white/30 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                          >
                            <span>{slide.secondaryCtaText}</span>
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Arrows (Visible only if more than 1 slide) */}
      {slideCount > 1 && (
        <>
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Previous slide"
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-30 p-2.5 sm:p-3 rounded-full bg-black/40 hover:bg-[#C8102E] text-white/90 hover:text-white backdrop-blur-xs border border-white/20 transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next slide"
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 p-2.5 sm:p-3 rounded-full bg-black/40 hover:bg-[#C8102E] text-white/90 hover:text-white backdrop-blur-xs border border-white/20 transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden="true" />
          </button>

          {/* Slide Indicators / Dots */}
          <div
            className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 p-1.5 rounded-full bg-black/40 backdrop-blur-xs border border-white/10"
            role="tablist"
            aria-label="Slide Selection"
          >
            {slides.map((_, dotIdx) => {
              const isCurrent = dotIdx === currentIndex;
              return (
                <button
                  key={dotIdx}
                  type="button"
                  role="tab"
                  aria-selected={isCurrent}
                  aria-label={`Go to slide ${dotIdx + 1}`}
                  onClick={() => setCurrentIndex(dotIdx)}
                  className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${
                    isCurrent
                      ? 'w-7 bg-[#C8102E]'
                      : 'w-2.5 bg-white/50 hover:bg-white/80'
                  }`}
                />
              );
            })}
          </div>
        </>
      )}
    </section>
  );
};
