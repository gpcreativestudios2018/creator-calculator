import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "https://74c523624926e18fee29bd70a46a8f310o4510733366657024.ingest.us.sentry.io/4510733971947520",
  enabled: import.meta.env.PROD,
  tracesSampleRate: 0.1,
});

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <Analytics />
    <SpeedInsights />
  </StrictMode>,
)
