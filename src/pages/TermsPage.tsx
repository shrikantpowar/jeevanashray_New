import React from 'react';
import { siteConfig } from '../config/siteConfig';
import { ShieldCheck, FileCheck } from 'lucide-react';

export const TermsPage: React.FC = () => {
  return (
    <div className="flex flex-col w-full bg-white">
      <section className="bg-gradient-to-b from-[#FFF8ED] to-white py-16 border-b border-[#424242]/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs uppercase tracking-widest text-[#C8102E] font-bold">
            Legal Terms of Use
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#424242] mt-2 mb-4">
            Terms & Conditions
          </h1>
          <p className="text-xs sm:text-sm text-[#424242]/70">
            Last Updated: March 2026 · Jeevanashray Foundation
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-8 text-[#424242] text-xs sm:text-sm leading-relaxed">
          <div className="p-5 rounded-2xl bg-[#FFF8ED] border border-[#D4A72C]/40 flex items-start gap-3">
            <FileCheck className="w-5 h-5 text-[#C8102E] shrink-0 mt-0.5" />
            <p>
              Welcome to the official website of Jeevanashray Foundation. By accessing or using this website, you agree to be bound by these Terms and Conditions and all applicable statutory regulations of India.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-lg sm:text-xl font-bold text-[#424242] mb-2">
              1. Organizational Identity & Purpose
            </h2>
            <p>
              Jeevanashray Foundation is a registered public charitable trust established in 2013 and operating in Nallasopara, Palghar district, Maharashtra. This website is maintained to disseminate information on our social welfare programs, facilitate volunteer collaboration, and accept voluntary charitable contributions.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-lg sm:text-xl font-bold text-[#424242] mb-2">
              2. Donation Policy & Eligibility
            </h2>
            <ul className="list-disc pl-5 space-y-1.5 text-[#424242]/85">
              <li>All donations must originate from legitimate and verified bank accounts in India.</li>
              <li>Donations are purely voluntary and intended for non-profit charitable causes supported by the foundation.</li>
              <li>Donors requesting Section 80G tax benefits must provide their valid Permanent Account Number (PAN) as mandated by the Indian Income Tax Department.</li>
              <li>Donation transactions are processed through Cashfree Payments, an RBI-licensed aggregator. Donors agree to adhere to Cashfree terms during checkout.</li>
            </ul>
          </div>

          <div>
            <h2 className="font-serif text-lg sm:text-xl font-bold text-[#424242] mb-2">
              3. Intellectual Property & Brand Assets
            </h2>
            <p>
              All materials, including the Jeevanashray Foundation logo, documentary photographs, text copy, and program designs, are protected under copyright and trademark laws. No assets may be copied, reproduced, or redistributed for commercial gain without explicit written consent from the board of trustees.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-lg sm:text-xl font-bold text-[#424242] mb-2">
              4. Disclaimer of Warranties
            </h2>
            <p>
              While we make every effort to maintain accurate and up-to-date program information, the website content is provided on an &ldquo;as is&rdquo; basis. The foundation reserves the right to modify or adjust program schedules, camp dates, or volunteer drives as needed by field conditions.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-lg sm:text-xl font-bold text-[#424242] mb-2">
              5. Governing Law & Jurisdiction
            </h2>
            <p>
              These terms shall be governed by and construed in accordance with the laws of India. Any disputes arising out of or related to website usage or donations shall be subject to the exclusive jurisdiction of the courts in Vasai / Palghar District, Maharashtra.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
