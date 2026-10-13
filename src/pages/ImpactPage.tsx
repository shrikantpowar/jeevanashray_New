import React from 'react';
import { impactMetrics, operationalPillars } from '../data/impact';
import { ShieldCheck, Award, Heart, CheckCircle2, TrendingUp, ArrowRight } from 'lucide-react';

interface ImpactPageProps {
  onNavigate: (path: string) => void;
}

export const ImpactPage: React.FC<ImpactPageProps> = ({ onNavigate }) => {
  return (
    <div className="flex flex-col w-full">
      {/* Header */}
      <section className="bg-gradient-to-b from-[#FFF8ED] to-white py-16 border-b border-[#424242]/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs uppercase tracking-widest text-[#C8102E] font-bold">
            Accountability & Reporting
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#424242] mt-2 mb-4">
            Community Impact & Transparency
          </h1>
          <p className="text-base sm:text-lg text-[#424242]/85 max-w-2xl mx-auto leading-relaxed">
            We hold ourselves to rigorous standards of integrity. Every program is measured
            by real lives empowered, children educated, and rural livelihoods fortified.
          </p>
        </div>
      </section>

      {/* Metrics Grid */}
      <section className="py-16 bg-white border-b border-[#424242]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {impactMetrics.map((metric) => (
              <div
                key={metric.id}
                className="p-8 rounded-2xl bg-[#FFF8ED] border border-[#D4A72C]/40 text-center flex flex-col items-center justify-center shadow-xs"
              >
                <div className="font-serif font-bold text-4xl text-[#C8102E] tabular-nums mb-1">
                  {metric.value}
                </div>
                <div className="text-xs uppercase tracking-wider font-bold text-[#D4A72C] mb-2">
                  {metric.unit}
                </div>
                <div className="font-semibold text-base text-[#424242] mb-1">
                  {metric.label}
                </div>
                <div className="text-xs text-[#424242]/75 leading-relaxed">
                  {metric.subtext}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pillars of Integrity */}
      <section className="py-16 bg-[#FFF8ED]/40 border-b border-[#424242]/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs uppercase tracking-widest text-[#C8102E] font-bold">
              Our Operating Standards
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#424242] mt-1">
              How We Ensure Responsible Stewardships
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {operationalPillars.map((pillar, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white border border-[#424242]/10 shadow-xs flex flex-col gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-[#FFF8ED] text-[#C8102E] font-serif font-bold text-lg flex items-center justify-center">
                  0{idx + 1}
                </div>
                <h3 className="font-serif font-bold text-base text-[#424242]">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#424242]/80 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>

          {/* Statutory Verification Callout */}
          <div className="mt-12 p-8 rounded-2xl bg-white border-2 border-[#D4A72C]/40 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <ShieldCheck className="w-8 h-8 text-[#C8102E] shrink-0 mt-1" />
              <div>
                <h4 className="font-serif font-bold text-lg text-[#424242]">
                  Section 80G Certified for Donor Tax Relief
                </h4>
                <p className="text-xs sm:text-sm text-[#424242]/80 mt-1">
                  All Indian donors are entitled to a 50% deduction under Section 80G. Digital receipts with foundation registration and PAN details are generated for your tax filing.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onNavigate('/donate')}
              className="px-6 py-3 rounded-xl font-semibold text-white bg-[#C8102E] hover:bg-[#a50d25] transition-colors shrink-0 shadow-xs text-sm"
            >
              Contribute Now
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
