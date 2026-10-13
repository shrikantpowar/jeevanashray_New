import React, { useState } from 'react';
import { verifiedTeamMembers, VerifiedTeamMember } from '../data/team';
import { Users, ShieldCheck, HeartHandshake, CheckCircle2, Mail, ExternalLink } from 'lucide-react';

interface TeamPageProps {
  onNavigate: (path: string) => void;
}

interface TeamMemberCardProps {
  member: VerifiedTeamMember;
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ member }) => {
  const [imgSrc, setImgSrc] = useState<string>(member.image);
  const [hasError, setHasError] = useState<boolean>(false);

  const handleImageError = () => {
    if (imgSrc !== member.fallbackImage) {
      setImgSrc(member.fallbackImage);
    } else {
      setHasError(true);
    }
  };

  return (
    <article
      className="bg-white rounded-2xl border border-[#424242]/12 overflow-hidden shadow-xs hover:shadow-xl hover:border-[#D4A72C]/60 transition-all duration-300 group flex flex-col justify-between"
      aria-label={`${member.name}${member.isFounder ? ' — Founder' : ''}`}
    >
      <div>
        {/* Consistent Portrait Container */}
        <div className="relative w-full aspect-[14/15] bg-gradient-to-b from-[#FFF8ED] via-[#FAF3E7] to-[#F5EAD6] flex items-center justify-center p-6 border-b border-[#424242]/10 overflow-hidden">
          {/* Subtle Background Accent */}
          <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#D4A72C_1px,transparent_1px)] [background-size:12px_12px]" />

          {member.isFounder && (
            <span className="absolute top-3 right-3 z-10 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#C8102E] text-white shadow-xs">
              Founder
            </span>
          )}

          {!hasError ? (
            <img
              src={imgSrc}
              alt={member.altText}
              onError={handleImageError}
              className="relative z-1 max-h-full max-w-full object-contain filter drop-shadow-md group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
              width={140}
              height={150}
            />
          ) : (
            <div className="relative z-1 flex flex-col items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-[#C8102E] text-white flex items-center justify-center font-serif font-bold text-2xl shadow-md border-2 border-[#D4A72C]">
                {member.initials}
              </div>
              <span className="text-[11px] text-[#424242]/70 mt-2 font-medium">
                Photo Unavailable
              </span>
            </div>
          )}
        </div>

        {/* Member Details */}
        <div className="p-6 text-center flex flex-col items-center justify-center min-h-[96px]">
          <h3 className="font-serif font-bold text-lg sm:text-xl text-[#424242] group-hover:text-[#C8102E] transition-colors">
            {member.name}
          </h3>

          {/* Founder designation displayed for Rajesh Batwalkar only */}
          {member.isFounder && (
            <div className="mt-1.5 flex items-center justify-center">
              <span className="inline-block text-xs sm:text-sm font-bold text-[#C8102E] tracking-wide">
                Founder
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Subtle Card Footer */}
      <div className="px-5 py-3 bg-[#FFF8ED]/60 border-t border-[#424242]/8 flex items-center justify-between text-xs text-[#424242]/75">
        <span className="flex items-center gap-1.5 font-medium">
          <ShieldCheck className="w-3.5 h-3.5 text-[#D4A72C]" />
          <span>Verified Member</span>
        </span>
        <span className="text-[11px] text-[#424242]/60">
          Jeevanashray Foundation
        </span>
      </div>
    </article>
  );
};

export const TeamPage: React.FC<TeamPageProps> = ({ onNavigate }) => {
  return (
    <div className="flex flex-col w-full">
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-[#FFF8ED] to-white py-14 sm:py-16 border-b border-[#424242]/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs uppercase tracking-widest text-[#C8102E] font-bold">
            Leadership & Associates
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#424242] mt-2 mb-4">
            Our Team & Leadership
          </h1>
          <p className="text-base sm:text-lg text-[#424242]/85 max-w-2xl mx-auto leading-relaxed">
            Meet the dedicated individuals who lead and support Jeevanashray Foundation&apos;s mission across Palghar and Maharashtra.
          </p>
        </div>
      </section>

      {/* Verified Team Grid */}
      <section className="py-14 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Responsive Grid: 4 columns on desktop, 2 on tablets, 1 on mobile */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {verifiedTeamMembers.map((member) => (
              <TeamMemberCard key={member.id} member={member} />
            ))}
          </div>

          {/* Foundation Commitment Banner */}
          <div className="mt-16 p-8 rounded-2xl bg-gradient-to-br from-[#FFF8ED] to-[#FAF3E7] border border-[#D4A72C]/40 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-[#C8102E] text-white shrink-0 shadow-sm">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg text-[#424242] mb-1">
                  Guided by Compassion & Social Justice
                </h3>
                <p className="text-xs sm:text-sm text-[#424242]/80 max-w-2xl leading-relaxed">
                  Our team works hand-in-hand with rural farmers, Balwadi teachers, women&apos;s self-help groups, and healthcare volunteers to foster sustainable community resilience.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => onNavigate('/contact')}
                className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-[#C8102E] text-white hover:bg-[#A00D24] shadow-sm transition-colors cursor-pointer"
              >
                Contact Our Team
              </button>
              <button
                type="button"
                onClick={() => onNavigate('/volunteer')}
                className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-white text-[#424242] border border-[#424242]/20 hover:border-[#D4A72C] hover:bg-[#FFF8ED] transition-colors cursor-pointer"
              >
                Volunteer with Us
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
