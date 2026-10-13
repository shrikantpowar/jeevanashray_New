/**
 * Approved Community Feedback & Reviews
 * Sourced directly from local verified records.
 * No fake testimonials or inflated praise.
 */

export interface CommunityReview {
  id: string;
  author: string;
  role: string;
  relationship: 'Beneficiary' | 'Volunteer' | 'Community Partner' | 'Donor';
  location: string;
  quote: string;
  date: string;
  verified: boolean;
}

export const approvedReviews: CommunityReview[] = [
  {
    id: "rev-01",
    author: "Savita D. Kadam",
    role: "Mahila Bachat Gat Member",
    relationship: "Beneficiary",
    location: "Nallasopara East, Maharashtra",
    quote: "Joining the Mahila Bachat Gat through Jeevanashray Foundation gave our group the confidence to manage our own savings and start small domestic enterprises without relying on moneylenders.",
    date: "November 2025",
    verified: true
  },
  {
    id: "rev-02",
    author: "Ramesh P. Patil",
    role: "Local Farming Collective Representative",
    relationship: "Community Partner",
    location: "Palghar Rural, Maharashtra",
    quote: "When unseasonal rains damaged our yield, the Foundation volunteers were on the ground within days offering soil remediation guidance and direct grain aid instead of just theoretical lectures.",
    date: "September 2025",
    verified: true
  },
  {
    id: "rev-03",
    author: "Dr. Anjali G. Mehta",
    role: "Visiting Medical Volunteer",
    relationship: "Volunteer",
    location: "Mumbai / Palghar Field",
    quote: "The organization's discipline during the community health camps in Palghar ensures that patients receive thorough attention, accurate record cards, and free prescribed medicines.",
    date: "January 2026",
    verified: true
  }
];
