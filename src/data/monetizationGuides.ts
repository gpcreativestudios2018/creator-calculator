export interface MonetizationGuide {
  platformId: string
  title: string
  overview: string
  requirements: string[]
  revenueStreams: {
    name: string
    description: string
    potential: 'low' | 'medium' | 'high'
  }[]
  tips: string[]
  mistakes: string[]
  resources: {
    title: string
    url: string
  }[]
}

export const monetizationGuides: MonetizationGuide[] = [
  {
    platformId: 'youtube',
    title: 'How to Monetize on YouTube',
    overview: 'YouTube offers multiple revenue streams for creators, from ad revenue to memberships. The key is reaching Partner Program thresholds and diversifying income.',
    requirements: [
      '1,000 subscribers minimum',
      '4,000 watch hours in past 12 months (or 10M Shorts views in 90 days)',
      'Follow YouTube monetization policies',
      'Live in an eligible country',
      'Have an AdSense account'
    ],
    revenueStreams: [
      { name: 'Ad Revenue', description: 'Earn 55% of ad revenue shown on your videos. RPM varies by niche ($2-$30+).', potential: 'high' },
      { name: 'Channel Memberships', description: 'Monthly subscriptions ($0.99-$99) for exclusive perks. You keep 70%.', potential: 'high' },
      { name: 'Super Chat & Super Thanks', description: 'Viewers pay to highlight messages in live chat or thank you on videos.', potential: 'medium' },
      { name: 'YouTube Shopping', description: 'Sell merch or tag products directly in videos.', potential: 'medium' },
      { name: 'Sponsorships', description: 'Brand deals typically pay $10-50 per 1,000 views for dedicated content.', potential: 'high' }
    ],
    tips: [
      'Focus on watch time over views — longer videos with high retention earn more',
      'Post consistently (2-3x per week) to build momentum with the algorithm',
      'Use end screens and cards to increase session duration',
      'High-CPM niches: finance, tech, business, health, real estate',
      'Diversify early — don\'t rely solely on AdSense'
    ],
    mistakes: [
      'Ignoring YouTube Shorts — they now count toward monetization',
      'Not enabling all monetization features once approved',
      'Clickbait that hurts retention and damages your channel long-term',
      'Inconsistent posting schedule confuses the algorithm'
    ],
    resources: [
      { title: 'YouTube Creator Academy', url: 'https://creatoracademy.youtube.com' },
      { title: 'YouTube Partner Program Overview', url: 'https://support.google.com/youtube/answer/72851' }
    ]
  },
  {
    platformId: 'tiktok',
    title: 'How to Monetize on TikTok',
    overview: 'TikTok\'s Creativity Program replaced the Creator Fund with better payouts. Brand deals remain the biggest earner for most creators.',
    requirements: [
      '10,000 followers minimum',
      '100,000 video views in last 30 days',
      'Be 18+ years old',
      'Post original content over 1 minute',
      'Based in eligible country'
    ],
    revenueStreams: [
      { name: 'Creativity Program', description: 'Earn $0.50-$1+ per 1,000 qualified views on videos over 1 minute.', potential: 'medium' },
      { name: 'Brand Partnerships', description: 'Sponsored posts pay $200-$20,000+ depending on following and engagement.', potential: 'high' },
      { name: 'TikTok Shop', description: 'Sell products directly through videos and earn affiliate commissions.', potential: 'high' },
      { name: 'LIVE Gifts', description: 'Viewers send virtual gifts during livestreams that convert to real money.', potential: 'medium' },
      { name: 'Creator Marketplace', description: 'Official platform connecting brands with creators for paid campaigns.', potential: 'high' }
    ],
    tips: [
      'Post 1-3 times daily — TikTok rewards consistency heavily',
      'Videos over 1 minute qualify for the Creativity Program\'s higher RPM',
      'Engage in comments within the first hour of posting',
      'Use trending sounds but add your unique spin',
      'Build an email list — you don\'t own your TikTok audience'
    ],
    mistakes: [
      'Relying on the old Creator Fund (it\'s been replaced)',
      'Making videos under 1 minute (misses Creativity Program)',
      'Ignoring TikTok Shop — it\'s a massive opportunity',
      'Not cross-posting to YouTube Shorts and Instagram Reels'
    ],
    resources: [
      { title: 'TikTok Creator Portal', url: 'https://www.tiktok.com/creators' },
      { title: 'Creativity Program Beta', url: 'https://www.tiktok.com/creators/creator-portal/en-us/getting-paid-to-create/creativity-program-beta/' }
    ]
  },
  {
    platformId: 'instagram',
    title: 'How to Monetize on Instagram',
    overview: 'Instagram monetization focuses on brand partnerships and shopping features. Building an engaged audience matters more than follower count.',
    requirements: [
      'Professional or Creator account required',
      '10,000+ followers for most features',
      'Follow Instagram Partner Monetization Policies',
      'Be 18+ years old',
      'Consistent posting history'
    ],
    revenueStreams: [
      { name: 'Brand Partnerships', description: 'Sponsored posts typically pay $10-$100 per 1,000 followers with good engagement.', potential: 'high' },
      { name: 'Instagram Subscriptions', description: 'Monthly fan subscriptions for exclusive content. Keep 70% of revenue.', potential: 'medium' },
      { name: 'Badges in Live', description: 'Viewers can buy badges during live videos to support you.', potential: 'low' },
      { name: 'Instagram Shopping', description: 'Tag and sell products directly in posts and stories.', potential: 'high' },
      { name: 'Affiliate Marketing', description: 'Earn commissions promoting products with trackable links.', potential: 'medium' }
    ],
    tips: [
      'Engagement rate matters more than follower count for brand deals',
      'Reels get 2-3x more reach than static posts — prioritize video',
      'Use Stories daily to stay top of mind with followers',
      'Build a media kit showcasing your demographics and past collaborations',
      'Niche down — brands pay premium for targeted audiences'
    ],
    mistakes: [
      'Buying followers — brands check engagement rates',
      'Ignoring Reels in favor of static posts only',
      'Not disclosing sponsored content (FTC requires #ad)',
      'Posting without a content strategy or theme'
    ],
    resources: [
      { title: 'Instagram for Creators', url: 'https://creators.instagram.com' },
      { title: 'Instagram Monetization Policies', url: 'https://help.instagram.com/2635536099905516' }
    ]
  },
  {
    platformId: 'twitter',
    title: 'How to Monetize on X (Twitter)',
    overview: 'X offers ad revenue sharing for premium subscribers and various creator features. Building authority and engagement is key.',
    requirements: [
      'X Premium subscription required ($8/month)',
      '500+ followers',
      '5 million impressions in last 3 months',
      'Account in good standing',
      'Complete profile with verified identity'
    ],
    revenueStreams: [
      { name: 'Ads Revenue Sharing', description: 'Earn from ads shown in replies to your posts. Payouts vary widely.', potential: 'medium' },
      { name: 'Subscriptions', description: 'Offer monthly subscriptions for exclusive content and badges.', potential: 'medium' },
      { name: 'Tips', description: 'Receive one-time tips from followers via various payment methods.', potential: 'low' },
      { name: 'Sponsored Posts', description: 'Brands pay for promotional tweets, especially in B2B niches.', potential: 'high' },
      { name: 'Super Follows', description: 'Subscribers pay for exclusive tweets and content.', potential: 'low' }
    ],
    tips: [
      'Controversial takes drive impressions but build engaged threads for ad revenue',
      'Quote tweets and replies generate impressions that count toward earnings',
      'X Premium is required — the $8/month pays for itself quickly',
      'Build authority in a niche (tech, finance, marketing work well)',
      'Long-form posts (threads) perform better than single tweets'
    ],
    mistakes: [
      'Not subscribing to X Premium (required for monetization)',
      'Posting without encouraging replies (that\'s where ads show)',
      'Ignoring X Spaces for live audio engagement',
      'Being too promotional without providing value'
    ],
    resources: [
      { title: 'X Creator Hub', url: 'https://help.twitter.com/en/using-x/creator-hub' },
      { title: 'X Premium Features', url: 'https://help.twitter.com/en/using-x/x-premium' }
    ]
  },
  {
    platformId: 'facebook',
    title: 'How to Monetize on Facebook',
    overview: 'Facebook offers strong monetization for video creators, especially through in-stream ads and Reels. Pages with engaged communities thrive.',
    requirements: [
      '10,000 page followers',
      '600,000 total minutes viewed in last 60 days',
      'At least 5 active videos',
      'Videos must be 3+ minutes for in-stream ads',
      'Follow Facebook monetization standards'
    ],
    revenueStreams: [
      { name: 'In-Stream Ads', description: 'Ads play during your videos. You earn 55% of ad revenue.', potential: 'high' },
      { name: 'Facebook Reels', description: 'Bonus programs pay for Reels performance (invite-only).', potential: 'medium' },
      { name: 'Fan Subscriptions', description: 'Monthly subscriptions for exclusive content and badges.', potential: 'medium' },
      { name: 'Stars', description: 'Viewers send stars during live videos worth $0.01 each.', potential: 'low' },
      { name: 'Branded Content', description: 'Partner with brands for sponsored posts and videos.', potential: 'high' }
    ],
    tips: [
      'Videos need to be 3+ minutes for in-stream ad eligibility',
      'Upload native video — shared YouTube links don\'t monetize',
      'Facebook Groups can drive massive engaged traffic to your page',
      'Go live regularly — Facebook prioritizes live content',
      'Repurpose YouTube content but optimize titles for Facebook'
    ],
    mistakes: [
      'Sharing YouTube links instead of uploading native video',
      'Videos under 3 minutes (can\'t run in-stream ads)',
      'Ignoring Facebook Groups as a traffic source',
      'Not enabling all monetization features in Creator Studio'
    ],
    resources: [
      { title: 'Facebook for Creators', url: 'https://www.facebook.com/creators' },
      { title: 'Meta Business Help Center', url: 'https://www.facebook.com/business/help' }
    ]
  },
  {
    platformId: 'linkedin',
    title: 'How to Monetize on LinkedIn',
    overview: 'LinkedIn is the top platform for B2B creators. While direct monetization is limited, it excels at generating leads and establishing authority.',
    requirements: [
      'Creator Mode enabled on profile',
      '150+ connections/followers',
      'Professional profile with clear expertise',
      'Consistent posting history',
      'No direct monetization thresholds'
    ],
    revenueStreams: [
      { name: 'Newsletter Sponsorships', description: 'LinkedIn newsletters with large audiences can charge $500-$5,000+ per sponsor.', potential: 'high' },
      { name: 'Consulting/Services', description: 'Content establishes expertise leading to high-ticket client work.', potential: 'high' },
      { name: 'Course Sales', description: 'Promote courses, workshops, or digital products to professional audience.', potential: 'high' },
      { name: 'Speaking Gigs', description: 'LinkedIn authority leads to paid speaking opportunities.', potential: 'medium' },
      { name: 'LinkedIn Live', description: 'Build audience through live events (no direct monetization yet).', potential: 'low' }
    ],
    tips: [
      'LinkedIn rewards consistency — post daily or at least 3x per week',
      'Start a LinkedIn Newsletter (free, built-in subscriber growth)',
      'Personal stories outperform purely professional content',
      'Comment strategy: engage on big accounts in your niche',
      'The algorithm favors native content over external links'
    ],
    mistakes: [
      'Treating LinkedIn like a resume instead of a content platform',
      'Only posting job updates or company news',
      'Not using the Newsletter feature (massively underutilized)',
      'Being too formal — personality wins on LinkedIn now'
    ],
    resources: [
      { title: 'LinkedIn Creator Hub', url: 'https://www.linkedin.com/creators/' },
      { title: 'LinkedIn Newsletter Guide', url: 'https://www.linkedin.com/help/linkedin/answer/a522537' }
    ]
  },
  {
    platformId: 'twitch',
    title: 'How to Monetize on Twitch',
    overview: 'Twitch is the leading live streaming platform. Affiliate and Partner tiers unlock subscriptions, bits, and ad revenue.',
    requirements: [
      'Affiliate: 50 followers, 3 avg viewers, 7 stream days, 500 minutes',
      'Partner: 75 avg viewers, 12 unique stream days, 25 hours streamed',
      'All within 30-day period',
      '18+ years old',
      'Follow Community Guidelines'
    ],
    revenueStreams: [
      { name: 'Subscriptions', description: 'Viewers pay $4.99-$24.99/month. Affiliates get 50%, Partners negotiate up to 70%.', potential: 'high' },
      { name: 'Bits', description: 'Virtual currency viewers use to cheer. You earn $0.01 per bit.', potential: 'medium' },
      { name: 'Ads', description: 'Run ads during streams. Partners earn more per ad view.', potential: 'medium' },
      { name: 'Sponsorships', description: 'Brands sponsor streams, especially in gaming niches.', potential: 'high' },
      { name: 'Donations', description: 'Direct tips through third-party services like Streamlabs.', potential: 'medium' }
    ],
    tips: [
      'Stream consistently at the same times to build a regular audience',
      'Raid other streamers to build community and get raided back',
      'Sub goals and alerts encourage viewers to subscribe',
      'Engage with chat constantly — interaction is everything on Twitch',
      'Consider multi-streaming to YouTube/Kick (if not Twitch Partner)'
    ],
    mistakes: [
      'Streaming inconsistent hours making it hard for viewers to find you',
      'Ignoring chat while playing games',
      'Running too many ads and driving viewers away',
      'Not having alerts/overlays set up for engagement'
    ],
    resources: [
      { title: 'Twitch Creator Camp', url: 'https://www.twitch.tv/creatorcamp' },
      { title: 'Twitch Affiliate Program', url: 'https://affiliate.twitch.tv' }
    ]
  },
  {
    platformId: 'kick',
    title: 'How to Monetize on Kick',
    overview: 'Kick offers the highest creator revenue share (95%) and no exclusivity requirements. It\'s growing fast as a Twitch alternative.',
    requirements: [
      '75 followers minimum',
      '5 average concurrent viewers',
      'Stream for 5+ hours',
      'No exclusivity required',
      'Follow community guidelines'
    ],
    revenueStreams: [
      { name: 'Subscriptions', description: 'Keep 95% of subscription revenue (vs 50% on Twitch). Huge advantage.', potential: 'high' },
      { name: 'Kick Tips', description: 'Viewers can tip directly during streams.', potential: 'medium' },
      { name: 'Sponsorships', description: 'Brands are starting to sponsor Kick streamers as platform grows.', potential: 'medium' },
      { name: 'Creator Incentives', description: 'Kick has offered guaranteed contracts to attract creators.', potential: 'high' }
    ],
    tips: [
      '95% revenue share is the main draw — significantly better than Twitch',
      'No exclusivity means you can stream on Twitch AND Kick',
      'Early adopters are building audiences while competition is lower',
      'Cross-promote from other platforms to build Kick following',
      'The platform is growing — get established now'
    ],
    mistakes: [
      'Ignoring Kick because Twitch is "where everyone is"',
      'Not taking advantage of the 95% revenue share',
      'Failing to promote your Kick channel on other platforms',
      'Waiting too long to establish presence'
    ],
    resources: [
      { title: 'Kick Creator Dashboard', url: 'https://kick.com/dashboard' },
      { title: 'Kick Help Center', url: 'https://help.kick.com' }
    ]
  },
  {
    platformId: 'patreon',
    title: 'How to Monetize on Patreon',
    overview: 'Patreon is the leading membership platform for creators. Offer exclusive content tiers to your most dedicated fans.',
    requirements: [
      'No minimum follower count',
      'Create account and set up tiers',
      'Have existing audience on other platforms',
      'Consistent content delivery',
      'Be 18+ years old'
    ],
    revenueStreams: [
      { name: 'Monthly Memberships', description: 'Tiered subscriptions from $1-$100+. Keep 92-95% depending on plan.', potential: 'high' },
      { name: 'Per-Creation Billing', description: 'Charge patrons per piece of content instead of monthly.', potential: 'medium' },
      { name: 'Merch Integration', description: 'Sell merchandise through Patreon\'s merch partnerships.', potential: 'medium' }
    ],
    tips: [
      'Offer 3-5 tiers with clear value differentiation',
      'The $5-10 tier typically converts best — make it compelling',
      'Behind-the-scenes content is highly valued by fans',
      'Post consistently or patrons will churn',
      'Promote Patreon at the end of every piece of content'
    ],
    mistakes: [
      'Too many tiers with confusing benefits',
      'Not promoting Patreon enough on main platforms',
      'Promising more than you can deliver consistently',
      'Setting the lowest tier too cheap ($1 attracts uncommitted fans)'
    ],
    resources: [
      { title: 'Patreon Creator Hub', url: 'https://www.patreon.com/c/creator-hub' },
      { title: 'Patreon Help Center', url: 'https://support.patreon.com' }
    ]
  },
  {
    platformId: 'kofi',
    title: 'How to Monetize on Ko-fi',
    overview: 'Ko-fi is a creator-friendly platform with zero fees on donations. Great for artists, writers, and smaller creators.',
    requirements: [
      'No minimum requirements',
      'Free to start',
      'Ko-fi Gold ($6/month) unlocks extra features',
      'Any creator can receive tips immediately',
      'PayPal or Stripe account needed'
    ],
    revenueStreams: [
      { name: 'One-Time Donations', description: 'Fans "buy you a coffee" — you keep 100% with free tier (0% platform fee).', potential: 'medium' },
      { name: 'Memberships', description: 'Monthly subscriptions for exclusive content (Ko-fi Gold required).', potential: 'medium' },
      { name: 'Shop', description: 'Sell digital downloads, art, commissions directly.', potential: 'medium' },
      { name: 'Commissions', description: 'Accept and manage paid commission requests.', potential: 'medium' }
    ],
    tips: [
      'Ko-fi takes 0% on donations (only payment processor fees)',
      'Great for artists and writers who want simple monetization',
      'Embed Ko-fi button on your website and social profiles',
      'Ko-fi Gold is worth it if you want memberships',
      'Stack with other platforms — Ko-fi is supplementary income'
    ],
    mistakes: [
      'Not promoting your Ko-fi link consistently',
      'Only using donations without exploring memberships/shop',
      'Forgetting to set up a thank you message for supporters',
      'Not offering any exclusive content for supporters'
    ],
    resources: [
      { title: 'Ko-fi Creator Guide', url: 'https://help.ko-fi.com' },
      { title: 'Ko-fi Gold Features', url: 'https://ko-fi.com/gold' }
    ]
  },
  {
    platformId: 'substack',
    title: 'How to Monetize on Substack',
    overview: 'Substack is the top platform for paid newsletters. Writers can build substantial income from email subscriptions.',
    requirements: [
      'No minimum subscriber count',
      'Start publishing immediately',
      'Paid subscriptions available instantly',
      'Substack takes 10% of paid subscription revenue',
      'Stripe handles payments'
    ],
    revenueStreams: [
      { name: 'Paid Subscriptions', description: 'Readers pay monthly/yearly for premium posts. You keep 90%.', potential: 'high' },
      { name: 'Founding Members', description: 'Supporters pay extra ($100+/year) to fund your work.', potential: 'medium' },
      { name: 'Sponsorships', description: 'Newsletters with large audiences can sell sponsorships.', potential: 'high' }
    ],
    tips: [
      'Free posts grow your list, paid posts convert readers to subscribers',
      'Aim for 5-10% free-to-paid conversion rate',
      '$5-10/month is the sweet spot for most newsletters',
      'Substack\'s network effect helps discovery',
      'Cross-post to grow faster — Substack Notes, Twitter, LinkedIn'
    ],
    mistakes: [
      'Going paid too early before building an audience',
      'Putting everything behind paywall (keep some free)',
      'Inconsistent publishing schedule',
      'Not leveraging Substack Notes for growth'
    ],
    resources: [
      { title: 'Substack Writer Resources', url: 'https://substack.com/resources' },
      { title: 'Substack Growth Guide', url: 'https://on.substack.com/s/grow' }
    ]
  },
  {
    platformId: 'newsletter',
    title: 'How to Monetize a Newsletter',
    overview: 'Email newsletters offer direct audience access and multiple monetization paths. Own your audience without algorithm dependency.',
    requirements: [
      'Email service provider (ConvertKit, Beehiiv, etc.)',
      '1,000+ subscribers for sponsorship interest',
      'Consistent send schedule',
      'Clear niche and value proposition',
      'No platform gatekeeping'
    ],
    revenueStreams: [
      { name: 'Paid Subscriptions', description: 'Premium content for paying subscribers. Keep 90-97% depending on platform.', potential: 'high' },
      { name: 'Sponsorships', description: 'Brands pay $20-50+ per 1,000 subscribers for newsletter ads.', potential: 'high' },
      { name: 'Affiliate Marketing', description: 'Recommend products and earn commissions on sales.', potential: 'medium' },
      { name: 'Digital Products', description: 'Sell courses, ebooks, templates to your list.', potential: 'high' }
    ],
    tips: [
      'Beehiiv and ConvertKit are top choices for creator newsletters',
      'Sponsorships typically pay $20-50 CPM (per 1,000 subscribers)',
      'Segment your list for better targeting and conversions',
      'Welcome sequences convert subscribers into buyers',
      'You own your email list — platform-proof income'
    ],
    mistakes: [
      'Not having a clear niche or audience',
      'Sending too often or not often enough',
      'All promotion, no value in emails',
      'Not cleaning your list (hurts deliverability)'
    ],
    resources: [
      { title: 'Newsletter Operating System', url: 'https://newsletteroperatingsystem.com' },
      { title: 'Beehiiv Resources', url: 'https://www.beehiiv.com/resources' }
    ]
  },
  {
    platformId: 'podcast',
    title: 'How to Monetize a Podcast',
    overview: 'Podcasting offers multiple revenue streams from ads to premium content. Building a loyal listener base is key.',
    requirements: [
      '5,000+ downloads per episode for major ad networks',
      'Consistent publishing schedule',
      'Quality audio production',
      'Hosting platform (Spotify for Podcasters, Buzzsprout, etc.)',
      'RSS feed distribution'
    ],
    revenueStreams: [
      { name: 'Dynamic Ads', description: 'Ad networks insert ads automatically. Pay $15-50 CPM.', potential: 'high' },
      { name: 'Host-Read Sponsorships', description: 'Direct sponsor deals pay $25-100+ CPM for engaged audiences.', potential: 'high' },
      { name: 'Premium Subscriptions', description: 'Offer ad-free or bonus episodes through Apple/Spotify.', potential: 'medium' },
      { name: 'Listener Support', description: 'Patreon/Ko-fi for direct fan funding.', potential: 'medium' },
      { name: 'Affiliate Marketing', description: 'Promote products with trackable codes/links.', potential: 'medium' }
    ],
    tips: [
      '5,000 downloads/episode is the threshold for major sponsors',
      'Host-read ads convert better and pay more than dynamic insertion',
      'Niche podcasts command higher CPMs than general interest',
      'Repurpose clips to YouTube, TikTok, Instagram for growth',
      'Listener surveys help land sponsors by proving demographics'
    ],
    mistakes: [
      'Poor audio quality drives listeners away',
      'Inconsistent release schedule hurts growth',
      'Not promoting episodes on social media',
      'Accepting sponsors that don\'t fit your audience'
    ],
    resources: [
      { title: 'Podcast Marketing Academy', url: 'https://podcastmarketingacademy.com' },
      { title: 'Buzzsprout Resources', url: 'https://www.buzzsprout.com/blog' }
    ]
  },
  {
    platformId: 'courses',
    title: 'How to Monetize Online Courses',
    overview: 'Online courses offer high profit margins and scalable income. Package your expertise into structured learning experiences.',
    requirements: [
      'Expertise in a teachable topic',
      'Existing audience helps but not required',
      'Course hosting platform (Teachable, Kajabi, etc.)',
      'Video recording equipment',
      'No minimum follower requirements'
    ],
    revenueStreams: [
      { name: 'Course Sales', description: 'One-time purchases from $50-$2,000+. Keep 90-97% on most platforms.', potential: 'high' },
      { name: 'Memberships', description: 'Monthly access to course library and community.', potential: 'high' },
      { name: 'Coaching Upsells', description: 'Offer 1:1 or group coaching alongside courses.', potential: 'high' },
      { name: 'Certifications', description: 'Charge premium for certified completion programs.', potential: 'medium' }
    ],
    tips: [
      'Start with a mini-course ($50-100) to validate demand',
      'Pre-sell courses before building to guarantee sales',
      'Cohort-based courses create urgency and community',
      'Student success stories are your best marketing',
      'Stack courses into bundles for higher average order value'
    ],
    mistakes: [
      'Building a full course before validating demand',
      'Pricing too low (undervalues your expertise)',
      'No marketing strategy — "build it and they\'ll come" doesn\'t work',
      'Overcomplicating the course with too much content'
    ],
    resources: [
      { title: 'Teachable Blog', url: 'https://teachable.com/blog' },
      { title: 'Kajabi Resources', url: 'https://kajabi.com/resources' }
    ]
  },
  {
    platformId: 'gumroad',
    title: 'How to Monetize on Gumroad',
    overview: 'Gumroad makes selling digital products simple. From ebooks to templates to software, creators keep 90% of sales.',
    requirements: [
      'No minimum requirements',
      'Create account for free',
      'Digital product to sell',
      'Gumroad takes 10% flat fee',
      'PayPal or bank account for payouts'
    ],
    revenueStreams: [
      { name: 'Digital Products', description: 'Sell ebooks, templates, guides, presets. Keep 90%.', potential: 'high' },
      { name: 'Memberships', description: 'Recurring subscriptions for ongoing content access.', potential: 'medium' },
      { name: 'Software/Tools', description: 'Sell software, plugins, apps, code.', potential: 'high' }
    ],
    tips: [
      '10% flat fee is competitive — no monthly costs',
      'Offer "pay what you want" with a minimum to increase sales',
      'Bundle products for higher average order value',
      'Gumroad handles all payment processing, delivery, and taxes',
      'Build an email list from customers for future launches'
    ],
    mistakes: [
      'Poor product descriptions and previews',
      'Not collecting emails from customers',
      'Pricing too low (race to the bottom)',
      'No social proof (reviews, testimonials)'
    ],
    resources: [
      { title: 'Gumroad Creator Blog', url: 'https://gumroad.com/blog' },
      { title: 'Gumroad University', url: 'https://gumroad.com/university' }
    ]
  },
  {
    platformId: 'etsy',
    title: 'How to Monetize on Etsy',
    overview: 'Etsy is the marketplace for handmade, vintage, and digital products. Built-in traffic makes it easier to get discovered.',
    requirements: [
      'Etsy seller account',
      'Products that fit Etsy\'s categories',
      '$0.20 listing fee per item',
      '6.5% transaction fee + payment processing',
      'Follow Etsy seller policies'
    ],
    revenueStreams: [
      { name: 'Physical Products', description: 'Sell handmade or vintage items to Etsy\'s massive buyer base.', potential: 'high' },
      { name: 'Digital Downloads', description: 'Printables, templates, art — no shipping, infinite inventory.', potential: 'high' },
      { name: 'Print on Demand', description: 'Sell custom products without holding inventory.', potential: 'medium' }
    ],
    tips: [
      'Digital products have the best margins (no shipping/materials)',
      'SEO matters hugely — optimize titles, tags, descriptions',
      'Etsy ads can boost visibility for new shops',
      'Reviews are everything — deliver great experiences',
      'Niche down: specific products rank better than general stores'
    ],
    mistakes: [
      'Generic products in oversaturated categories',
      'Poor product photos (Etsy is visual-first)',
      'Not optimizing for Etsy search',
      'Ignoring customer service (hurts reviews)'
    ],
    resources: [
      { title: 'Etsy Seller Handbook', url: 'https://www.etsy.com/seller-handbook' },
      { title: 'Etsy Success Newsletter', url: 'https://community.etsy.com' }
    ]
  },
  {
    platformId: 'amazon',
    title: 'How to Monetize with Amazon Influencer Program',
    overview: 'Amazon\'s Influencer Program lets you earn commissions by recommending products through your own storefront.',
    requirements: [
      'Active social media presence (YouTube, Instagram, TikTok, or Facebook)',
      'Engaged following (no specific number, but quality matters)',
      'Apply and get approved',
      'Create shoppable content',
      'Follow Amazon\'s operating agreement'
    ],
    revenueStreams: [
      { name: 'Storefront Commissions', description: 'Earn 1-10% on products purchased through your storefront.', potential: 'medium' },
      { name: 'Shoppable Videos', description: 'Upload product review videos that appear on Amazon product pages.', potential: 'high' },
      { name: 'Live Shopping', description: 'Host Amazon Live streams showcasing products.', potential: 'medium' }
    ],
    tips: [
      'Shoppable videos on product pages can earn passively',
      'Higher commission categories: luxury beauty (10%), furniture (8%)',
      'Create "roundup" lists for higher conversion',
      'Amazon Live streams get featured and drive sales',
      'Promote your storefront URL on all social platforms'
    ],
    mistakes: [
      'Only promoting low-commission items',
      'Not utilizing shoppable video feature',
      'Ignoring Amazon Live opportunities',
      'Not organizing storefront into clear categories'
    ],
    resources: [
      { title: 'Amazon Influencer Program', url: 'https://affiliate-program.amazon.com/influencers' },
      { title: 'Amazon Associates Help', url: 'https://affiliate-program.amazon.com/help' }
    ]
  },
  {
    platformId: 'snapchat',
    title: 'How to Monetize on Snapchat',
    overview: 'Snapchat\'s Spotlight feature pays creators for viral short-form videos. Strong Gen Z audience.',
    requirements: [
      '1,000+ followers for Spotlight rewards',
      'Be 16+ years old',
      'Public profile',
      'Original content only',
      'Follow Community Guidelines'
    ],
    revenueStreams: [
      { name: 'Spotlight Rewards', description: 'Get paid based on video performance in Spotlight.', potential: 'medium' },
      { name: 'Story Ads Revenue', description: 'Monetize your public Stories with ads.', potential: 'low' },
      { name: 'Gifting', description: 'Receive gifts from viewers during content.', potential: 'low' },
      { name: 'Sponsorships', description: 'Brands targeting Gen Z pay for Snapchat content.', potential: 'medium' }
    ],
    tips: [
      'Spotlight rewards top-performing videos — go for viral',
      'Snapchat\'s Gen Z audience is valuable for certain brands',
      'Cross-post TikTok content optimized for Snapchat',
      'Vertical, fast-paced content performs best',
      'Build streaks with followers for engagement'
    ],
    mistakes: [
      'Reposting content with watermarks (gets suppressed)',
      'Ignoring Spotlight in favor of just Stories',
      'Not optimizing for Snapchat\'s younger demographic',
      'Inconsistent posting'
    ],
    resources: [
      { title: 'Snapchat for Creators', url: 'https://creators.snap.com' },
      { title: 'Spotlight Guidelines', url: 'https://support.snapchat.com/en-US/article/spotlight-guidelines' }
    ]
  },
  {
    platformId: 'pinterest',
    title: 'How to Monetize on Pinterest',
    overview: 'Pinterest drives massive referral traffic and works especially well for bloggers, product sellers, and visual content creators.',
    requirements: [
      'Business or Creator account',
      '1,000+ followers for some features',
      'Original content that follows guidelines',
      'Consistent pinning schedule',
      'US-based for some monetization features'
    ],
    revenueStreams: [
      { name: 'Affiliate Marketing', description: 'Pin products with affiliate links. Pinterest users have high purchase intent.', potential: 'high' },
      { name: 'Traffic to Blog/Shop', description: 'Drive traffic to monetized blog or e-commerce store.', potential: 'high' },
      { name: 'Idea Pins', description: 'Create engaging multi-page pins (limited direct monetization).', potential: 'low' },
      { name: 'Brand Partnerships', description: 'Brands pay for Pinterest-specific content creation.', potential: 'medium' }
    ],
    tips: [
      'Pinterest is a search engine — optimize for keywords',
      'Users come to Pinterest with purchase intent (great for affiliates)',
      'Pin consistently (10-25 pins per day using scheduler)',
      'Idea Pins get more reach but no clickable links',
      'Rich pins (product, recipe, article) perform better'
    ],
    mistakes: [
      'Treating Pinterest like other social media (it\'s a search engine)',
      'Not using keywords in pin titles and descriptions',
      'Pinning inconsistently',
      'Ignoring Pinterest Analytics to optimize'
    ],
    resources: [
      { title: 'Pinterest Business', url: 'https://business.pinterest.com' },
      { title: 'Pinterest Creator Hub', url: 'https://creators.pinterest.com' }
    ]
  },
  {
    platformId: 'onlyfans',
    title: 'How to Monetize on OnlyFans',
    overview: 'OnlyFans is a subscription platform where creators offer exclusive content directly to paying fans.',
    requirements: [
      'Be 18+ years old',
      'Government ID verification required',
      'Bank account for payouts',
      'Follow Terms of Service',
      'No minimum follower requirement'
    ],
    revenueStreams: [
      { name: 'Monthly Subscriptions', description: 'Fans pay monthly ($4.99-$49.99). You keep 80%.', potential: 'high' },
      { name: 'Tips', description: 'Fans can send tips on posts or via messages.', potential: 'high' },
      { name: 'Pay-Per-View Messages', description: 'Send locked content in DMs that fans pay to unlock.', potential: 'high' },
      { name: 'Referral Bonus', description: 'Earn 5% of referred creators\' earnings for 12 months.', potential: 'low' }
    ],
    tips: [
      'Promote heavily on Twitter, Instagram, TikTok, Reddit',
      'PPV messages often earn more than subscriptions',
      'Engage with subscribers via DMs for retention',
      'Consistent posting schedule keeps subscribers active',
      'Offer subscription bundles (3, 6, 12 months) for upfront revenue'
    ],
    mistakes: [
      'Setting subscription price too high initially',
      'Not promoting on other platforms',
      'Ignoring DMs and fan engagement',
      'Posting inconsistently (causes subscriber churn)'
    ],
    resources: [
      { title: 'OnlyFans Blog', url: 'https://blog.onlyfans.com' },
      { title: 'OnlyFans Support', url: 'https://onlyfans.com/help' }
    ]
  },
  {
    platformId: 'fansly',
    title: 'How to Monetize on Fansly',
    overview: 'Fansly is an OnlyFans alternative with similar features and the same 80% revenue share for creators.',
    requirements: [
      'Be 18+ years old',
      'ID verification required',
      'Bank account or crypto wallet for payouts',
      'Follow content guidelines',
      'No minimum follower requirement'
    ],
    revenueStreams: [
      { name: 'Subscriptions', description: 'Multiple subscription tiers possible. Keep 80%.', potential: 'high' },
      { name: 'Tips', description: 'Receive tips from fans on content.', potential: 'high' },
      { name: 'Pay-Per-View', description: 'Lock premium content behind additional paywalls.', potential: 'high' },
      { name: 'Referrals', description: 'Earn from referring other creators.', potential: 'low' }
    ],
    tips: [
      'Multiple subscription tiers let fans choose their level',
      'Fansly allows more explicit marketing than OnlyFans',
      'Cross-promote between Fansly and OnlyFans',
      'Use Fansly\'s built-in promotion features',
      'Crypto payouts available for privacy'
    ],
    mistakes: [
      'Only using one platform (diversify)',
      'Not utilizing the tiered subscription feature',
      'Poor promotion strategy',
      'Inconsistent content schedule'
    ],
    resources: [
      { title: 'Fansly Support', url: 'https://fansly.com/support' },
      { title: 'Fansly FAQ', url: 'https://fansly.com/faq' }
    ]
  },
  {
    platformId: 'fanvue',
    title: 'How to Monetize on Fanvue',
    overview: 'Fanvue offers 85% revenue share (highest in category) plus AI tools to help creators manage content and fans.',
    requirements: [
      'Be 18+ years old',
      'ID verification required',
      'Payment method for receiving funds',
      'Follow community guidelines',
      'No minimum requirements'
    ],
    revenueStreams: [
      { name: 'Subscriptions', description: 'Monthly fan subscriptions. You keep 85% (industry-leading).', potential: 'high' },
      { name: 'Tips', description: 'Receive tips on posts and in messages.', potential: 'high' },
      { name: 'PPV Content', description: 'Sell individual pieces of content.', potential: 'high' },
      { name: 'AI Features', description: 'Use AI chatbot to manage fan messages (saves time).', potential: 'medium' }
    ],
    tips: [
      '85% revenue share is 5% more than OnlyFans/Fansly',
      'AI chat features help manage high message volume',
      'Growing platform means less competition',
      'Cross-promote from established platforms',
      'Multiple tiers help maximize revenue per fan'
    ],
    mistakes: [
      'Not taking advantage of the better revenue share',
      'Ignoring AI tools that save time',
      'Putting all eggs in one platform basket',
      'Not promoting your Fanvue link'
    ],
    resources: [
      { title: 'Fanvue Creator Guide', url: 'https://fanvue.com/creators' },
      { title: 'Fanvue Support', url: 'https://help.fanvue.com' }
    ]
  },
  {
    platformId: 'threads',
    title: 'How to Monetize on Threads',
    overview: 'Threads is Meta\'s Twitter competitor. No direct monetization yet, but building audience now positions you for future features.',
    requirements: [
      'Instagram account required',
      'No monetization requirements yet',
      'Follow community guidelines',
      'Build audience while platform grows',
      'Cross-post potential with Instagram'
    ],
    revenueStreams: [
      { name: 'Audience Building', description: 'No direct monetization yet — focus on growing followers.', potential: 'low' },
      { name: 'Cross-Promotion', description: 'Drive traffic to monetized platforms (Instagram, website).', potential: 'medium' },
      { name: 'Brand Deals', description: 'Some brands paying for Threads content as part of packages.', potential: 'low' }
    ],
    tips: [
      'Build audience now before monetization launches',
      'Cross-post Instagram content to Threads',
      'Engage actively — early adopters get algorithm favor',
      'Use Threads to drive traffic to monetized platforms',
      'Meta will likely add monetization (they always do)'
    ],
    mistakes: [
      'Ignoring Threads because there\'s no monetization yet',
      'Not cross-promoting with Instagram',
      'Waiting for monetization instead of building audience',
      'Treating it exactly like Twitter (it has different culture)'
    ],
    resources: [
      { title: 'Threads Help Center', url: 'https://help.instagram.com/threads' },
      { title: 'Instagram Creators', url: 'https://creators.instagram.com' }
    ]
  },
  {
    platformId: 'discord',
    title: 'How to Monetize on Discord',
    overview: 'Discord Server Subscriptions let you offer premium community access. Great for creators with engaged audiences.',
    requirements: [
      'Server with 500+ members',
      'Be 18+ years old',
      'Enable Community features',
      'Active, moderated server',
      'Apply for Server Subscriptions'
    ],
    revenueStreams: [
      { name: 'Server Subscriptions', description: 'Tiered monthly subscriptions ($2.99-$99.99). Keep 90%.', potential: 'high' },
      { name: 'Premium Roles', description: 'Sell access to exclusive channels and perks.', potential: 'medium' },
      { name: 'Community Sponsorships', description: 'Brands sponsor active Discord communities.', potential: 'medium' }
    ],
    tips: [
      'Discord keeps only 10% — great revenue share',
      'Tiered perks (channels, roles, early access) drive upgrades',
      'Active community moderation is essential',
      'Integrate with other platforms (YouTube members, Patreon)',
      'Exclusive AMAs and events justify premium tiers'
    ],
    mistakes: [
      'Launching subscriptions in inactive servers',
      'Not providing clear value for premium tiers',
      'Poor moderation killing community vibe',
      'Not promoting the server on other platforms'
    ],
    resources: [
      { title: 'Discord Server Subscriptions', url: 'https://support.discord.com/hc/en-us/articles/4415163187607' },
      { title: 'Discord Creator Portal', url: 'https://discord.com/creators' }
    ]
  },
  {
    platformId: 'rumble',
    title: 'How to Monetize on Rumble',
    overview: 'Rumble offers 60% ad revenue share and positions itself as a YouTube alternative with fewer restrictions.',
    requirements: [
      'No minimum subscriber requirement',
      'Upload original content',
      'Follow Community Guidelines',
      'Monetization available immediately',
      'Various licensing options'
    ],
    revenueStreams: [
      { name: 'Ad Revenue', description: '60% revenue share on ads — higher than YouTube\'s 55%.', potential: 'high' },
      { name: 'Rants', description: 'Tipping feature where viewers support creators directly.', potential: 'medium' },
      { name: 'Licensing', description: 'Rumble can license your viral videos to media outlets.', potential: 'medium' },
      { name: 'Rumble Premium', description: 'Viewers pay for ad-free experience (creators benefit).', potential: 'low' }
    ],
    tips: [
      'No minimum requirements — start earning immediately',
      '60% ad share beats YouTube\'s 55%',
      'Less competition than YouTube for certain niches',
      'Content licensing can provide unexpected income',
      'Growing platform with engaged audience'
    ],
    mistakes: [
      'Ignoring Rumble because YouTube is bigger',
      'Not dual-uploading content to both platforms',
      'Missing the licensing opportunity for viral content',
      'Not engaging with Rumble\'s unique community'
    ],
    resources: [
      { title: 'Rumble Creator FAQ', url: 'https://rumble.com/our-story/creators-faq.html' },
      { title: 'Rumble Support', url: 'https://rumblefaq.groovehq.com' }
    ]
  }
]
