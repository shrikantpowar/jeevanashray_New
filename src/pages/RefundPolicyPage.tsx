import React from 'react';
import { siteConfig } from '../config/siteConfig';
import { ShieldCheck, RefreshCw, AlertCircle } from 'lucide-react';

export const RefundPolicyPage: React.FC = () => {
  return (
    <div className="flex flex-col w-full bg-white">
      <section className="bg-gradient-to-b from-[#FFF8ED] to-white py-16 border-b border-[#424242]/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs uppercase tracking-widest text-[#C8102E] font-bold">
            Donor Protection
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#424242] mt-2 mb-4">
            Refund & Cancellation Policy
          </h1>
          <p className="text-xs sm:text-sm text-[#424242]/70">
            Last Updated: March 2026 · Jeevanashray Foundation
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-8 text-[#424242] text-xs sm:text-sm leading-relaxed">
          <div className="p-5 rounded-2xl bg-[#FFF8ED] border border-[#D4A72C]/40 flex items-start gap-3">
            <RefreshCw className="w-5 h-5 text-[#C8102E] shrink-0 mt-0.5" />
            <p>
              As a non-profit organization dedicated to community welfare, Jeevanashray Foundation relies on charitable donations to plan and execute programs. We adhere to a clear and fair policy regarding donation refunds and cancellations.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-lg sm:text-xl font-bold text-[#424242] mb-2">
              1. General Refund Principle
            </h2>
            <p>
              Under normal circumstances, all donations made to Jeevanashray Foundation are voluntary and non-refundable once committed and deployed into ongoing charitable projects.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-lg sm:text-xl font-bold text-[#424242] mb-2">
              2. Exceptions for Erroneous or Duplicate Transactions
            </h2>
            <p className="mb-2">
              We understand that technical glitches or inadvertent double-deductions may occasionally happen. We will gladly investigate and process a refund under the following verified circumstances:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-[#424242]/85">
              <li><strong>Duplicate Transaction:</strong> If a technical error resulted in your bank account being debited more than once for the same donation intent.</li>
              <li><strong>Incorrect Amount Debited:</strong> If an amount significantly different from your entered amount was processed due to a gateway transmission glitch.</li>
              <li><strong>Unauthorized Transaction:</strong> If your card or payment instrument was used fraudulently without your knowledge, subject to standard bank verification.</li>
            </ul>
          </div>

          <div>
            <h2 className="font-serif text-lg sm:text-xl font-bold text-[#424242] mb-2">
              3. Timeframe for Requesting a Refund
            </h2>
            <p>
              Refund requests for erroneous or duplicate transactions must be submitted within <strong>7 calendar days</strong> of the transaction date. Requests made after this window may not be honored if funds have already been allocated and expended on field relief materials.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-lg sm:text-xl font-bold text-[#424242] mb-2">
              4. Section 80G Receipt Invalidation
            </h2>
            <p>
              If a refund is granted, any Section 80G tax exemption receipt issued for that transaction will be formally cancelled and voided in our records. Donors are legally prohibited from claiming tax deductions on refunded contributions.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-lg sm:text-xl font-bold text-[#424242] mb-2">
              5. How to Submit a Refund Request
            </h2>
            <p>
              To request a refund, please send an email to <a href={`mailto:${siteConfig.contact.email}`} className="text-[#C8102E] underline font-semibold">{siteConfig.contact.email}</a> with the subject line <em>&ldquo;Donation Refund Request - [Order ID]&rdquo;</em> and include:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-[#424242]/85 mt-2">
              <li>Full Name of the Donor</li>
              <li>Date and Time of Transaction</li>
              <li>Cashfree Order ID / Bank Reference Number (UTR)</li>
              <li>Exact Amount Debited</li>
              <li>Clear Reason for Refund with bank statement proof</li>
            </ul>
            <p className="mt-3">
              Approved refunds will be processed back to the original source payment instrument within 7 to 10 business days in accordance with RBI and banking cycles.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
