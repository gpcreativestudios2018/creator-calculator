import { useState, useEffect } from 'react'
import { X, Save, Trash2, FolderOpen, Plus, Check, Crown } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { platforms } from '@/platforms/registry'
import { usePro } from '@/contexts/ProContext'

interface SavedScenario {
  id: string
  name: string
  platformId: string
  inputValues: Record<string, number>
  createdAt: string
  updatedAt: string
}

interface SavedScenariosProps {
  currentPlatformId: string
  currentInputValues: Record<string, number>
  theme: 'dark' | 'light'
  onClose: () => void
  onLoadScenario: (platformId: string, inputValues: Record<string, number>) => void
}

const STORAGE_KEY = 'creator-calculator-scenarios'

export function SavedScenarios({
  currentPlatformId,
  currentInputValues,
  theme,
  onClose,
  onLoadScenario,
}: SavedScenariosProps) {
  const [scenarios, setScenarios] = useState<SavedScenario[]>([])
  const [newName, setNewName] = useState('')
  const [saving, setSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)
  const [showSaveForm, setShowSaveForm] = useState(false)

  const { isPro, maxFreeScenarios, triggerUpgrade, incrementScenarios } = usePro()
  const currentPlatform = platforms.find(p => p.id === currentPlatformId)

  // Load scenarios from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        setScenarios(JSON.parse(stored))
      } catch (e) {
        console.error('Failed to parse saved scenarios:', e)
      }
    }
  }, [])

  // Save scenarios to localStorage
  const saveToStorage = (updatedScenarios: SavedScenario[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedScenarios))
    setScenarios(updatedScenarios)
  }

  const handleSave = () => {
    if (!newName.trim()) return

    // Check if user can save more scenarios
    if (!isPro && scenarios.length >= maxFreeScenarios) {
      triggerUpgrade('save-scenario')
      return
    }

    setSaving(true)

    const newScenario: SavedScenario = {
      id: Date.now().toString(),
      name: newName.trim(),
      platformId: currentPlatformId,
      inputValues: { ...currentInputValues },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    const updated = [...scenarios, newScenario]
    saveToStorage(updated)

    // Track scenario usage for free tier
    if (!isPro) {
      incrementScenarios()
    }

    setNewName('')
    setSaving(false)
    setSaveSuccess(true)
    setShowSaveForm(false)
    setTimeout(() => setSaveSuccess(false), 2000)
  }

  const handleDelete = (id: string) => {
    const updated = scenarios.filter(s => s.id !== id)
    saveToStorage(updated)
  }

  const handleLoad = (scenario: SavedScenario) => {
    onLoadScenario(scenario.platformId, scenario.inputValues)
    onClose()
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  const getPlatformIcon = (platformId: string) => {
    const platform = platforms.find(p => p.id === platformId)
    if (!platform) return null
    const Icon = platform.icon
    return <Icon className={`w-4 h-4 ${platform.iconColor}`} />
  }

  const getPlatformName = (platformId: string) => {
    const platform = platforms.find(p => p.id === platformId)
    return platform?.name || platformId
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      <div className={`relative max-w-lg w-full mx-4 max-h-[85vh] overflow-hidden rounded-xl ${theme === 'dark' ? 'bg-zinc-900' : 'bg-white'}`}>
        {/* Header */}
        <div className={`sticky top-0 z-10 p-4 border-b ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'}`}>
          <button
            onClick={onClose}
            className={`absolute top-4 right-4 p-2 rounded-full transition-colors ${theme === 'dark' ? 'hover:bg-zinc-800 text-zinc-400 hover:text-white' : 'hover:bg-gray-100 text-gray-500 hover:text-gray-900'}`}
          >
            <X className="w-5 h-5" />
          </button>

          <h2 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
            Saved Scenarios
          </h2>
          <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
            Save and load your calculator configurations
          </p>
        </div>

        {/* Content */}
        <div className="p-4 overflow-y-auto max-h-[calc(85vh-180px)]">
          {/* Save Current Button */}
          {!showSaveForm ? (
            <Button
              onClick={() => {
                if (!isPro && scenarios.length >= maxFreeScenarios) {
                  triggerUpgrade('save-scenario')
                  return
                }
                setShowSaveForm(true)
              }}
              className="w-full mb-4 flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
            >
              {saveSuccess ? (
                <>
                  <Check className="w-4 h-4" />
                  Saved!
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  Save Current ({currentPlatform?.name})
                  {!isPro && scenarios.length >= maxFreeScenarios && <Crown className="w-4 h-4 ml-1 text-yellow-400" />}
                </>
              )}
            </Button>
          ) : (
            <Card className={`mb-4 ${theme === 'dark' ? 'bg-zinc-800 border-zinc-700' : 'bg-gray-50 border-gray-200'}`}>
              <CardContent className="pt-4">
                <p className={`text-sm font-medium mb-2 ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                  Save current {currentPlatform?.name} settings
                </p>
                <div className="flex gap-2">
                  <Input
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="e.g., My YouTube Plan"
                    className={`flex-1 ${theme === 'dark' ? 'bg-zinc-900 border-zinc-700' : 'bg-white border-gray-300'}`}
                    onKeyDown={(e) => e.key === 'Enter' && handleSave()}
                    autoFocus
                  />
                  <Button
                    onClick={handleSave}
                    disabled={!newName.trim() || saving}
                    className="bg-emerald-600 hover:bg-emerald-700"
                  >
                    <Save className="w-4 h-4" />
                  </Button>
                  <Button
                    onClick={() => { setShowSaveForm(false); setNewName('') }}
                    variant="outline"
                    className={theme === 'dark' ? 'border-zinc-700' : ''}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Free tier usage indicator */}
          {!isPro && (
            <div className={`mb-4 p-3 rounded-lg ${theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-100'}`}>
              <div className="flex items-center justify-between mb-2">
                <span className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
                  Saved scenarios
                </span>
                <span className={`text-sm font-medium ${scenarios.length >= maxFreeScenarios ? 'text-orange-500' : theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                  {scenarios.length} / {maxFreeScenarios}
                </span>
              </div>
              <div className={`h-2 rounded-full overflow-hidden ${theme === 'dark' ? 'bg-zinc-700' : 'bg-gray-300'}`}>
                <div
                  className={`h-full transition-all ${scenarios.length >= maxFreeScenarios ? 'bg-orange-500' : 'bg-purple-500'}`}
                  style={{ width: `${Math.min((scenarios.length / maxFreeScenarios) * 100, 100)}%` }}
                />
              </div>
              {scenarios.length >= maxFreeScenarios && (
                <button
                  onClick={() => triggerUpgrade('unlimited-scenarios')}
                  className="mt-2 text-xs text-purple-400 hover:text-purple-300 flex items-center gap-1"
                >
                  <Crown className="w-3 h-3" />
                  Upgrade for unlimited scenarios
                </button>
              )}
            </div>
          )}

          {/* Saved Scenarios List */}
          {scenarios.length === 0 ? (
            <div className={`text-center py-12 ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'}`}>
              <FolderOpen className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p className="font-medium">No saved scenarios yet</p>
              <p className="text-sm mt-1">Save your first scenario to get started</p>
            </div>
          ) : (
            <div className="space-y-2">
              {scenarios.map((scenario) => (
                <Card
                  key={scenario.id}
                  className={`group transition-all ${theme === 'dark' ? 'bg-zinc-800 border-zinc-700 hover:border-zinc-600' : 'bg-gray-50 border-gray-200 hover:border-gray-300'}`}
                >
                  <CardContent className="p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        {getPlatformIcon(scenario.platformId)}
                        <div className="min-w-0 flex-1">
                          <p className={`font-medium truncate ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                            {scenario.name}
                          </p>
                          <p className={`text-xs ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'}`}>
                            {getPlatformName(scenario.platformId)} • {formatDate(scenario.updatedAt)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 ml-2">
                        <Button
                          onClick={() => handleLoad(scenario)}
                          size="sm"
                          className="bg-purple-600 hover:bg-purple-700 text-white h-8 px-3"
                        >
                          Load
                        </Button>
                        <Button
                          onClick={() => handleDelete(scenario.id)}
                          size="sm"
                          variant="ghost"
                          className={`h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity ${theme === 'dark' ? 'hover:bg-zinc-700 text-zinc-400 hover:text-red-400' : 'hover:bg-gray-200 text-gray-400 hover:text-red-500'}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className={`sticky bottom-0 p-4 border-t ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'}`}>
          <p className={`text-xs text-center ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'}`}>
            Scenarios are saved locally in your browser
          </p>
        </div>
      </div>
    </div>
  )
}
