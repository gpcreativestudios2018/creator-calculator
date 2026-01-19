import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import './index.css'
import App from './App.tsx'

// Sentry disabled until valid DSN is configured
// import * as Sentry from "@sentry/react";
// Sentry.init({
//   dsn: "YOUR_VALID_DSN_HERE",
//   enabled: import.meta.env.PROD,
//   tracesSampleRate: 0.1,
// });

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <Analytics />
    <SpeedInsights />
  </StrictMode>,
)
