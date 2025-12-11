# Monitoring App (Unified Social Analytics)

This Next.js 14 project provides a unified analytics dashboard for Facebook, Instagram, and YouTube performance plus a Google Sheets content inventory monitor.

## Initial structure overview

Pseudo-tree of key files and their roles:

```
app/
  layout.tsx            # Root layout, fonts, and global shell
  globals.css           # Tailwind layers and base theme colors
  (dashboard)/
    layout.tsx          # Dashboard shell with sidebar
    page.tsx            # Main analytics dashboard page
components/
  layout/Sidebar.tsx                # Platform/account filters (mocked for now)
  dashboard/KpiCard.tsx             # KPI display card
  dashboard/TimeSeriesChart.tsx     # Placeholder time-series chart (Recharts)
  dashboard/PostsTable.tsx          # Table of top-performing posts
  dashboard/ContentInventoryTable.tsx # Inventory table wired to Sheets fetcher
  dashboard/AlertsPanel.tsx         # Warnings about scheduling gaps
lib/
  config/accounts.ts    # Platform/account registry and env var placeholders
  types/analytics.ts    # Shared domain types for KPIs, posts, inventory, alerts
  api/fetchers.ts       # TODO: External API integrations with mock responses
next.config.mjs         # Next.js config (server actions enabled)
postcss.config.js       # PostCSS pipeline for Tailwind
tailwind.config.ts      # Tailwind configuration and file scanning
package.json            # Project dependencies and scripts
```

## Getting started

1. Install dependencies: `npm install`
2. Run the dev server: `npm run dev`
3. Visit `http://localhost:3000` to view the dashboard.

> Note: API calls are currently mocked. TODO markers highlight where Facebook/Instagram Graph, YouTube Data API, and Google Sheets integrations will be wired in next steps.
