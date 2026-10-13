import React from 'react';
import { siteConfig } from '../config/siteConfig';
import { operationalPillars } from '../data/impact';
import { ShieldCheck, Heart, Users, MapPin, Award, CheckCircle2, ArrowRight } from 'lucide-react';

interface AboutProps {
  onNavigate: (path: string) => void;
}

export const About: React.FC<AboutProps> = ({ onNavigate }) => {
  return (
    <div className="flex flex-col w-full">
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-[#FFF8ED] to-white py-16 border-b border-[#424242]/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs uppercase tracking-widest text-[#C8102E] font-bold">
            About Jeevanashray Foundation
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#424242] mt-2 mb-6">
            A Decade of Grassroots Compassion & Social Justice
          </h1>
          <p className="text-base sm:text-lg text-[#424242]/85 leading-relaxed max-w-3xl mx-auto">
            Established in 2013 in Nallasopara, Maharashtra, Jeevanashray Foundation was founded on
            the belief that access to information, dignified livelihoods, and holistic care for children
            and women form the cornerstone of an equitable society.
          </p>
        </div>
      </section>

      {/* Origin Story & Foundation Context */}
      <section className="py-16 bg-white border-b border-[#424242]/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-8 text-[#424242]">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#424242] mb-4">
              Our Journey Since 2013
            </h2>
            <p className="text-sm sm:text-base leading-relaxed text-[#424242]/85 mb-4">
              Nallasopara and the surrounding Palghar district represent a dynamic intersection of rapidly
              growing peri-urban bastis and distressed rural agrarian hamlets. When our founding trustees
              began grassroots work in 2013, they witnessed firsthand how smallholder farmers battled
              low-yield harvests, while daily-wage worker families struggled to afford preschool care and
              nutritious meals for their toddlers.
            </p>
            <p className="text-sm sm:text-base leading-relaxed text-[#424242]/85 mb-4">
              Rather than introducing external, top-down blueprints, the foundation instituted a strict
              philosophy: <em>listen first, learn directly from the community, and intervene only where our
              presence makes a lasting and tangible contribution.</em>
            </p>
          </div>

          {/* Mission Quote Box */}
          <div className="p-8 rounded-2xl bg-[#FFF8ED] border-l-4 border-[#C8102E] shadow-xs">
            <h3 className="font-serif font-bold text-lg text-[#C8102E] mb-2">
              Our Mission Statement
            </h3>
            <p className="text-sm sm:text-base text-[#424242] italic leading-relaxed">
              &ldquo;We are inspired by passion and compassion for the well-being of people. We listen and learn about problems that cause inequity, whether low-yield crops in Maharashtra, child poverty, women&apos;s issues, or unemployment. We get involved only if we believe we can make a unique contribution. We are committed to social justice, sustainable development, and human rights. Access to information is essential to informed decision-making at all levels. We are committed to disseminating information and promoting sustainable development initiatives for underrepresented and marginalized sectors of society.&rdquo;
            </p>
          </div>

          <div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#424242] mb-3">
              Guiding Core Values
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-[#424242]/15 bg-white">
                <div className="font-bold text-sm text-[#C8102E] mb-1">Human Dignity & Empathy</div>
                <p className="text-xs text-[#424242]/80 leading-relaxed">
                  Treating every child, mother, and farmer not as a subject of charity, but as a dignified partner in mutual growth.
                </p>
              </div>
              <div className="p-4 rounded-xl border border-[#424242]/15 bg-white">
                <div className="font-bold text-sm text-[#D4A72C] mb-1">Information As A Fundamental Right</div>
                <p className="text-xs text-[#424242]/80 leading-relaxed">
                  Removing civic barriers so underprivileged citizens can easily access state welfare schemes, legal protections, and healthcare.
                </p>
              </div>
              <div className="p-4 rounded-xl border border-[#424242]/15 bg-white">
                <div className="font-bold text-sm text-[#C8102E] mb-1">Financial & Statutory Integrity</div>
                <p className="text-xs text-[#424242]/80 leading-relaxed">
                  Adhering to public trust compliance, 80G tax benefits, transparent annual accounts, and zero middleman leakage.
                </p>
              </div>
              <div className="p-4 rounded-xl border border-[#424242]/15 bg-white">
                <div className="font-bold text-sm text-[#D4A72C] mb-1">Grassroots Sustainability</div>
                <p className="text-xs text-[#424242]/80 leading-relaxed">
                  Building local self-reliance through women&apos;s Mahila Bachat Gat groups and community seed banks that outlast external intervention.
                </p>
              </div>
            </div>
          </div>

          {/* Institutional Registrations & Governance */}
          <div className="p-6 rounded-2xl bg-[#FFF8ED] border border-[#D4A72C]/40">
            <h3 className="font-serif font-bold text-lg text-[#424242] mb-3 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#C8102E]" />
              Institutional & Regulatory Credentials
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <span className="font-bold text-[#424242] block">Year Established:</span>
                <span className="text-[#424242]/80">2013 (Palghar, Maharashtra)</span>
              </div>
              <div>
                <span className="font-bold text-[#424242] block">Tax Status:</span>
                <span className="text-[#424242]/80">Section 80G & 12A Certified</span>
              </div>
              <div>
                <span className="font-bold text-[#424242] block">Registered Office:</span>
                <span className="text-[#424242]/80">Nallasopara West, Palghar-401203</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-[#D4A72C]/30 flex flex-wrap items-center justify-between gap-3 text-xs">
              <span className="text-[#424242]/70">
                Meet our dedicated trustees and leadership team:
              </span>
              <button
                type="button"
                onClick={() => onNavigate('/team')}
                className="font-bold text-[#C8102E] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>View Team Members</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
