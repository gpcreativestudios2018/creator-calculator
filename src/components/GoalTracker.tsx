import { useState } from 'react'
import { Target, Plus, Pencil, X, Check, Users, DollarSign, Eye, Star } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface GoalTrackerProps {
  platformId: string
  currentMetrics: {
    followers: number
    views: number
    monthlyRevenue: number
  }
  theme: 'dark' | 'light'
}

interface Goal {
  id: string
  type: 'followers' | 'revenue' | 'views' | 'custom'
  name: string
  target: number
  current: number
}

const goalTemplates = {
  followers: [
    { label: '1K Followers', value: 1000 },
    { label: '10K Followers', value: 10000 },
    { label: '100K Followers', value: 100000 },
    { label: '1M Followers', value: 1000000 },
  ],
  revenue: [
    { label: '$100/month', value: 100 },
    { label: '$500/month', value: 500 },
    { label: '$1K/month', value: 1000 },
    { label: '$5K/month', value: 5000 },
    { label: '$10K/month', value: 10000 },
  ],
  views: [
    { label: '1K views/video', value: 1000 },
    { label: '10K views/video', value: 10000 },
    { label: '100K views/video', value: 100000 },
    { label: '1M views/video', value: 1000000 },
  ],
}

const goalTypeConfig = {
  followers: { icon: Users, color: '#8b5cf6', label: 'Followers' },
  revenue: { icon: DollarSign, color: '#22c55e', label: 'Revenue' },
  views: { icon: Eye, color: '#3b82f6', label: 'Views' },
  custom: { icon: Star, color: '#f59e0b', label: 'Custom' },
}

export default function GoalTracker({ currentMetrics, theme }: GoalTrackerProps) {
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: '1',
      type: 'followers',
      name: '10K Followers',
      target: 10000,
      current: currentMetrics.followers,
    },
    {
      id: '2',
      type: 'revenue',
      name: '$1K/month Revenue',
      target: 1000,
      current: currentMetrics.monthlyRevenue,
    },
  ])
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [newGoal, setNewGoal] = useState({
    type: 'followers' as Goal['type'],
    name: '',
    target: 0,
  })

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

  const getCurrentValue = (type: Goal['type']) => {
    switch (type) {
      case 'followers':
        return currentMetrics.followers
      case 'revenue':
        return currentMetrics.monthlyRevenue
      case 'views':
        return currentMetrics.views
      default:
        return 0
    }
  }

  const getProgress = (goal: Goal) => {
    const current = getCurrentValue(goal.type) || goal.current
    return goal.target > 0 ? Math.min((current / goal.target) * 100, 100) : 0
  }

  const getMotivationalMessage = (progress: number) => {
    if (progress >= 100) return { text: 'Goal achieved! Time for a new target.', emoji: '🎉' }
    if (progress >= 75) return { text: 'Almost there! Final stretch!', emoji: '🔥' }
    if (progress >= 50) return { text: 'Over halfway there! Stay consistent.', emoji: '💪' }
    if (progress >= 25) return { text: "Making progress! You're on your way.", emoji: '📈' }
    return { text: 'Just getting started! Keep pushing.', emoji: '🚀' }
  }

  const formatValue = (type: Goal['type'], value: number) => {
    if (type === 'revenue') return formatCurrency(value)
    return formatNumber(value)
  }

  const addGoal = () => {
    if (newGoal.target <= 0) return

    const goal: Goal = {
      id: Math.random().toString(36).substring(2, 9),
      type: newGoal.type,
      name: newGoal.name || `${goalTypeConfig[newGoal.type].label} Goal`,
      target: newGoal.target,
      current: getCurrentValue(newGoal.type),
    }

    setGoals(prev => [...prev, goal])
    setNewGoal({ type: 'followers', name: '', target: 0 })
    setShowAddForm(false)
  }

  const updateGoal = (id: string, updates: Partial<Goal>) => {
    setGoals(prev =>
      prev.map(goal => (goal.id === id ? { ...goal, ...updates } : goal))
    )
    setEditingId(null)
  }

  const deleteGoal = (id: string) => {
    setGoals(prev => prev.filter(goal => goal.id !== id))
  }

  const handleTemplateSelect = (template: { label: string; value: number }) => {
    setNewGoal(prev => ({
      ...prev,
      name: template.label,
      target: template.value,
    }))
  }

  return (
    <Card className={`${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'}`}>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className={`flex items-center gap-2 ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
          <Target className="w-5 h-5" />
          Goal Tracker
        </CardTitle>
        {!showAddForm && (
          <button
            onClick={() => setShowAddForm(true)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              theme === 'dark'
                ? 'bg-purple-600 hover:bg-purple-700 text-white'
                : 'bg-purple-500 hover:bg-purple-600 text-white'
            }`}
          >
            <Plus className="w-4 h-4" />
            Add Goal
          </button>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Add Goal Form */}
        {showAddForm && (
          <div className={`p-4 rounded-lg space-y-4 ${theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-100'}`}>
            <div className="flex items-center justify-between">
              <h4 className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                New Goal
              </h4>
              <button
                onClick={() => setShowAddForm(false)}
                className={`p-1 rounded hover:bg-zinc-700 ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-500'}`}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className={theme === 'dark' ? 'text-zinc-300' : 'text-zinc-700'}>
                  Goal Type
                </Label>
                <Select
                  value={newGoal.type}
                  onValueChange={(value: Goal['type']) => setNewGoal(prev => ({ ...prev, type: value, name: '', target: 0 }))}
                >
                  <SelectTrigger className={theme === 'dark' ? 'bg-zinc-700 border-zinc-600 text-white' : ''}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="followers">Followers</SelectItem>
                    <SelectItem value="revenue">Revenue</SelectItem>
                    <SelectItem value="views">Views</SelectItem>
                    <SelectItem value="custom">Custom</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className={theme === 'dark' ? 'text-zinc-300' : 'text-zinc-700'}>
                  Target Value
                </Label>
                <Input
                  type="number"
                  value={newGoal.target || ''}
                  onChange={(e) => setNewGoal(prev => ({ ...prev, target: parseInt(e.target.value) || 0 }))}
                  placeholder="Enter target"
                  className={theme === 'dark' ? 'bg-zinc-700 border-zinc-600 text-white' : ''}
                />
              </div>
            </div>

            {/* Quick Templates */}
            {newGoal.type !== 'custom' && goalTemplates[newGoal.type] && (
              <div className="space-y-2">
                <Label className={theme === 'dark' ? 'text-zinc-300' : 'text-zinc-700'}>
                  Quick Select
                </Label>
                <div className="flex flex-wrap gap-2">
                  {goalTemplates[newGoal.type].map((template) => (
                    <button
                      key={template.value}
                      onClick={() => handleTemplateSelect(template)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                        newGoal.target === template.value
                          ? 'bg-purple-600 text-white'
                          : theme === 'dark'
                            ? 'bg-zinc-700 text-zinc-300 hover:bg-zinc-600'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {template.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label className={theme === 'dark' ? 'text-zinc-300' : 'text-zinc-700'}>
                Goal Name
              </Label>
              <Input
                value={newGoal.name}
                onChange={(e) => setNewGoal(prev => ({ ...prev, name: e.target.value }))}
                placeholder="e.g., Hit 10K followers by March"
                className={theme === 'dark' ? 'bg-zinc-700 border-zinc-600 text-white' : ''}
              />
            </div>

            <button
              onClick={addGoal}
              disabled={newGoal.target <= 0}
              className={`w-full py-2 rounded-lg font-medium transition-colors ${
                newGoal.target > 0
                  ? 'bg-purple-600 hover:bg-purple-700 text-white'
                  : 'bg-zinc-600 text-zinc-400 cursor-not-allowed'
              }`}
            >
              Add Goal
            </button>
          </div>
        )}

        {/* Goals List */}
        {goals.length === 0 ? (
          <div className={`text-center py-8 ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'}`}>
            <Target className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No goals set yet. Add your first goal to start tracking!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {goals.map((goal) => {
              const config = goalTypeConfig[goal.type]
              const Icon = config.icon
              const progress = getProgress(goal)
              const motivation = getMotivationalMessage(progress)
              const currentValue = getCurrentValue(goal.type) || goal.current
              const remaining = Math.max(0, goal.target - currentValue)

              return (
                <div
                  key={goal.id}
                  className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-50'}`}
                >
                  {editingId === goal.id ? (
                    <div className="space-y-3">
                      <Input
                        value={goal.name}
                        onChange={(e) => updateGoal(goal.id, { name: e.target.value })}
                        className={theme === 'dark' ? 'bg-zinc-700 border-zinc-600 text-white' : ''}
                      />
                      <div className="flex gap-2">
                        <Input
                          type="number"
                          value={goal.target}
                          onChange={(e) => updateGoal(goal.id, { target: parseInt(e.target.value) || 0 })}
                          className={`flex-1 ${theme === 'dark' ? 'bg-zinc-700 border-zinc-600 text-white' : ''}`}
                        />
                        <button
                          onClick={() => setEditingId(null)}
                          className="px-3 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div
                            className="p-1.5 rounded-lg"
                            style={{ backgroundColor: `${config.color}20` }}
                          >
                            <Icon className="w-4 h-4" style={{ color: config.color }} />
                          </div>
                          <span className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                            {goal.name}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => setEditingId(goal.id)}
                            className={`p-1.5 rounded hover:bg-zinc-700 ${
                              theme === 'dark' ? 'text-zinc-400 hover:text-white' : 'text-zinc-500 hover:text-zinc-900'
                            }`}
                          >
                            <Pencil className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => deleteGoal(goal.id)}
                            className={`p-1.5 rounded hover:bg-red-900/50 ${
                              theme === 'dark' ? 'text-zinc-400 hover:text-red-400' : 'text-zinc-500 hover:text-red-500'
                            }`}
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="relative h-4 rounded-full overflow-hidden mb-2" style={{ backgroundColor: theme === 'dark' ? '#3f3f46' : '#e5e7eb' }}>
                        <div
                          className="absolute inset-y-0 left-0 rounded-full transition-all duration-500"
                          style={{
                            width: `${progress}%`,
                            backgroundColor: progress >= 100 ? '#22c55e' : config.color,
                          }}
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-xs font-medium text-white drop-shadow">
                            {progress.toFixed(0)}%
                          </span>
                        </div>
                      </div>

                      {/* Stats Row */}
                      <div className="flex items-center justify-between text-sm">
                        <span className={theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}>
                          {formatValue(goal.type, currentValue)} / {formatValue(goal.type, goal.target)}
                        </span>
                        {progress >= 100 ? (
                          <span className="text-green-500 font-medium">
                            {motivation.emoji} Goal reached!
                          </span>
                        ) : (
                          <span className={theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}>
                            {formatValue(goal.type, remaining)} to go
                          </span>
                        )}
                      </div>

                      {/* Motivational Message */}
                      <p className={`text-xs mt-2 ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-500'}`}>
                        {motivation.emoji} {motivation.text}
                      </p>
                    </>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
