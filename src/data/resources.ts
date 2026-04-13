export interface Grant {
  id: string;
  name: string;
  source: string;
  category: "federal" | "state" | "private" | "university";
  amount: string;
  deadline: string;
  url: string;
  description: string;
  eligibility: string[];
}

export interface University {
  name: string;
  program: string;
  contact: string;
  url: string;
  focus: string;
}

export const GRANTS: Grant[] = [
  {
    id: "usda-cfp",
    name: "Community Food Projects (CFP)",
    source: "USDA NIFA",
    category: "federal",
    amount: "Up to $400,000",
    deadline: "Rolling (check NIFA)",
    url: "https://www.nifa.usda.gov/grants/programs/community-food-projects-competitive-grant-program-cfpcgp",
    description: "Supports community-based food projects that increase food security, including farm-to-table programs and community kitchens.",
    eligibility: ["501(c)(3) organizations", "Community-based food programs", "Projects serving low-income communities"],
  },
  {
    id: "usda-fts",
    name: "Farm to School Grant",
    source: "USDA FNS",
    category: "federal",
    amount: "$20,000 - $100,000",
    deadline: "Annual (typically December)",
    url: "https://www.fns.usda.gov/cfs/farm-school-grant-program",
    description: "Supports schools and nonprofits implementing farm-to-school activities, local food procurement, and nutrition education.",
    eligibility: ["Schools", "Nonprofits", "State/local agencies", "Agricultural producers"],
  },
  {
    id: "usda-bfrdp",
    name: "Beginning Farmer and Rancher Development",
    source: "USDA NIFA",
    category: "federal",
    amount: "Up to $250,000/year",
    deadline: "Annual",
    url: "https://www.nifa.usda.gov/grants/funding-opportunities/beginning-farmer-rancher-development-program",
    description: "Supports training and education for beginning farmers and ranchers. Perfect for Indigo Asul farm partnership programs.",
    eligibility: ["Community-based orgs", "Universities", "Cooperative extensions"],
  },
  {
    id: "usda-vapg",
    name: "Value-Added Producer Grant (VAPG)",
    source: "USDA Rural Development",
    category: "federal",
    amount: "Up to $75,000 (planning) / $250,000 (working capital)",
    deadline: "Annual (typically March)",
    url: "https://www.rd.usda.gov/programs-services/business-programs/value-added-producer-grants",
    description: "Helps agricultural producers create value-added products — spice kits, sauces, preserved goods from farm-grown ingredients.",
    eligibility: ["Independent producers", "Farmer cooperatives", "Majority-controlled producer entities"],
  },
  {
    id: "sba-microloan",
    name: "SBA Microloan Program",
    source: "Small Business Administration",
    category: "federal",
    amount: "Up to $50,000",
    deadline: "Rolling",
    url: "https://www.sba.gov/funding-programs/loans/microloans",
    description: "Small loans for working capital, inventory, supplies, and equipment. Ideal for catering startup costs and equipment.",
    eligibility: ["Small businesses", "For-profit entities", "Must work with intermediary lender"],
  },
  {
    id: "la-faststart",
    name: "LED FastStart",
    source: "Louisiana Economic Development",
    category: "state",
    amount: "Free workforce training",
    deadline: "Rolling — application required",
    url: "https://www.opportunitylouisiana.gov/faststart",
    description: "Louisiana's nationally-ranked workforce training program. Free customized employee training for qualifying businesses.",
    eligibility: ["Louisiana-based businesses", "Creating new jobs", "Manufacturing, HQ, or food processing"],
  },
  {
    id: "la-smallbiz",
    name: "Louisiana Small Business Loan Program",
    source: "Louisiana Economic Development",
    category: "state",
    amount: "$5,000 - $250,000",
    deadline: "Rolling",
    url: "https://www.opportunitylouisiana.gov/small-business",
    description: "Low-interest loans for Louisiana small businesses, including food service and catering companies.",
    eligibility: ["Louisiana-domiciled businesses", "Fewer than 50 employees", "Under $3M annual revenue"],
  },
  {
    id: "kellogg-food",
    name: "W.K. Kellogg Foundation Grants",
    source: "W.K. Kellogg Foundation",
    category: "private",
    amount: "Varies ($50K - $500K typical)",
    deadline: "Rolling LOI",
    url: "https://www.wkkf.org/what-we-do/overview/",
    description: "Focuses on equitable food systems, community-driven solutions, and racial equity. Strong fit for culture-rooted food programs.",
    eligibility: ["501(c)(3) organizations", "Projects centered on food equity", "Community-led initiatives"],
  },
  {
    id: "rwjf-culture-health",
    name: "Robert Wood Johnson Foundation — Culture of Health",
    source: "Robert Wood Johnson Foundation",
    category: "private",
    amount: "Varies by program",
    deadline: "Multiple cycles annually",
    url: "https://www.rwjf.org/en/how-we-work/grants-explorer.html",
    description: "Supports programs connecting food, culture, and community health outcomes. Nanny's health-focused food mission aligns well.",
    eligibility: ["Nonprofits", "Academic institutions", "Community organizations"],
  },
];

export const UNIVERSITIES: University[] = [
  {
    name: "LSU AgCenter",
    program: "Food Science & Nutrition, Community Food Systems",
    contact: "Baton Rouge, LA",
    url: "https://www.lsuagcenter.com/",
    focus: "Research partnerships, food safety certifications, extension programs for small food businesses",
  },
  {
    name: "Southern University AgCenter",
    program: "Small Farm Program, Sustainable Agriculture",
    contact: "Baton Rouge, LA",
    url: "https://www.suagcenter.com/",
    focus: "HBCU agricultural research, community gardens, small-scale farmer training — Indigo Asul partnership potential",
  },
  {
    name: "McNeese State University",
    program: "Culinary Arts & Food Studies",
    contact: "Lake Charles, LA",
    url: "https://www.mcneese.edu/",
    focus: "Culinary program partnerships, intern pipelines, Southwest Louisiana food heritage research",
  },
  {
    name: "UL Lafayette",
    program: "Hospitality Management",
    contact: "Lafayette, LA",
    url: "https://www.louisiana.edu/",
    focus: "Cajun/Creole food research, hospitality industry connections, cultural preservation",
  },
  {
    name: "Nicholls State University",
    program: "Chef John Folse Culinary Institute",
    contact: "Thibodaux, LA",
    url: "https://www.nicholls.edu/culinary/",
    focus: "Premier Louisiana culinary program — pipeline for trained chefs, research collaborations",
  },
];

export const CORPORATE_STRUCTURE = {
  forProfit: {
    name: "Nanny's Culture Kitchen LLC",
    type: "Louisiana Benefit Corporation LLC",
    filing: "https://geauxbiz.sos.la.gov/",
    description: "Operating entity for catering, online store, events, and food production. Benefit Corp designation signals social mission.",
    steps: [
      "File Articles of Organization via geauxBIZ (LA Secretary of State)",
      "Select Benefit Corporation designation in articles",
      "Obtain EIN from IRS (Form SS-4)",
      "Register for Louisiana state tax ID",
      "Obtain food service permits (LA Dept of Health)",
      "Set up business banking and Stripe merchant account",
    ],
  },
  nonProfit: {
    name: "Nanny's Community Kitchen Foundation",
    type: "501(c)(3) Public Charity",
    filing: "IRS Form 1023 / 1023-EZ",
    description: "Nonprofit arm for grants, community programs, food education, and the Indigo Asul international farm partnership.",
    steps: [
      "File Articles of Incorporation (nonprofit) via geauxBIZ",
      "Draft bylaws and elect board of directors",
      "Apply for EIN (Form SS-4)",
      "File IRS Form 1023 or 1023-EZ for 501(c)(3) status",
      "Register for Louisiana charitable solicitation license",
      "Apply for state/federal grant eligibility (SAM.gov registration)",
    ],
  },
  indigoAsul: {
    name: "Indigo Asul Farm Partnership",
    location: "Paso de Guayabo, Puerto Vallarta, Mexico",
    description: "International agricultural partnership under the nonprofit arm. Sustainable farming, cultural exchange, farm-to-kitchen pipeline.",
    structure: "MOU under Nanny's Community Kitchen Foundation → governed by both US 501(c)(3) and Mexican agricultural cooperative laws.",
  },
};
