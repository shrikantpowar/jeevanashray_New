/**
 * Approved Community Comments & Feedback Stream
 * Managed strictly through local content records.
 */

export interface CommunityComment {
  id: string;
  author: string;
  topic: string;
  comment: string;
  timestamp: string;
  status: 'Approved' | 'Pending Review';
}

export const initialComments: CommunityComment[] = [
  {
    id: "com-01",
    author: "Prashant Shinde",
    topic: "Balwadi Admissions Support",
    comment: "Heartfelt gratitude to the teachers at the Nallasopara center for admitting underprivileged kids and providing school kits on day one.",
    timestamp: "2 weeks ago",
    status: "Approved"
  },
  {
    id: "com-02",
    author: "Sunita More",
    topic: "Vocational Skills Workshop",
    comment: "The tailoring and basic accounting training helped our self-help group members calculate profit margins correctly.",
    timestamp: "1 month ago",
    status: "Approved"
  },
  {
    id: "com-03",
    author: "Mahesh V. Naik",
    topic: "Aadhaar & Ration Entitlement Drive",
    comment: "Very helpful guidance for seniors who were struggling to update biometric records for central welfare schemes.",
    timestamp: "2 months ago",
    status: "Approved"
  }
];
