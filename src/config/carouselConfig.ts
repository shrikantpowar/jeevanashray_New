/**
 * Centralized Configuration for Global Hero Image Carousel
 * Governs the responsive image carousel banner across every public page.
 * 
 * Strict Brand Standards:
 * - Desktop: 16:9 full-width responsive presentation with smooth transitions
 * - Mobile: Touch swipe support, responsive cropping, readable safe zones
 * - Corporate styling with restrained overlays, brand colors (#C8102E, #D4A72C, #FFF8ED, #FFFFFF, #424242)
 * - Autoplay every 5.5s, hover pause, reduced-motion support, keyboard accessible
 */

export interface CarouselSlide {
  id: string;
  tagline: string;
  title: string;
  description: string;
  desktopImage: string;
  mobileImage?: string;
  alt: string;
  ctaText?: string;
  ctaUrl?: string;
  secondaryCtaText?: string;
  secondaryCtaUrl?: string;
}

export interface PageCarouselConfig {
  path: string;
  isCompact?: boolean;
  slides: CarouselSlide[];
}

export const carouselSettings = {
  autoplayIntervalMs: 5500,
  transitionDurationMs: 600,
  enableTouchSwipe: true,
  enableAutoplay: true
};

export const pageCarouselData: Record<string, PageCarouselConfig> = {
  // 1. Home Page Slides
  '/': {
    path: '/',
    slides: [
      {
        id: 'home-slide-1',
        tagline: 'Est. 2013 · Nallasopara, Palghar, Maharashtra',
        title: 'Empowering Underrepresented Communities With Dignity',
        description: 'For over a decade, Jeevanashray Foundation has championed grassroots education, women’s self-help groups, smallholder farmer support, and social justice across Maharashtra.',
        desktopImage: '/src/assets/images/jaf_hero_community_1791883706878.jpg',
        alt: 'Community welfare and social development gathering with Jeevanashray Foundation workers in Maharashtra',
        ctaText: 'Support Our Initiatives',
        ctaUrl: '/donate',
        secondaryCtaText: 'Explore Programs',
        secondaryCtaUrl: '/programs'
      },
      {
        id: 'home-slide-2',
        tagline: 'Balwadi & Palanaghar Initiatives',
        title: 'Foundational Early Education & Childhood Nutrition',
        description: 'Providing daily learning kits, preschool literacy, and nourishing meals for children in underserved settlements across Nallasopara.',
        desktopImage: '/src/assets/images/jaf_program_balwadi_1791883707333.jpg',
        alt: 'Children in a Balwadi village classroom learning with educational materials',
        ctaText: 'Sponsor a Child',
        ctaUrl: '/donate',
        secondaryCtaText: 'Balwadi Details',
        secondaryCtaUrl: '/programs#balwadi-child-welfare'
      },
      {
        id: 'home-slide-3',
        tagline: 'Mahila Bachat Gat · Self-Help Groups',
        title: 'Fostering Women’s Financial Independence & Micro-Enterprises',
        description: 'Empowering hundreds of rural women with micro-savings discipline, tailoring workshops, and independent livelihood opportunities.',
        desktopImage: '/src/assets/images/jaf_program_women_1791883707938.jpg',
        alt: 'Rural women attending Mahila Bachat Gat self-help group meeting in Maharashtra',
        ctaText: 'Empower Women',
        ctaUrl: '/donate',
        secondaryCtaText: 'View SHG Work',
        secondaryCtaUrl: '/programs#women-empowerment'
      },
      {
        id: 'home-slide-4',
        tagline: 'Agrarian Distress Relief',
        title: 'Partnering With Farmers Facing Low Crop Yields',
        description: 'Introducing organic composting, soil moisture conservation, and collective seed banks to help agrarian families thrive.',
        desktopImage: '/src/assets/images/jaf_banner_panoramic_1791888019156.jpg',
        alt: 'Panoramic view of rural farmland and Sahyadri hills in Maharashtra at dawn',
        ctaText: 'Support Farmers',
        ctaUrl: '/donate',
        secondaryCtaText: 'Rural Initiatives',
        secondaryCtaUrl: '/programs#agriculture-rural-livelihoods'
      }
    ]
  },

  // 2. About Page Slides
  '/about': {
    path: '/about',
    slides: [
      {
        id: 'about-slide-1',
        tagline: 'Our History & Mission · Est. 2013',
        title: 'A Decade of Unwavering Community Commitment',
        description: 'Founded in Nallasopara, Jeevanashray Foundation gets involved only where we can make a unique, sustainable contribution to human rights and development.',
        desktopImage: '/src/assets/images/jaf_banner_trustees_1791888019762.jpg',
        alt: 'Trustees and community leaders in conference reviewing rural welfare blueprints',
        ctaText: 'Meet Governing Board',
        ctaUrl: '/team',
        secondaryCtaText: 'Review Impact',
        secondaryCtaUrl: '/impact'
      },
      {
        id: 'about-slide-2',
        tagline: 'Grassroots Social Justice',
        title: 'Information Access as a Fundamental Human Right',
        description: 'Bridging information asymmetry so that marginalized citizens can easily access government entitlements, rations, and healthcare.',
        desktopImage: '/src/assets/images/jaf_gal_gram_sabha_1791887618163.jpg',
        alt: 'Community awareness meeting in rural Palghar regarding citizen entitlements',
        ctaText: 'Our Core Values',
        ctaUrl: '/about',
        secondaryCtaText: 'Get Involved',
        secondaryCtaUrl: '/volunteer'
      }
    ]
  },

  // 3. Programs Page Slides
  '/programs': {
    path: '/programs',
    slides: [
      {
        id: 'prog-slide-1',
        tagline: 'Documented Interventions',
        title: 'Comprehensive Social Welfare Initiatives in Maharashtra',
        description: 'Targeting root inequities in education, gender empowerment, health, low-yield farming, and statutory rights.',
        desktopImage: '/src/assets/images/jaf_program_farming_1791883709543.jpg',
        alt: 'Farmers in rural Maharashtra inspecting crop harvests with coordinators',
        ctaText: 'Donate to Programs',
        ctaUrl: '/donate',
        secondaryCtaText: 'Volunteer',
        secondaryCtaUrl: '/volunteer'
      },
      {
        id: 'prog-slide-2',
        tagline: 'Healthcare & Diagnostics',
        title: 'Free Preventive Medical & Diagnostic Camps',
        description: 'Bringing volunteer physicians, diagnostic screenings, and free medicines directly into underserved rural villages.',
        desktopImage: '/src/assets/images/jaf_gal_medical_eye_1791887544823.jpg',
        alt: 'Physician testing vision and conducting medical examination at free health camp',
        ctaText: 'Sponsor a Camp',
        ctaUrl: '/donate',
        secondaryCtaText: 'Medical Volunteering',
        secondaryCtaUrl: '/volunteer'
      }
    ]
  },

  // 4. Impact Page Slides
  '/impact': {
    path: '/impact',
    slides: [
      {
        id: 'impact-slide-1',
        tagline: 'Transparency & Track Record',
        title: 'Accountability Grounded in Verified Field Reach',
        description: '10+ years of registered service, 50+ self-help groups supported, 100+ health camps, and 1,200+ students reached across Palghar district.',
        desktopImage: '/src/assets/images/jaf_gal_crop_storage_1791887545372.jpg',
        alt: 'Farmers storing harvested organic grains in community storehouse',
        ctaText: 'Tax-Exempt Donation (80G)',
        ctaUrl: '/donate',
        secondaryCtaText: 'View Financial Pillars',
        secondaryCtaUrl: '/impact'
      }
    ]
  },

  // 5. Gallery Page Slides
  '/gallery': {
    path: '/gallery',
    slides: [
      {
        id: 'gal-slide-1',
        tagline: 'Field Documentary Archive',
        title: 'Visual Chronicles of Grassroots Change',
        description: 'Explore authentic photographs of our Balwadi classrooms, vocational sewing batches, agricultural initiatives, and village councils.',
        desktopImage: '/src/assets/images/jaf_gal_balwadi_play_1791887543761.jpg',
        alt: 'Children playing educational games outdoors in Nallasopara center',
        ctaText: 'View All Photos',
        ctaUrl: '/gallery',
        secondaryCtaText: 'Our Stories',
        secondaryCtaUrl: '/#stories'
      }
    ]
  },

  // 6. Team Page Slides
  '/team': {
    path: '/team',
    slides: [
      {
        id: 'team-slide-1',
        tagline: 'Leadership & Dedication',
        title: 'Our Team & Leadership',
        description: 'Guided by compassionate grassroots leaders and associates working tirelessly for social justice, child welfare, and community empowerment in Maharashtra.',
        desktopImage: '/src/assets/images/jaf_banner_trustees_1791888019762.jpg',
        alt: 'Trustees and advisory council gathered in meeting room',
        ctaText: 'Meet Our Team',
        ctaUrl: '/team',
        secondaryCtaText: 'Contact Us',
        secondaryCtaUrl: '/contact'
      }
    ]
  },

  // 7. Community Voices (Reviews) Page Slides
  '/reviews': {
    path: '/reviews',
    slides: [
      {
        id: 'rev-slide-1',
        tagline: 'Authentic Stakeholder Dialogue',
        title: 'Direct Reflections From Community Participants',
        description: 'Verified statements from self-help group members, farming collectives, parents, and healthcare volunteers across Maharashtra.',
        desktopImage: '/src/assets/images/jaf_rural_story_1791883742462.jpg',
        alt: 'Elderly community grandmother smiling with harvested grain in Maharashtra',
        ctaText: 'Read Statements',
        ctaUrl: '/reviews',
        secondaryCtaText: 'Submit Feedback',
        secondaryCtaUrl: '/contact'
      }
    ]
  },

  // 8. Volunteer Page Slides
  '/volunteer': {
    path: '/volunteer',
    slides: [
      {
        id: 'vol-slide-1',
        tagline: 'Join Hands for Social Justice',
        title: 'Lend Your Time, Compassion, and Expertise',
        description: 'We welcome teachers, doctors, farmers, and community organizers to support field activities in Nallasopara and Palghar.',
        desktopImage: '/src/assets/images/jaf_gal_women_craft_1791887543892.jpg',
        alt: 'Women attending vocational training workshop in community center',
        ctaText: 'Register as Volunteer',
        ctaUrl: '/volunteer',
        secondaryCtaText: 'Call Helpline',
        secondaryCtaUrl: 'tel:+919321132003'
      }
    ]
  },

  // 9. Donate Page Slides
  '/donate': {
    path: '/donate',
    slides: [
      {
        id: 'don-slide-1',
        tagline: 'Section 80G Tax Exemption Available',
        title: 'Your Generosity Fuels Meaningful Grassroots Action',
        description: '100% of your tax-deductible contribution directly supports nutrition, pre-primary schooling, and rural livelihoods with zero middleman loss.',
        desktopImage: '/src/assets/images/jaf_hero_community_1791883706878.jpg',
        alt: 'Community welfare gathering with local families in rural Maharashtra',
        ctaText: 'Make a Contribution',
        ctaUrl: '/donate',
        secondaryCtaText: 'Bank Transfer Details',
        secondaryCtaUrl: '/donate'
      }
    ]
  },

  // 10. Contact Page Slides
  '/contact': {
    path: '/contact',
    slides: [
      {
        id: 'contact-slide-1',
        tagline: 'Field Office & Helpline',
        title: 'Connect With Our Coordination Desk in Nallasopara',
        description: 'Open Monday through Saturday for donor inquiries, volunteer registrations, program information, and community assistance.',
        desktopImage: '/src/assets/images/jaf_banner_panoramic_1791888019156.jpg',
        alt: 'Panoramic view of Maharashtra rural landscape and community roads',
        ctaText: 'Call +91 93211 32003',
        ctaUrl: 'tel:+919321132003',
        secondaryCtaText: 'Email Us',
        secondaryCtaUrl: 'mailto:jeevanashrayfoundationinfo@gmail.com'
      }
    ]
  },

  // 11. Policy & Result Pages (Compact Corporate Banner Variant)
  '/privacy': {
    path: '/privacy',
    isCompact: true,
    slides: [
      {
        id: 'priv-slide-1',
        tagline: 'Statutory Transparency',
        title: 'Privacy Policy & Data Protection',
        description: 'Our principles regarding donor privacy, Section 80G statutory filings, and bank-grade payment encryption.',
        desktopImage: '/src/assets/images/jaf_banner_trustees_1791888019762.jpg',
        alt: 'Foundation governance meeting room in Maharashtra'
      }
    ]
  },
  '/terms': {
    path: '/terms',
    isCompact: true,
    slides: [
      {
        id: 'terms-slide-1',
        tagline: 'Legal Framework',
        title: 'Terms & Conditions of Use',
        description: 'Governing terms for donations, brand intellectual property, and community interactions under Indian trust laws.',
        desktopImage: '/src/assets/images/jaf_banner_trustees_1791888019762.jpg',
        alt: 'Corporate governance and statutory compliance review'
      }
    ]
  },
  '/refund-policy': {
    path: '/refund-policy',
    isCompact: true,
    slides: [
      {
        id: 'refund-slide-1',
        tagline: 'Donor Protection',
        title: 'Donation Refund & Cancellation Policy',
        description: 'Clear guidelines regarding voluntary charitable gifts, technical duplication reversals, and 80G certificate invalidation.',
        desktopImage: '/src/assets/images/jaf_banner_trustees_1791888019762.jpg',
        alt: 'Financial stewardship and audit compliance desk'
      }
    ]
  },
  '/donation-success': {
    path: '/donation-success',
    isCompact: true,
    slides: [
      {
        id: 'succ-slide-1',
        tagline: 'Cashfree Verification',
        title: 'Donation Confirmation & Receipt',
        description: 'Thank you for your generous contribution. Your payment has been processed and recorded.',
        desktopImage: '/src/assets/images/jaf_hero_community_1791883706878.jpg',
        alt: 'Empowering children and families in Maharashtra'
      }
    ]
  },
  '/donation-pending': {
    path: '/donation-pending',
    isCompact: true,
    slides: [
      {
        id: 'pend-slide-1',
        tagline: 'Reconciliation Status',
        title: 'Payment Status & Verification',
        description: 'Real-time status tracking for Cashfree payment processing and bank clearing notifications.',
        desktopImage: '/src/assets/images/jaf_banner_trustees_1791888019762.jpg',
        alt: 'Treasury desk review'
      }
    ]
  }
};
