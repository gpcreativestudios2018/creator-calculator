import { useState, useEffect } from 'react'
import { Calculator } from '@/components/Calculator'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { ThemeProvider, useTheme } from '@/components/ThemeProvider'
import { SEOLandingPage, seoPages } from '@/components/SEOLandingPage'
import { PlatformLandingPage } from '@/components/PlatformLandingPage'
import { platforms } from '@/platforms/registry'
import { ProProvider } from '@/contexts/ProContext'
import { UpgradeModal } from '@/components/UpgradeModal'

function AppContent() {
  const [seoPage, setSeoPage] = useState<string | null>(null)
  const [platformLandingPage, setPlatformLandingPage] = useState<string | null>(null)
  const [initialPlatform, setInitialPlatform] = useState<string | null>(null)
  const { theme } = useTheme()

  useEffect(() => {
    const path = window.location.pathname.slice(1)
    if (seoPages.includes(path)) {
      setSeoPage(path)
    } else if (path.endsWith('-calculator') && !path.includes('-rpm-') && !path.includes('-rates') && !path.includes('-revenue') && !path.includes('-income')) {
      const platformId = path.replace('-calculator', '')
      const validPlatform = platforms.find(p => p.id === platformId)
      if (validPlatform) {
        setPlatformLandingPage(platformId)
      }
    }
  }, [])

  return (
    <>
      <UpgradeModal theme={theme} />
      {seoPage ? (
        <SEOLandingPage
          pageId={seoPage}
          onNavigateToCalculator={() => {
            setSeoPage(null)
            window.history.pushState({}, '', '/')
          }}
        />
      ) : platformLandingPage ? (
        <PlatformLandingPage
          platformId={platformLandingPage}
          onOpenCalculator={(id) => {
            setPlatformLandingPage(null)
            setInitialPlatform(id)
            window.history.pushState({}, '', '/')
          }}
        />
      ) : (
        <Calculator initialPlatform={initialPlatform} />
      )}
    </>
  )
}

function App() {
  return (
    <ThemeProvider>
      <ProProvider>
        <ErrorBoundary>
          <AppContent />
        </ErrorBoundary>
      </ProProvider>
    </ThemeProvider>
  )
}

export default App
