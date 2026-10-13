import React from 'react';
import { Home, ArrowLeft } from 'lucide-react';

interface NotFoundPageProps {
  onNavigate: (path: string) => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ onNavigate }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 py-20 text-center bg-white">
      <div className="w-16 h-16 rounded-2xl bg-[#FFF8ED] border-2 border-[#D4A72C] text-[#C8102E] font-serif font-bold text-2xl flex items-center justify-center mb-6 shadow-sm">
        404
      </div>
      <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#424242] mb-3">
        Page Not Found
      </h1>
      <p className="text-xs sm:text-sm text-[#424242]/75 max-w-md mx-auto leading-relaxed mb-8">
        The requested page could not be located. It may have moved or the link address might be incorrect.
      </p>
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => onNavigate('/')}
          className="px-6 py-3 rounded-xl bg-[#C8102E] text-white font-semibold text-xs sm:text-sm hover:bg-[#a50d25] transition-colors flex items-center gap-2 shadow-xs cursor-pointer"
        >
          <Home className="w-4 h-4" />
          <span>Return to Homepage</span>
        </button>
        <button
          type="button"
          onClick={() => window.history.back()}
          className="px-6 py-3 rounded-xl bg-white border border-[#424242]/20 text-[#424242] font-semibold text-xs sm:text-sm hover:bg-gray-50 transition-colors flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Go Back</span>
        </button>
      </div>
    </div>
  );
};
