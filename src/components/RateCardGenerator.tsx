import { useState, useRef } from 'react'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import { Download, Mail, Globe, Plus, X } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { platforms } from '@/platforms/registry'

interface Service {
  id: string
  name: string
  price: number
}

interface RateCardGeneratorProps {
  platformId: string
  theme: 'dark' | 'light'
}

const getDefaultServices = (platformId: string): Service[] => {
  const createId = () => Math.random().toString(36).substring(2, 9)

  switch (platformId) {
    case 'youtube':
      return [
        { id: createId(), name: 'Dedicated Video', price: 2500 },
        { id: createId(), name: 'Product Mention', price: 800 },
        { id: createId(), name: 'Shorts', price: 500 },
        { id: createId(), name: 'Community Post', price: 200 },
      ]
    case 'instagram':
      return [
        { id: createId(), name: 'Feed Post', price: 500 },
        { id: createId(), name: 'Story', price: 150 },
        { id: createId(), name: 'Reel', price: 750 },
        { id: createId(), name: 'Story + Post Bundle', price: 600 },
      ]
    case 'tiktok':
      return [
        { id: createId(), name: 'TikTok Video', price: 400 },
        { id: createId(), name: 'Duet/Stitch', price: 250 },
        { id: createId(), name: 'Series (3 videos)', price: 1000 },
      ]
    case 'twitter':
      return [
        { id: createId(), name: 'Sponsored Tweet', price: 200 },
        { id: createId(), name: 'Thread (5+ tweets)', price: 400 },
        { id: createId(), name: 'Retweet + Comment', price: 100 },
      ]
    case 'twitch':
      return [
        { id: createId(), name: 'Stream Sponsorship (1hr)', price: 500 },
        { id: createId(), name: 'Product Showcase', price: 300 },
        { id: createId(), name: 'Chat Shoutout', price: 100 },
      ]
    case 'podcast':
      return [
        { id: createId(), name: 'Pre-roll Ad (30s)', price: 300 },
        { id: createId(), name: 'Mid-roll Ad (60s)', price: 500 },
        { id: createId(), name: 'Full Episode Sponsor', price: 1500 },
        { id: createId(), name: 'Host-read Integration', price: 800 },
      ]
    case 'newsletter':
    case 'substack':
      return [
        { id: createId(), name: 'Sponsored Section', price: 400 },
        { id: createId(), name: 'Dedicated Email', price: 800 },
        { id: createId(), name: 'Banner Ad (monthly)', price: 200 },
      ]
    default:
      return [
        { id: createId(), name: 'Sponsored Post', price: 300 },
        { id: createId(), name: 'Mention', price: 100 },
        { id: createId(), name: 'Review', price: 500 },
        { id: createId(), name: 'Custom', price: 250 },
      ]
  }
}

export default function RateCardGenerator({ platformId, theme }: RateCardGeneratorProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [website, setWebsite] = useState('')
  const [services, setServices] = useState<Service[]>(() => getDefaultServices(platformId))
  const [isGenerating, setIsGenerating] = useState(false)
  const previewRef = useRef<HTMLDivElement>(null)

  const platform = platforms.find(p => p.id === platformId)
  const PlatformIcon = platform?.icon

  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num)
  }

  const updateService = (id: string, field: 'name' | 'price', value: string | number) => {
    setServices(prev =>
      prev.map(s => (s.id === id ? { ...s, [field]: value } : s))
    )
  }

  const deleteService = (id: string) => {
    setServices(prev => prev.filter(s => s.id !== id))
  }

  const addService = () => {
    setServices(prev => [
      ...prev,
      { id: Math.random().toString(36).substring(2, 9), name: 'New Service', price: 100 },
    ])
  }

  const handleDownload = async () => {
    if (!previewRef.current) {
      console.error('Preview ref not found')
      return
    }

    setIsGenerating(true)

    try {
      await new Promise(resolve => setTimeout(resolve, 100))

      const element = previewRef.current

      const canvas = await html2canvas(element, {
        scale: 2,
        backgroundColor: '#18181b',
        logging: true,
        useCORS: true,
        allowTaint: true,
        onclone: (clonedDoc) => {
          const allElements = clonedDoc.querySelectorAll('*')
          allElements.forEach((el) => {
            const htmlEl = el as HTMLElement
            const computedStyle = window.getComputedStyle(htmlEl)

            if (computedStyle.backgroundColor.includes('oklch')) {
              htmlEl.style.backgroundColor = '#18181b'
            }
            if (computedStyle.color.includes('oklch')) {
              htmlEl.style.color = '#ffffff'
            }
            if (computedStyle.borderColor.includes('oklch')) {
              htmlEl.style.borderColor = '#3f3f46'
            }
          })
        }
      })

      const imgData = canvas.toDataURL('image/png')

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      })

      const pdfWidth = pdf.internal.pageSize.getWidth()
      const imgWidth = pdfWidth - 20
      const imgHeight = (canvas.height * imgWidth) / canvas.width

      const imgX = 10
      const imgY = 10

      pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth, imgHeight)

      const fileName = name.trim()
        ? `${name.toLowerCase().replace(/\s+/g, '-')}-rate-card.pdf`
        : 'rate-card.pdf'

      pdf.save(fileName)
    } catch (error) {
      console.error('Error generating PDF:', error)
      alert('Failed to generate PDF. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <Card className={`${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'}`}>
      <CardHeader>
        <CardTitle className={`${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
          Rate Card Generator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Input Fields */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name" className={theme === 'dark' ? 'text-zinc-300' : 'text-zinc-700'}>
              Creator Name
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name or brand"
              className={theme === 'dark' ? 'bg-zinc-800 border-zinc-700 text-white' : ''}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className={theme === 'dark' ? 'text-zinc-300' : 'text-zinc-700'}>
              Contact Email
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="business@example.com"
              className={theme === 'dark' ? 'bg-zinc-800 border-zinc-700 text-white' : ''}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="website" className={theme === 'dark' ? 'text-zinc-300' : 'text-zinc-700'}>
              Website
            </Label>
            <Input
              id="website"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              placeholder="https://yourwebsite.com"
              className={theme === 'dark' ? 'bg-zinc-800 border-zinc-700 text-white' : ''}
            />
          </div>
        </div>

        {/* Services Editor */}
        <div className="space-y-3">
          <Label className={theme === 'dark' ? 'text-zinc-300' : 'text-zinc-700'}>
            Services & Pricing
          </Label>
          <div className="space-y-2">
            {services.map((service) => (
              <div key={service.id} className="flex items-center gap-2">
                <Input
                  value={service.name}
                  onChange={(e) => updateService(service.id, 'name', e.target.value)}
                  placeholder="Service name"
                  className={`flex-1 ${theme === 'dark' ? 'bg-zinc-800 border-zinc-700 text-white' : ''}`}
                />
                <div className="relative w-28">
                  <span className={`absolute left-3 top-1/2 -translate-y-1/2 ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-500'}`}>
                    $
                  </span>
                  <Input
                    type="number"
                    value={service.price}
                    onChange={(e) => updateService(service.id, 'price', parseInt(e.target.value) || 0)}
                    className={`pl-7 ${theme === 'dark' ? 'bg-zinc-800 border-zinc-700 text-white' : ''}`}
                  />
                </div>
                <button
                  onClick={() => deleteService(service.id)}
                  className={`p-2 rounded-lg transition-colors ${
                    theme === 'dark'
                      ? 'hover:bg-zinc-800 text-zinc-400 hover:text-red-400'
                      : 'hover:bg-gray-100 text-gray-400 hover:text-red-500'
                  }`}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
          <button
            onClick={addService}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
              theme === 'dark'
                ? 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
          >
            <Plus className="w-4 h-4" />
            Add Service
          </button>
        </div>

        {/* Live Preview */}
        <div className="mt-6">
          <p className={`text-sm font-medium mb-3 ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
            Preview
          </p>
          <div
            className="p-1 rounded-xl"
            style={{
              background: `linear-gradient(135deg, ${platform?.accentColor || '#8b5cf6'}40, ${platform?.accentColor || '#8b5cf6'}10)`,
            }}
          >
            <div
              ref={previewRef}
              data-rate-card-preview
              className="space-y-6"
              style={{ backgroundColor: '#18181b', borderRadius: '8px', padding: '32px' }}
            >
              {/* Header */}
              <div className="text-center space-y-2">
                <h2 className="text-3xl font-bold" style={{ color: '#ffffff' }}>
                  {name || 'Your Name'}
                </h2>
                <p className="text-lg" style={{ color: '#a1a1aa' }}>
                  Collaboration Rate Card
                </p>
              </div>

              {/* Platform Badge */}
              <div className="flex justify-center">
                <div
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
                  style={{ backgroundColor: `${platform?.accentColor}20` }}
                >
                  {PlatformIcon && (
                    <PlatformIcon className="w-5 h-5" style={{ color: platform?.accentColor }} />
                  )}
                  <span className="font-semibold" style={{ color: platform?.accentColor }}>
                    {platform?.name || 'Platform'}
                  </span>
                </div>
              </div>

              {/* Services Table */}
              <div className="rounded-lg overflow-hidden" style={{ backgroundColor: '#27272a' }}>
                <div
                  className="px-4 py-3 font-semibold text-sm"
                  style={{ backgroundColor: '#3f3f46', color: '#ffffff' }}
                >
                  <div className="flex justify-between">
                    <span>Service</span>
                    <span>Rate</span>
                  </div>
                </div>
                <div className="divide-y" style={{ borderColor: '#3f3f46' }}>
                  {services.map((service, index) => (
                    <div
                      key={service.id}
                      className="px-4 py-3 flex justify-between items-center"
                      style={{ borderColor: '#3f3f46', borderTopWidth: index > 0 ? '1px' : '0' }}
                    >
                      <span style={{ color: '#d4d4d8' }}>{service.name}</span>
                      <span className="font-semibold" style={{ color: platform?.accentColor }}>
                        {formatCurrency(service.price)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Section */}
              <div className="pt-6" style={{ borderTop: '1px solid #3f3f46' }}>
                <p className="text-sm text-center mb-3" style={{ color: '#71717a' }}>
                  Contact for bookings
                </p>
                <div className="flex justify-center gap-6">
                  {email && (
                    <div className="flex items-center gap-2" style={{ color: '#d4d4d8' }}>
                      <Mail className="w-4 h-4" />
                      <span className="text-sm">{email}</span>
                    </div>
                  )}
                  {website && (
                    <div className="flex items-center gap-2" style={{ color: '#d4d4d8' }}>
                      <Globe className="w-4 h-4" />
                      <span className="text-sm">{website}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Footer */}
              <div className="text-center space-y-1">
                <p className="text-xs" style={{ color: '#71717a' }}>
                  Rates valid for 30 days • Custom packages available
                </p>
                <p className="text-xs" style={{ color: '#52525b' }}>
                  Generated with Creator Calculator
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Download Button */}
        <button
          onClick={handleDownload}
          disabled={isGenerating}
          className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-semibold text-white transition-all ${
            isGenerating
              ? 'bg-zinc-700 cursor-not-allowed'
              : 'bg-gradient-to-r hover:opacity-90'
          }`}
          style={{
            backgroundImage: isGenerating
              ? undefined
              : `linear-gradient(to right, ${platform?.accentColor}, ${platform?.accentColor}cc)`,
          }}
        >
          <Download className="w-5 h-5" />
          {isGenerating ? 'Generating PDF...' : 'Download PDF'}
        </button>
      </CardContent>
    </Card>
  )
}
