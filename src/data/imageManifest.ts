/**
 * Central Image Manifest for Jeevanashray Foundation
 * Tracks image assignments across every section of the website.
 * 
 * Strict Requirement:
 * "Every image placement must use a different source image across the entire website.
 * Never repeat images between Hero sections, Program cards, Stories, Gallery, Team profiles, Review cards, or other pages."
 */

export interface ImageManifestEntry {
  slotId: string;
  section: 'hero' | 'about' | 'program' | 'story' | 'gallery' | 'team' | 'impact';
  src: string;
  alt: string;
  aspectRatio: '16:9' | '4:3' | '1:1' | '3:4';
  caption?: string;
}

export const imageManifest: Record<string, ImageManifestEntry> = {
  // 1. Hero Section
  'hero-main': {
    slotId: 'hero-main',
    section: 'hero',
    src: '/src/assets/images/jaf_hero_community_1791883706878.jpg',
    alt: 'Community welfare and social development gathering in Maharashtra with Jeevanashray Foundation workers and local families',
    aspectRatio: '16:9',
    caption: 'Grassroots community meeting in Maharashtra, fostering empowerment and mutual aid.'
  },

  // 2. Program Cards (Distinct images for core initiatives)
  'prog-balwadi': {
    slotId: 'prog-balwadi',
    section: 'program',
    src: '/src/assets/images/jaf_program_balwadi_1791883707333.jpg',
    alt: 'Young underprivileged children in a Balwadi village classroom learning with books and learning toys',
    aspectRatio: '4:3',
    caption: 'Balwadi & Palanaghar: Foundational learning and holistic nutrition for young children.'
  },
  'prog-women': {
    slotId: 'prog-women',
    section: 'program',
    src: '/src/assets/images/jaf_program_women_1791883707938.jpg',
    alt: 'Mahila Bachat Gat self-help group meeting with rural women in Maharashtra discussing community initiatives',
    aspectRatio: '4:3',
    caption: 'Mahila Bachat Gat: Empowering rural women through micro-savings and self-reliance.'
  },
  'prog-agriculture': {
    slotId: 'prog-agriculture',
    section: 'program',
    src: '/src/assets/images/jaf_program_farming_1791883709543.jpg',
    alt: 'Local farmers in rural Maharashtra inspecting crop harvest in agricultural fields',
    aspectRatio: '4:3',
    caption: 'Farmer support: Assisting smallholder farmers with low-yield crops and sustainable methods.'
  },
  'prog-health': {
    slotId: 'prog-health',
    section: 'program',
    src: '/src/assets/images/jaf_health_medical_1791883740939.jpg',
    alt: 'Free rural community medical camp and health examination in Palghar district',
    aspectRatio: '4:3',
    caption: 'Community Health: Preventive care, diagnostic checkups, and free medicines.'
  },
  'prog-education': {
    slotId: 'prog-education',
    section: 'program',
    src: '/src/assets/images/jaf_youth_education_1791883742964.jpg',
    alt: 'Indian students studying textbooks in a rural community library center in Maharashtra',
    aspectRatio: '4:3',
    caption: 'Education & Learning Support: After-school mentoring, books, and study kits.'
  },
  'prog-justice': {
    slotId: 'prog-justice',
    section: 'program',
    src: '/src/assets/images/jaf_community_dialogue_1791883743211.jpg',
    alt: 'Village community council and social justice awareness meeting under a banyan tree',
    aspectRatio: '4:3',
    caption: 'Social Justice & Legal Awareness: Educating marginalized citizens about rights and schemes.'
  },

  // 3. Featured Community Story
  'story-savitri': {
    slotId: 'story-savitri',
    section: 'story',
    src: '/src/assets/images/jaf_rural_story_1791883742462.jpg',
    alt: 'Rural beneficiary elder smiling with freshly harvested grains in Maharashtra',
    aspectRatio: '4:3',
    caption: 'Rebuilding rural livelihoods with dignity and community-backed support.'
  }
};

/**
 * Audit helper to verify that no duplicate image URLs are used across different slots.
 */
export function auditImageManifestUniqueness(): { valid: boolean; duplicates: string[] } {
  const seenUrls = new Map<string, string>();
  const duplicates: string[] = [];

  for (const [slotId, entry] of Object.entries(imageManifest)) {
    if (seenUrls.has(entry.src)) {
      duplicates.push(`Conflict: slot '${slotId}' shares src '${entry.src}' with '${seenUrls.get(entry.src)}'`);
    } else {
      seenUrls.set(entry.src, slotId);
    }
  }

  return {
    valid: duplicates.length === 0,
    duplicates
  };
}
