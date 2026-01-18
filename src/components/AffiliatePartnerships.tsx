import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ExternalLink, DollarSign, Percent, Gift, Zap, Video, Mic, PenTool, BarChart3 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface AffiliatePartner {
  id: string
  name: string
  description: string
  category: 'tools' | 'software' | 'education' | 'services'
  commission: string
  icon: React.ElementType
  url: string
  featured?: boolean
}

const affiliatePartners: AffiliatePartner[] = [
  {
    id: 'tubebuddy',
    name: 'TubeBuddy',
    description: 'YouTube optimization toolkit for growing your channel faster',
    category: 'tools',
    commission: '30% recurring',
    icon: Video,
    url: 'https://www.tubebuddy.com',
    featured: true
  },
  {
    id: 'vidiq',
    name: 'VidIQ',
    description: 'YouTube analytics and SEO tools to boost views',
    category: 'tools',
    commission: '25% recurring',
    icon: BarChart3,
    url: 'https://vidiq.com',
    featured: true
  },
  {
    id: 'canva',
    name: 'Canva Pro',
    description: 'Design thumbnails, social posts, and brand assets',
    category: 'software',
    commission: '20-80% per sale',
    icon: PenTool,
    url: 'https://www.canva.com',
    featured: true
  },
  {
    id: 'riverside',
    name: 'Riverside.fm',
    description: 'Studio-quality podcast and video recording',
    category: 'software',
    commission: '20% recurring',
    icon: Mic,
    url: 'https://riverside.fm'
  },
  {
    id: 'descript',
    name: 'Descript',
    description: 'AI-powered video and podcast editing',
    category: 'software',
    commission: '15% recurring',
    icon: Video,
    url: 'https://www.descript.com'
  },
  {
    id: 'kajabi',
    name: 'Kajabi',
    description: 'All-in-one platform for courses and memberships',
    category: 'education',
    commission: '30% recurring',
    icon: Zap,
    url: 'https://kajabi.com'
  },
  {
    id: 'teachable',
    name: 'Teachable',
    description: 'Create and sell online courses',
    category: 'education',
    commission: '30% recurring',
    icon: Zap,
    url: 'https://teachable.com'
  },
  {
    id: 'convertkit',
    name: 'ConvertKit',
    description: 'Email marketing built for creators',
    category: 'services',
    commission: '30% recurring',
    icon: Gift,
    url: 'https://convertkit.com'
  }
]

interface AffiliatePartnershipsProps {
  className?: string
  variant?: 'full' | 'compact'
}

export function AffiliatePartnerships({ className, variant = 'full' }: AffiliatePartnershipsProps) {
  const featuredPartners = affiliatePartners.filter(p => p.featured)

  if (variant === 'compact') {
    return (
      <Card className={cn('border-emerald-500/20 bg-emerald-500/5', className)}>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-emerald-500/10 rounded-lg">
              <DollarSign className="h-5 w-5 text-emerald-500" />
            </div>
            <CardTitle className="text-lg">Recommended Tools</CardTitle>
          </div>
          <CardDescription>Tools we love (affiliate links)</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          {featuredPartners.slice(0, 3).map((partner) => (
            <a
              key={partner.id}
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors group"
            >
              <div className="flex items-center gap-2">
                <partner.icon className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">{partner.name}</span>
              </div>
              <ExternalLink className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          ))}
        </CardContent>
      </Card>
    )
  }

  return (
    <div className={cn('space-y-8', className)}>
      {/* Header */}
      <div className="text-center space-y-4">
        <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20">
          Partner Discounts
        </Badge>
        <h2 className="text-3xl font-bold">Creator Tools We Recommend</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Tools and services that help creators grow faster. We may earn a commission if you sign up through these links.
        </p>
      </div>

      {/* Featured Partners */}
      <div className="grid md:grid-cols-3 gap-6">
        {featuredPartners.map((partner) => (
          <Card key={partner.id} className="relative overflow-hidden group hover:border-emerald-500/50 transition-colors">
            <div className="absolute top-3 right-3">
              <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20">
                <Percent className="h-3 w-3 mr-1" />
                {partner.commission}
              </Badge>
            </div>
            <CardHeader>
              <div className="p-3 bg-muted rounded-lg w-fit mb-2">
                <partner.icon className="h-6 w-6" />
              </div>
              <CardTitle>{partner.name}</CardTitle>
              <CardDescription>{partner.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full group-hover:bg-emerald-600 transition-colors">
                <a href={partner.url} target="_blank" rel="noopener noreferrer">
                  Try {partner.name}
                  <ExternalLink className="h-4 w-4 ml-2" />
                </a>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* All Partners Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Partner Programs</CardTitle>
          <CardDescription>
            Full list of tools and services with affiliate programs
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">Tool</th>
                  <th className="text-left py-3 px-4 font-medium">Category</th>
                  <th className="text-left py-3 px-4 font-medium">Commission</th>
                  <th className="text-right py-3 px-4 font-medium">Link</th>
                </tr>
              </thead>
              <tbody>
                {affiliatePartners.map((partner) => (
                  <tr key={partner.id} className="border-b last:border-0 hover:bg-muted/50">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <partner.icon className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{partner.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-muted-foreground capitalize">{partner.category}</td>
                    <td className="py-3 px-4">
                      <Badge variant="outline" className="text-emerald-500 border-emerald-500/30">
                        {partner.commission}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <Button asChild variant="ghost" size="sm">
                        <a href={partner.url} target="_blank" rel="noopener noreferrer">
                          Visit
                          <ExternalLink className="h-3 w-3 ml-1" />
                        </a>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Disclosure */}
      <p className="text-xs text-center text-muted-foreground">
        Disclosure: Some links above are affiliate links. We may earn a commission at no extra cost to you.
      </p>
    </div>
  )
}
