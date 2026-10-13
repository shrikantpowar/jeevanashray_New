import React from 'react';
import { programs } from '../data/programs';
import { imageManifest } from '../data/imageManifest';
import { Heart, MapPin, Users, CheckCircle2, ArrowRight } from 'lucide-react';

interface ProgramsPageProps {
  onNavigate: (path: string) => void;
}

export const ProgramsPage: React.FC<ProgramsPageProps> = ({ onNavigate }) => {
  return (
    <div className="flex flex-col w-full">
      {/* Header */}
      <section className="bg-gradient-to-b from-[#FFF8ED] to-white py-16 border-b border-[#424242]/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs uppercase tracking-widest text-[#C8102E] font-bold">
            Areas of Action
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#424242] mt-2 mb-4">
            Programs & Community Initiatives
          </h1>
          <p className="text-base sm:text-lg text-[#424242]/85 max-w-2xl mx-auto leading-relaxed">
            Our initiatives focus on root causes of inequity in Maharashtra: child poverty,
            low-yield crops, women&apos;s financial exclusion, and barriers to information access.
          </p>
        </div>
      </section>

      {/* Program Details Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-16">
          {programs.map((prog, index) => {
            const imgEntry = imageManifest[prog.imageSlotId];
            const isReversed = index % 2 === 1;

            return (
              <div
                key={prog.id}
                id={prog.slug}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-10 items-center p-6 sm:p-10 rounded-3xl border border-[#424242]/10 bg-[#FFF8ED]/30 scroll-mt-24`}
              >
                {/* Visual Image Column */}
                <div
                  className={`lg:col-span-5 ${
                    isReversed ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  <div className="relative rounded-2xl overflow-hidden shadow-lg border-2 border-white bg-white">
                    {imgEntry ? (
                      <img
                        src={imgEntry.src}
                        alt={imgEntry.alt}
                        className="w-full h-72 sm:h-80 object-cover"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="w-full h-72 bg-[#FFF8ED] flex items-center justify-center text-xs text-[#424242]/60">
                        Field Initiative Record
                      </div>
                    )}
                    <span className="absolute top-3 left-3 bg-[#C8102E] text-white text-xs font-semibold px-3 py-1 rounded shadow-sm">
                      {prog.category}
                    </span>
                  </div>
                </div>

                {/* Content Column */}
                <div
                  className={`lg:col-span-7 flex flex-col gap-4 text-left ${
                    isReversed ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  <div>
                    <span className="text-xs font-semibold text-[#D4A72C] tracking-wide uppercase">
                      {prog.marathiTitle}
                    </span>
                    <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#424242] mt-1">
                      {prog.title}
                    </h2>
                    <p className="text-sm font-medium text-[#C8102E] mt-1">
                      {prog.tagline}
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-[#424242]/85 leading-relaxed">
                    {prog.detailedDescription}
                  </p>

                  <div className="flex flex-col gap-2 pt-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#424242]">
                      Key Interventions:
                    </span>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#424242]/80">
                      {prog.keyInitiatives.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-[#C8102E] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-[#424242]/10 flex flex-wrap items-center justify-between gap-4 text-xs">
                    <div className="flex flex-col gap-1 text-[#424242]/70">
                      <div className="flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-[#D4A72C]" />
                        <span><strong>Beneficiaries:</strong> {prog.beneficiariesTarget}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#C8102E]" />
                        <span><strong>Coverage:</strong> {prog.location}</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => onNavigate('/donate')}
                      className="px-5 py-2.5 rounded-xl font-semibold text-white bg-[#C8102E] hover:bg-[#a50d25] transition-colors flex items-center gap-2 shadow-xs"
                    >
                      <Heart className="w-3.5 h-3.5 fill-white/20" />
                      <span>Support This Initiative</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
