import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { GalleryItem } from '../data/gallery';

interface LightboxModalProps {
  item: GalleryItem | null;
  items: GalleryItem[];
  onClose: () => void;
  onNavigate: (newItem: GalleryItem) => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  item,
  items,
  onClose,
  onNavigate
}) => {
  useEffect(() => {
    if (!item) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        const currentIndex = items.findIndex((i) => i.id === item.id);
        if (currentIndex > 0) {
          onNavigate(items[currentIndex - 1]);
        }
      } else if (e.key === 'ArrowRight') {
        const currentIndex = items.findIndex((i) => i.id === item.id);
        if (currentIndex < items.length - 1) {
          onNavigate(items[currentIndex + 1]);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [item, items, onClose, onNavigate]);

  if (!item) return null;

  const currentIndex = items.findIndex((i) => i.id === item.id);
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < items.length - 1;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Photo viewer: ${item.title}`}
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      <div
        className="relative max-w-5xl w-full bg-[#262626] border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top bar with title and close */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/40 text-white">
          <div>
            <span className="text-xs uppercase tracking-wider text-[#D4A72C] font-semibold">
              {item.category}
            </span>
            <h3 className="font-serif text-lg text-white font-medium">
              {item.title}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close photo viewer"
            className="p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <X className="w-6 h-6" aria-hidden="true" />
          </button>
        </div>

        {/* Image viewport */}
        <div className="relative flex-1 bg-black/60 flex items-center justify-center min-h-[300px] overflow-hidden">
          <img
            src={item.imageSrc}
            alt={item.description}
            className="max-h-[60vh] w-auto max-w-full object-contain mx-auto"
            referrerPolicy="no-referrer"
          />

          {/* Navigation Controls */}
          {hasPrev && (
            <button
              type="button"
              onClick={() => onNavigate(items[currentIndex - 1])}
              aria-label="Previous photo (Left arrow key)"
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <ChevronLeft className="w-6 h-6" aria-hidden="true" />
            </button>
          )}

          {hasNext && (
            <button
              type="button"
              onClick={() => onNavigate(items[currentIndex + 1])}
              aria-label="Next photo (Right arrow key)"
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <ChevronRight className="w-6 h-6" aria-hidden="true" />
            </button>
          )}
        </div>

        {/* Captions & Metadata footer */}
        <div className="p-4 sm:p-6 bg-[#262626] border-t border-white/10 text-white/80 text-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <p className="text-white/90 leading-relaxed">
            {item.description}
          </p>
          <div className="text-xs text-[#D4A72C] whitespace-nowrap">
            {item.location} · {item.date} ({currentIndex + 1} of {items.length})
          </div>
        </div>
      </div>
    </div>
  );
};
