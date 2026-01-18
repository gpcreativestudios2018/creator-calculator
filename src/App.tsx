import { useState, useEffect } from 'react'
import { Calculator } from '@/components/Calculator'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { ThemeProvider } from '@/components/ThemeProvider'
import { SEOLandingPage, seoPages } from '@/components/SEOLandingPage'

function App() {
  const [seoPage, setSeoPage] = useState<string | null>(null)

  useEffect(() => {
    const path = window.location.pathname.slice(1)
    if (seoPages.includes(path)) {
      setSeoPage(path)
    }
  }, [])

  return (
    <ThemeProvider>
      <ErrorBoundary>
        {seoPage ? (
          <SEOLandingPage
            pageId={seoPage}
            onNavigateToCalculator={() => {
              setSeoPage(null)
              window.history.pushState({}, '', '/')
            }}
          />
        ) : (
          <Calculator />
        )}
      </ErrorBoundary>
    </ThemeProvider>
  )
}

export default App
