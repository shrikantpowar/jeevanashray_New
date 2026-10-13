import React, { useEffect, useState } from 'react';
import { siteConfig } from '../config/siteConfig';
import { Clock, AlertTriangle, Phone, Mail, ArrowRight, RotateCcw, Home } from 'lucide-react';

interface DonationPendingPageProps {
  onNavigate: (path: string) => void;
}

export const DonationPendingPage: React.FC<DonationPendingPageProps> = ({ onNavigate }) => {
  const [orderId, setOrderId] = useState<string>('');

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const id = params.get('order_id') || params.get('orderId') || '';
      setOrderId(id);
    } catch {
      // Ignore
    }
  }, []);

  return (
    <div className="flex flex-col w-full bg-white min-h-[70vh]">
      <div className="max-w-3xl mx-auto px-4 py-16 sm:py-20 text-center">
        <div className="p-8 sm:p-12 rounded-3xl bg-[#FFF8ED] border-2 border-[#D4A72C] text-left shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-[#C8102E] text-white flex items-center justify-center">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-widest text-[#C8102E] font-bold">
                Payment Verification
              </span>
              <h1 className="font-serif font-bold text-2xl sm:text-3xl text-[#424242]">
                Donation Status: Pending or Under Processing
              </h1>
            </div>
          </div>

          <div className="p-4 bg-white rounded-xl border border-[#424242]/15 text-xs text-[#424242] mb-6 space-y-2">
            <div>
              <span className="font-semibold text-[#424242]/70">Order Reference: </span>
              <span className="font-mono font-bold text-[#C8102E]">{orderId || 'PENDING-VERIFY'}</span>
            </div>
            <div>
              <span className="font-semibold text-[#424242]/70">Gateway Channel: </span>
              <span>Cashfree Payments (Processing)</span>
            </div>
            <div>
              <span className="font-semibold text-[#424242]/70">Beneficiary Trust: </span>
              <span>{siteConfig.name}</span>
            </div>
          </div>

          <div className="space-y-3 text-xs sm:text-sm text-[#424242]/85 leading-relaxed mb-8">
            <p>
              If your bank account or UPI app was debited, Cashfree’s automated settlement process may take a few moments to notify our system.
            </p>
            <p>
              <strong>What happens next?</strong>
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs text-[#424242]/80">
              <li>Once Cashfree confirms the payment, your official Section 80G tax receipt will be emailed to you automatically.</li>
              <li>If the transaction failed at your bank, the deducted sum will be refunded by your bank within 3 to 5 banking days.</li>
              <li>You may also quote the Order Reference above to our accounts desk for manual status checks.</li>
            </ul>
          </div>

          {/* Accounts Help Desk */}
          <div className="p-4 bg-[#FFF8ED] rounded-xl border border-[#D4A72C]/40 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div>
              <strong className="block text-[#424242] font-semibold">Questions regarding this donation?</strong>
              <span className="text-[#424242]/70">Contact our accounts team directly</span>
            </div>
            <div className="flex items-center gap-3">
              <a
                href={`tel:${siteConfig.contact.primaryPhone}`}
                className="text-[#C8102E] font-semibold hover:underline flex items-center gap-1"
              >
                <Phone className="w-3.5 h-3.5" />
                {siteConfig.contact.phoneFormatted}
              </a>
              <span>·</span>
              <a
                href={`mailto:${siteConfig.contact.email}?subject=Donation Query: ${orderId}`}
                className="text-[#C8102E] font-semibold hover:underline flex items-center gap-1"
              >
                <Mail className="w-3.5 h-3.5" />
                Email Us
              </a>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={() => onNavigate('/donate')}
              className="px-6 py-3 rounded-xl bg-[#C8102E] text-white font-semibold text-xs sm:text-sm hover:bg-[#a50d25] transition-colors flex items-center gap-2 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retry Donation</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigate('/')}
              className="px-6 py-3 rounded-xl bg-white border border-[#424242]/20 text-[#424242] font-semibold text-xs sm:text-sm hover:bg-gray-50 transition-colors flex items-center gap-2"
            >
              <Home className="w-4 h-4" />
              <span>Return Home</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
