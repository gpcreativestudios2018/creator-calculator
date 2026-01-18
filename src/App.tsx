import { useState, useEffect, lazy, Suspense } from 'react'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { ThemeProvider, useTheme } from '@/components/ThemeProvider'
import { seoPages } from '@/data/seoPages'
import { platforms } from '@/platforms/registry'
import { ProProvider } from '@/contexts/ProContext'
import { UpgradeModal } from '@/components/UpgradeModal'

const Calculator = lazy(() => import('@/components/Calculator').then(m => ({ default: m.Calculator })))
const SEOLandingPage = lazy(() => import('@/components/SEOLandingPage').then(m => ({ default: m.SEOLandingPage })))
const PlatformLandingPage = lazy(() => import('@/components/PlatformLandingPage').then(m => ({ default: m.PlatformLandingPage })))

function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
        <p className="text-muted-foreground text-sm">Loading...</p>
      </div>
    </div>
  )
}

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
      <Suspense fallback={<LoadingSpinner />}>
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
      </Suspense>
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
