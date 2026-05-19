export interface Lead {
  id: string
  name: string
  initials: string
  title: string
  company: string
  industry: string
  companySize: string
  location: string
  locationFlag: string
  email: string
  linkedin: string
  phone?: string
  fitScore: number
  fitReasons: string[]
  aiInsight: string
  recentSignal: string
  status: PipelineStage
  lastActivity: string
  bio: string
  companyDetails: {
    founded: string
    hq: string
    website: string
  }
}

export type PipelineStage = 'new' | 'contacted' | 'replied' | 'meeting_booked' | 'closed'

export const MOCK_LEADS: Lead[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    initials: 'SC',
    title: 'VP of Sales',
    company: 'Notion',
    industry: 'SaaS / Software',
    companySize: '201–500',
    location: 'San Francisco, CA',
    locationFlag: '🇺🇸',
    email: 'sarah.chen@notion.so',
    linkedin: 'linkedin.com/in/sarahchen',
    phone: '+1 (415) 555-0123',
    fitScore: 96,
    fitReasons: [
      'Matches your target seniority (VP-level)',
      'Company uses Salesforce (tech stack match)',
      'Recently posted about scaling sales team',
    ],
    aiInsight:
      'Sarah has been vocal about building a data-driven sales culture at Notion. Her recent LinkedIn posts indicate frustration with manual lead qualification processes—making her an ideal prospect for automation tools.',
    recentSignal: 'Hired 3 new sales reps this quarter',
    status: 'new',
    lastActivity: 'Added 2 hours ago',
    bio: 'Sarah Chen is a seasoned sales leader with 12+ years of experience scaling B2B SaaS companies. Prior to Notion, she led revenue teams at Dropbox and Asana.',
    companyDetails: {
      founded: '2013',
      hq: 'San Francisco, CA',
      website: 'notion.so',
    },
  },
  {
    id: '2',
    name: 'Marcus Williams',
    initials: 'MW',
    title: 'Director of Revenue',
    company: 'Stripe',
    industry: 'Fintech',
    companySize: '1000+',
    location: 'New York, NY',
    locationFlag: '🇺🇸',
    email: 'marcus.w@stripe.com',
    linkedin: 'linkedin.com/in/marcuswilliams',
    fitScore: 91,
    fitReasons: [
      'High-growth company with expanding sales team',
      'Director-level decision maker',
      'Company focused on enterprise expansion',
    ],
    aiInsight:
      'Marcus oversees a 40+ person revenue team at Stripe. His team has aggressive Q3 targets and has been evaluating tools to improve outbound efficiency.',
    recentSignal: 'Promoted to Director 2 months ago',
    status: 'contacted',
    lastActivity: 'Emailed 2 days ago',
    bio: 'Marcus Williams brings deep fintech expertise from his tenure at Square and PayPal. He specializes in building high-velocity sales motions for payments products.',
    companyDetails: {
      founded: '2010',
      hq: 'San Francisco, CA',
      website: 'stripe.com',
    },
  },
  {
    id: '3',
    name: 'Priya Sharma',
    initials: 'PS',
    title: 'Head of Growth',
    company: 'Figma',
    industry: 'SaaS / Software',
    companySize: '501–1000',
    location: 'London, UK',
    locationFlag: '🇬🇧',
    email: 'priya.sharma@figma.com',
    linkedin: 'linkedin.com/in/priyasharma',
    fitScore: 88,
    fitReasons: [
      'Growth leader at product-led company',
      'Actively hiring sales development reps',
      'EMEA expansion focus',
    ],
    aiInsight:
      'Priya is spearheading Figma\'s European growth initiative. Her team is transitioning from PLG-only to a hybrid model with outbound sales—prime timing for prospecting tools.',
    recentSignal: 'Opening new EMEA sales hub',
    status: 'replied',
    lastActivity: 'Replied 1 day ago',
    bio: 'Priya Sharma is a growth strategist who previously led international expansion at Canva. She\'s known for building scrappy, efficient go-to-market teams.',
    companyDetails: {
      founded: '2012',
      hq: 'San Francisco, CA',
      website: 'figma.com',
    },
  },
  {
    id: '4',
    name: 'James O\'Brien',
    initials: 'JO',
    title: 'Sales Manager',
    company: 'Linear',
    industry: 'SaaS / Software',
    companySize: '51–200',
    location: 'Dublin, Ireland',
    locationFlag: '🇮🇪',
    email: 'james.obrien@linear.app',
    linkedin: 'linkedin.com/in/jamesobrien',
    fitScore: 82,
    fitReasons: [
      'Manager at fast-growing startup',
      'Company recently raised Series B',
      'Building out first dedicated sales team',
    ],
    aiInsight:
      'James was Linear\'s first sales hire and is now building the team from scratch. He\'s actively evaluating the sales tech stack and has budget authority for tools under $50k.',
    recentSignal: 'Series B raised 3 months ago',
    status: 'meeting_booked',
    lastActivity: 'Meeting scheduled for tomorrow',
    bio: 'James O\'Brien is an experienced SaaS sales leader who helped scale early sales teams at Intercom and HubSpot before joining Linear as their founding sales hire.',
    companyDetails: {
      founded: '2019',
      hq: 'San Francisco, CA',
      website: 'linear.app',
    },
  },
  {
    id: '5',
    name: 'Ana Martínez',
    initials: 'AM',
    title: 'VP Sales Ops',
    company: 'Vercel',
    industry: 'SaaS / Software',
    companySize: '201–500',
    location: 'Miami, FL',
    locationFlag: '🇺🇸',
    email: 'ana.martinez@vercel.com',
    linkedin: 'linkedin.com/in/anamartinez',
    fitScore: 79,
    fitReasons: [
      'Sales Ops leader (key influencer)',
      'Company in hyper-growth phase',
      'Tech-forward organization',
    ],
    aiInsight:
      'Ana manages Vercel\'s entire sales operations stack. She\'s been consolidating tools and looking for an all-in-one prospecting solution to replace multiple point solutions.',
    recentSignal: 'Posted about sales tool consolidation',
    status: 'new',
    lastActivity: 'Added 1 day ago',
    bio: 'Ana Martínez is a RevOps expert with a track record of implementing scalable sales processes at high-growth startups including Twilio and Segment.',
    companyDetails: {
      founded: '2015',
      hq: 'San Francisco, CA',
      website: 'vercel.com',
    },
  },
  {
    id: '6',
    name: 'David Park',
    initials: 'DP',
    title: 'Director of Business Dev',
    company: 'Loom',
    industry: 'SaaS / Software',
    companySize: '201–500',
    location: 'Seattle, WA',
    locationFlag: '🇺🇸',
    email: 'david.park@loom.com',
    linkedin: 'linkedin.com/in/davidpark',
    fitScore: 74,
    fitReasons: [
      'Director-level with budget authority',
      'Company expanding enterprise segment',
      'Previously used similar tools',
    ],
    aiInsight:
      'David leads Loom\'s partnerships and enterprise BD efforts. His team is focused on building a more systematic approach to outbound after relying heavily on inbound.',
    recentSignal: 'Launched enterprise tier last quarter',
    status: 'contacted',
    lastActivity: 'Follow-up sent 3 days ago',
    bio: 'David Park has spent a decade in business development at video and collaboration companies, including stints at Zoom and Vimeo before joining Loom.',
    companyDetails: {
      founded: '2015',
      hq: 'San Francisco, CA',
      website: 'loom.com',
    },
  },
  {
    id: '7',
    name: 'Emma Laurent',
    initials: 'EL',
    title: 'Sales Director',
    company: 'Miro',
    industry: 'SaaS / Software',
    companySize: '501–1000',
    location: 'Amsterdam, Netherlands',
    locationFlag: '🇳🇱',
    email: 'emma.laurent@miro.com',
    linkedin: 'linkedin.com/in/emmalaurent',
    fitScore: 71,
    fitReasons: [
      'Sales Director at large SaaS company',
      'EMEA market focus',
      'Collaborative selling approach',
    ],
    aiInsight:
      'Emma manages Miro\'s Northern European sales team. She\'s been vocal about the need for better prospecting data quality and has trialed several competitors.',
    recentSignal: 'Attending SaaStr Europa next month',
    status: 'new',
    lastActivity: 'Added 3 days ago',
    bio: 'Emma Laurent is a multilingual sales leader fluent in French, Dutch, and English. She\'s built and scaled sales teams across multiple European markets.',
    companyDetails: {
      founded: '2011',
      hq: 'San Francisco, CA',
      website: 'miro.com',
    },
  },
  {
    id: '8',
    name: 'Carlos Reyes',
    initials: 'CR',
    title: 'Account Executive Lead',
    company: 'Webflow',
    industry: 'SaaS / Software',
    companySize: '201–500',
    location: 'Austin, TX',
    locationFlag: '🇺🇸',
    email: 'carlos.reyes@webflow.com',
    linkedin: 'linkedin.com/in/carlosreyes',
    fitScore: 65,
    fitReasons: [
      'AE team lead (potential champion)',
      'Design-forward company culture',
      'Mid-market focus',
    ],
    aiInsight:
      'Carlos leads a team of 8 AEs at Webflow. While not a final decision maker, he heavily influences tool selection and could champion internally.',
    recentSignal: 'Team exceeded quota last quarter',
    status: 'closed',
    lastActivity: 'Marked as won 1 week ago',
    bio: 'Carlos Reyes is a top-performing enterprise AE who transitioned into leadership. He\'s passionate about sales methodology and team enablement.',
    companyDetails: {
      founded: '2013',
      hq: 'San Francisco, CA',
      website: 'webflow.com',
    },
  },
  {
    id: '9',
    name: 'Aisha Johnson',
    initials: 'AJ',
    title: 'Growth Manager',
    company: 'Retool',
    industry: 'SaaS / Software',
    companySize: '201–500',
    location: 'Chicago, IL',
    locationFlag: '🇺🇸',
    email: 'aisha.johnson@retool.com',
    linkedin: 'linkedin.com/in/aishajohnson',
    fitScore: 58,
    fitReasons: [
      'Growth role with sales influence',
      'Developer-focused company',
      'Strong inbound motion',
    ],
    aiInsight:
      'Aisha focuses on Retool\'s PLG growth funnel but works closely with sales on expansion deals. She may not be the primary buyer but can provide warm introductions.',
    recentSignal: 'Spoke at Product-Led Summit',
    status: 'replied',
    lastActivity: 'Replied 5 days ago',
    bio: 'Aisha Johnson is a growth marketing veteran who has driven acquisition strategies at both B2B and B2C companies, including Mailchimp and Calendly.',
    companyDetails: {
      founded: '2017',
      hq: 'San Francisco, CA',
      website: 'retool.com',
    },
  },
  {
    id: '10',
    name: 'Tom Fischer',
    initials: 'TF',
    title: 'Sales Manager',
    company: 'Framer',
    industry: 'SaaS / Software',
    companySize: '51–200',
    location: 'Berlin, Germany',
    locationFlag: '🇩🇪',
    email: 'tom.fischer@framer.com',
    linkedin: 'linkedin.com/in/tomfischer',
    fitScore: 52,
    fitReasons: [
      'Building sales function from scratch',
      'Design tool space',
      'European market',
    ],
    aiInsight:
      'Tom is one of Framer\'s first sales hires as they transition to a more sales-assisted motion. Early stage but could grow into a larger opportunity.',
    recentSignal: 'Company announced profitability',
    status: 'new',
    lastActivity: 'Added 1 week ago',
    bio: 'Tom Fischer started his career in design before moving into sales. He brings a unique perspective as someone who deeply understands the creative professional buyer.',
    companyDetails: {
      founded: '2014',
      hq: 'Amsterdam, Netherlands',
      website: 'framer.com',
    },
  },
]

export const INDUSTRIES = [
  'SaaS / Software',
  'Fintech',
  'Healthcare Tech',
  'E-commerce',
  'Marketing Tech',
  'HR Tech',
  'Cybersecurity',
  'Other',
]

export const COMPANY_SIZES = ['1–10', '11–50', '51–200', '201–500', '501–1000', '1000+']

export const SENIORITY_LEVELS = ['Founder/CEO', 'VP / Director', 'Manager', 'IC/Individual Contributor']

export const GEOGRAPHIES = ['North America', 'Latin America', 'Europe', 'Asia Pacific']

export const PIPELINE_STAGES: { id: PipelineStage; label: string; color: string }[] = [
  { id: 'new', label: 'New', color: 'blue' },
  { id: 'contacted', label: 'Contacted', color: 'amber' },
  { id: 'replied', label: 'Replied', color: 'purple' },
  { id: 'meeting_booked', label: 'Meeting Booked', color: 'green' },
  { id: 'closed', label: 'Closed', color: 'gray' },
]

export const EMAIL_TEMPLATES = [
  {
    id: 'short',
    name: 'Short & punchy',
    description: 'Get straight to the point in 3-4 sentences',
  },
  {
    id: 'story',
    name: 'Story-led',
    description: 'Open with a relatable scenario or customer story',
  },
  {
    id: 'question',
    name: 'Question-based',
    description: 'Lead with a thought-provoking question',
  },
]

export const MEETING_TYPES = [
  { id: 'discovery', name: 'Discovery call', duration: 30 },
  { id: 'demo', name: 'Product demo', duration: 45 },
  { id: 'followup', name: 'Follow-up', duration: 15 },
]

export interface Meeting {
  id: string
  lead: Lead
  date: string
  time: string
  duration: number
  type: string
  status: 'confirmed' | 'pending' | 'cancelled'
  title: string
  notes?: string
}

export const MOCK_MEETINGS: Meeting[] = [
  {
    id: 'm1',
    lead: MOCK_LEADS[0],
    date: '2026-05-21',
    time: '14:00',
    duration: 30,
    type: 'Discovery call',
    status: 'confirmed',
    title: 'Discovery call — Sarah Chen / LeadEngine',
  },
  {
    id: 'm2',
    lead: MOCK_LEADS[3],
    date: '2026-05-22',
    time: '10:00',
    duration: 45,
    type: 'Product demo',
    status: 'confirmed',
    title: 'Product demo — James O\'Brien / LeadEngine',
  },
  {
    id: 'm3',
    lead: MOCK_LEADS[2],
    date: '2026-05-23',
    time: '16:00',
    duration: 30,
    type: 'Discovery call',
    status: 'pending',
    title: 'Discovery call — Priya Sharma / LeadEngine',
  },
  {
    id: 'm4',
    lead: MOCK_LEADS[5],
    date: '2026-05-26',
    time: '11:00',
    duration: 15,
    type: 'Follow-up',
    status: 'confirmed',
    title: 'Follow-up — David Park / LeadEngine',
  },
]

export const ANALYTICS_DATA = {
  kpis: {
    leadsFound: 347,
    emailsSent: 89,
    replyRate: 18.2,
    meetingsBooked: 11,
  },
  leadsOverTime: [
    { date: 'Apr 19', leads: 8 },
    { date: 'Apr 22', leads: 12 },
    { date: 'Apr 25', leads: 15 },
    { date: 'Apr 28', leads: 9 },
    { date: 'May 1', leads: 18 },
    { date: 'May 4', leads: 22 },
    { date: 'May 7', leads: 14 },
    { date: 'May 10', leads: 25 },
    { date: 'May 13', leads: 19 },
    { date: 'May 16', leads: 28 },
    { date: 'May 19', leads: 31 },
  ],
  repliesByType: [
    { type: 'Cold intro', replies: 12 },
    { type: 'Follow-up', replies: 8 },
    { type: 'Meeting request', replies: 5 },
  ],
}

export function getAvatarColor(name: string): string {
  const colors = [
    'bg-indigo-500',
    'bg-emerald-500',
    'bg-amber-500',
    'bg-rose-500',
    'bg-cyan-500',
    'bg-violet-500',
  ]
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash)
  }
  return colors[Math.abs(hash) % colors.length]
}

export function getScoreColor(score: number): string {
  if (score >= 80) return 'text-emerald-500'
  if (score >= 50) return 'text-amber-500'
  return 'text-red-500'
}

export function getScoreBgColor(score: number): string {
  if (score >= 80) return 'bg-emerald-500/10 border-emerald-500/20'
  if (score >= 50) return 'bg-amber-500/10 border-amber-500/20'
  return 'bg-red-500/10 border-red-500/20'
}
