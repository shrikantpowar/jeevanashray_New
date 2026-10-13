import React, { useState } from 'react';
import { siteConfig } from '../config/siteConfig';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, ShieldCheck, AlertCircle } from 'lucide-react';

interface ContactPageProps {
  onNavigate: (path: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('General Inquiry');
  const [message, setMessage] = useState('');
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isDemoSubmitted, setIsDemoSubmitted] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = 'Please enter your full name.';
    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email)) {
      errs.email = 'Please provide a valid email address.';
    }
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      errs.phone = 'Please provide a valid 10-digit phone number.';
    }
    if (!message.trim() || message.trim().length < 10) {
      errs.message = 'Please provide a message with at least 10 characters.';
    }
    if (!consent) {
      errs.consent = 'Please confirm consent to be contacted regarding your message.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsDemoSubmitted(true);
  };

  const handleReset = () => {
    setIsDemoSubmitted(false);
    setName('');
    setEmail('');
    setPhone('');
    setMessage('');
    setConsent(false);
    setErrors({});
  };

  return (
    <div className="flex flex-col w-full">
      {/* Header */}
      <section className="bg-gradient-to-b from-[#FFF8ED] to-white py-16 border-b border-[#424242]/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs uppercase tracking-widest text-[#C8102E] font-bold">
            Get in Touch
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#424242] mt-2 mb-4">
            Contact Jeevanashray Foundation
          </h1>
          <p className="text-base sm:text-lg text-[#424242]/85 max-w-2xl mx-auto leading-relaxed">
            Reach out to our field office in Nallasopara, Palghar. We are here to answer questions
            about programs, partnerships, donations, or emergency assistance.
          </p>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Column: Office Details */}
            <div className="lg:col-span-5 flex flex-col gap-6 text-[#424242]">
              <div>
                <h2 className="font-serif text-2xl font-bold text-[#424242] mb-3">
                  Field Office & Helpline
                </h2>
                <p className="text-xs sm:text-sm text-[#424242]/80 leading-relaxed">
                  Our core team and field workers operate daily from Nallasopara, coordinating education centers, self-help groups, and rural aid throughout Palghar district.
                </p>
              </div>

              <div className="flex flex-col gap-4">
                <div className="p-5 rounded-2xl bg-[#FFF8ED] border border-[#D4A72C]/30 flex items-start gap-3.5">
                  <MapPin className="w-5 h-5 text-[#C8102E] shrink-0 mt-0.5" />
                  <div className="text-xs sm:text-sm">
                    <strong className="block text-[#424242] font-semibold mb-1">
                      Operating Address:
                    </strong>
                    <p className="text-[#424242]/80 leading-relaxed">
                      {siteConfig.location.operatingAddress}
                    </p>
                    <div className="mt-2 pt-2 border-t border-[#D4A72C]/20 text-[11px] text-[#424242]/70">
                      <strong>Registered Address:</strong> {siteConfig.location.registeredAddress}
                    </div>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-[#FFF8ED] border border-[#D4A72C]/30 flex items-start gap-3.5">
                  <Phone className="w-5 h-5 text-[#D4A72C] shrink-0 mt-0.5" />
                  <div className="text-xs sm:text-sm">
                    <strong className="block text-[#424242] font-semibold mb-1">
                      Helpline & Contact:
                    </strong>
                    <a
                      href={`tel:${siteConfig.contact.primaryPhone}`}
                      className="text-[#C8102E] font-semibold hover:underline"
                    >
                      {siteConfig.contact.phoneFormatted}
                    </a>
                    <div className="text-[11px] text-[#424242]/70 mt-1">
                      Operating Hours: {siteConfig.contact.operatingHours}
                    </div>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-[#FFF8ED] border border-[#D4A72C]/30 flex items-start gap-3.5">
                  <Mail className="w-5 h-5 text-[#C8102E] shrink-0 mt-0.5" />
                  <div className="text-xs sm:text-sm">
                    <strong className="block text-[#424242] font-semibold mb-1">
                      Email Inquiries:
                    </strong>
                    <a
                      href={`mailto:${siteConfig.contact.email}`}
                      className="text-[#C8102E] font-semibold hover:underline break-all"
                    >
                      {siteConfig.contact.email}
                    </a>
                    <div className="text-[11px] text-[#424242]/70 mt-1">
                      Responses typically within 24–48 business hours
                    </div>
                  </div>
                </div>
              </div>

              {/* Legal Note */}
              <div className="p-4 rounded-xl bg-white border border-[#424242]/15 text-xs text-[#424242]/80 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#C8102E] shrink-0" />
                <span>
                  Registered Public Charitable Trust (Est. 2013) with Section 80G tax exemption.
                </span>
              </div>
            </div>

            {/* Right Column: Contact Form */}
            <div className="lg:col-span-7">
              {isDemoSubmitted ? (
                /* Non-Persistent Demonstration Mode Result */
                <div className="p-8 rounded-2xl bg-[#FFF8ED] border-2 border-[#D4A72C] shadow-sm">
                  <div className="flex items-center gap-2 text-[#C8102E] font-bold text-lg mb-3">
                    <CheckCircle2 className="w-6 h-6" />
                    <span>Inquiry Validated (Demonstration Mode)</span>
                  </div>

                  <div className="p-4 bg-white rounded-xl border border-[#D4A72C]/30 text-xs text-[#424242] mb-6 leading-relaxed">
                    <p className="font-semibold text-[#C8102E] mb-1">
                      System Architecture Notice:
                    </p>
                    <p>
                      This application operates without an external database. Your message from <strong>{name}</strong> ({email}) has successfully passed all validation checks.
                    </p>
                    <p className="mt-2">
                      To reach our administrative desk immediately without waiting for database sync, please click below to send via your email client, or call {siteConfig.contact.phoneFormatted}.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <a
                      href={`mailto:${siteConfig.contact.email}?subject=${encodeURIComponent(subject + ': ' + name)}&body=Name: ${encodeURIComponent(name)}%0D%0APhone: ${encodeURIComponent(phone)}%0D%0AEmail: ${encodeURIComponent(email)}%0D%0AMessage:%0D%0A${encodeURIComponent(message)}`}
                      className="flex-1 py-3 px-4 rounded-xl bg-[#C8102E] text-white font-semibold text-xs text-center flex items-center justify-center gap-2 hover:bg-[#a50d25] transition-colors"
                    >
                      <Mail className="w-4 h-4" />
                      <span>Send Direct Email to Desk</span>
                    </a>

                    <button
                      type="button"
                      onClick={handleReset}
                      className="py-3 px-4 rounded-xl bg-white border border-[#424242]/20 text-[#424242] font-semibold text-xs hover:bg-gray-50 transition-colors"
                    >
                      Write Another Message
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-8 rounded-2xl bg-white border border-[#424242]/15 shadow-sm">
                  <div className="mb-6">
                    <h3 className="font-serif font-bold text-xl text-[#424242]">
                      Send Us a Message
                    </h3>
                    <p className="text-xs text-[#424242]/70 mt-1">
                      Please fill in your details below. Validated locally with non-persistent demonstration.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#424242] mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Anand Shinde"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className={`w-full p-3 rounded-xl border text-xs focus:outline-none focus:ring-1 ${
                          errors.name ? 'border-red-500 ring-1 ring-red-500' : 'border-[#424242]/20 focus:ring-[#C8102E]'
                        }`}
                      />
                      {errors.name && <span className="text-[11px] text-red-600 mt-1 block">{errors.name}</span>}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-[#424242] mb-1">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          placeholder="e.g. anand@example.com"
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
                          Mobile Number (10 digits) *
                        </label>
                        <input
                          type="tel"
                          placeholder="e.g. 9820123456"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className={`w-full p-3 rounded-xl border text-xs focus:outline-none focus:ring-1 ${
                            errors.phone ? 'border-red-500 ring-1 ring-red-500' : 'border-[#424242]/20 focus:ring-[#C8102E]'
                          }`}
                        />
                        {errors.phone && <span className="text-[11px] text-red-600 mt-1 block">{errors.phone}</span>}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#424242] mb-1">
                        Inquiry Subject *
                      </label>
                      <select
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="w-full p-3 rounded-xl border border-[#424242]/20 text-xs focus:outline-none focus:ring-1 focus:ring-[#C8102E] bg-white"
                      >
                        <option value="General Inquiry">General Inquiry</option>
                        <option value="Donation & 80G Receipt">Donation & 80G Tax Receipt</option>
                        <option value="Balwadi Child Admission">Balwadi Child Program Admission</option>
                        <option value="Mahila Bachat Gat / Women SHG">Mahila Bachat Gat / Women SHG</option>
                        <option value="Health Camps & Medical Aid">Health Camps & Medical Aid</option>
                        <option value="Corporate CSR Partnership">Corporate CSR Partnership</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#424242] mb-1">
                        Message *
                      </label>
                      <textarea
                        rows={4}
                        placeholder="Please write your detailed message or question..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className={`w-full p-3 rounded-xl border text-xs focus:outline-none focus:ring-1 ${
                          errors.message ? 'border-red-500 ring-1 ring-red-500' : 'border-[#424242]/20 focus:ring-[#C8102E]'
                        }`}
                      />
                      {errors.message && <span className="text-[11px] text-red-600 mt-1 block">{errors.message}</span>}
                    </div>

                    <div className="flex items-start gap-2 pt-1">
                      <input
                        type="checkbox"
                        id="contact-consent"
                        checked={consent}
                        onChange={(e) => setConsent(e.target.checked)}
                        className="mt-1 h-4 w-4 rounded border-gray-300 text-[#C8102E] focus:ring-[#C8102E]"
                      />
                      <label htmlFor="contact-consent" className="text-xs text-[#424242]/80 leading-snug">
                        I confirm that the information provided is accurate and grant permission for Jeevanashray Foundation to respond to this inquiry. I understand this form validates locally in demonstration mode. *
                      </label>
                    </div>
                    {errors.consent && <span className="text-[11px] text-red-600 block">{errors.consent}</span>}

                    <button
                      type="submit"
                      className="mt-2 py-3 px-6 rounded-xl bg-[#C8102E] text-white font-semibold text-xs sm:text-sm hover:bg-[#a50d25] transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                      <span>Validate & Submit Message</span>
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
