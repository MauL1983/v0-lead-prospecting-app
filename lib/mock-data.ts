export type PipelineStage = "new" | "contacted" | "replied" | "meeting_booked" | "closed";

export interface Lead {
  id: string;
  name: string;
  initials: string;
  title: string;
  company: string;
  industry: string;
  companySize: string;
  location: string;
  email: string;
  linkedin: string;
  phone?: string;
  fitScore: number;
  fitReasons: string[];
  aiInsight: string;
  recentSignal: string;
  status: PipelineStage;
  lastActivity: string;
  companyFounded: string;
  companyHQ: string;
  companyWebsite: string;
  bio: string;
}

export const MOCK_LEADS: Lead[] = [
  {
    id: "1",
    name: "Sarah Chen",
    initials: "SC",
    title: "VP of Sales",
    company: "Notion",
    industry: "SaaS / Software",
    companySize: "501–1000",
    location: "🇺🇸 San Francisco, CA",
    email: "sarah.chen@notion.so",
    linkedin: "linkedin.com/in/sarahchen",
    fitScore: 96,
    fitReasons: [
      "Leads a 50+ person sales org actively scaling outbound motions",
      "Recently posted about reducing manual prospecting overhead on LinkedIn",
      "Notion raised Series C, signaling active headcount growth in revenue teams",
    ],
    aiInsight:
      "Sarah oversees a rapidly scaling sales team at Notion and has publicly expressed interest in reducing manual prospecting work. Her team size and tech stack make her an ideal buyer for a tool that automates top-of-funnel.",
    recentSignal: "Series C raised 4 months ago · LinkedIn post about hiring 15 AEs",
    status: "new",
    lastActivity: "Added 1 hour ago",
    companyFounded: "2016",
    companyHQ: "San Francisco, CA",
    companyWebsite: "notion.so",
    bio:
      "Sarah Chen is a seasoned sales leader with over 12 years of experience scaling B2B SaaS revenue teams. At Notion, she oversees all outbound and inbound sales motions, managing a team of 50+ quota-carrying reps across North America and EMEA.",
  },
  {
    id: "2",
    name: "Marcus Williams",
    initials: "MW",
    title: "Director of Revenue",
    company: "Stripe",
    industry: "Fintech",
    companySize: "1000+",
    location: "🇺🇸 San Francisco, CA",
    email: "marcus.williams@stripe.com",
    linkedin: "linkedin.com/in/marcuswilliams",
    fitScore: 91,
    fitReasons: [
      "Owns the full revenue function including SDR and AE teams at Stripe",
      "Known for championing data-driven prospecting tools internally",
      "Stripe's enterprise expansion is driving demand for efficient outbound pipeline",
    ],
    aiInsight:
      "Marcus runs a large revenue operation at Stripe with a known preference for tooling that reduces rep admin overhead. His team's scale and the company's growth trajectory make him a high-priority contact for enterprise-tier outreach.",
    recentSignal: "Promoted to Director role 6 months ago · Stripe expanding enterprise team by 30%",
    status: "contacted",
    lastActivity: "Emailed 2 days ago",
    companyFounded: "2010",
    companyHQ: "San Francisco, CA",
    companyWebsite: "stripe.com",
    bio:
      "Marcus Williams drives revenue strategy at Stripe, overseeing a team of 80+ sales professionals. He has a strong background in revenue operations and consistently champions tools that improve pipeline velocity and rep productivity.",
  },
  {
    id: "3",
    name: "Priya Sharma",
    initials: "PS",
    title: "Head of Growth",
    company: "Figma",
    industry: "SaaS / Software",
    companySize: "501–1000",
    location: "🇺🇸 New York, NY",
    email: "priya.sharma@figma.com",
    linkedin: "linkedin.com/in/priyasharma",
    fitScore: 88,
    fitReasons: [
      "Manages PLG to enterprise conversion pipeline, a perfect use case for enriched leads",
      "Actively evaluating prospecting tools to support Figma's enterprise push",
      "Growth team doubled in the last quarter, creating capacity pressure",
    ],
    aiInsight:
      "Priya bridges product-led growth and enterprise sales at Figma, making her deeply aware of the friction in converting PLG users to paid enterprise accounts. An AI-powered prospecting tool fits directly into this workflow gap.",
    recentSignal: "Figma enterprise revenue grew 45% YoY · Priya spoke at SaaStr about PLG-to-enterprise",
    status: "replied",
    lastActivity: "Replied 1 day ago",
    companyFounded: "2012",
    companyHQ: "San Francisco, CA",
    companyWebsite: "figma.com",
    bio:
      "Priya Sharma leads growth strategy at Figma, focusing on accelerating enterprise adoption from their massive product-led user base. She brings a strong analytical mindset and has scaled growth teams at three previous SaaS companies.",
  },
  {
    id: "4",
    name: "James O'Brien",
    initials: "JO",
    title: "Sales Manager",
    company: "Linear",
    industry: "SaaS / Software",
    companySize: "51–200",
    location: "🇺🇸 San Francisco, CA",
    email: "james.obrien@linear.app",
    linkedin: "linkedin.com/in/jamesobrien",
    fitScore: 82,
    fitReasons: [
      "Manages a lean sales team that needs to punch above its weight on outbound",
      "Linear is in hyper-growth mode and prioritizes operational efficiency",
      "James has a history of adopting early-stage sales tooling at previous startups",
    ],
    aiInsight:
      "James runs a small but highly efficient sales team at Linear. Given their growth stage and lean headcount, tools that multiply rep output are a natural fit. He's the kind of early adopter who can become a vocal internal champion.",
    recentSignal: "Linear raised Series B 8 months ago · Actively hiring AEs and SDRs",
    status: "meeting_booked",
    lastActivity: "Meeting booked for Thu May 22",
    companyFounded: "2019",
    companyHQ: "San Francisco, CA",
    companyWebsite: "linear.app",
    bio:
      "James O'Brien manages the sales function at Linear, one of the fastest-growing developer tools companies in the world. He previously led SDR teams at Intercom and Zendesk before joining Linear at an early stage.",
  },
  {
    id: "5",
    name: "Ana Martínez",
    initials: "AM",
    title: "VP Sales Ops",
    company: "Vercel",
    industry: "SaaS / Software",
    companySize: "201–500",
    location: "🇺🇸 Remote (US)",
    email: "ana.martinez@vercel.com",
    linkedin: "linkedin.com/in/anamartinez",
    fitScore: 79,
    fitReasons: [
      "Owns the sales tech stack and RevOps infrastructure at Vercel",
      "Actively evaluating prospecting and enrichment tools for 2025 planning",
      "Vercel's sales motion is shifting from inbound to outbound",
    ],
    aiInsight:
      "Ana controls the sales tools budget and evaluation process at Vercel. As a sales ops leader, she values tools with clean data exports, CRM integrations, and measurable ROI — all strengths of a platform like leadRX10.",
    recentSignal: "Vercel Series D 5 months ago · Ana posted job for Sales Ops Analyst",
    status: "contacted",
    lastActivity: "Emailed 5 days ago",
    companyFounded: "2015",
    companyHQ: "San Francisco, CA",
    companyWebsite: "vercel.com",
    bio:
      "Ana Martínez leads Sales Operations at Vercel, where she's built the entire revenue infrastructure from scratch. She has deep expertise in CRM architecture, territory planning, and sales tool evaluation across the full revenue tech stack.",
  },
  {
    id: "6",
    name: "David Park",
    initials: "DP",
    title: "Director of Business Dev",
    company: "Loom",
    industry: "SaaS / Software",
    companySize: "201–500",
    location: "🇺🇸 Austin, TX",
    email: "david.park@loom.com",
    linkedin: "linkedin.com/in/davidpark",
    fitScore: 74,
    fitReasons: [
      "Drives enterprise partnership and outbound motion at Loom",
      "Team expanded after Atlassian acquisition, creating new budget cycles",
      "Known to use Apollo and Outreach — familiar with modern prospecting tools",
    ],
    aiInsight:
      "David's role at Loom sits at the intersection of sales and partnerships, making enriched lead data particularly valuable. His team has new budget post-acquisition and is evaluating tools for the next fiscal year.",
    recentSignal: "Atlassian acquisition completed · New leadership team evaluating tool stack",
    status: "new",
    lastActivity: "Added 3 days ago",
    companyFounded: "2015",
    companyHQ: "San Francisco, CA",
    companyWebsite: "loom.com",
    bio:
      "David Park leads business development and enterprise partnerships at Loom. With Loom now part of Atlassian, he's navigating a larger organizational structure while maintaining the agile deal-making approach that defined Loom's early growth.",
  },
  {
    id: "7",
    name: "Emma Laurent",
    initials: "EL",
    title: "Sales Director",
    company: "Miro",
    industry: "SaaS / Software",
    companySize: "1000+",
    location: "🇳🇱 Amsterdam, Netherlands",
    email: "emma.laurent@miro.com",
    linkedin: "linkedin.com/in/emmalaurent",
    fitScore: 71,
    fitReasons: [
      "Leads EMEA enterprise sales at Miro with a growing SDR function",
      "Miro is investing heavily in outbound in Europe to match US growth",
      "Emma has budget authority and is actively building her team's tech stack",
    ],
    aiInsight:
      "Emma's EMEA remit at Miro creates specific needs around territory data enrichment and localized lead sourcing — areas where leadRX10's international contact coverage is a direct differentiator.",
    recentSignal: "Miro opened Amsterdam HQ · Emma's team hiring 10 new SDRs in EMEA",
    status: "replied",
    lastActivity: "Replied 3 days ago",
    companyFounded: "2011",
    companyHQ: "San Francisco, CA (EMEA: Amsterdam)",
    companyWebsite: "miro.com",
    bio:
      "Emma Laurent directs enterprise sales across EMEA at Miro. Based in Amsterdam, she oversees a 30-person team spanning 8 countries and has been instrumental in growing Miro's European enterprise revenue to 8-figure ARR.",
  },
  {
    id: "8",
    name: "Carlos Reyes",
    initials: "CR",
    title: "Account Executive Lead",
    company: "Webflow",
    industry: "SaaS / Software",
    companySize: "201–500",
    location: "🇺🇸 Miami, FL",
    email: "carlos.reyes@webflow.com",
    linkedin: "linkedin.com/in/carlosreyes",
    fitScore: 65,
    fitReasons: [
      "Senior AE who influences tooling decisions for the broader sales team",
      "Webflow is building out its enterprise segment, creating new prospecting needs",
      "Carlos has a network in the Miami tech scene, a key expansion market",
    ],
    aiInsight:
      "As a senior individual contributor, Carlos may not have direct budget authority but he's an influencer in the buying process. Winning him over as a user could create bottom-up adoption across Webflow's sales team.",
    recentSignal: "Webflow raised $120M Series C · Enterprise team growing 40%",
    status: "new",
    lastActivity: "Added 1 week ago",
    companyFounded: "2013",
    companyHQ: "San Francisco, CA",
    companyWebsite: "webflow.com",
    bio:
      "Carlos Reyes is a top-performing Account Executive at Webflow, consistently closing enterprise deals in the $100K+ ARR range. He's known for a consultative selling style and deep product knowledge that resonates with technical buyers.",
  },
  {
    id: "9",
    name: "Aisha Johnson",
    initials: "AJ",
    title: "Growth Manager",
    company: "Retool",
    industry: "SaaS / Software",
    companySize: "201–500",
    location: "🇺🇸 San Francisco, CA",
    email: "aisha.johnson@retool.com",
    linkedin: "linkedin.com/in/aishajohnson",
    fitScore: 58,
    fitReasons: [
      "Manages growth experiments including outbound lead generation at Retool",
      "Some budget authority for growth tooling under $10K/month",
      "Less senior than ideal but sits in the right function",
    ],
    aiInsight:
      "Aisha is a solid secondary contact at Retool — not the primary decision maker, but influential in growth tool evaluations. Worth nurturing alongside a more senior contact in the Revenue or Sales org.",
    recentSignal: "Retool Series C 10 months ago · Growth team running outbound experiments",
    status: "contacted",
    lastActivity: "Emailed 1 week ago",
    companyFounded: "2017",
    companyHQ: "San Francisco, CA",
    companyWebsite: "retool.com",
    bio:
      "Aisha Johnson leads growth initiatives at Retool, running experiments across acquisition, activation, and revenue channels. She brings a data-first approach and has a background in both product and growth from her time at Amplitude.",
  },
  {
    id: "10",
    name: "Tom Fischer",
    initials: "TF",
    title: "Sales Manager",
    company: "Framer",
    industry: "SaaS / Software",
    companySize: "51–200",
    location: "🇳🇱 Amsterdam, Netherlands",
    email: "tom.fischer@framer.com",
    linkedin: "linkedin.com/in/tomfischer",
    fitScore: 52,
    fitReasons: [
      "Managing a small sales team at an early-stage company",
      "Limited budget authority — likely needs champion support from leadership",
      "Framer's focus is still primarily PLG; outbound is nascent",
    ],
    aiInsight:
      "Tom is an emerging leader at Framer but the company's current stage and PLG focus means sales tooling investment is lower priority. Consider revisiting in 6–9 months as their enterprise motion matures.",
    recentSignal: "Framer growing rapidly in design tool market · Sales team in early formation",
    status: "new",
    lastActivity: "Added 2 weeks ago",
    companyFounded: "2014",
    companyHQ: "Amsterdam, Netherlands",
    companyWebsite: "framer.com",
    bio:
      "Tom Fischer manages sales at Framer, where he's building the commercial function from the ground up. With a background in design and a deep understanding of Framer's creative user base, he brings a unique perspective to enterprise sales.",
  },
];

export const MOCK_MEETINGS = [
  {
    id: "m1",
    lead: MOCK_LEADS[0],
    date: "Thu, May 22, 2025",
    time: "2:00 PM – 2:30 PM",
    type: "Discovery call (30 min)",
    status: "confirmed" as const,
  },
  {
    id: "m2",
    lead: MOCK_LEADS[1],
    date: "Fri, May 23, 2025",
    time: "10:00 AM – 10:45 AM",
    type: "Product demo (45 min)",
    status: "pending" as const,
  },
  {
    id: "m3",
    lead: MOCK_LEADS[2],
    date: "Mon, May 26, 2025",
    time: "3:00 PM – 3:30 PM",
    type: "Follow-up (15 min)",
    status: "confirmed" as const,
  },
  {
    id: "m4",
    lead: MOCK_LEADS[6],
    date: "Tue, May 27, 2025",
    time: "11:00 AM – 11:45 AM",
    type: "Product demo (45 min)",
    status: "pending" as const,
  },
];

export const ANALYTICS_DATA = {
  leadsOverTime: [
    { date: "Apr 20", leads: 8 },
    { date: "Apr 21", leads: 12 },
    { date: "Apr 22", leads: 6 },
    { date: "Apr 23", leads: 15 },
    { date: "Apr 24", leads: 9 },
    { date: "Apr 25", leads: 18 },
    { date: "Apr 26", leads: 11 },
    { date: "Apr 27", leads: 14 },
    { date: "Apr 28", leads: 20 },
    { date: "Apr 29", leads: 7 },
    { date: "Apr 30", leads: 16 },
    { date: "May 1", leads: 22 },
    { date: "May 2", leads: 13 },
    { date: "May 3", leads: 19 },
    { date: "May 4", leads: 8 },
    { date: "May 5", leads: 24 },
    { date: "May 6", leads: 17 },
    { date: "May 7", leads: 11 },
    { date: "May 8", leads: 28 },
    { date: "May 9", leads: 15 },
    { date: "May 10", leads: 21 },
    { date: "May 11", leads: 9 },
    { date: "May 12", leads: 18 },
    { date: "May 13", leads: 25 },
    { date: "May 14", leads: 14 },
    { date: "May 15", leads: 30 },
    { date: "May 16", leads: 12 },
    { date: "May 17", leads: 22 },
    { date: "May 18", leads: 16 },
    { date: "May 19", leads: 19 },
  ],
  repliesByType: [
    { type: "Cold intro", replies: 14 },
    { type: "Follow-up", replies: 23 },
    { type: "Meeting req", replies: 9 },
  ],
};
