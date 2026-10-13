import React, { useState, useEffect } from 'react';
import { siteConfig } from '../config/siteConfig';
import { DonationAmountSelector } from '../components/DonationAmountSelector';
import { ShieldCheck, Heart, AlertCircle, Loader2, Building, CheckCircle2, FileText, Phone, Mail, Copy, Check } from 'lucide-react';

declare global {
  interface Window {
    Cashfree?: any;
  }
}

interface DonatePageProps {
  onNavigate: (path: string) => void;
}

export const DonatePage: React.FC<DonatePageProps> = ({ onNavigate }) => {
  const [amount, setAmount] = useState<number>(1000);
  const [frequency, setFrequency] = useState<'one-time' | 'monthly'>('one-time');
  const [donorName, setDonorName] = useState("");
  const [donorEmail, setDonorEmail] = useState("");
  const [donorPhone, setDonorPhone] = useState("");
  const [donorPan, setDonorPan] = useState("");
  const [needTaxReceipt, setNeedTaxReceipt] = useState(true);
  const [termsAgreed, setTermsAgreed] = useState(true);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'online' | 'bank-transfer'>('online');

  // Copy state and feedback for direct bank transfer details
  const [copiedField, setCopiedField] = useState<'account' | 'ifsc' | null>(null);
  const [copyError, setCopyError] = useState<string | null>(null);

  const handleCopy = async (text: string, field: 'account' | 'ifsc') => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        const successful = document.execCommand('copy');
        document.body.removeChild(textArea);
        if (!successful) throw new Error('Copy command failed');
      }
      setCopiedField(field);
      setCopyError(null);
      setTimeout(() => {
        setCopiedField((curr) => (curr === field ? null : curr));
      }, 2500);
    } catch {
      setCopyError(`Unable to auto-copy ${field === 'account' ? 'Account Number' : 'IFSC Code'}. Please copy manually.`);
      setTimeout(() => setCopyError(null), 4000);
    }
  };

  // Parse amount from URL query parameter if present
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const urlAmount = params.get('amount');
      if (urlAmount) {
        const parsed = parseInt(urlAmount, 10);
        if (!isNaN(parsed) && parsed >= siteConfig.donation.minDonation) {
          setAmount(parsed);
        }
      }
    } catch {
      // Ignore URL parsing errors
    }
  }, []);

  const handleInitiateDonation = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Validation
    if (!donorName.trim()) {
      setErrorMessage("Please provide your full legal name as per official records.");
      return;
    }
    if (!donorEmail.trim() || !/^\S+@\S+\.\S+$/.test(donorEmail)) {
      setErrorMessage("Please provide a valid email address to receive your payment confirmation.");
      return;
    }
    const cleanPhone = donorPhone.replace(/[^0-9]/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      setErrorMessage("Please provide a valid 10-digit mobile number.");
      return;
    }
    if (needTaxReceipt && donorPan.trim() && !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(donorPan.trim().toUpperCase())) {
      setErrorMessage("Please enter a valid 10-character Indian PAN number (e.g. ABCDE1234F).");
      return;
    }
    if (!termsAgreed) {
      setErrorMessage("Please agree to the donation terms and refund policy.");
      return;
    }

    setIsLoading(true);

    try {
      // 1. Call server-side payment order creation endpoint
      const response = await fetch('/api/payments/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          amount,
          frequency,
          customerName: donorName.trim(),
          customerEmail: donorEmail.trim(),
          customerPhone: cleanPhone.slice(-10),
          pan: donorPan.trim().toUpperCase() || undefined
        })
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to create payment session. Please verify your details.");
      }

      const { paymentSessionId, orderId, sandboxMode } = data;

      // 2. Initialize official Cashfree JS SDK checkout
      if (typeof window.Cashfree === 'function') {
        const cashfree = window.Cashfree({
          mode: sandboxMode ? "sandbox" : "production"
        });

        // Open Cashfree hosted checkout modal / redirect
        cashfree.checkout({
          paymentSessionId,
          redirectTarget: "_self"
        }).then((result: any) => {
          if (result.error) {
            setErrorMessage(result.error.message || "Payment cancelled or could not be initiated.");
            setIsLoading(false);
          }
          if (result.redirect) {
            // SDK handles navigation
          }
        });
      } else {
        // Fallback if Cashfree script is still loading or running in sandbox preview
        // In local mock or sandbox without live script, navigate to pending/verify endpoint
        window.location.href = `/donation-pending?order_id=${encodeURIComponent(orderId)}`;
      }
    } catch (err: any) {
      setErrorMessage(err.message || "Network error while connecting to payment service. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full">
      {/* Header */}
      <section className="bg-gradient-to-b from-[#FFF8ED] to-white py-14 border-b border-[#424242]/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs uppercase tracking-widest text-[#C8102E] font-bold">
            Tax-Exempt Contribution
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#424242] mt-2 mb-4">
            Support Jeevanashray Foundation
          </h1>
          <p className="text-base text-[#424242]/85 max-w-2xl mx-auto leading-relaxed">
            Your generous contribution directly funds rural Balwadis, women&apos;s self-help groups,
            preventive health camps, and smallholder farmer support across Maharashtra.
          </p>

          {/* Payment Method Tabs */}
          <div className="flex items-center justify-center gap-3 mt-8">
            <button
              type="button"
              onClick={() => setActiveTab('online')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'online'
                  ? 'bg-[#C8102E] text-white shadow-sm'
                  : 'bg-white text-[#424242] border border-[#424242]/20 hover:border-[#D4A72C]'
              }`}
            >
              Online via Cashfree (UPI / Cards / Net Banking)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('bank-transfer')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'bank-transfer'
                  ? 'bg-[#C8102E] text-white shadow-sm'
                  : 'bg-white text-[#424242] border border-[#424242]/20 hover:border-[#D4A72C]'
              }`}
            >
              Bank Transfer / Cheque (NEFT / RTGS)
            </button>
          </div>
        </div>
      </section>

      {/* Main Donation Container */}
      <section className="py-14 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {activeTab === 'online' ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              {/* Left Column: Form */}
              <div className="lg:col-span-7 bg-[#FFF8ED]/30 rounded-3xl p-6 sm:p-8 border border-[#424242]/15 shadow-sm">
                <form onSubmit={handleInitiateDonation} className="flex flex-col gap-6">
                  {/* Amount Selection */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#424242] mb-3">
                      Select Donation Amount (INR)
                    </label>
                    <DonationAmountSelector
                      selectedAmount={amount}
                      onAmountChange={setAmount}
                      frequency={frequency}
                      onFrequencyChange={setFrequency}
                    />
                  </div>

                  {/* Donor Contact Details */}
                  <div className="pt-4 border-t border-[#424242]/10 flex flex-col gap-4">
                    <h3 className="font-serif font-bold text-base text-[#424242]">
                      Donor Information
                    </h3>

                    <div>
                      <label className="block text-xs font-semibold text-[#424242] mb-1">
                        Full Name (as per PAN / Bank) *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Shrikant Powar"
                        value={donorName}
                        onChange={(e) => setDonorName(e.target.value)}
                        className="w-full p-3 rounded-xl border border-[#424242]/20 text-xs sm:text-sm bg-white focus:outline-none focus:ring-1 focus:ring-[#C8102E]"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-[#424242] mb-1">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="e.g. shrikant@example.com"
                          value={donorEmail}
                          onChange={(e) => setDonorEmail(e.target.value)}
                          className="w-full p-3 rounded-xl border border-[#424242]/20 text-xs sm:text-sm bg-white focus:outline-none focus:ring-1 focus:ring-[#C8102E]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#424242] mb-1">
                          Mobile Number (10 digits) *
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="e.g. 9876543210"
                          value={donorPhone}
                          onChange={(e) => setDonorPhone(e.target.value)}
                          className="w-full p-3 rounded-xl border border-[#424242]/20 text-xs sm:text-sm bg-white focus:outline-none focus:ring-1 focus:ring-[#C8102E]"
                        />
                      </div>
                    </div>

                    {/* Section 80G Tax Exemption & PAN */}
                    <div className="p-4 bg-white rounded-xl border border-[#D4A72C]/40 flex flex-col gap-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#424242] flex items-center gap-1.5">
                          <ShieldCheck className="w-4 h-4 text-[#C8102E]" />
                          Require 80G Tax Exemption Receipt?
                        </span>
                        <input
                          type="checkbox"
                          checked={needTaxReceipt}
                          onChange={(e) => setNeedTaxReceipt(e.target.checked)}
                          className="h-4 w-4 rounded text-[#C8102E] focus:ring-[#C8102E]"
                        />
                      </div>

                      {needTaxReceipt && (
                        <div>
                          <label className="block text-[11px] font-semibold text-[#424242]/80 mb-1">
                            PAN Card Number (Required by Income Tax Department for 80G):
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. ABCDE1234F"
                            maxLength={10}
                            value={donorPan}
                            onChange={(e) => setDonorPan(e.target.value.toUpperCase())}
                            className="w-full p-2.5 rounded-lg border border-[#424242]/20 text-xs font-mono uppercase focus:outline-none focus:ring-1 focus:ring-[#C8102E]"
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Terms & Consent */}
                  <div className="flex items-start gap-2 pt-2">
                    <input
                      type="checkbox"
                      id="terms-consent"
                      checked={termsAgreed}
                      onChange={(e) => setTermsAgreed(e.target.checked)}
                      className="mt-1 h-4 w-4 rounded border-gray-300 text-[#C8102E] focus:ring-[#C8102E]"
                    />
                    <label htmlFor="terms-consent" className="text-xs text-[#424242]/75 leading-snug">
                      I confirm I am an Indian citizen donating from Indian bank funds in compliance with FCRA/IT regulations. I agree to the{" "}
                      <a href="/terms" onClick={(e) => { e.preventDefault(); onNavigate('/terms'); }} className="text-[#C8102E] underline">
                        Terms
                      </a>{" "}
                      and{" "}
                      <a href="/refund-policy" onClick={(e) => { e.preventDefault(); onNavigate('/refund-policy'); }} className="text-[#C8102E] underline">
                        Refund Policy
                      </a>.
                    </label>
                  </div>

                  {/* Error Notification */}
                  {errorMessage && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-4 px-6 rounded-xl font-bold text-white bg-[#C8102E] hover:bg-[#a50d25] transition-all shadow-md active:scale-[0.98] text-base flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Initializing Cashfree Secure Session...</span>
                      </>
                    ) : (
                      <>
                        <Heart className="w-5 h-5 fill-white/20" />
                        <span>Proceed to Pay ₹{amount.toLocaleString('en-IN')}</span>
                      </>
                    )}
                  </button>

                  <div className="text-center text-[11px] text-[#424242]/60">
                    🔒 256-Bit SSL Encrypted · RBI Licensed Cashfree Payment Gateway
                  </div>
                </form>
              </div>

              {/* Right Column: Trust Markers & 80G Details */}
              <div className="lg:col-span-5 flex flex-col gap-6">
                <div className="p-6 rounded-2xl bg-[#FFF8ED] border border-[#D4A72C]/40 flex flex-col gap-4 text-xs text-[#424242]">
                  <h3 className="font-serif font-bold text-base text-[#424242] flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-[#C8102E]" />
                    Tax Benefit & Receipt
                  </h3>
                  <p className="leading-relaxed text-[#424242]/85">
                    Donations to Jeevanashray Foundation qualify for <strong>50% deduction under Section 80G</strong> of the Income Tax Act. A digital receipt will be emailed immediately following verification by Cashfree.
                  </p>
                  <div className="pt-3 border-t border-[#D4A72C]/30 flex flex-col gap-1 text-[11px] text-[#424242]/70">
                    <div><strong>Trust Registration:</strong> {siteConfig.legal.registrationNumber}</div>
                    <div><strong>Location:</strong> Nallasopara, Palghar District, Maharashtra</div>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-white border border-[#424242]/15 flex flex-col gap-3 text-xs text-[#424242]">
                  <h3 className="font-serif font-bold text-base text-[#424242]">
                    Where Does My Money Go?
                  </h3>
                  <ul className="flex flex-col gap-2.5 text-[#424242]/85">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#C8102E] shrink-0 mt-0.5" />
                      <span><strong>Child Education:</strong> Balwadi classrooms, books, and mid-day nutrition.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#D4A72C] shrink-0 mt-0.5" />
                      <span><strong>Women&apos;s Empowerment:</strong> Seed assistance for Mahila Bachat Gat groups.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#C8102E] shrink-0 mt-0.5" />
                      <span><strong>Health & Medicine:</strong> Free doctor consultations & diagnostic camps.</span>
                    </li>
                  </ul>
                </div>

                <div className="p-6 rounded-2xl bg-white border border-[#424242]/15 text-xs text-[#424242]">
                  <h4 className="font-bold text-[#424242] mb-1">Need Donation Assistance?</h4>
                  <p className="text-[#424242]/70 leading-relaxed mb-3">
                    Our treasurer desk is available Monday to Saturday to assist with receipts or corporate CSR contributions:
                  </p>
                  <div className="flex flex-col gap-1.5 font-medium">
                    <a href={`tel:${siteConfig.contact.primaryPhone}`} className="text-[#C8102E] hover:underline flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5" />
                      {siteConfig.contact.phoneFormatted}
                    </a>
                    <a href={`mailto:${siteConfig.contact.email}`} className="text-[#C8102E] hover:underline flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5" />
                      {siteConfig.contact.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Bank Transfer / Cheque Details */
            <div className="max-w-3xl mx-auto p-6 sm:p-8 rounded-3xl bg-[#FFF8ED] border-2 border-[#D4A72C]/50 shadow-sm text-left">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[#C8102E] text-white flex items-center justify-center shrink-0 shadow-sm">
                  <Building className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="font-serif font-bold text-2xl text-[#424242]">
                    Direct Bank Transfer &amp; Cheque Details
                  </h2>
                  <p className="text-xs text-[#424242]/70 mt-0.5">
                    For direct NEFT, RTGS, IMPS, or physical Cheques drawn in favor of Jeevanashray Foundation.
                  </p>
                </div>
              </div>

              {/* Status / feedback toast if copy fails */}
              {copyError && (
                <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                  <span>{copyError}</span>
                </div>
              )}

              {/* Bank Details Table / Cards */}
              <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#424242]/15 text-xs sm:text-sm text-[#424242] space-y-4 mb-6 shadow-xs">
                {/* Account Name */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 pb-3 border-b border-[#424242]/10 items-center">
                  <span className="font-semibold text-[#424242]/70">Account Name:</span>
                  <span className="sm:col-span-2 font-bold text-base text-[#C8102E]">
                    {siteConfig.bankTransfer.accountName}
                  </span>
                </div>

                {/* Bank Name */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 pb-3 border-b border-[#424242]/10 items-center">
                  <span className="font-semibold text-[#424242]/70">Bank Name:</span>
                  <span className="sm:col-span-2 font-semibold text-sm sm:text-base text-[#424242]">
                    {siteConfig.bankTransfer.bankName}
                  </span>
                </div>

                {/* Branch */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 pb-3 border-b border-[#424242]/10 items-center">
                  <span className="font-semibold text-[#424242]/70">Branch:</span>
                  <span className="sm:col-span-2 font-medium text-[#424242]">
                    {siteConfig.bankTransfer.branch}
                  </span>
                </div>

                {/* Account Number with Copy Button */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pb-3 border-b border-[#424242]/10 items-center">
                  <span className="font-semibold text-[#424242]/70">Account Number:</span>
                  <div className="sm:col-span-2 flex flex-wrap items-center justify-between gap-2 bg-[#FFF8ED]/60 p-2.5 rounded-xl border border-[#D4A72C]/30">
                    <span className="font-mono font-bold text-base sm:text-lg text-[#C8102E] tracking-wider select-all">
                      {siteConfig.bankTransfer.accountNumber}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopy(siteConfig.bankTransfer.accountNumber, 'account')}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer select-none ${
                        copiedField === 'account'
                          ? 'bg-emerald-600 text-white shadow-xs'
                          : 'bg-[#C8102E] text-white hover:bg-[#a50d25] active:scale-95'
                      }`}
                      aria-label="Copy Account Number"
                    >
                      {copiedField === 'account' ? (
                        <>
                          <Check className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>Copy Account Number</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* IFSC Code with Copy Button */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pb-3 border-b border-[#424242]/10 items-center">
                  <span className="font-semibold text-[#424242]/70">IFSC Code:</span>
                  <div className="sm:col-span-2 flex flex-wrap items-center justify-between gap-2 bg-[#FFF8ED]/60 p-2.5 rounded-xl border border-[#D4A72C]/30">
                    <span className="font-mono font-bold text-base sm:text-lg text-[#424242] tracking-wider select-all">
                      {siteConfig.bankTransfer.ifscCode}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopy(siteConfig.bankTransfer.ifscCode, 'ifsc')}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer select-none ${
                        copiedField === 'ifsc'
                          ? 'bg-emerald-600 text-white shadow-xs'
                          : 'bg-[#424242] text-white hover:bg-black active:scale-95'
                      }`}
                      aria-label="Copy IFSC Code"
                    >
                      {copiedField === 'ifsc' ? (
                        <>
                          <Check className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>Copy IFSC Code</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Account Type */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 pb-3 border-b border-[#424242]/10 items-center">
                  <span className="font-semibold text-[#424242]/70">Account Type:</span>
                  <span className="sm:col-span-2 font-medium text-[#424242]">
                    {siteConfig.bankTransfer.accountType}
                  </span>
                </div>

                {/* Cheque Payable */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 items-center">
                  <span className="font-semibold text-[#424242]/70">Payable By Cheque:</span>
                  <span className="sm:col-span-2 font-medium text-[#424242]">
                    &ldquo;{siteConfig.bankTransfer.accountName}&rdquo;, payable at Virar / Nallasopara
                  </span>
                </div>
              </div>

              {/* 80G Receipt Instructions */}
              <div className="p-4 sm:p-5 bg-white rounded-2xl border border-[#D4A72C]/40 text-xs text-[#424242]/90 space-y-2">
                <div className="flex items-center gap-2 text-[#C8102E] font-bold text-xs uppercase tracking-wide">
                  <ShieldCheck className="w-4 h-4 text-[#D4A72C]" />
                  <span>Important for 80G Tax Exemption Receipt</span>
                </div>
                <p className="leading-relaxed">
                  After completing your NEFT / RTGS / IMPS transfer, please email{' '}
                  <a
                    href={`mailto:${siteConfig.contact.email}?subject=Bank Transfer Donation Details - 80G Receipt Request&body=Dear Accounts Desk,%0D%0A%0D%0AI have transferred a donation via NEFT/RTGS to Jeevanashray Foundation.%0D%0A%0D%0ATransfer Details:%0D%0A- Amount (INR): %0D%0A- UTR / Transaction Reference Number: %0D%0A- Date of Transfer: %0D%0A- Donor Full Name: %0D%0A- PAN Card Number: %0D%0A- Address: %0D%0A- Phone Number: %0D%0A%0D%0APlease issue my Section 80G tax exemption certificate.%0D%0A%0D%0AThank you.`}
                    className="text-[#C8102E] underline font-semibold hover:text-[#a50d25] break-all"
                  >
                    {siteConfig.contact.email}
                  </a>{' '}
                  with your <strong>UTR Transaction Reference Number</strong>, donor full name, address, phone number, and PAN card number so our accounts team can promptly verify and dispatch your Section 80G tax exemption receipt.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
