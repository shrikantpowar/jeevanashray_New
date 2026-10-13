import React from 'react';
import { siteConfig } from '../config/siteConfig';
import { ShieldCheck, Lock, Eye, FileText } from 'lucide-react';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="flex flex-col w-full bg-white">
      <section className="bg-gradient-to-b from-[#FFF8ED] to-white py-16 border-b border-[#424242]/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs uppercase tracking-widest text-[#C8102E] font-bold">
            Statutory Transparency
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#424242] mt-2 mb-4">
            Privacy Policy
          </h1>
          <p className="text-xs sm:text-sm text-[#424242]/70">
            Last Updated: March 2026 · Jeevanashray Foundation (Est. 2013, Nallasopara, Maharashtra)
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-8 text-[#424242] text-xs sm:text-sm leading-relaxed">
          <div className="p-5 rounded-2xl bg-[#FFF8ED] border border-[#D4A72C]/40 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-[#C8102E] shrink-0 mt-0.5" />
            <p>
              Jeevanashray Foundation is committed to respecting the privacy of our donors, volunteers, beneficiaries, and visitors. This policy outlines how information is handled across our web presence in compliance with applicable Indian data protection principles.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-lg sm:text-xl font-bold text-[#424242] mb-2">
              1. Information We Collect
            </h2>
            <p className="mb-2">
              We collect information that you voluntarily provide when making a donation, inquiring about volunteering, or contacting our office:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-[#424242]/85">
              <li><strong>Donor Identification:</strong> Name, email address, mobile number, and postal address.</li>
              <li><strong>Tax Documentation (80G):</strong> Permanent Account Number (PAN) where requested to issue statutory receipts in compliance with Income Tax Department rules.</li>
              <li><strong>Payment Data:</strong> All online payment details (credit/debit cards, UPI, net banking credentials) are collected and processed securely by RBI-licensed payment aggregators (Cashfree Payments). <em>Our foundation servers never store your payment card numbers, CVVs, or bank passwords.</em></li>
            </ul>
          </div>

          <div>
            <h2 className="font-serif text-lg sm:text-xl font-bold text-[#424242] mb-2">
              2. How We Use Your Information
            </h2>
            <ul className="list-disc pl-5 space-y-1.5 text-[#424242]/85">
              <li>Generating and dispatching official Section 80G tax exemption donation receipts.</li>
              <li>Responding to volunteer applications and community inquiries.</li>
              <li>Complying with statutory audits, public trust accounting requirements, and regulatory submissions.</li>
              <li>Transmitting occasional program updates or annual impact reports (you may opt out at any time).</li>
            </ul>
          </div>

          <div>
            <h2 className="font-serif text-lg sm:text-xl font-bold text-[#424242] mb-2">
              3. Data Sharing & Non-Disclosure
            </h2>
            <p>
              We do not sell, rent, or trade your personal information to commercial marketers or third parties. Information is disclosed strictly to:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-[#424242]/85 mt-2">
              <li>Authorized statutory auditors and government bodies (e.g. Income Tax Department for 80G filings).</li>
              <li>Licensed payment service providers (Cashfree) strictly for executing transaction authorization and fraud verification.</li>
            </ul>
          </div>

          <div>
            <h2 className="font-serif text-lg sm:text-xl font-bold text-[#424242] mb-2">
              4. Data Retention & Architecture
            </h2>
            <p>
              Our primary website frontend operates without a public third-party marketing database. Donor transaction records required for legal audits and Section 80G documentation are retained in secure accounting archives in compliance with Indian trust laws.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-lg sm:text-xl font-bold text-[#424242] mb-2">
              5. Contacting the Grievance Desk
            </h2>
            <p>
              For any questions regarding your data or to update your contact preferences, please reach out to:
            </p>
            <div className="mt-3 p-4 bg-[#FFF8ED] rounded-xl border border-[#D4A72C]/30 text-xs">
              <strong className="block text-[#424242] font-bold">{siteConfig.name}</strong>
              <p>Operating Address: {siteConfig.location.operatingAddress}</p>
              <p>Email: <a href={`mailto:${siteConfig.contact.email}`} className="text-[#C8102E] underline">{siteConfig.contact.email}</a></p>
              <p>Helpline: {siteConfig.contact.phoneFormatted}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
