/**
 * Frequently Asked Questions (Transparency, 80G, Volunteering, Cashfree Security, Bank Transfers)
 */

export interface FAQ {
  id: string;
  category: 'Donations' | 'Tax Benefits' | 'Programs' | 'Volunteering';
  question: string;
  answer: string;
}

export const faqs: FAQ[] = [
  {
    id: "faq-01",
    category: "Tax Benefits",
    question: "Are donations to Jeevanashray Foundation tax-exempt under Section 80G?",
    answer: "Yes, eligible donations to Jeevanashray Foundation qualify for tax deductions under Section 80G of the Indian Income Tax Act. A formal digital 80G receipt with transaction reference and trust PAN details is issued for all verified contributions."
  },
  {
    id: "faq-02",
    category: "Donations",
    question: "How are online donations processed, and is my payment secure?",
    answer: "Online donations are processed directly through Cashfree Payments, an RBI-licensed payment aggregator with PCI-DSS Level 1 compliance. Your payment information (UPI, cards, net banking) is processed through bank-grade encryption; our foundation servers never store your card numbers or PINs."
  },
  {
    id: "faq-03",
    category: "Programs",
    question: "Where does Jeevanashray Foundation primarily operate?",
    answer: "The foundation was established in 2013 and is headquartered in Nallasopara, Palghar district, Maharashtra. Our primary field programs run across urban and rural clusters in Vasai-Virar, Palghar talukas, and surrounding agrarian villages in Maharashtra."
  },
  {
    id: "faq-04",
    category: "Volunteering",
    question: "How can I volunteer my time or skills?",
    answer: "We warmly welcome doctors, teachers, vocational instructors, and local community organizers. You can submit our Volunteer interest form or contact our office directly at +91 93211 32003 or jeevanashrayfoundationinfo@gmail.com to match your skills with active field needs."
  },
  {
    id: "faq-05",
    category: "Donations",
    question: "Can I donate via Direct Bank Transfer (NEFT/RTGS/IMPS) or Cheque?",
    answer: "Yes. In addition to online Cashfree payments, the foundation accepts direct bank transfers to our official ICICI Bank account (Account Name: Jeevanashray Foundation, A/C: 156901000802, IFSC: ICIC0000951, Branch: Virar West, Palghar District) and Cheques drawn in favor of 'Jeevanashray Foundation'. Quick-copy buttons and full transfer guidance are available on our Donate page."
  }
];
