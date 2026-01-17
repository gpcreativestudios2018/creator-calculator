export interface CaseStudy {
  id: string
  name: string
  avatar: string
  niche: string
  platforms: string[]
  monthlyRevenue: number
  followers: Record<string, number>
  journey: string
  timeline: string
  revenueBreakdown: {
    source: string
    amount: number
    percentage: number
  }[]
  keyStrategies: string[]
  milestones: {
    period: string
    achievement: string
  }[]
  advice: string
  lessonLearned: string
}

export const caseStudies: CaseStudy[] = [
  {
    id: 'sarah-finance',
    name: 'Sarah Chen',
    avatar: '👩‍💼',
    niche: 'Personal Finance',
    platforms: ['youtube', 'newsletter', 'courses'],
    monthlyRevenue: 28500,
    followers: {
      youtube: 185000,
      newsletter: 45000,
    },
    journey: 'Sarah started making YouTube videos about paying off her $80K student debt while working as an accountant. Her spreadsheet tutorials went viral, and she eventually quit her job to create full-time.',
    timeline: '3 years to $25K/month',
    revenueBreakdown: [
      { source: 'YouTube AdSense', amount: 8500, percentage: 30 },
      { source: 'Course Sales', amount: 12000, percentage: 42 },
      { source: 'Sponsorships', amount: 5000, percentage: 18 },
      { source: 'Newsletter Ads', amount: 3000, percentage: 10 },
    ],
    keyStrategies: [
      'Created a flagship course ($497) that sells on autopilot',
      'Negotiates sponsorships at $50 CPM due to high-value finance audience',
      'Repurposes YouTube content into newsletter and social clips',
      'Built email list from day one — owns her audience',
    ],
    milestones: [
      { period: 'Month 6', achievement: 'First $1,000 month (AdSense only)' },
      { period: 'Year 1', achievement: '50K subscribers, quit day job' },
      { period: 'Year 2', achievement: 'Launched course, hit $15K/month' },
      { period: 'Year 3', achievement: 'Scaled to $25K+ with team of 2' },
    ],
    advice: 'Don\'t wait until you\'re "big enough" to monetize. I started my email list with 100 subscribers and my first course with 5,000 YouTube subs. Start building revenue streams early.',
    lessonLearned: 'Your expertise is valuable even if you\'re not a certified expert. I\'m not a CFP, but my real experience paying off debt resonated more than generic advice.',
  },
  {
    id: 'marcus-gaming',
    name: 'Marcus "Pixel" Rodriguez',
    avatar: '🎮',
    niche: 'Gaming & Streaming',
    platforms: ['twitch', 'youtube', 'tiktok'],
    monthlyRevenue: 12000,
    followers: {
      twitch: 8500,
      youtube: 95000,
      tiktok: 320000,
    },
    journey: 'Marcus started streaming on Twitch while in college, barely getting 5 viewers for months. He pivoted to making TikTok clips of funny gaming moments, which drove massive growth across all platforms.',
    timeline: '2 years to $10K/month',
    revenueBreakdown: [
      { source: 'Twitch Subs & Bits', amount: 4200, percentage: 35 },
      { source: 'YouTube AdSense', amount: 2800, percentage: 23 },
      { source: 'Sponsorships', amount: 3500, percentage: 29 },
      { source: 'Donations & Tips', amount: 1500, percentage: 13 },
    ],
    keyStrategies: [
      'Uses TikTok as a "top of funnel" to drive Twitch viewers',
      'Streams on a consistent schedule (5 days/week, same times)',
      'Built a Discord community that notifies members when live',
      'Partnered with gaming peripheral brands for long-term deals',
    ],
    milestones: [
      { period: 'Month 8', achievement: 'Twitch Affiliate (50 followers, 3 avg viewers)' },
      { period: 'Year 1', achievement: 'First viral TikTok (2M views), gained 50K followers' },
      { period: 'Month 18', achievement: 'Twitch Partner, 100 avg concurrent viewers' },
      { period: 'Year 2', achievement: 'Signed first $5K brand deal' },
    ],
    advice: 'Don\'t just stream into the void. Clip your best moments and post everywhere. My TikTok growth is what made my Twitch career possible.',
    lessonLearned: 'Consistency beats virality. I\'ve had videos get millions of views but my income comes from the 200 people who show up every stream.',
  },
  {
    id: 'elena-lifestyle',
    name: 'Elena Okonkwo',
    avatar: '✨',
    niche: 'Lifestyle & Wellness',
    platforms: ['instagram', 'tiktok', 'patreon'],
    monthlyRevenue: 18000,
    followers: {
      instagram: 280000,
      tiktok: 450000,
      patreon: 850,
    },
    journey: 'Elena started sharing her morning routine and self-care tips during the pandemic. Her authentic approach to wellness (no toxic positivity) built a deeply engaged community willing to pay for exclusive content.',
    timeline: '2.5 years to $18K/month',
    revenueBreakdown: [
      { source: 'Brand Partnerships', amount: 10000, percentage: 56 },
      { source: 'Patreon', amount: 4500, percentage: 25 },
      { source: 'Affiliate Marketing', amount: 2500, percentage: 14 },
      { source: 'Digital Products', amount: 1000, percentage: 5 },
    ],
    keyStrategies: [
      'Only partners with brands she genuinely uses (high trust = high conversion)',
      'Patreon offers genuine value: monthly wellness challenges, live Q&As',
      'Negotiates usage rights separately — brands pay extra to use her content in ads',
      'Created a "favorites" Amazon storefront with consistent affiliate income',
    ],
    milestones: [
      { period: 'Month 4', achievement: 'First brand deal ($500 for Instagram post)' },
      { period: 'Year 1', achievement: '100K Instagram followers, launched Patreon' },
      { period: 'Month 18', achievement: 'First $10K month from single brand campaign' },
      { period: 'Year 2.5', achievement: 'Hired manager, consistent $15K+ months' },
    ],
    advice: 'Your engagement rate is more valuable than your follower count. I\'ve seen creators with 50K followers out-earn those with 500K because brands pay for results, not vanity metrics.',
    lessonLearned: 'Don\'t undercharge. I left thousands on the table my first year because I didn\'t know my worth. Now I always counter-offer and ask for the budget first.',
  },
  {
    id: 'james-b2b',
    name: 'James Whitmore',
    avatar: '💼',
    niche: 'B2B & Marketing',
    platforms: ['linkedin', 'newsletter', 'podcast'],
    monthlyRevenue: 42000,
    followers: {
      linkedin: 75000,
      newsletter: 32000,
    },
    journey: 'James was a marketing director who started posting LinkedIn tips during his commute. His "no-fluff" approach to B2B marketing attracted a professional audience that converts incredibly well.',
    timeline: '2 years to $40K/month',
    revenueBreakdown: [
      { source: 'Consulting', amount: 20000, percentage: 48 },
      { source: 'Course & Workshop', amount: 12000, percentage: 29 },
      { source: 'Newsletter Sponsorships', amount: 8000, percentage: 19 },
      { source: 'Affiliate Commissions', amount: 2000, percentage: 4 },
    ],
    keyStrategies: [
      'LinkedIn content drives leads to $5K/month consulting retainers',
      'Hosts a cohort-based course twice per year at $2,000/seat',
      'Newsletter sponsors pay $400 CPM for his B2B audience',
      'Podcast guests often become consulting clients',
    ],
    milestones: [
      { period: 'Month 3', achievement: 'First viral post (500K impressions)' },
      { period: 'Month 6', achievement: 'First consulting client from LinkedIn DM' },
      { period: 'Year 1', achievement: '25K followers, $8K/month from consulting' },
      { period: 'Year 2', achievement: 'Launched course, quit corporate job' },
    ],
    advice: 'LinkedIn is underrated for monetization. The audience is smaller but they have budgets. One B2B client is worth 1,000 consumer followers.',
    lessonLearned: 'Content is a lead generation machine. I don\'t need millions of followers — I need the right 100 people to see my posts and reach out.',
  },
  {
    id: 'maya-creative',
    name: 'Maya Torres',
    avatar: '🎨',
    niche: 'Art & Design',
    platforms: ['youtube', 'patreon', 'gumroad', 'etsy'],
    monthlyRevenue: 8500,
    followers: {
      youtube: 45000,
      patreon: 380,
      instagram: 62000,
    },
    journey: 'Maya shares digital illustration tutorials and her creative process. She built a sustainable income through multiple small revenue streams rather than relying on one platform.',
    timeline: '2 years to $8K/month',
    revenueBreakdown: [
      { source: 'Patreon', amount: 2800, percentage: 33 },
      { source: 'Gumroad (Brushes, Templates)', amount: 2200, percentage: 26 },
      { source: 'YouTube AdSense', amount: 1800, percentage: 21 },
      { source: 'Etsy Prints', amount: 1000, percentage: 12 },
      { source: 'Commissions', amount: 700, percentage: 8 },
    ],
    keyStrategies: [
      'Created Procreate brush packs that sell passively on Gumroad',
      'Patreon offers PSD files, tutorials, and monthly art challenges',
      'Tutorial videos rank well in search — evergreen traffic',
      'Limits commissions to preserve time for scalable products',
    ],
    milestones: [
      { period: 'Month 6', achievement: 'First $500 month (Patreon + Gumroad)' },
      { period: 'Year 1', achievement: 'Hit 20K YouTube subs, $3K/month total' },
      { period: 'Month 18', achievement: 'Brush pack hit $10K lifetime sales' },
      { period: 'Year 2', achievement: 'Reduced client work, scaled products' },
    ],
    advice: 'Digital products changed everything. I used to trade hours for dollars with commissions. Now I make money while I sleep from brush packs I created once.',
    lessonLearned: 'You don\'t need huge numbers. 380 Patreon supporters at an average of $7.50 is $2,850/month. Focus on superfans, not follower counts.',
  },
  {
    id: 'alex-tech',
    name: 'Alex Kim',
    avatar: '💻',
    niche: 'Tech & Programming',
    platforms: ['youtube', 'twitter', 'courses'],
    monthlyRevenue: 22000,
    followers: {
      youtube: 120000,
      twitter: 85000,
    },
    journey: 'Alex started making coding tutorials while learning to code themselves. Their "learn in public" approach built trust, and they now run one of the most successful indie coding education businesses.',
    timeline: '3 years to $20K/month',
    revenueBreakdown: [
      { source: 'Course Sales', amount: 14000, percentage: 64 },
      { source: 'YouTube AdSense', amount: 4500, percentage: 20 },
      { source: 'Sponsorships', amount: 2500, percentage: 11 },
      { source: 'Affiliate (Dev Tools)', amount: 1000, percentage: 5 },
    ],
    keyStrategies: [
      'Free YouTube tutorials funnel to paid comprehensive courses',
      'Builds courses based on comment questions and requests',
      'Partners only with dev tools they actually use daily',
      'Twitter threads drive traffic to YouTube videos',
    ],
    milestones: [
      { period: 'Month 6', achievement: 'First 1K subscribers from viral tutorial' },
      { period: 'Year 1', achievement: 'Monetized YouTube, $2K/month AdSense' },
      { period: 'Month 18', achievement: 'Launched first course, $15K launch week' },
      { period: 'Year 3', achievement: 'Course library generates $14K/month' },
    ],
    advice: 'Teach what you just learned. I made my best tutorial about React hooks the week after I finally understood them. The "expert" curse is real — beginners often teach beginners better.',
    lessonLearned: 'High-ticket courses ($200+) are easier to sell than cheap ones. 70 sales at $200 beats 700 sales at $20, and you attract more serious students.',
  },
]
