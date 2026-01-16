import { useState, useRef } from 'react'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import { Download, Mail, Globe } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { platforms } from '@/platforms/registry'

interface MediaKitMetrics {
  followers?: number
  views?: number
  engagement?: number
  monthlyRevenue: number
  yearlyRevenue: number
}

interface MediaKitGeneratorProps {
  platformId: string
  metrics: MediaKitMetrics
  theme: 'dark' | 'light'
}

export default function MediaKitGenerator({ platformId, metrics, theme }: MediaKitGeneratorProps) {
  const [name, setName] = useState('')
  const [bio, setBio] = useState('')
  const [email, setEmail] = useState('')
  const [website, setWebsite] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const previewRef = useRef<HTMLDivElement>(null)

  const platform = platforms.find(p => p.id === platformId)
  const PlatformIcon = platform?.icon

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toLocaleString()
  }

  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num)
  }

  const handleDownload = async () => {
    if (!previewRef.current) {
      console.error('Preview ref not found')
      return
    }

    setIsGenerating(true)

    try {
      // Wait a tick for any pending renders
      await new Promise(resolve => setTimeout(resolve, 100))

      const element = previewRef.current

      const canvas = await html2canvas(element, {
        scale: 2,
        backgroundColor: '#18181b',
        logging: true,
        useCORS: true,
        allowTaint: true,
        onclone: (clonedDoc) => {
          const clonedElement = clonedDoc.querySelector('[data-media-kit-preview]')
          if (clonedElement) {
            (clonedElement as HTMLElement).style.display = 'block'
          }
        }
      })

      const imgData = canvas.toDataURL('image/png')

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      })

      const pdfWidth = pdf.internal.pageSize.getWidth()

      // Calculate dimensions to fit the image properly
      const imgWidth = pdfWidth - 20 // 10mm margin on each side
      const imgHeight = (canvas.height * imgWidth) / canvas.width

      const imgX = 10 // 10mm left margin
      const imgY = 10 // 10mm top margin

      pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth, imgHeight)

      const fileName = name.trim()
        ? `${name.toLowerCase().replace(/\s+/g, '-')}-media-kit.pdf`
        : 'media-kit.pdf'

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
          Media Kit Generator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Input Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          <div className="space-y-2">
            <Label htmlFor="bio" className={theme === 'dark' ? 'text-zinc-300' : 'text-zinc-700'}>
              Bio / Tagline ({bio.length}/150)
            </Label>
            <Input
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value.slice(0, 150))}
              placeholder="Content creator specializing in..."
              className={theme === 'dark' ? 'bg-zinc-800 border-zinc-700 text-white' : ''}
            />
          </div>
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
              data-media-kit-preview
              className="bg-zinc-900 rounded-lg p-8 space-y-6"
            >
              {/* Header */}
              <div className="text-center space-y-2">
                <h2 className="text-3xl font-bold text-white">
                  {name || 'Your Name'}
                </h2>
                <p className="text-zinc-400 text-lg">
                  {bio || 'Your tagline goes here'}
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

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 gap-4">
                {metrics.followers !== undefined && (
                  <div className="bg-zinc-800 rounded-lg p-4 text-center">
                    <p className="text-zinc-400 text-sm">Followers</p>
                    <p className="text-2xl font-bold text-white">{formatNumber(metrics.followers)}</p>
                  </div>
                )}
                {metrics.views !== undefined && (
                  <div className="bg-zinc-800 rounded-lg p-4 text-center">
                    <p className="text-zinc-400 text-sm">Avg. Views</p>
                    <p className="text-2xl font-bold text-white">{formatNumber(metrics.views)}</p>
                  </div>
                )}
                {metrics.engagement !== undefined && (
                  <div className="bg-zinc-800 rounded-lg p-4 text-center">
                    <p className="text-zinc-400 text-sm">Engagement Rate</p>
                    <p className="text-2xl font-bold text-white">{metrics.engagement.toFixed(1)}%</p>
                  </div>
                )}
                <div className="bg-zinc-800 rounded-lg p-4 text-center">
                  <p className="text-zinc-400 text-sm">Est. Monthly Revenue</p>
                  <p className="text-2xl font-bold" style={{ color: platform?.accentColor }}>
                    {formatCurrency(metrics.monthlyRevenue)}
                  </p>
                </div>
              </div>

              {/* Contact Section */}
              <div className="border-t border-zinc-700 pt-6">
                <p className="text-zinc-500 text-sm text-center mb-3">Contact for collaborations</p>
                <div className="flex justify-center gap-6">
                  {email && (
                    <div className="flex items-center gap-2 text-zinc-300">
                      <Mail className="w-4 h-4" />
                      <span className="text-sm">{email}</span>
                    </div>
                  )}
                  {website && (
                    <div className="flex items-center gap-2 text-zinc-300">
                      <Globe className="w-4 h-4" />
                      <span className="text-sm">{website}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Footer */}
              <p className="text-zinc-600 text-xs text-center">
                Generated with Creator Calculator
              </p>
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
