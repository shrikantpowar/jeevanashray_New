/**
 * Global Top Announcement Banner Configuration
 * Governs the universal top announcement banner across every public route.
 */

export interface AnnouncementConfig {
  enabled: boolean;
  message: string;
  goldAccentText?: string;
  ctaText?: string;
  ctaUrl?: string;
  isExternalLink?: boolean;
  startDate?: string; // Optional ISO date e.g. "2026-01-01"
  endDate?: string;   // Optional ISO date e.g. "2026-12-31"
  allowDismissal: boolean;
  sessionStorageKey: string;
}

export const announcementConfig: AnnouncementConfig = {
  enabled: true,
  message: "Together, we can build a brighter future. Support our community initiatives in Maharashtra.",
  goldAccentText: "80G Tax Deductible",
  ctaText: "Support Us",
  ctaUrl: "/donate",
  isExternalLink: false,
  startDate: undefined,
  endDate: undefined,
  allowDismissal: true,
  sessionStorageKey: "jaf_announcement_dismissed_session"
};
