/**
 * Documentary Photo Gallery Data
 * Adheres strictly to the Zero Duplicate Image Policy.
 * Every visual item has an independent slot ID, dedicated image asset, and descriptive metadata.
 */

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Child Welfare' | 'Women Empowerment' | 'Health Camps' | 'Agriculture' | 'Community Rights';
  date: string;
  location: string;
  description: string;
  imageSrc: string;
}

export const galleryItems: GalleryItem[] = [
  {
    id: "gal-01",
    title: "Balwadi Early Learning & Play Session",
    category: "Child Welfare",
    date: "February 2026",
    location: "Nallasopara Center",
    description: "Young children building foundational motor skills and numeracy with colorful wooden blocks.",
    imageSrc: "/src/assets/images/jaf_gal_balwadi_play_1791887543761.jpg",
  },
  {
    id: "gal-02",
    title: "Vocational Sewing & Embroidery Training",
    category: "Women Empowerment",
    date: "January 2026",
    location: "Umralle Village, Palghar",
    description: "Mahila Bachat Gat members participating in vocational tailoring and garment production training.",
    imageSrc: "/src/assets/images/jaf_gal_women_craft_1791887543892.jpg",
  },
  {
    id: "gal-03",
    title: "Community Grain Granary & Seed Storage",
    category: "Agriculture",
    date: "December 2025",
    location: "Palghar Farming Belt",
    description: "Smallholder farmers safely inspecting community organic grain sacks to protect seasonal yields.",
    imageSrc: "/src/assets/images/jaf_gal_crop_storage_1791887545372.jpg",
  },
  {
    id: "gal-04",
    title: "Diagnostic Eye & Health Camp",
    category: "Health Camps",
    date: "November 2025",
    location: "Evergreen Center, Nallasopara",
    description: "Volunteer ophthalmologist testing vision and diagnosing cataracts for elderly rural residents.",
    imageSrc: "/src/assets/images/jaf_gal_medical_eye_1791887544823.jpg",
  },
  {
    id: "gal-05",
    title: "Secondary School Study & Mentorship Lab",
    category: "Child Welfare",
    date: "October 2025",
    location: "Nallasopara East",
    description: "High school students reviewing science curricula and diagrams in our community study room.",
    imageSrc: "/src/assets/images/jaf_gal_youth_study_1791887618329.jpg",
  },
  {
    id: "gal-06",
    title: "Tribal Entitlements & Civic Awareness Council",
    category: "Community Rights",
    date: "August 2025",
    location: "Palghar Rural",
    description: "Community organizers clarifying government welfare schemes, ration cards, and citizen rights.",
    imageSrc: "/src/assets/images/jaf_gal_gram_sabha_1791887618163.jpg",
  }
];
