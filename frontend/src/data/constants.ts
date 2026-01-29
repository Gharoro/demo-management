import type { NavItem, Feature, FooterColumn } from "../interfaces";

export const navItems: NavItem[] = [
  { label: "Conversational Support", href: "#conversational-support" },
  { label: "Automation", href: "#automation" },
  { label: "Sales Pilot", href: "#sales-pilot" },
  { label: "Trust Guide", href: "#trust-guide" },
];

export const heroFeatures = [
  "Conversational Support",
  "Hyper-connectivity",
  "Advanced Analytics",
];

export const features: Feature[] = [
  {
    title: "Escalations",
    description:
      "Automate issue resolution and ensure timely escalations for quick resolution.",
  },
  {
    title: "Deflection",
    description:
      "Reduce support costs and improve customer satisfaction with self-service deflection.",
  },
  {
    title: "Integrations",
    description:
      "Seamlessly integrate Enif with various apps and channels for enhanced automation.",
  },
  {
    title: "Analytics",
    description:
      "Gain valuable insights into customer behavior with advanced analytics.",
  },
  {
    title: "SLA tracking",
    description:
      "Track and meet SLAs with Enif's automated tracking and alerting.",
  },
  {
    title: "Lead generation",
    description:
      "Generate new leads and upsell existing customers with conversational support.",
  },
  {
    title: "Sentiment analysis",
    description:
      "Analyze customer feedback to improve customer satisfaction and loyalty.",
  },
  {
    title: "Custom workflows",
    description: "Design workflows that meet your specific business needs.",
  },
  {
    title: "Product development",
    description: "Automate product development tasks for faster delivery.",
  },
];

export const countries = [
  { code: "NG", name: "Nigeria", flag: "", dialCode: "+234" },
  { code: "US", name: "United States", flag: "", dialCode: "+1" },
  { code: "GB", name: "United Kingdom", flag: "", dialCode: "+44" },
  { code: "CA", name: "Canada", flag: "", dialCode: "+1" },
  { code: "GH", name: "Ghana", flag: "", dialCode: "+233" },
  { code: "KE", name: "Kenya", flag: "", dialCode: "+254" },
  { code: "ZA", name: "South Africa", flag: "", dialCode: "+27" },
];

export const howDidYouHearOptions = [
  "Google Search",
  "Social Media",
  "Friend or Colleague",
  "Blog or Article",
  "Event or Conference",
  "Other",
];

export const footerColumns: FooterColumn[] = [
  {
    title: "Solutions",
    links: [
      { label: "Conversational Support", href: "#" },
      { label: "Automation", href: "#" },
      { label: "Sales Pilot", href: "#" },
      { label: "Trust Guide", href: "#" },
    ],
  },
  {
    title: "Industries",
    links: [
      { label: "Financial Technology", href: "#" },
      { label: "E-Commerce", href: "#" },
      { label: "Travel and Hospitality", href: "#" },
      { label: "Education", href: "#" },
    ],
  },
];
