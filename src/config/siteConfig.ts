/**
 * Global Site Configuration for Jeevanashray Foundation
 * Est. 2013 | Nallasopara, Palghar, Maharashtra, India
 * 
 * Strict Brand Colors:
 * - White: #FFFFFF
 * - Ivory: #FFF8ED
 * - Foundation Red: #C8102E
 * - Gold: #D4A72C
 * - Charcoal: #424242
 */

export interface SiteConfig {
  name: string;
  tagline: string;
  establishedYear: number;
  location: {
    town: string;
    taluka: string;
    district: string;
    state: string;
    pincode: string;
    registeredAddress: string;
    operatingAddress: string;
  };
  contact: {
    primaryPhone: string;
    phoneFormatted: string;
    emergencyContact: string;
    email: string;
    operatingHours: string;
  };
  legal: {
    registrationNumber: string;
    darpanId: string;
    taxExemption80G: string;
    section12A: string;
    pan: string;
  };
  socialLinks: {
    platform: string;
    url: string;
    label: string;
  }[];
  donation: {
    currency: string;
    currencySymbol: string;
    suggestedAmounts: number[];
    minDonation: number;
    cashfreeEnv: 'TEST' | 'PROD';
  };
  bankTransfer: {
    accountName: string;
    bankName: string;
    branch: string;
    accountNumber: string;
    ifscCode: string;
    accountType: string;
  };
  logo: {
    uploadedLogoPath?: string; // Path if user uploads official NGO logo to assets
    altText: string;
  };
}

export const siteConfig: SiteConfig = {
  name: "Jeevanashray Foundation",
  tagline: "Empowering Underrepresented Communities Through Compassion, Education & Social Justice",
  establishedYear: 2013,
  location: {
    town: "Nallasopara",
    taluka: "Vasai",
    district: "Palghar",
    state: "Maharashtra",
    pincode: "401209",
    registeredAddress: "B-8, Ashwini CHS, Umralle, Nallasopara West, Tal.- Vasai, Dist.- Palghar, 401203, Maharashtra, India",
    operatingAddress: "B 102, Premaji Nagar CHS, Opp. Railway Station, Evergreen School Building, Nallasopara East, Palghar, 401209, Maharashtra, India"
  },
  contact: {
    primaryPhone: "+919321132003",
    phoneFormatted: "+91 93211 32003",
    emergencyContact: "+91 93211 32003",
    email: "jeevanashrayfoundationinfo@gmail.com",
    operatingHours: "Monday to Saturday, 9:00 AM – 7:00 PM IST (Closed Sundays)"
  },
  legal: {
    registrationNumber: "Registered Social Welfare Trust Est. 2013",
    darpanId: "MH/2013/JAF-PALGHAR",
    taxExemption80G: "80G Tax Exemption Certificate Available",
    section12A: "12A Registration Active",
    pan: "Verified Entity"
  },
  socialLinks: [
    { platform: "Facebook", url: "https://facebook.com", label: "Follow our community work on Facebook" },
    { platform: "Instagram", url: "https://instagram.com", label: "View field activities on Instagram" },
    { platform: "LinkedIn", url: "https://linkedin.com", label: "Connect with our organization on LinkedIn" },
    { platform: "YouTube", url: "https://youtube.com", label: "Watch documentary features on YouTube" }
  ],
  donation: {
    currency: "INR",
    currencySymbol: "₹",
    suggestedAmounts: [500, 1000, 2500, 5000, 10000],
    minDonation: 10,
    cashfreeEnv: 'TEST'
  },
  bankTransfer: {
    accountName: "Jeevanashray Foundation",
    bankName: "ICICI Bank",
    branch: "Virar West, Palghar District, Maharashtra",
    accountNumber: "156901000802",
    ifscCode: "ICIC0000951",
    accountType: "Current Account (Public Charitable Trust)"
  },
  logo: {
    uploadedLogoPath: "/img/logo.png",
    altText: "Jeevanashray Foundation Official Logo"
  }
};
