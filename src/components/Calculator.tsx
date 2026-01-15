import { useState } from 'react'
import { platforms } from '@/platforms/registry'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

export function Calculator() {
  const [activeTab, setActiveTab] = useState('youtube')

  const activePlatform = platforms.find(p => p.id === activeTab)

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
          Creator Calculator
        </h1>
        <p className="text-zinc-400 mt-2">Estimate your earnings across platforms</p>
      </div>

      {/* Platform Tabs */}
      <div className="max-w-6xl mx-auto mb-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="flex flex-wrap gap-2 bg-transparent h-auto p-0">
            {platforms.map((platform) => (
              <TabsTrigger
                key={platform.id}
                value={platform.id}
                className={`px-4 py-2 rounded-lg bg-gradient-to-r ${platform.gradient} data-[state=active]:ring-2 data-[state=active]:ring-white data-[state=inactive]:opacity-60`}
              >
                {platform.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {/* Active Platform Card */}
      {activePlatform && (
        <div className="max-w-6xl mx-auto">
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle className={`text-2xl bg-gradient-to-r ${activePlatform.gradient} bg-clip-text text-transparent`}>
                {activePlatform.name}
              </CardTitle>
              <CardDescription>{activePlatform.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-zinc-400">Inputs and calculations coming next...</p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
