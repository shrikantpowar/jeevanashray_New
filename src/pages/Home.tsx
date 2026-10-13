import React, { useState } from 'react';
import { siteConfig } from '../config/siteConfig';
import { imageManifest } from '../data/imageManifest';
import { programs } from '../data/programs';
import { impactMetrics, operationalPillars } from '../data/impact';
import { fieldStories } from '../data/stories';
import { approvedReviews } from '../data/reviews';
import { initialComments } from '../data/comments';
import { DonationAmountSelector } from '../components/DonationAmountSelector';
import {
  Heart,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Users,
  MessageSquare,
  BookOpen,
  Send,
  Sparkles,
  Info
} from 'lucide-react';

interface HomeProps {
  onNavigate: (path: string) => void;
}

export const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  const [quickAmount, setQuickAmount] = useState<number>(1000);
  const [quickFrequency, setQuickFrequency] = useState<'one-time' | 'monthly'>('one-time');
  const [userComment, setUserComment] = useState("");
  const [commentName, setCommentName] = useState("");
  const [commentNotice, setCommentNotice] = useState<string | null>(null);

  const heroImage = imageManifest['hero-main'];

  const handleQuickDonate = () => {
    // Navigate to donate page with selected amount in state/url
    onNavigate(`/donate?amount=${quickAmount}&frequency=${quickFrequency}`);
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userComment.trim() || !commentName.trim()) return;

    // Honest database-free explanation
    setCommentNotice(
      `Thank you for your thoughts. Without an active moderation database service, public comments require administrative review before permanent publishing. Please email ${siteConfig.contact.email} to submit formal community statements.`
    );
    setUserComment("");
    setCommentName("");
  };

  return (
    <div className="flex flex-col w-full">
      {/* 1. HERO BANNER */}
      <section
        aria-label="Welcome and Overview"
        className="relative bg-gradient-to-b from-[#FFF8ED] to-[#FFFFFF] pt-12 pb-20 border-b border-[#424242]/10 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Mission Kicker & Main Headline */}
            <div className="lg:col-span-7 flex flex-col gap-6 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#FFF8ED] border border-[#D4A72C]/40 text-xs font-semibold text-[#C8102E] w-fit">
                <span className="w-2 h-2 rounded-full bg-[#C8102E]" />
                <span>Est. 2013 · Nallasopara, Palghar, Maharashtra</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#424242] leading-[1.18]">
                Empowering Underrepresented Communities Through{" "}
                <span className="text-[#C8102E] underline decoration-[#D4A72C] decoration-2 underline-offset-4">
                  Compassion
                </span>{" "}
                and Action.
              </h1>

              <p className="text-base sm:text-lg text-[#424242]/85 leading-relaxed max-w-2xl">
                For over a decade, Jeevanashray Foundation has stood alongside families in Maharashtra,
                driving child welfare, women’s self-help groups (Mahila Bachat Gat), rural crop support,
                and social justice for marginalized citizens.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => onNavigate('/donate')}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-white bg-[#C8102E] hover:bg-[#a50d25] transition-all shadow-md hover:shadow-lg active:scale-[0.99] text-sm sm:text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C8102E]"
                >
                  <Heart className="w-4 h-4 fill-white/20" aria-hidden="true" />
                  <span>Support Our Initiatives</span>
                </button>

                <button
                  type="button"
                  onClick={() => onNavigate('/programs')}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-[#424242] bg-white hover:bg-[#FFF8ED] border border-[#424242]/20 hover:border-[#D4A72C] transition-all text-sm sm:text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A72C]"
                >
                  <span>Explore Programs</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center gap-6 pt-4 text-xs text-[#424242]/75 border-t border-[#424242]/10">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#C8102E]" aria-hidden="true" />
                  <span>Section 80G Tax Exemption</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#D4A72C]" aria-hidden="true" />
                  <span>100% RBI-Compliant Gateway</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#C8102E]" aria-hidden="true" />
                  <span>Serving Maharashtra Since 2013</span>
                </div>
              </div>
            </div>

            {/* Right Column: High-Fidelity Verified Documentary Hero Visual */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-xl border-4 border-white bg-[#FFF8ED]">
                <img
                  src={heroImage.src}
                  alt={heroImage.alt}
                  className="w-full h-80 sm:h-96 object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-5 text-white">
                  <span className="text-[11px] uppercase tracking-wider text-[#D4A72C] font-semibold">
                    Documentary Record
                  </span>
                  <p className="text-xs sm:text-sm text-white/95 font-medium mt-1">
                    {heroImage.caption}
                  </p>
                </div>
              </div>

              {/* Stat callout badge */}
              <div className="absolute -bottom-5 -left-4 sm:left-4 bg-[#FFF8ED] border-2 border-[#D4A72C] p-3.5 rounded-xl shadow-lg flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#C8102E] text-white flex items-center justify-center font-bold font-serif text-lg">
                  10+
                </div>
                <div className="text-left">
                  <div className="text-xs font-bold text-[#424242]">Years of Service</div>
                  <div className="text-[11px] text-[#424242]/75">Palghar & Rural Maharashtra</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. MISSION */}
      <section
        aria-label="Our Mission Statement"
        className="py-20 bg-[#FFFFFF] border-b border-[#424242]/10"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs uppercase tracking-widest text-[#C8102E] font-bold">
            Guiding Philosophy
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#424242] mt-2 mb-8">
            Our Mission & Commitment
          </h2>

          <div className="relative p-8 sm:p-10 rounded-2xl bg-[#FFF8ED] border border-[#D4A72C]/30 shadow-xs text-left">
            <span className="text-5xl font-serif text-[#D4A72C]/40 absolute top-4 left-4 select-none leading-none">
              “
            </span>
            <blockquote className="text-base sm:text-lg text-[#424242] leading-relaxed font-sans relative z-10 pl-6 border-l-2 border-[#C8102E]">
              We are inspired by passion and compassion for the well-being of people. We listen and learn about problems that cause inequity, whether low-yield crops in Maharashtra, child poverty, women&apos;s issues, or unemployment. We get involved only if we believe we can make a unique contribution. We are committed to social justice, sustainable development, and human rights. Access to information is essential to informed decision-making at all levels. We are committed to disseminating information and promoting sustainable development initiatives for underrepresented and marginalized sectors of society.
            </blockquote>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10">
            {operationalPillars.map((pillar, i) => (
              <div
                key={i}
                className="p-5 rounded-xl bg-white border border-[#424242]/10 text-left hover:border-[#D4A72C] transition-colors"
              >
                <div className="w-8 h-8 rounded-lg bg-[#FFF8ED] text-[#C8102E] font-serif font-bold flex items-center justify-center mb-3">
                  0{i + 1}
                </div>
                <h3 className="font-serif font-bold text-sm text-[#424242] mb-1">
                  {pillar.title}
                </h3>
                <p className="text-xs text-[#424242]/80 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. PROGRAMS */}
      <section
        aria-label="Core Work Initiatives"
        className="py-20 bg-[#FFF8ED]/50 border-b border-[#424242]/10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#C8102E] font-bold">
                Areas of Action
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#424242] mt-1">
                Verified Community Programs
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('/programs')}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#C8102E] hover:text-[#a50d25] transition-colors"
            >
              <span>View all program details</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.slice(0, 6).map((prog) => {
              const imgEntry = imageManifest[prog.imageSlotId];
              return (
                <div
                  key={prog.id}
                  className="bg-white rounded-2xl border border-[#424242]/10 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col"
                >
                  {imgEntry ? (
                    <div className="relative h-48 w-full overflow-hidden bg-[#FFF8ED]">
                      <img
                        src={imgEntry.src}
                        alt={imgEntry.alt}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        referrerPolicy="no-referrer"
                      />
                      <span className="absolute top-3 left-3 bg-[#C8102E] text-white text-[11px] font-semibold px-2.5 py-1 rounded">
                        {prog.category}
                      </span>
                    </div>
                  ) : (
                    <div className="h-48 bg-[#FFF8ED] flex items-center justify-center text-xs text-[#424242]/60">
                      Documentary Field Visual
                    </div>
                  )}

                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="text-xs text-[#D4A72C] font-semibold mb-1">
                        {prog.marathiTitle}
                      </div>
                      <h3 className="font-serif font-bold text-lg text-[#424242] mb-2">
                        {prog.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#424242]/80 leading-relaxed mb-4">
                        {prog.summary}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-[#424242]/10 flex items-center justify-between text-xs">
                      <span className="text-[#424242]/60 font-medium">
                        {prog.location}
                      </span>
                      <button
                        type="button"
                        onClick={() => onNavigate(`/programs#${prog.slug}`)}
                        className="text-[#C8102E] font-semibold hover:underline inline-flex items-center gap-1"
                      >
                        Learn More <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. IMPACT NUMBERS */}
      <section
        aria-label="Verified Impact Statistics"
        className="py-16 bg-[#FFFFFF] border-b border-[#424242]/10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-widest text-[#C8102E] font-bold">
              Accountability & Numbers
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#424242] mt-1">
              Documented Field Reach
            </h2>
            <p className="text-xs sm:text-sm text-[#424242]/75 mt-2">
              All metrics reflect ongoing community programs across Nallasopara, Vasai, and Palghar district.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {impactMetrics.map((metric) => (
              <div
                key={metric.id}
                className="p-6 rounded-2xl bg-[#FFF8ED] border border-[#D4A72C]/40 text-center flex flex-col items-center justify-center shadow-xs"
              >
                <div className="font-serif font-bold text-3xl sm:text-4xl text-[#C8102E] tabular-nums mb-1">
                  {metric.value}
                </div>
                <div className="text-xs uppercase tracking-wider font-semibold text-[#D4A72C] mb-2">
                  {metric.unit}
                </div>
                <div className="font-medium text-sm text-[#424242] mb-1">
                  {metric.label}
                </div>
                <div className="text-[11px] text-[#424242]/70 leading-snug">
                  {metric.subtext}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. DONATE CALL TO ACTION */}
      <section
        aria-label="Make a Donation"
        className="py-20 bg-gradient-to-r from-[#C8102E] to-[#9b0d23] text-white relative overflow-hidden"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-white rounded-3xl p-8 sm:p-12 text-[#424242] shadow-2xl border border-white/20">
            <div className="text-center max-w-2xl mx-auto mb-8">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF8ED] text-[#C8102E] text-xs font-bold uppercase tracking-wider mb-3">
                <Heart className="w-3.5 h-3.5 fill-[#C8102E]" />
                Support Our Mission
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#424242]">
                Your Contribution Changes Lives
              </h2>
              <p className="text-xs sm:text-sm text-[#424242]/80 mt-2">
                All donations qualify for 80G tax deductions. Choose an amount below to begin the secure payment process.
              </p>
            </div>

            <DonationAmountSelector
              selectedAmount={quickAmount}
              onAmountChange={setQuickAmount}
              frequency={quickFrequency}
              onFrequencyChange={setQuickFrequency}
            />

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                type="button"
                onClick={handleQuickDonate}
                className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-white bg-[#C8102E] hover:bg-[#a50d25] transition-all shadow-md active:scale-[0.98] text-base flex items-center justify-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C8102E]"
              >
                <Heart className="w-5 h-5 fill-white/20" />
                <span>Donate ₹{quickAmount.toLocaleString('en-IN')} via Cashfree</span>
              </button>

              <button
                type="button"
                onClick={() => onNavigate('/donate')}
                className="w-full sm:w-auto px-6 py-4 rounded-xl font-semibold text-[#424242] bg-[#FFF8ED] hover:bg-white border border-[#424242]/20 transition-all text-sm"
              >
                Custom & Cheque Options
              </button>
            </div>

            <div className="mt-6 pt-6 border-t border-[#424242]/10 flex flex-wrap items-center justify-center gap-6 text-xs text-[#424242]/70 text-center">
              <span>✓ Instant 80G Tax Exemption Receipt</span>
              <span>✓ Cashfree RBI-Approved Gateway</span>
              <span>✓ Registered Charity Trust in Nallasopara</span>
            </div>
          </div>
        </div>
      </section>

      {/* 6. STORIES */}
      <section
        aria-label="Community Beneficiary Stories"
        className="py-20 bg-[#FFFFFF] border-b border-[#424242]/10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-widest text-[#C8102E] font-bold">
              Field Narratives
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#424242] mt-1">
              Stories of Resilience
            </h2>
            <p className="text-xs sm:text-sm text-[#424242]/75 mt-2">
              Authentic vignettes of community transformation from our partner villages.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#FFF8ED] rounded-3xl p-6 sm:p-10 border border-[#D4A72C]/30 shadow-xs">
            {fieldStories.map((story) => {
              const storyImg = imageManifest[story.imageSlotId];
              return (
                <React.Fragment key={story.id}>
                  <div className="lg:col-span-5 rounded-2xl overflow-hidden shadow-md border-2 border-white">
                    {storyImg ? (
                      <img
                        src={storyImg.src}
                        alt={storyImg.alt}
                        className="w-full h-72 sm:h-80 object-cover"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="w-full h-72 bg-white flex items-center justify-center">
                        Documentary Portrait
                      </div>
                    )}
                  </div>

                  <div className="lg:col-span-7 flex flex-col gap-4 text-left">
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <span className="bg-[#C8102E] text-white px-2.5 py-0.5 rounded font-semibold">
                        {story.program}
                      </span>
                      <span className="text-[#424242]/60 font-medium">
                        {story.location}
                      </span>
                    </div>

                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#424242]">
                      {story.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#424242]/85 leading-relaxed">
                      {story.body}
                    </p>

                    <div className="p-4 bg-white rounded-xl border border-[#D4A72C]/40 text-xs text-[#424242] flex items-center gap-3">
                      <Sparkles className="w-4 h-4 text-[#D4A72C] shrink-0" />
                      <span>
                        <strong className="text-[#C8102E]">Impact Outcome: </strong>
                        {story.impactHighlight}
                      </span>
                    </div>
                  </div>
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. REVIEWS SHOWCASE */}
      <section
        aria-label="Community Reviews"
        className="py-20 bg-[#FFF8ED]/50 border-b border-[#424242]/10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#C8102E] font-bold">
                Community Voices
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#424242] mt-1">
                Approved Beneficiary & Volunteer Reviews
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('/reviews')}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#C8102E] hover:underline"
            >
              <span>View all reviews & statements</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {approvedReviews.map((rev) => (
              <div
                key={rev.id}
                className="p-6 rounded-2xl bg-white border border-[#424242]/10 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="text-xs text-[#D4A72C] font-semibold uppercase tracking-wider mb-2">
                    {rev.relationship}
                  </div>
                  <p className="text-xs sm:text-sm text-[#424242]/90 italic leading-relaxed mb-6">
                    &ldquo;{rev.quote}&rdquo;
                  </p>
                </div>

                <div className="pt-4 border-t border-[#424242]/10 text-xs">
                  <div className="font-bold text-[#424242]">{rev.author}</div>
                  <div className="text-[#424242]/70">{rev.role}</div>
                  <div className="text-[11px] text-[#424242]/50 mt-0.5">
                    {rev.location} · {rev.date}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. LATEST COMMENTS SHOWCASE */}
      <section
        aria-label="Latest Community Comments"
        className="py-16 bg-[#FFFFFF] border-b border-[#424242]/10"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <span className="text-xs uppercase tracking-widest text-[#C8102E] font-bold">
              Feedback Stream
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#424242] mt-1">
              Recent Community Comments
            </h2>
            <p className="text-xs text-[#424242]/70 mt-1">
              Read transparent observations from program participants and volunteers.
            </p>
          </div>

          <div className="flex flex-col gap-3 mb-8">
            {initialComments.map((com) => (
              <div
                key={com.id}
                className="p-4 rounded-xl bg-[#FFF8ED] border border-[#D4A72C]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div>
                  <div className="font-bold text-[#424242] flex items-center gap-2">
                    <span>{com.author}</span>
                    <span className="text-[11px] font-normal text-[#C8102E] bg-white px-2 py-0.5 rounded border border-[#C8102E]/20">
                      {com.topic}
                    </span>
                  </div>
                  <p className="text-[#424242]/85 mt-1 leading-relaxed">
                    {com.comment}
                  </p>
                </div>
                <div className="text-[11px] text-[#424242]/50 whitespace-nowrap self-end sm:self-center">
                  {com.timestamp}
                </div>
              </div>
            ))}
          </div>

          {/* Comment Submission Form with honest explanation */}
          <div className="p-6 rounded-2xl bg-white border border-[#424242]/15 shadow-xs">
            <h3 className="font-serif font-bold text-base text-[#424242] mb-1">
              Share Your Thoughts with the Foundation
            </h3>
            <p className="text-xs text-[#424242]/70 mb-4">
              Feedback is reviewed by our volunteer team before permanent inclusion in organizational records.
            </p>

            {commentNotice ? (
              <div className="p-4 bg-[#FFF8ED] border border-[#D4A72C] rounded-xl text-xs text-[#424242] flex items-start gap-2.5">
                <Info className="w-4 h-4 text-[#C8102E] shrink-0 mt-0.5" />
                <p className="leading-relaxed">{commentNotice}</p>
              </div>
            ) : (
              <form onSubmit={handleCommentSubmit} className="flex flex-col gap-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    placeholder="Your Full Name"
                    value={commentName}
                    onChange={(e) => setCommentName(e.target.value)}
                    className="p-2.5 rounded-lg border border-[#424242]/20 text-xs focus:outline-none focus:ring-1 focus:ring-[#C8102E]"
                  />
                  <input
                    type="text"
                    placeholder="Topic / Initiative"
                    className="p-2.5 rounded-lg border border-[#424242]/20 text-xs focus:outline-none focus:ring-1 focus:ring-[#C8102E]"
                  />
                </div>
                <textarea
                  required
                  rows={2}
                  placeholder="Your message or feedback..."
                  value={userComment}
                  onChange={(e) => setUserComment(e.target.value)}
                  className="p-2.5 rounded-lg border border-[#424242]/20 text-xs focus:outline-none focus:ring-1 focus:ring-[#C8102E]"
                />
                <button
                  type="submit"
                  className="self-end px-4 py-2 rounded-lg bg-[#C8102E] text-white font-semibold text-xs hover:bg-[#a50d25] transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Comment for Review</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* 9. VOLUNTEER CALL TO ACTION */}
      <section
        aria-label="Volunteer Call to Action"
        className="py-20 bg-[#FFF8ED] border-b border-[#424242]/10"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="p-8 sm:p-12 rounded-3xl bg-white border border-[#D4A72C]/40 shadow-md">
            <span className="text-xs uppercase tracking-widest text-[#C8102E] font-bold">
              Join Hands
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#424242] mt-2 mb-4">
              Become a Grassroots Volunteer in Maharashtra
            </h2>
            <p className="text-xs sm:text-base text-[#424242]/80 max-w-2xl mx-auto leading-relaxed mb-8">
              Whether you are an educator, doctor, legal counselor, or passionate community member,
              your time creates lasting change in Nallasopara and neighboring rural communities.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => onNavigate('/volunteer')}
                className="px-6 py-3.5 rounded-xl font-bold text-white bg-[#C8102E] hover:bg-[#a50d25] transition-all shadow-md text-sm cursor-pointer"
              >
                Volunteer with Us
              </button>
              <button
                type="button"
                onClick={() => onNavigate('/contact')}
                className="px-6 py-3.5 rounded-xl font-semibold text-[#424242] bg-white border border-[#424242]/20 hover:border-[#D4A72C] transition-all text-sm"
              >
                Contact Field Office
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
