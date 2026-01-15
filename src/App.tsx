import { Calculator } from '@/components/Calculator'
import { ErrorBoundary } from '@/components/ErrorBoundary'

function App() {
  return (
    <ErrorBoundary>
      <Calculator />
    </ErrorBoundary>
  )
}

export default App
