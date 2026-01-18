import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { TrendingUp, DollarSign, Users, BarChart3, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

// SEO data for programmatic pages
const seoPageData: Record<string, {
  platform: string
  metric: string
  title: string
  description: string
  h1: string
  data: { niche: string; range: string; avg: string }[]
}> = {
  'youtube-rpm-by-niche': {
    platform: 'YouTube',
    metric: 'RPM',
    title: 'YouTube RPM by Niche (2025) — Average Earnings Per 1,000 Views',
    description: 'See average YouTube RPM rates by niche. Finance creators earn $15-40 RPM while gaming earns $2-5. Find your niche\'s earning potential.',
    h1: 'YouTube RPM by Niche',
    data: [
      { niche: 'Finance & Investing', range: '$15 - $40', avg: '$25.00' },
      { niche: 'Business & Marketing', range: '$12 - $30', avg: '$18.50' },
      { niche: 'Technology', range: '$8 - $20', avg: '$12.00' },
      { niche: 'Health & Fitness', range: '$6 - $15', avg: '$9.50' },
      { niche: 'Education', range: '$5 - $12', avg: '$8.00' },
      { niche: 'Lifestyle & Vlogs', range: '$3 - $8', avg: '$5.00' },
      { niche: 'Gaming', range: '$2 - $5', avg: '$3.50' },
      { niche: 'Entertainment', range: '$2 - $6', avg: '$4.00' },
    ]
  },
  'tiktok-creator-fund-rates': {
    platform: 'TikTok',
    metric: 'Creator Fund',
    title: 'TikTok Creator Fund Rates (2025) — How Much TikTok Pays Per View',
    description: 'TikTok Creator Fund pays $0.02-$0.04 per 1,000 views. Learn how to maximize your TikTok earnings with our calculator.',
    h1: 'TikTok Creator Fund Rates',
    data: [
      { niche: 'Viral Content (1M+ views)', range: '$0.03 - $0.05', avg: '$0.04' },
      { niche: 'Educational Content', range: '$0.02 - $0.04', avg: '$0.03' },
      { niche: 'Entertainment', range: '$0.02 - $0.03', avg: '$0.025' },
      { niche: 'Lifestyle', range: '$0.01 - $0.03', avg: '$0.02' },
      { niche: 'Gaming Clips', range: '$0.01 - $0.02', avg: '$0.015' },
    ]
  },
  'instagram-sponsorship-rates': {
    platform: 'Instagram',
    metric: 'Sponsorship',
    title: 'Instagram Sponsorship Rates (2025) — How Much to Charge Per Post',
    description: 'Instagram sponsorship rates range from $100 to $10,000+ per post. Calculate your rate based on followers and engagement.',
    h1: 'Instagram Sponsorship Rates',
    data: [
      { niche: 'Nano (1K-10K followers)', range: '$50 - $250', avg: '$100' },
      { niche: 'Micro (10K-50K followers)', range: '$250 - $1,000', avg: '$500' },
      { niche: 'Mid-tier (50K-200K)', range: '$1,000 - $3,000', avg: '$1,800' },
      { niche: 'Macro (200K-1M)', range: '$3,000 - $10,000', avg: '$5,500' },
      { niche: 'Mega (1M+)', range: '$10,000 - $50,000+', avg: '$25,000' },
    ]
  },
  'twitch-sub-revenue': {
    platform: 'Twitch',
    metric: 'Subscription',
    title: 'Twitch Subscription Revenue (2025) — How Much Streamers Earn Per Sub',
    description: 'Twitch streamers earn 50-70% of subscription revenue. Calculate your potential Twitch income based on subscriber count.',
    h1: 'Twitch Subscription Revenue',
    data: [
      { niche: 'Tier 1 Sub ($4.99)', range: '$2.50 - $3.50', avg: '$2.50' },
      { niche: 'Tier 2 Sub ($9.99)', range: '$5.00 - $7.00', avg: '$5.00' },
      { niche: 'Tier 3 Sub ($24.99)', range: '$12.50 - $17.50', avg: '$12.50' },
      { niche: 'Prime Sub', range: '$2.50', avg: '$2.50' },
      { niche: 'Gift Subs (avg)', range: '$2.50', avg: '$2.50' },
    ]
  },
  'patreon-income-calculator': {
    platform: 'Patreon',
    metric: 'Income',
    title: 'Patreon Income Calculator (2025) — Estimate Your Patron Earnings',
    description: 'Calculate your potential Patreon income. Most creators earn $5-15 per patron after fees. See earnings by tier.',
    h1: 'Patreon Income by Tier',
    data: [
      { niche: '$1 Tier (after fees)', range: '$0.85 - $0.92', avg: '$0.88' },
      { niche: '$5 Tier (after fees)', range: '$4.25 - $4.60', avg: '$4.40' },
      { niche: '$10 Tier (after fees)', range: '$8.50 - $9.20', avg: '$8.80' },
      { niche: '$25 Tier (after fees)', range: '$21.25 - $23.00', avg: '$22.00' },
      { niche: '$50 Tier (after fees)', range: '$42.50 - $46.00', avg: '$44.00' },
    ]
  },
}

interface SEOLandingPageProps {
  pageId: string
  onNavigateToCalculator: () => void
  className?: string
}

export function SEOLandingPage({ pageId, onNavigateToCalculator, className }: SEOLandingPageProps) {
  const pageData = seoPageData[pageId]

  if (!pageData) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold mb-4">Page Not Found</h1>
        <Button onClick={onNavigateToCalculator}>Go to Calculator</Button>
      </div>
    )
  }

  return (
    <div className={cn('max-w-4xl mx-auto p-6 space-y-8', className)}>
      {/* SEO Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>{pageData.platform}</span>
          <span>•</span>
          <span>{pageData.metric} Rates</span>
          <span>•</span>
          <span>Updated January 2025</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold">{pageData.h1}</h1>
        <p className="text-lg text-muted-foreground">{pageData.description}</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <DollarSign className="h-6 w-6 mx-auto mb-2 text-green-500" />
            <p className="text-2xl font-bold">{pageData.data[0]?.avg}</p>
            <p className="text-xs text-muted-foreground">Top Niche Avg</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <TrendingUp className="h-6 w-6 mx-auto mb-2 text-blue-500" />
            <p className="text-2xl font-bold">{pageData.data.length}</p>
            <p className="text-xs text-muted-foreground">Categories</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Users className="h-6 w-6 mx-auto mb-2 text-violet-500" />
            <p className="text-2xl font-bold">2025</p>
            <p className="text-xs text-muted-foreground">Data Year</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <BarChart3 className="h-6 w-6 mx-auto mb-2 text-amber-500" />
            <p className="text-2xl font-bold">Free</p>
            <p className="text-xs text-muted-foreground">Calculator</p>
          </CardContent>
        </Card>
      </div>

      {/* Data Table */}
      <Card>
        <CardHeader>
          <CardTitle>{pageData.platform} {pageData.metric} Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">Category</th>
                  <th className="text-left py-3 px-4 font-medium">Range</th>
                  <th className="text-left py-3 px-4 font-medium">Average</th>
                </tr>
              </thead>
              <tbody>
                {pageData.data.map((row, i) => (
                  <tr key={i} className="border-b last:border-0 hover:bg-muted/50">
                    <td className="py-3 px-4">{row.niche}</td>
                    <td className="py-3 px-4 text-muted-foreground">{row.range}</td>
                    <td className="py-3 px-4 font-medium text-green-500">{row.avg}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* CTA */}
      <Card className="bg-gradient-to-br from-violet-500/10 to-indigo-500/10 border-violet-500/30">
        <CardContent className="p-6 text-center">
          <h2 className="text-xl font-bold mb-2">Calculate Your Exact Earnings</h2>
          <p className="text-muted-foreground mb-4">
            Use our free {pageData.platform} calculator to estimate your revenue based on your specific metrics.
          </p>
          <Button onClick={onNavigateToCalculator} size="lg">
            Open {pageData.platform} Calculator
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </CardContent>
      </Card>

      {/* SEO Content */}
      <div className="prose prose-invert max-w-none">
        <h2>How {pageData.platform} {pageData.metric} Works</h2>
        <p>
          Understanding {pageData.platform} {pageData.metric.toLowerCase()} rates is crucial for creators looking to monetize their content.
          These rates vary significantly based on your niche, audience location, and engagement rates.
        </p>
        <h2>Factors That Affect Your {pageData.metric}</h2>
        <ul>
          <li><strong>Niche:</strong> Finance and business niches typically command higher rates due to valuable advertiser demographics.</li>
          <li><strong>Geography:</strong> Viewers from the US, UK, and Canada generate higher revenue than other regions.</li>
          <li><strong>Engagement:</strong> Higher engagement rates can lead to better monetization opportunities.</li>
          <li><strong>Content Length:</strong> Longer content often allows for more ad placements.</li>
        </ul>
      </div>
    </div>
  )
}

// Export available SEO pages for routing
export const seoPages = Object.keys(seoPageData)
