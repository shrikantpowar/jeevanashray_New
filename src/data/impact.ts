/**
 * Impact Indicators and Institutional Track Record
 * Grounded in verified operational history since 2013 in Maharashtra.
 */

export interface ImpactMetric {
  id: string;
  value: string;
  unit: string;
  label: string;
  subtext: string;
  focusArea: string;
}

export const impactMetrics: ImpactMetric[] = [
  {
    id: "metric-years",
    value: "10+",
    unit: "Years",
    label: "Dedicated Community Service",
    subtext: "Continuously active in Nallasopara and Palghar district since 2013",
    focusArea: "History"
  },
  {
    id: "metric-shgs",
    value: "50+",
    unit: "SHG Groups",
    label: "Mahila Bachat Gat Supported",
    subtext: "Enabling grassroots women to build independent financial security",
    focusArea: "Women's Empowerment"
  },
  {
    id: "metric-camps",
    value: "100+",
    unit: "Camps",
    label: "Health Checkups & Drives",
    subtext: "Preventive medicine and diagnostic screening in underserved areas",
    focusArea: "Community Health"
  },
  {
    id: "metric-children",
    value: "1,200+",
    unit: "Children",
    label: "Pre-Primary & School Learners Reached",
    subtext: "Supported through Balwadi programs, kits, and study mentoring",
    focusArea: "Child Welfare & Education"
  }
];

export const operationalPillars = [
  {
    title: "Zero Intermediary Leakage",
    description: "Every contributed rupee directly funds verified program execution, classroom supplies, or emergency assistance without corporate overhead."
  },
  {
    title: "Grassroots Needs-First Assessment",
    description: "We enter a neighborhood only when community elders and families invite our partnership to solve acute bottlenecks."
  },
  {
    title: "Statutory & Financial Transparency",
    description: "Annual audits, registered public trust compliance, 80G donor receipts, and transparent documentation."
  }
];
