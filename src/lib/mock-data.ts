export type Category =
  | "Laboratory Testing"
  | "Food Safety"
  | "Packaging & Labeling"
  | "Equipment & Facilities"
  | "Technical Consultancy"
  | "Product Development"
  | "Trainings & Workshops"
  | "SETUP Assistance"
  | "Technology Transfer"
  | "Scholarships & Innovation";

export const CATEGORIES: { name: Category; icon: string; tint: "blue" | "yellow" | "red" }[] = [
  { name: "Laboratory Testing", icon: "FlaskConical", tint: "blue" },
  { name: "Food Safety", icon: "ShieldCheck", tint: "red" },
  { name: "Packaging & Labeling", icon: "Package", tint: "yellow" },
  { name: "Equipment & Facilities", icon: "Factory", tint: "blue" },
  { name: "Technical Consultancy", icon: "Lightbulb", tint: "yellow" },
  { name: "Product Development", icon: "Sparkles", tint: "red" },
  { name: "Trainings & Workshops", icon: "GraduationCap", tint: "blue" },
  { name: "SETUP Assistance", icon: "Rocket", tint: "yellow" },
  { name: "Technology Transfer", icon: "Repeat", tint: "red" },
  { name: "Scholarships & Innovation", icon: "Award", tint: "blue" },
];

export interface Service {
  id: string;
  name: string;
  category: Category;
  shortDescription: string;
  description: string;
  office: string;
  province: string;
  fees: string;
  requirements: string[];
  processingTime: string;
  contact: { phone: string; email: string };
  bookingUrl: string;
  tags: string[];
  popular?: boolean;
}

export const SERVICES: Service[] = [
  {
    id: "nutrition-analysis",
    name: "Food Nutrition Analysis",
    category: "Laboratory Testing",
    shortDescription: "Get a complete nutrition facts panel for your food product.",
    description:
      "Laboratory analysis of food samples for calories, macronutrients, sodium, and more — required for FDA labeling and supermarket placement.",
    office: "DOST Caraga Regional Standards and Testing Laboratory",
    province: "Agusan del Norte",
    fees: "₱2,500 – ₱6,500 per sample",
    requirements: [
      "Letter of request",
      "200g sealed product sample (x2)",
      "Product description sheet",
    ],
    processingTime: "10–15 working days",
    contact: { phone: "(085) 342-5675", email: "rstl@region13.dost.gov.ph" },
    bookingUrl: "https://region13.dost.gov.ph",
    tags: ["FDA", "Labeling", "Food"],
    popular: true,
  },
  {
    id: "shelf-life-testing",
    name: "Shelf-Life Testing",
    category: "Laboratory Testing",
    shortDescription: "Determine the safe consumption window of your product.",
    description:
      "Accelerated and real-time shelf-life evaluation to support proper expiration date labeling.",
    office: "DOST Caraga RSTL",
    province: "Agusan del Norte",
    fees: "₱8,000 – ₱15,000",
    requirements: ["6 sealed samples", "Packaging specifications"],
    processingTime: "4–12 weeks depending on method",
    contact: { phone: "(085) 342-5675", email: "rstl@region13.dost.gov.ph" },
    bookingUrl: "https://region13.dost.gov.ph",
    tags: ["FDA", "Food", "Quality"],
    popular: true,
  },
  {
    id: "fda-assistance",
    name: "FDA License to Operate Assistance",
    category: "Food Safety",
    shortDescription: "Guided support to secure your FDA LTO and CPR.",
    description:
      "Hands-on assistance from DOST experts to prepare your facility, documents, and product for FDA registration.",
    office: "DOST Caraga Technology Diffusion Section",
    province: "Agusan del Norte",
    fees: "Free for qualified MSMEs",
    requirements: ["DTI / SEC registration", "Business permit", "Plant layout"],
    processingTime: "1–3 months",
    contact: { phone: "(085) 342-5675", email: "tds@region13.dost.gov.ph" },
    bookingUrl: "https://region13.dost.gov.ph",
    tags: ["FDA", "Compliance"],
    popular: true,
  },
  {
    id: "packaging-labeling",
    name: "Packaging & Labeling Design",
    category: "Packaging & Labeling",
    shortDescription: "Modern, FDA-compliant packaging design support.",
    description:
      "Includes label design, nutrition facts panel layout, barcode generation, and material recommendation.",
    office: "DOST Caraga PLAC (Packaging & Labeling Assistance Center)",
    province: "Agusan del Norte",
    fees: "Subsidized for SETUP beneficiaries",
    requirements: ["Product photo", "Brand name & story", "Target market info"],
    processingTime: "2–4 weeks",
    contact: { phone: "(085) 342-5675", email: "plac@region13.dost.gov.ph" },
    bookingUrl: "https://region13.dost.gov.ph",
    tags: ["Branding", "Design"],
    popular: true,
  },
  {
    id: "setup-program",
    name: "SETUP Innovation Fund",
    category: "SETUP Assistance",
    shortDescription: "Interest-free equipment upgrade fund for MSMEs.",
    description:
      "Small Enterprise Technology Upgrading Program: zero-interest loan for equipment, packaging, and training to scale your business.",
    office: "DOST Caraga SETUP Division",
    province: "Region-wide",
    fees: "0% interest, payable in 3 years",
    requirements: [
      "At least 1 year of operations",
      "Business permit & DTI",
      "Project proposal",
    ],
    processingTime: "2–6 months evaluation",
    contact: { phone: "(085) 342-5675", email: "setup@region13.dost.gov.ph" },
    bookingUrl: "https://region13.dost.gov.ph/setup",
    tags: ["Funding", "Equipment"],
    popular: true,
  },
  {
    id: "gmp-training",
    name: "GMP & Food Safety Training",
    category: "Trainings & Workshops",
    shortDescription: "Good Manufacturing Practices certification for food MSMEs.",
    description:
      "Two-day training on hygiene, sanitation, and safety practices required for FDA compliance.",
    office: "DOST Caraga Training Division",
    province: "Region-wide",
    fees: "Free (limited slots)",
    requirements: ["Letter of intent", "List of participants"],
    processingTime: "Scheduled quarterly",
    contact: { phone: "(085) 342-5675", email: "training@region13.dost.gov.ph" },
    bookingUrl: "https://region13.dost.gov.ph/training",
    tags: ["Training", "Certification"],
  },
  {
    id: "fablab",
    name: "FabLab Caraga Equipment Access",
    category: "Equipment & Facilities",
    shortDescription: "3D printers, laser cutters, CNC for prototyping.",
    description:
      "Use professional-grade fabrication equipment for product prototyping, packaging molds, and innovation projects.",
    office: "FabLab Mindanao – Caraga",
    province: "Agusan del Norte",
    fees: "₱150 – ₱2,000/hour depending on machine",
    requirements: ["Design file (STL/DXF/AI)", "Material specification"],
    processingTime: "Booking-based",
    contact: { phone: "(085) 342-5675", email: "fablab@region13.dost.gov.ph" },
    bookingUrl: "https://region13.dost.gov.ph/fablab",
    tags: ["Prototyping", "Innovation"],
    popular: true,
  },
  {
    id: "tech-consultancy",
    name: "Technical Consultancy (CPT/MPEX)",
    category: "Technical Consultancy",
    shortDescription: "Expert visits to diagnose & improve your operations.",
    description:
      "Consultancy for Productivity Enhancement and Manufacturing Productivity Extension Program. Free expert visits to your business.",
    office: "DOST Caraga PSTOs",
    province: "Region-wide",
    fees: "Free",
    requirements: ["Active business", "Site visit access"],
    processingTime: "1–2 months",
    contact: { phone: "(085) 342-5675", email: "consultancy@region13.dost.gov.ph" },
    bookingUrl: "https://region13.dost.gov.ph",
    tags: ["Productivity", "Expert"],
  },
  {
    id: "scholarship",
    name: "S&T Scholarship Program",
    category: "Scholarships & Innovation",
    shortDescription: "Undergraduate science scholarship for Caraganons.",
    description:
      "Full scholarship for incoming college freshmen pursuing science, engineering, and technology degrees.",
    office: "DOST Caraga Science Education Institute",
    province: "Region-wide",
    fees: "Free, with monthly stipend",
    requirements: ["Senior high transcript", "S&T entrance exam"],
    processingTime: "Annual application cycle",
    contact: { phone: "(085) 342-5675", email: "sei@region13.dost.gov.ph" },
    bookingUrl: "https://sei.dost.gov.ph",
    tags: ["Education", "Scholarship"],
  },
  {
    id: "tech-transfer",
    name: "Technology Licensing & Transfer",
    category: "Technology Transfer",
    shortDescription: "License DOST-developed technologies for commercial use.",
    description:
      "Adopt mature, market-ready technologies developed by DOST research institutions.",
    office: "DOST Caraga Technology Transfer Office",
    province: "Agusan del Norte",
    fees: "Varies per technology",
    requirements: ["Letter of intent", "Business profile"],
    processingTime: "1–3 months",
    contact: { phone: "(085) 342-5675", email: "tto@region13.dost.gov.ph" },
    bookingUrl: "https://region13.dost.gov.ph",
    tags: ["Licensing", "Innovation"],
  },
  {
    id: "product-dev",
    name: "Product Development Assistance",
    category: "Product Development",
    shortDescription: "End-to-end help turning your idea into a sellable product.",
    description:
      "Formulation, prototyping, sensory testing, and market readiness support for new products.",
    office: "DOST Caraga PLAC",
    province: "Agusan del Norte",
    fees: "Subsidized",
    requirements: ["Product concept", "Target consumer profile"],
    processingTime: "2–6 months",
    contact: { phone: "(085) 342-5675", email: "plac@region13.dost.gov.ph" },
    bookingUrl: "https://region13.dost.gov.ph",
    tags: ["R&D", "Innovation"],
  },
  {
    id: "microbio-testing",
    name: "Microbiological Testing",
    category: "Laboratory Testing",
    shortDescription: "Detect pathogens & spoilage organisms in food and water.",
    description:
      "Tests for total plate count, coliforms, E. coli, Salmonella, yeast and molds.",
    office: "DOST Caraga RSTL",
    province: "Agusan del Norte",
    fees: "₱800 – ₱3,500 per test",
    requirements: ["Sealed sample (250mL or 250g)", "Request form"],
    processingTime: "7–10 working days",
    contact: { phone: "(085) 342-5675", email: "rstl@region13.dost.gov.ph" },
    bookingUrl: "https://region13.dost.gov.ph",
    tags: ["Food", "Water", "Safety"],
  },
];

export interface Office {
  id: string;
  name: string;
  province: string;
  address: string;
  hours: string;
  phone: string;
  email: string;
  services: string[];
  bookingUrl: string;
}

export const OFFICES: Office[] = [
  {
    id: "pstc-agusan-norte",
    name: "PSTC Agusan del Norte",
    province: "Agusan del Norte",
    address: "J.C. Aquino Ave., Butuan City",
    hours: "Mon–Fri, 8:00 AM – 5:00 PM",
    phone: "(085) 342-5675",
    email: "agusandelnorte@region13.dost.gov.ph",
    services: ["Consultancy", "SETUP", "FDA Assistance"],
    bookingUrl: "https://region13.dost.gov.ph",
  },
  {
    id: "pstc-agusan-sur",
    name: "PSTC Agusan del Sur",
    province: "Agusan del Sur",
    address: "Capitol Compound, Prosperidad",
    hours: "Mon–Fri, 8:00 AM – 5:00 PM",
    phone: "(085) 343-7777",
    email: "agusandelsur@region13.dost.gov.ph",
    services: ["Trainings", "SETUP", "Tech Transfer"],
    bookingUrl: "https://region13.dost.gov.ph",
  },
  {
    id: "pstc-surigao-norte",
    name: "PSTC Surigao del Norte",
    province: "Surigao del Norte",
    address: "Capitol Site, Surigao City",
    hours: "Mon–Fri, 8:00 AM – 5:00 PM",
    phone: "(086) 826-8888",
    email: "surigaodelnorte@region13.dost.gov.ph",
    services: ["Consultancy", "Trainings", "Fisheries Support"],
    bookingUrl: "https://region13.dost.gov.ph",
  },
  {
    id: "pstc-surigao-sur",
    name: "PSTC Surigao del Sur",
    province: "Surigao del Sur",
    address: "Capitol Hills, Tandag City",
    hours: "Mon–Fri, 8:00 AM – 5:00 PM",
    phone: "(086) 211-3333",
    email: "surigaodelsur@region13.dost.gov.ph",
    services: ["SETUP", "Agriculture", "Tech Transfer"],
    bookingUrl: "https://region13.dost.gov.ph",
  },
  {
    id: "pstc-dinagat",
    name: "PSTC Dinagat Islands",
    province: "Dinagat Islands",
    address: "Capitol Compound, San Jose",
    hours: "Mon–Fri, 8:00 AM – 5:00 PM",
    phone: "(086) 240-5555",
    email: "dinagat@region13.dost.gov.ph",
    services: ["Fisheries", "Consultancy"],
    bookingUrl: "https://region13.dost.gov.ph",
  },
  {
    id: "rstl",
    name: "Regional Standards & Testing Laboratory",
    province: "Agusan del Norte",
    address: "DOST Caraga Compound, Butuan City",
    hours: "Mon–Fri, 8:00 AM – 5:00 PM",
    phone: "(085) 342-5675",
    email: "rstl@region13.dost.gov.ph",
    services: ["Chemical Testing", "Microbiological Testing", "Shelf-life"],
    bookingUrl: "https://region13.dost.gov.ph",
  },
  {
    id: "fablab",
    name: "FabLab Caraga",
    province: "Agusan del Norte",
    address: "Caraga State University, Butuan City",
    hours: "Mon–Fri, 9:00 AM – 6:00 PM",
    phone: "(085) 342-3000",
    email: "fablab@region13.dost.gov.ph",
    services: ["3D Printing", "Laser Cutting", "CNC", "Prototyping"],
    bookingUrl: "https://region13.dost.gov.ph/fablab",
  },
];

export interface Story {
  id: string;
  business: string;
  owner: string;
  province: string;
  industry: string;
  before: string;
  after: string;
  quote: string;
  services: string[];
}

export const STORIES: Story[] = [
  {
    id: "banana-chips",
    business: "Nanay Lita's Banana Chips",
    owner: "Lita Mercado",
    province: "Agusan del Sur",
    industry: "Food Processing",
    before: "Home-cooked snacks sold only in the local market.",
    after: "FDA-certified, supplied to 40+ supermarkets in Mindanao.",
    quote:
      "DOST guided me from packaging to FDA. Now my product is on the shelf — not just in the market.",
    services: ["FDA Assistance", "Packaging & Labeling", "SETUP"],
  },
  {
    id: "seaweed",
    business: "Surigao Seaweed Coop",
    owner: "Marlon Dizon",
    province: "Surigao del Norte",
    industry: "Fisheries",
    before: "Selling raw, low-margin seaweed to traders.",
    after: "Producing dried & powdered seaweed snacks for export.",
    quote: "The SETUP equipment grant changed everything for our 32 fisherfolk members.",
    services: ["SETUP", "Shelf-life Testing", "Product Development"],
  },
  {
    id: "weaving",
    business: "Dinagat Handwoven",
    owner: "Aisha Lim",
    province: "Dinagat Islands",
    industry: "Handicrafts",
    before: "Weaving sold only at provincial fairs.",
    after: "Featured at Manila FAME with online store and design awards.",
    quote: "FabLab helped us prototype modern designs while keeping our heritage patterns.",
    services: ["FabLab", "Product Development", "Technical Consultancy"],
  },
];

export interface WizardRecommendation {
  serviceIds: string[];
  rationale: string;
}

const INDUSTRY_SERVICES: Record<string, string[]> = {
  "Food Processing": ["nutrition-analysis", "fda-assistance", "packaging-labeling", "shelf-life-testing", "gmp-training"],
  Agriculture: ["tech-consultancy", "setup-program", "product-dev", "tech-transfer"],
  Fisheries: ["setup-program", "product-dev", "shelf-life-testing", "tech-consultancy"],
  Manufacturing: ["tech-consultancy", "setup-program", "fablab", "tech-transfer"],
  Handicrafts: ["fablab", "product-dev", "packaging-labeling", "setup-program"],
  ICT: ["fablab", "scholarship", "tech-transfer", "tech-consultancy"],
};

const CHALLENGE_SERVICES: Record<string, string[]> = {
  Packaging: ["packaging-labeling", "product-dev"],
  "Low production": ["setup-program", "tech-consultancy"],
  "Product quality": ["microbio-testing", "nutrition-analysis", "gmp-training"],
  Certification: ["fda-assistance", "gmp-training"],
  "Digital marketing": ["packaging-labeling", "product-dev"],
  "Process improvement": ["tech-consultancy", "setup-program"],
};

export function recommendServices(industry: string, challenge: string): WizardRecommendation {
  const a = INDUSTRY_SERVICES[industry] ?? [];
  const b = CHALLENGE_SERVICES[challenge] ?? [];
  const merged = Array.from(new Set([...b, ...a])).slice(0, 5);
  return {
    serviceIds: merged,
    rationale: `Based on your ${industry.toLowerCase()} business with a focus on ${challenge.toLowerCase()}, these DOST Caraga services can help you the most.`,
  };
}

export function getService(id: string) {
  return SERVICES.find((s) => s.id === id);
}

// Lightweight rule-based smart assistant
const KEYWORD_MAP: { kw: string[]; ids: string[] }[] = [
  { kw: ["banana", "chips", "snack", "food", "sauce", "jam", "process"], ids: ["fda-assistance", "nutrition-analysis", "packaging-labeling", "shelf-life-testing", "gmp-training"] },
  { kw: ["mall", "supermarket", "shelf", "sell", "export"], ids: ["fda-assistance", "packaging-labeling", "shelf-life-testing"] },
  { kw: ["equipment", "machine", "upgrade", "capacity"], ids: ["setup-program", "tech-consultancy"] },
  { kw: ["prototype", "3d", "design", "laser", "fabricate"], ids: ["fablab", "product-dev"] },
  { kw: ["seaweed", "fish", "aqua", "fisher"], ids: ["setup-program", "product-dev", "shelf-life-testing"] },
  { kw: ["weave", "craft", "handmade"], ids: ["fablab", "packaging-labeling", "product-dev"] },
  { kw: ["scholarship", "student", "study"], ids: ["scholarship"] },
  { kw: ["test", "lab", "analyze", "microbio", "bacteria"], ids: ["microbio-testing", "nutrition-analysis", "shelf-life-testing"] },
];

export function assistantReply(input: string): { ids: string[]; message: string } {
  const low = input.toLowerCase();
  const matched = new Set<string>();
  for (const { kw, ids } of KEYWORD_MAP) {
    if (kw.some((k) => low.includes(k))) ids.forEach((id) => matched.add(id));
  }
  if (matched.size === 0) {
    return {
      ids: SERVICES.filter((s) => s.popular).map((s) => s.id).slice(0, 4),
      message:
        "Here are some of our most-requested services. Tell me more about your business so I can give better recommendations.",
    };
  }
  return {
    ids: Array.from(matched).slice(0, 5),
    message: "Based on what you shared, these DOST Caraga services can help you the most:",
  };
}