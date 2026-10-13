import React, { useState } from 'react';
import { faqs, FAQ } from '../data/faqs';
import { ChevronDown } from 'lucide-react';

export const FaqAccordion: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id || null);

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="w-full divide-y divide-[#424242]/10 border-y border-[#424242]/10">
      {faqs.map((faq) => {
        const isOpen = openId === faq.id;
        return (
          <div key={faq.id} className="py-4">
            <button
              type="button"
              onClick={() => toggle(faq.id)}
              className="w-full flex items-center justify-between gap-4 text-left font-serif font-medium text-base sm:text-lg text-[#424242] hover:text-[#C8102E] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C8102E] rounded-md py-1"
              aria-expanded={isOpen}
            >
              <span className="flex-1">{faq.question}</span>
              <span className="shrink-0 p-1 text-[#C8102E]">
                <ChevronDown
                  className={`w-5 h-5 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-[#C8102E]' : 'text-[#424242]/60'
                  }`}
                  aria-hidden="true"
                />
              </span>
            </button>
            {isOpen && (
              <div className="pt-2 pb-1 pr-6 text-sm text-[#424242]/85 leading-relaxed">
                {faq.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
