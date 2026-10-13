/**
 * Core Programs and Focus Areas Data
 * Grounded in verified community initiatives of Jeevanashray Foundation
 */

export interface Program {
  id: string;
  slug: string;
  title: string;
  marathiTitle?: string;
  category: string;
  tagline: string;
  summary: string;
  detailedDescription: string;
  keyInitiatives: string[];
  beneficiariesTarget: string;
  location: string;
  imageSlotId: string;
}

export const programs: Program[] = [
  {
    id: "prog-01",
    slug: "balwadi-child-welfare",
    title: "Balwadi & Child Welfare",
    marathiTitle: "बालवाडी आणि बालकल्याण",
    category: "Child Welfare",
    tagline: "Nurturing early childhood foundation through learning and holistic nutrition",
    summary: "Dedicated community learning centers providing early childhood education, foundational numeracy, and midday nourishment for underprivileged children.",
    detailedDescription: "Child poverty and early learning gaps pose severe barriers to sustainable development. Our Balwadi and Palanaghar initiatives offer safe, constructive daytime environments where young children receive foundational early education, activity-based learning, social socialization, and basic health tracking.",
    keyInitiatives: [
      "Daily pre-primary foundational learning & numeracy kits",
      "Nutritious snack support to combat early childhood malnutrition",
      "Regular growth monitoring and pediatric health checkups",
      "Parenting awareness workshops for young mothers"
    ],
    beneficiariesTarget: "Children aged 3–6 and their mothers",
    location: "Nallasopara & Rural Palghar clusters",
    imageSlotId: "prog-balwadi"
  },
  {
    id: "prog-02",
    slug: "women-empowerment",
    title: "Women's Empowerment & Mahila Bachat Gat",
    marathiTitle: "महिला सक्षमीकरण आणि बचत गट",
    category: "Gender Equality",
    tagline: "Fostering financial independence and mutual self-help solidarity",
    summary: "Organizing and supporting Mahila Bachat Gat (Women's Self-Help Groups) to build savings discipline, micro-livelihoods, and leadership confidence.",
    detailedDescription: "Empowering women transforms families and entire neighborhoods. Jeevanashray Foundation facilitates grassroots Mahila Bachat Gat groups, enabling women to pool monthly savings, access micro-loans for emergencies and small enterprises, and learn vocational skills such as catering, handicrafts, and tailoring.",
    keyInitiatives: [
      "Formation and bank linkage facilitation for Mahila Bachat Gat",
      "Basic financial literacy, digital banking, and record-keeping training",
      "Vocational skill training and cottage-industry enterprise support",
      "Poli-Bhaji Kendra and community micro-kitchen initiatives"
    ],
    beneficiariesTarget: "Homemakers, single mothers, and rural women artisans",
    location: "Nallasopara East & West, Vasai Taluka",
    imageSlotId: "prog-women"
  },
  {
    id: "prog-03",
    slug: "agriculture-rural-livelihoods",
    title: "Agriculture & Rural Livelihoods",
    marathiTitle: "शेती आणि ग्रामीण उपजीविका",
    category: "Livelihoods",
    tagline: "Assisting smallholder farmers facing low crop yields and climate hardship",
    summary: "Listening, learning, and partnering with marginal farmers in Maharashtra to overcome low crop yields, soil fatigue, and seasonal debt.",
    detailedDescription: "Low agricultural yields in Maharashtra leave smallholders vulnerable to cycles of debt and rural distress. We collaborate with agrarian families to provide access to resilient seed varieties, soil moisture techniques, eco-friendly pest practices, and farmer collective networks.",
    keyInitiatives: [
      "Guidance on low-yield crop troubleshooting and soil conservation",
      "Promotion of organic composting and water-saving irrigation practices",
      "Farmer collective linkages to direct community markets",
      "Support during climate irregularities and seasonal transitions"
    ],
    beneficiariesTarget: "Marginal farmers and tenant agrarian households",
    location: "Rural Palghar and agrarian belt of Maharashtra",
    imageSlotId: "prog-agriculture"
  },
  {
    id: "prog-04",
    slug: "community-health-camps",
    title: "Community Health & Free Medical Camps",
    marathiTitle: "मोफत आरोग्य शिबीर आणि जनजागृती",
    category: "Health & Wellness",
    tagline: "Preventive healthcare and essential diagnostics at zero cost",
    summary: "Conducting regular free medical checkup camps, eye screenings, and medicine distribution for families without institutional healthcare access.",
    detailedDescription: "Health emergencies frequently push low-income families into extreme poverty. Our health camps bring compassionate doctors, basic laboratory screenings, pediatricians, and essential prescription supplies directly into underserved bastis and villages.",
    keyInitiatives: [
      "Periodic general health and diagnostic examination camps",
      "Free distribution of essential medicines and vitamin supplements",
      "Hygiene, clean water, and sanitation awareness drives",
      "Referral assistance for critical hospital treatment"
    ],
    beneficiariesTarget: "Elderly, daily-wage laborers, and underprivileged families",
    location: "Community centers across Palghar district",
    imageSlotId: "prog-health"
  },
  {
    id: "prog-05",
    slug: "education-youth-mentorship",
    title: "Youth Education & Study Centers",
    marathiTitle: "शिक्षण आणि युवा मार्गदर्शन",
    category: "Education",
    tagline: "Preventing school dropouts through study spaces and mentorship",
    summary: "Providing after-school study guidance, textbooks, educational materials, and youth mentorship to curb dropout rates in vulnerable areas.",
    detailedDescription: "Crowded living conditions often deprive adolescent students of quiet study environments. We facilitate community reading rooms, distribute annual school kits, and provide career mentorship to encourage students to complete secondary and vocational education.",
    keyInitiatives: [
      "Free distribution of school supplies and notebooks before the academic year",
      "Community study room spaces with reference books",
      "Career guidance sessions on vocational trades and IT skills",
      "Mentorship for first-generation secondary school learners"
    ],
    beneficiariesTarget: "School and junior college students",
    location: "Nallasopara & neighborhood clusters",
    imageSlotId: "prog-education"
  },
  {
    id: "prog-06",
    slug: "information-access-social-justice",
    title: "Information Access & Social Justice",
    marathiTitle: "माहिती अधिकार आणि सामाजिक न्याय",
    category: "Human Rights",
    tagline: "Bridging the information gap to unlock statutory rights and welfare schemes",
    summary: "Empowering marginalized citizens with accurate information regarding government welfare schemes, documentation, and civic entitlements.",
    detailedDescription: "Informed decision-making is essential to human dignity. Millions of citizens miss out on subsidized food grains, pensions, and housing aid simply because they lack clear information. We bridge this information asymmetry by aiding with paperwork, entitlement awareness, and civic literacy.",
    keyInitiatives: [
      "Assistance with Ration cards, Aadhaar corrections, and Ayushman Bharat cards",
      "Information desks clarifying state and central welfare criteria",
      "Legal literacy workshops covering basic citizen rights",
      "Advocacy for underrepresented and tribal communities"
    ],
    beneficiariesTarget: "Marginalized citizens and tribal community members",
    location: "Palghar, Nallasopara, and surrounding tehsils",
    imageSlotId: "prog-justice"
  }
];
