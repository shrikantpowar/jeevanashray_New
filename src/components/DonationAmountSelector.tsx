import React, { useState } from 'react';
import { siteConfig } from '../config/siteConfig';
import { Heart, Sparkles } from 'lucide-react';

interface DonationAmountSelectorProps {
  selectedAmount: number;
  onAmountChange: (amount: number) => void;
  frequency: 'one-time' | 'monthly';
  onFrequencyChange: (freq: 'one-time' | 'monthly') => void;
}

export const DonationAmountSelector: React.FC<DonationAmountSelectorProps> = ({
  selectedAmount,
  onAmountChange,
  frequency,
  onFrequencyChange
}) => {
  const [isCustom, setIsCustom] = useState(false);
  const [customValue, setCustomValue] = useState("");

  const presets = siteConfig.donation.suggestedAmounts;

  const handlePresetSelect = (amount: number) => {
    setIsCustom(false);
    setCustomValue("");
    onAmountChange(amount);
  };

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/[^0-9]/g, '');
    setCustomValue(val);
    const parsed = parseInt(val, 10);
    if (!isNaN(parsed) && parsed >= siteConfig.donation.minDonation) {
      onAmountChange(parsed);
    }
  };

  const getImpactEquivalency = (amount: number) => {
    if (amount >= 5000) {
      return "Sponsors a complete community health camp checkup session & medicines for 30+ elders.";
    }
    if (amount >= 2500) {
      return "Provides micro-enterprise startup raw materials and seed support for a rural Mahila Bachat Gat.";
    }
    if (amount >= 1000) {
      return "Covers nutrition and early childhood learning kits for 2 Balwadi preschool children for a month.";
    }
    return "Provides essential learning notebooks, stationery, and books for underprivileged school students.";
  };

  return (
    <div className="w-full flex flex-col gap-5">
      {/* Frequency Toggle */}
      <div className="flex items-center justify-center p-1 bg-[#FFF8ED] rounded-xl border border-[#D4A72C]/30 max-w-sm mx-auto w-full">
        <button
          type="button"
          onClick={() => onFrequencyChange('one-time')}
          className={`flex-1 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
            frequency === 'one-time'
              ? 'bg-[#C8102E] text-white shadow-sm'
              : 'text-[#424242] hover:text-[#C8102E]'
          }`}
        >
          One-Time Gift
        </button>
        <button
          type="button"
          onClick={() => onFrequencyChange('monthly')}
          className={`flex-1 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
            frequency === 'monthly'
              ? 'bg-[#C8102E] text-white shadow-sm'
              : 'text-[#424242] hover:text-[#C8102E]'
          }`}
        >
          <span>Monthly Pledge</span>
          <span className="text-[10px] bg-[#D4A72C] text-black px-1.5 py-0.2 rounded font-bold">
            Sustained
          </span>
        </button>
      </div>

      {/* Preset Amount Grid */}
      <div className="grid grid-cols-3 sm:grid-cols-5 gap-2.5">
        {presets.map((amount) => {
          const isSelected = !isCustom && selectedAmount === amount;
          return (
            <button
              key={amount}
              type="button"
              onClick={() => handlePresetSelect(amount)}
              className={`py-3 px-2 rounded-xl text-center font-bold text-sm sm:text-base border transition-all cursor-pointer ${
                isSelected
                  ? 'bg-[#C8102E] text-white border-[#C8102E] shadow-sm ring-2 ring-[#C8102E]/20'
                  : 'bg-white text-[#424242] border-[#424242]/20 hover:border-[#C8102E] hover:bg-[#FFF8ED]'
              }`}
            >
              ₹{amount.toLocaleString('en-IN')}
            </button>
          );
        })}
      </div>

      {/* Custom Amount Field */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              setIsCustom(true);
              if (!customValue && selectedAmount) {
                setCustomValue(selectedAmount.toString());
              }
            }}
            className={`text-xs font-semibold uppercase tracking-wider transition-colors ${
              isCustom ? 'text-[#C8102E]' : 'text-[#424242]/70 hover:text-[#424242]'
            }`}
          >
            Or Enter Custom Amount (INR)
          </button>
        </div>

        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#424242]/60 font-bold">
            ₹
          </div>
          <input
            type="text"
            inputMode="numeric"
            placeholder="e.g. 3500"
            value={customValue}
            onChange={(e) => {
              setIsCustom(true);
              handleCustomChange(e);
            }}
            onFocus={() => setIsCustom(true)}
            className={`w-full pl-8 pr-4 py-2.5 rounded-xl border text-base font-semibold transition-all focus:outline-none ${
              isCustom
                ? 'border-[#C8102E] ring-2 ring-[#C8102E]/20 bg-white'
                : 'border-[#424242]/20 bg-white/60 hover:bg-white'
            }`}
          />
        </div>
      </div>

      {/* Impact Equivalency Indicator */}
      <div className="p-3.5 bg-[#FFF8ED] border border-[#D4A72C]/40 rounded-xl text-xs sm:text-sm text-[#424242] flex items-start gap-2.5">
        <Sparkles className="w-4 h-4 text-[#D4A72C] shrink-0 mt-0.5" aria-hidden="true" />
        <p className="leading-relaxed">
          <strong className="text-[#C8102E] font-semibold">Your Impact: </strong>
          {getImpactEquivalency(selectedAmount)}
        </p>
      </div>
    </div>
  );
};
