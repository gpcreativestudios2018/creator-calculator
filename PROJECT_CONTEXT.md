# PROJECT CONTEXT — Creator Calculator

> **Purpose:** Quick reference for Claude to understand the codebase without reading 2,400 lines.  
> **Last Updated:** January 2025

---

## 📁 Current File Structure

```
/creator-calculator
├── index.html          # ENTIRE APP (2,400 lines, single-file React)
├── robots.txt          # SEO
├── sitemap.xml         # SEO
├── ROADMAP.md          # 104-item gold standard plan
├── PROJECT_CONTEXT.md  # This file
└── .git/               # Version control
```

---

## 🛠 Tech Stack (Current)

| Layer | Technology |
|-------|------------|
| Framework | React 18 (UMD via CDN) |
| JSX | Babel in-browser (type="text/babel") |
| Styling | Tailwind CSS (CDN) |
| Build | None — everything inline |
| Hosting | Vercel (static) |
| Analytics | Google Analytics (G-58T3ZLSLYP) |
| Ads | Google AdSense |

---

## 🎯 What The App Does

Multi-platform creator revenue calculator. Users select a platform, enter metrics (followers, views, etc.), and see estimated monthly/yearly earnings.

**11 Platforms Currently:**
1. YouTube
2. TikTok
3. Instagram
4. X (Twitter)
5. Facebook
6. LinkedIn
7. Snapchat
8. Pinterest
9. Twitch
10. Kick
11. Newsletter

---

## ⚛️ React Structure

### Single Component
Everything lives in one function: `UltimateCreatorCalculator()`

### State Variables (useState)
```
activeTab, compareEnabled, compareTab

YouTube: ytSubs, ytViews, ytCPM
TikTok: ttFollowers, ttViews, ttLikes, ttComments
Instagram: igFollowers, igLikes, igComments
X: xFollowers, xImpressions, xSubscribers
Facebook: fbFollowers, fbWatchMinutes
LinkedIn: liFollowers, liNewsletterSubs
Snapchat: scFollowers, scSpotlightViews
Pinterest: pinFollowers, pinMonthlyViews, pinIdeaPins
Twitch: twSubs, twAvgViewers, twHoursStreamed
Kick: kickSubs, kickAvgViewers
Newsletter: nlSubs, nlPaidPercent, nlPrice
```

### Key Data Structures
```javascript
// Platform definitions
const platforms = [
  { id: "youtube", name: "YouTube", icon: Play, gradient: "from-red-500 to-red-700" },
  // ... 10 more
];

// Presets per platform
const presets = {
  youtube: { small: {...}, mid: {...}, big: {...} },
  // ... for each platform
};
```

### Key Functions
- `handleTabChange(tabId)` — switches platform + GA event
- `applyPreset(platformId, tier)` — loads small/mid/big scenario
- `getSummaryForTab(tabId)` — returns revenue estimate for any platform
- `formatCurrency(value)` — formats numbers as $X,XXX

---

## 🧮 Calculation Examples

**YouTube:**
```javascript
const ytAdRevenue = (ytViews / 1000) * ytCPM * 0.55;
const ytYearly = ytAdRevenue * 12;
const ytSponsor = ytSubs >= 100000 ? ytSubs * 0.1 : ytSubs * 0.05;
```

**TikTok:**
```javascript
const ttEngagement = ((ttLikes + ttComments) / ttViews) * 100;
const ttCreatorFund = ttViews * 0.02;
const ttBrandDeal = ttFollowers >= 10000 ? ttFollowers * 0.015 : 0;
```

**Newsletter:**
```javascript
const nlPaidSubs = Math.floor((nlSubs * nlPaidPercent) / 100);
const nlMRR = nlPaidSubs * nlPrice;
const nlARR = nlMRR * 12;
```

---

## 🎨 UI Patterns

### Platform Tabs
- Grid of buttons at top
- Active tab: scaled up (scale-110), full opacity, shadow
- Inactive: 60% opacity, hover scales to 105%
- Each has gradient background + icon

### Input Section (Left Column)
- Dark card (bg-zinc-900)
- Colored border matching platform
- Labels + number inputs + range sliders
- Explanatory text at bottom

### Results Section (Right Column)
- Gradient card with main revenue number
- Secondary dark card with breakdown
- Platform-specific metrics

### Compare Mode
- Toggle checkbox
- Side-by-side cards when enabled

### Presets
- Dropdown: Custom / Small / Mid / Big
- Auto-fills inputs for that scenario

---

## 🔗 External Links

- **Live site:** https://creator-calculator.vercel.app/
- **GitHub:** https://github.com/gpcreativestudios2018/creator-calculator

---

## ✅ What Works Well

- Real-time calculations (no submit button)
- Clean dark UI aesthetic
- Mobile responsive
- Good SEO (meta tags, JSON-LD, sitemap)
- Accessibility basics (skip link, ARIA labels)
- Compare feature
- Preset scenarios
- GA tracking on tab changes

---

## ❌ What Needs Work

- Everything in one 2,400-line file
- No build system (Babel in browser = slow)
- No TypeScript
- No input validation
- No data persistence
- Basic calculations (no niche/geo adjustments)
- Limited visualizations (no charts)
- No export/share functionality

---

## 🚀 Next Steps

See ROADMAP.md — Starting with **Phase 1: UI Overhaul**

User has a screenshot of their design vision for the new landing page.

---

*This file is for Claude's reference. Human can ignore.*
