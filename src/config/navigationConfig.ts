/**
 * Navigation Configuration for Jeevanashray Foundation
 * Defines primary navigation, mobile drawer items, and footer categorization.
 */

export interface NavItem {
  label: string;
  path: string;
  description?: string;
  badge?: string;
}

export const primaryNavItems: NavItem[] = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Programs", path: "/programs" },
  { label: "Impact", path: "/impact" },
  { label: "Gallery", path: "/gallery" },
  { label: "Team", path: "/team" },
  { label: "Community Voices", path: "/reviews" },
  { label: "Volunteer", path: "/volunteer" },
  { label: "Contact", path: "/contact" }
];

export const allPagesList: { title: string; path: string; category: string }[] = [
  { title: "Home", path: "/", category: "Main" },
  { title: "About Us", path: "/about", category: "Organization" },
  { title: "Programs & Initiatives", path: "/programs", category: "Work" },
  { title: "Community Impact", path: "/impact", category: "Transparency" },
  { title: "Photo Gallery", path: "/gallery", category: "Transparency" },
  { title: "Our Team & Leadership", path: "/team", category: "Organization" },
  { title: "Reviews & Community Comments", path: "/reviews", category: "Community" },
  { title: "Volunteer with Us", path: "/volunteer", category: "Get Involved" },
  { title: "Make a Donation", path: "/donate", category: "Get Involved" },
  { title: "Contact Us", path: "/contact", category: "Get In Touch" },
  { title: "Privacy Policy", path: "/privacy", category: "Legal" },
  { title: "Terms and Conditions", path: "/terms", category: "Legal" },
  { title: "Refund and Cancellation Policy", path: "/refund-policy", category: "Legal" },
  { title: "Donation Confirmation", path: "/donation-success", category: "Donations" },
  { title: "Donation Status / Inquiries", path: "/donation-pending", category: "Donations" }
];

export const footerSections = {
  about: {
    title: "About the Foundation",
    description: "Established in 2013 in Nallasopara, Maharashtra, Jeevanashray Foundation works toward social justice, child welfare, women's empowerment, and sustainable rural livelihoods."
  },
  initiatives: [
    { label: "Balwadi & Child Welfare", path: "/programs#balwadi" },
    { label: "Mahila Bachat Gat (Women's SHGs)", path: "/programs#women" },
    { label: "Rural Agriculture & Crop Aid", path: "/programs#agriculture" },
    { label: "Free Medical Camps", path: "/programs#health" },
    { label: "Information Access & Rights", path: "/programs#justice" }
  ],
  organization: [
    { label: "Our Story & Vision", path: "/about" },
    { label: "Our Team & Leadership", path: "/team" },
    { label: "Impact & Transparency", path: "/impact" },
    { label: "Photo Gallery", path: "/gallery" },
    { label: "Community Reviews", path: "/reviews" }
  ],
  legal: [
    { label: "Privacy Policy", path: "/privacy" },
    { label: "Terms & Conditions", path: "/terms" },
    { label: "Refund & Cancellation Policy", path: "/refund-policy" }
  ]
};
