/**
 * Jeevanashray Foundation — Verified Team & Leadership
 * Source of truth: Official About Us page (https://jeevanashrayfoundation.org/php/about_us.php)
 * 
 * Verified Members:
 * 1. Rajesh Batwalkar — Founder
 * 2. Dayanand Meher
 * 3. Arun Naik
 * 4. Dr. Jaynath
 * 5. Manisha Batwalkar
 * 6. Namdeo Nokti
 * 7. Vishwas Dalvi
 *
 * Strict Compliance:
 * - Spellings preserved exactly as published on the source website.
 * - Founder designation displayed for Rajesh Batwalkar only.
 * - No invented job titles, qualifications, or unverified biographies.
 * - Authentic original photographs retrieved directly from official web assets.
 */

import rajeshPhoto from '../assets/team/rajesh-01.png';
import dayaPhoto from '../assets/team/daya.png';
import arunPhoto from '../assets/team/arun.png';
import drJainathPhoto from '../assets/team/dr_jainath.png';
import manishaPhoto from '../assets/team/manisha.png';
import namdeoPhoto from '../assets/team/namdeo.png';
import vishwasPhoto from '../assets/team/vishwas.png';

export interface VerifiedTeamMember {
  id: string;
  order: number;
  name: string;
  designation?: string;
  isFounder?: boolean;
  image: string;
  fallbackImage: string;
  altText: string;
  initials: string;
}

export const verifiedTeamMembers: VerifiedTeamMember[] = [
  {
    id: "rajesh-batwalkar",
    order: 1,
    name: "Rajesh Batwalkar",
    designation: "Founder",
    isFounder: true,
    image: rajeshPhoto,
    fallbackImage: "/img/associates/rajesh-01.png",
    altText: "Rajesh Batwalkar, Founder of Jeevanashray Foundation",
    initials: "RB"
  },
  {
    id: "dayanand-meher",
    order: 2,
    name: "Dayanand Meher",
    image: dayaPhoto,
    fallbackImage: "/img/associates/daya.png",
    altText: "Dayanand Meher, Jeevanashray Foundation",
    initials: "DM"
  },
  {
    id: "arun-naik",
    order: 3,
    name: "Arun Naik",
    image: arunPhoto,
    fallbackImage: "/img/associates/arun.png",
    altText: "Arun Naik, Jeevanashray Foundation",
    initials: "AN"
  },
  {
    id: "dr-jaynath",
    order: 4,
    name: "Dr. Jaynath",
    image: drJainathPhoto,
    fallbackImage: "/img/associates/dr_jainath.png",
    altText: "Dr. Jaynath, Jeevanashray Foundation",
    initials: "DJ"
  },
  {
    id: "manisha-batwalkar",
    order: 5,
    name: "Manisha Batwalkar",
    image: manishaPhoto,
    fallbackImage: "/img/associates/manisha.png",
    altText: "Manisha Batwalkar, Jeevanashray Foundation",
    initials: "MB"
  },
  {
    id: "namdeo-nokti",
    order: 6,
    name: "Namdeo Nokti",
    image: namdeoPhoto,
    fallbackImage: "/img/associates/namdeo.png",
    altText: "Namdeo Nokti, Jeevanashray Foundation",
    initials: "NN"
  },
  {
    id: "vishwas-dalvi",
    order: 7,
    name: "Vishwas Dalvi",
    image: vishwasPhoto,
    fallbackImage: "/img/associates/vishwas.png",
    altText: "Vishwas Dalvi, Jeevanashray Foundation",
    initials: "VD"
  }
];

export interface TeamMember {
  id: string;
  slotNumber: number;
  name: string;
  role?: string;
  designation?: string;
  biography?: string;
  displayOrder: number;
  isPlaceholder: boolean;
  department?: string;
  contactEmail?: string;
  photoPlaceholderInitials: string;
  image: string;
  fallbackImage: string;
  isFounder?: boolean;
}

export const teamMembers: TeamMember[] = verifiedTeamMembers.map((m) => ({
  id: m.id,
  slotNumber: m.order,
  name: m.name,
  role: m.designation,
  designation: m.designation,
  displayOrder: m.order,
  isPlaceholder: false,
  photoPlaceholderInitials: m.initials,
  image: m.image,
  fallbackImage: m.fallbackImage,
  isFounder: m.isFounder
}));

export const TOTAL_TEAM_MEMBERS = verifiedTeamMembers.length;
export const TOTAL_TEAM_SLOTS = verifiedTeamMembers.length;
