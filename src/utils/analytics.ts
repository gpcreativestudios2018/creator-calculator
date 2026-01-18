import { track } from '@vercel/analytics'

// Platform events
export const trackPlatformSwitch = (platformId: string) => {
  track('platform_switch', { platform: platformId })
}

// Tool usage events
export const trackToolOpen = (toolName: string, platformId: string) => {
  track('tool_open', { tool: toolName, platform: platformId })
}

// Pro tier events
export const trackUpgradePrompt = (feature: string) => {
  track('upgrade_prompt', { feature })
}

export const trackUpgradeComplete = () => {
  track('upgrade_complete')
}

// Export events
export const trackExport = (format: 'pdf' | 'csv', platformId: string) => {
  track('export', { format, platform: platformId })
}

// Scenario events
export const trackScenarioSave = (platformId: string) => {
  track('scenario_save', { platform: platformId })
}

export const trackScenarioLoad = (platformId: string) => {
  track('scenario_load', { platform: platformId })
}

// Share events
export const trackShare = (method: string, platformId: string) => {
  track('share', { method, platform: platformId })
}

// Feature discovery
export const trackFeatureView = (feature: string) => {
  track('feature_view', { feature })
}
