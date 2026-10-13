import React, { useState } from 'react';
import { siteConfig } from '../config/siteConfig';
import { Heart, Users, Clock, CheckCircle2, ShieldCheck, Mail, Phone, Info } from 'lucide-react';

export const VolunteerPage: React.FC = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [skillArea, setSkillArea] = useState("Balwadi Teaching & Child Tutoring");
  const [availability, setAvailability] = useState("Weekends (4-6 hours)");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submittedData, setSubmittedData] = useState<Record<string, any> | null>(null);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!fullName.trim()) errs.fullName = "Please enter your full name.";
    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email)) {
      errs.email = "Please enter a valid email address.";
    }
    if (!phone.trim() || !/^[6-9]\d{9}$/.test(phone.replace(/[^0-9]/g, '').slice(-10))) {
      errs.phone = "Please enter a valid 10-digit Indian phone number.";
    }
    if (!consent) {
      errs.consent = "Please confirm consent to be contacted regarding volunteer opportunities.";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmittedData({
      fullName,
      email,
      phone,
      skillArea,
      availability,
      message
    });
  };

  const handleReset = () => {
    setSubmittedData(null);
    setFullName("");
    setEmail("");
    setPhone("");
    setMessage("");
    setConsent(false);
    setErrors({});
  };

  return (
    <div className="flex flex-col w-full">
      {/* Header */}
      <section className="bg-gradient-to-b from-[#FFF8ED] to-white py-16 border-b border-[#424242]/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs uppercase tracking-widest text-[#C8102E] font-bold">
            Community Service
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#424242] mt-2 mb-4">
            Volunteer With Jeevanashray Foundation
          </h1>
          <p className="text-base sm:text-lg text-[#424242]/85 max-w-2xl mx-auto leading-relaxed">
            Give your time, skills, and energy to support children, women, and smallholder farmers
            in Nallasopara and Palghar district.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Info Column */}
            <div className="lg:col-span-5 flex flex-col gap-6 text-[#424242]">
              <div>
                <h2 className="font-serif text-2xl font-bold text-[#424242] mb-3">
                  Why Volunteer With Us?
                </h2>
                <p className="text-xs sm:text-sm text-[#424242]/85 leading-relaxed">
                  We believe in grassroots engagement. As a volunteer, you will work directly alongside community elders, teachers in Balwadis, doctors in health camps, and women entrepreneurs.
                </p>
              </div>

              <div className="flex flex-col gap-4">
                <div className="p-4 rounded-xl bg-[#FFF8ED] border border-[#D4A72C]/40 flex items-start gap-3 text-xs">
                  <CheckCircle2 className="w-5 h-5 text-[#C8102E] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#424242] block font-semibold mb-0.5">Flexible Opportunities</strong>
                    <span>Weekend tutoring, bi-weekly health camps, or administrative support.</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#FFF8ED] border border-[#D4A72C]/40 flex items-start gap-3 text-xs">
                  <ShieldCheck className="w-5 h-5 text-[#D4A72C] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#424242] block font-semibold mb-0.5">Volunteer Recognition</strong>
                    <span>Certificate of community service and official recommendation upon completion.</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#FFF8ED] border border-[#D4A72C]/40 flex items-start gap-3 text-xs">
                  <Phone className="w-5 h-5 text-[#C8102E] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#424242] block font-semibold mb-0.5">Direct Field Desk</strong>
                    <span>Questions? Call our office at {siteConfig.contact.phoneFormatted}.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Form Column */}
            <div className="lg:col-span-7">
              {submittedData ? (
                /* Non-Persistent Demonstration Mode Result */
                <div className="p-8 rounded-2xl bg-[#FFF8ED] border-2 border-[#D4A72C] shadow-sm">
                  <div className="flex items-center gap-2 text-[#C8102E] font-bold text-lg mb-3">
                    <CheckCircle2 className="w-6 h-6" />
                    <span>Form Validated (Demonstration Mode)</span>
                  </div>
                  <div className="p-4 bg-white rounded-xl border border-[#D4A72C]/30 text-xs text-[#424242] mb-6 leading-relaxed">
                    <p className="font-semibold text-[#C8102E] mb-1">
                      System Notice: Non-Persistent Demonstration Mode Active
                    </p>
                    <p>
                      This application operates without an external database. Your inputs for <strong>{submittedData.fullName}</strong> ({submittedData.email}) have passed all client-side validation checks, but are not stored in a persistent database.
                    </p>
                    <p className="mt-2">
                      To submit your volunteer application immediately to our field coordinators, please reach out via our official channels below:
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <a
                      href={`mailto:${siteConfig.contact.email}?subject=Volunteer Application: ${encodeURIComponent(submittedData.fullName)}&body=Name: ${encodeURIComponent(submittedData.fullName)}%0D%0APhone: ${encodeURIComponent(submittedData.phone)}%0D%0AArea: ${encodeURIComponent(submittedData.skillArea)}%0D%0AAvailability: ${encodeURIComponent(submittedData.availability)}%0D%0AMessage: ${encodeURIComponent(submittedData.message || '')}`}
                      className="flex-1 py-3 px-4 rounded-xl bg-[#C8102E] text-white font-semibold text-xs text-center flex items-center justify-center gap-2 hover:bg-[#a50d25] transition-colors"
                    >
                      <Mail className="w-4 h-4" />
                      <span>Email Application to Field Office</span>
                    </a>

                    <button
                      type="button"
                      onClick={handleReset}
                      className="py-3 px-4 rounded-xl bg-white border border-[#424242]/20 text-[#424242] font-semibold text-xs hover:bg-gray-50 transition-colors"
                    >
                      Fill Form Again
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-8 rounded-2xl bg-white border border-[#424242]/15 shadow-sm">
                  <div className="mb-6">
                    <h3 className="font-serif font-bold text-xl text-[#424242]">
                      Register Your Interest
                    </h3>
                    <p className="text-xs text-[#424242]/70 mt-1">
                      Fields marked with * are required. Validated locally with non-persistent demonstration.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#424242] mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Rohini Deshmukh"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className={`w-full p-3 rounded-xl border text-xs focus:outline-none focus:ring-1 ${
                          errors.fullName ? 'border-red-500 ring-1 ring-red-500' : 'border-[#424242]/20 focus:ring-[#C8102E]'
                        }`}
                      />
                      {errors.fullName && <span className="text-[11px] text-red-600 mt-1 block">{errors.fullName}</span>}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-[#424242] mb-1">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          placeholder="e.g. rohini@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className={`w-full p-3 rounded-xl border text-xs focus:outline-none focus:ring-1 ${
                            errors.email ? 'border-red-500 ring-1 ring-red-500' : 'border-[#424242]/20 focus:ring-[#C8102E]'
                          }`}
                        />
                        {errors.email && <span className="text-[11px] text-red-600 mt-1 block">{errors.email}</span>}
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#424242] mb-1">
                          Phone Number (10 digits) *
                        </label>
                        <input
                          type="tel"
                          placeholder="e.g. 9876543210"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className={`w-full p-3 rounded-xl border text-xs focus:outline-none focus:ring-1 ${
                            errors.phone ? 'border-red-500 ring-1 ring-red-500' : 'border-[#424242]/20 focus:ring-[#C8102E]'
                          }`}
                        />
                        {errors.phone && <span className="text-[11px] text-red-600 mt-1 block">{errors.phone}</span>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-[#424242] mb-1">
                          Skill / Interest Area *
                        </label>
                        <select
                          value={skillArea}
                          onChange={(e) => setSkillArea(e.target.value)}
                          className="w-full p-3 rounded-xl border border-[#424242]/20 text-xs focus:outline-none focus:ring-1 focus:ring-[#C8102E] bg-white"
                        >
                          <option value="Balwadi Teaching & Child Tutoring">Balwadi Teaching & Child Tutoring</option>
                          <option value="Women's SHG & Financial Literacy">Women&apos;s SHG & Financial Literacy</option>
                          <option value="Community Medical Camps (Doctor/Nurse)">Community Medical Camps (Doctor/Nurse)</option>
                          <option value="Rural Agriculture & Soil Health">Rural Agriculture & Soil Health</option>
                          <option value="Legal & Information Access Rights">Legal & Information Access Rights</option>
                          <option value="Field Logistics & Relief Distribution">Field Logistics & Relief Distribution</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#424242] mb-1">
                          Availability *
                        </label>
                        <select
                          value={availability}
                          onChange={(e) => setAvailability(e.target.value)}
                          className="w-full p-3 rounded-xl border border-[#424242]/20 text-xs focus:outline-none focus:ring-1 focus:ring-[#C8102E] bg-white"
                        >
                          <option value="Weekends (4-6 hours)">Weekends (4-6 hours)</option>
                          <option value="Weekdays (Part-time)">Weekdays (Part-time)</option>
                          <option value="Monthly Medical Drives">Monthly Medical Drives</option>
                          <option value="Virtual / Remote Mentorship">Virtual / Remote Mentorship</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#424242] mb-1">
                        Brief Background / Prior Experience (Optional)
                      </label>
                      <textarea
                        rows={2}
                        placeholder="Tell us a little about yourself or why you want to support Jeevanashray Foundation..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full p-3 rounded-xl border border-[#424242]/20 text-xs focus:outline-none focus:ring-1 focus:ring-[#C8102E]"
                      />
                    </div>

                    <div className="flex items-start gap-2 pt-1">
                      <input
                        type="checkbox"
                        id="volunteer-consent"
                        checked={consent}
                        onChange={(e) => setConsent(e.target.checked)}
                        className="mt-1 h-4 w-4 rounded border-gray-300 text-[#C8102E] focus:ring-[#C8102E]"
                      />
                      <label htmlFor="volunteer-consent" className="text-xs text-[#424242]/80 leading-snug">
                        I agree to be contacted by Jeevanashray Foundation coordinators regarding volunteer activities. I understand this form validates my details in demonstration mode without storing them in a remote database. *
                      </label>
                    </div>
                    {errors.consent && <span className="text-[11px] text-red-600 block">{errors.consent}</span>}

                    <button
                      type="submit"
                      className="mt-2 py-3 px-6 rounded-xl bg-[#C8102E] text-white font-semibold text-xs sm:text-sm hover:bg-[#a50d25] transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Heart className="w-4 h-4 fill-white/20" />
                      <span>Submit Volunteer Interest</span>
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
