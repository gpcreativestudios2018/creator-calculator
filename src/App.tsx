import { Calculator } from '@/components/Calculator'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { ThemeProvider } from '@/components/ThemeProvider'

function App() {
  return (
    <ThemeProvider>
      <ErrorBoundary>
        <Calculator />
      </ErrorBoundary>
    </ThemeProvider>
  )
}

export default App
