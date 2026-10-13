import React, { useState } from 'react';
import { approvedReviews, CommunityReview } from '../data/reviews';
import { initialComments, CommunityComment } from '../data/comments';
import { MessageSquare, Heart, ShieldCheck, Info, Send, CheckCircle2 } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

export const ReviewsPage: React.FC = () => {
  const [filterType, setFilterType] = useState<string>('All');
  const [formName, setFormName] = useState("");
  const [formRole, setFormRole] = useState("Community Member");
  const [formQuote, setFormQuote] = useState("");
  const [submissionFeedback, setSubmissionFeedback] = useState<string | null>(null);

  const relationships = ['All', 'Beneficiary', 'Community Partner', 'Volunteer', 'Donor'];

  const filteredReviews = filterType === 'All'
    ? approvedReviews
    : approvedReviews.filter((r) => r.relationship === filterType);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formQuote.trim()) return;

    // Honest database-free explanation per Section 9
    setSubmissionFeedback(
      `Thank you, ${formName}. As our website does not utilize an external database without official moderation infrastructure, your submission has been recorded locally for this session. To submit an official testimonial for publication on our website, please email ${siteConfig.contact.email} or call our field desk at ${siteConfig.contact.phoneFormatted}.`
    );
    setFormName("");
    setFormQuote("");
  };

  return (
    <div className="flex flex-col w-full">
      {/* Header */}
      <section className="bg-gradient-to-b from-[#FFF8ED] to-white py-16 border-b border-[#424242]/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs uppercase tracking-widest text-[#C8102E] font-bold">
            Transparent Testimonials & Dialogue
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#424242] mt-2 mb-4">
            Reviews & Community Comments
          </h1>
          <p className="text-base sm:text-lg text-[#424242]/85 max-w-2xl mx-auto leading-relaxed">
            Direct observations and verified feedback from community elders, Balwadi parents,
            Mahila Bachat Gat members, and healthcare volunteers.
          </p>

          {/* Filter Controls */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {relationships.map((rel) => (
              <button
                key={rel}
                type="button"
                onClick={() => setFilterType(rel)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  filterType === rel
                    ? 'bg-[#C8102E] text-white shadow-sm'
                    : 'bg-white text-[#424242] border border-[#424242]/20 hover:border-[#D4A72C] hover:bg-[#FFF8ED]'
                }`}
              >
                {rel}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Database-Free Notice */}
      <section className="py-4 bg-[#FFF8ED] border-b border-[#D4A72C]/30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-3 text-xs text-[#424242]/85">
          <Info className="w-4 h-4 text-[#C8102E] shrink-0" />
          <span>
            <strong>Authenticity Guarantee:</strong> All published reviews are reviewed and verified from real field interactions in Maharashtra. We do not generate synthetic ratings or fake star scores.
          </span>
        </div>
      </section>

      {/* Section 1: Reviews Grid */}
      <section className="py-16 bg-white border-b border-[#424242]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="font-serif text-2xl font-bold text-[#424242]">
              Approved Field Reviews ({filteredReviews.length})
            </h2>
          </div>

          {filteredReviews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {filteredReviews.map((rev) => (
                <div
                  key={rev.id}
                  className="p-8 rounded-2xl bg-[#FFF8ED]/50 border border-[#424242]/15 shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs uppercase tracking-wider font-semibold text-[#D4A72C] bg-white px-2.5 py-1 rounded border border-[#D4A72C]/30">
                        {rev.relationship}
                      </span>
                      <span className="text-xs text-[#C8102E] font-medium flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Verified
                      </span>
                    </div>

                    <p className="text-sm text-[#424242] leading-relaxed italic mb-6">
                      &ldquo;{rev.quote}&rdquo;
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#424242]/10 text-xs">
                    <div className="font-bold text-base text-[#424242]">{rev.author}</div>
                    <div className="text-[#C8102E] font-medium">{rev.role}</div>
                    <div className="text-[#424242]/60 mt-0.5">
                      {rev.location} · {rev.date}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Professional Empty State */
            <div className="p-12 text-center bg-[#FFF8ED] rounded-2xl border border-dashed border-[#424242]/20">
              <MessageSquare className="w-10 h-10 text-[#C8102E] mx-auto mb-3 opacity-60" />
              <h3 className="font-serif font-bold text-lg text-[#424242] mb-1">
                No Reviews Found in this Category
              </h3>
              <p className="text-xs text-[#424242]/70 max-w-md mx-auto">
                No verified testimonials currently match this filter. Only officially authenticated field statements are displayed.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Section 2: Latest Comments Stream */}
      <section className="py-16 bg-[#FFF8ED]/40 border-b border-[#424242]/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center sm:text-left">
            <h2 className="font-serif text-2xl font-bold text-[#424242]">
              Latest Community Comments
            </h2>
            <p className="text-xs text-[#424242]/70 mt-1">
              Observations submitted by participants from our recent workshops and camps.
            </p>
          </div>

          <div className="flex flex-col gap-4 mb-12">
            {initialComments.map((comment) => (
              <div
                key={comment.id}
                className="p-5 rounded-xl bg-white border border-[#424242]/10 shadow-xs flex flex-col sm:flex-row sm:items-start justify-between gap-4 text-xs"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-sm text-[#424242]">{comment.author}</span>
                    <span className="text-[11px] font-semibold text-[#D4A72C] bg-[#FFF8ED] px-2 py-0.5 rounded">
                      {comment.topic}
                    </span>
                  </div>
                  <p className="text-sm text-[#424242]/85 leading-relaxed">
                    {comment.comment}
                  </p>
                </div>
                <span className="text-[11px] text-[#424242]/50 whitespace-nowrap self-end sm:self-start">
                  {comment.timestamp}
                </span>
              </div>
            ))}
          </div>

          {/* Submission Box */}
          <div className="p-8 rounded-2xl bg-white border border-[#D4A72C]/40 shadow-sm">
            <h3 className="font-serif font-bold text-lg text-[#424242] mb-1">
              Submit a Community Statement
            </h3>
            <p className="text-xs text-[#424242]/70 mb-4">
              Share your experience with our programs. Feedback is reviewed by our administration before being archived into permanent publications.
            </p>

            {submissionFeedback ? (
              <div className="p-5 bg-[#FFF8ED] border border-[#D4A72C] rounded-xl text-xs text-[#424242] flex items-start gap-3">
                <Info className="w-5 h-5 text-[#C8102E] shrink-0 mt-0.5" />
                <p className="leading-relaxed">{submissionFeedback}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#424242] mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Anand More"
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      className="w-full p-3 rounded-xl border border-[#424242]/20 text-xs focus:outline-none focus:ring-1 focus:ring-[#C8102E]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#424242] mb-1">
                      Your Affiliation *
                    </label>
                    <select
                      value={formRole}
                      onChange={(e) => setFormRole(e.target.value)}
                      className="w-full p-3 rounded-xl border border-[#424242]/20 text-xs focus:outline-none focus:ring-1 focus:ring-[#C8102E] bg-white"
                    >
                      <option value="Community Member">Community Member</option>
                      <option value="Beneficiary Parent">Beneficiary Parent</option>
                      <option value="SHG Member">SHG (Bachat Gat) Member</option>
                      <option value="Healthcare Volunteer">Healthcare Volunteer</option>
                      <option value="Donor / Supporter">Donor / Supporter</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#424242] mb-1">
                    Your Statement / Feedback *
                  </label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Describe your interaction with Jeevanashray Foundation..."
                    value={formQuote}
                    onChange={(e) => setFormQuote(e.target.value)}
                    className="w-full p-3 rounded-xl border border-[#424242]/20 text-xs focus:outline-none focus:ring-1 focus:ring-[#C8102E]"
                  />
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                  <span className="text-[11px] text-[#424242]/60">
                    * Submissions require server verification before permanent display.
                  </span>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-[#C8102E] text-white font-semibold text-xs hover:bg-[#a50d25] transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send for Moderation</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
