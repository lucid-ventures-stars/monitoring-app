import { ACCOUNTS } from '@/lib/config/accounts'
import { fetchContentInventory, fetchPlatformKpis, fetchTopPosts } from '@/lib/api/fetchers'
import { KpiCard } from '@/components/dashboard/KpiCard'
import { AccountConnections } from '@/components/dashboard/AccountConnections'
import { TimeSeriesChart } from '@/components/dashboard/TimeSeriesChart'
import { ContentInventoryTable } from '@/components/dashboard/ContentInventoryTable'
import { PostsTable } from '@/components/dashboard/PostsTable'
import { AlertsPanel } from '@/components/dashboard/AlertsPanel'

export default async function DashboardPage() {
  // TODO: Replace mocked fetchers with platform-specific API calls and server actions driven by URL search params.
  const kpis = await fetchPlatformKpis(['facebook', 'instagram', 'youtube'], ACCOUNTS)
  const posts = await fetchTopPosts(['facebook', 'instagram', 'youtube'], ACCOUNTS)
  const inventory = await fetchContentInventory()

  const alerts = [
    { id: 'alert-1', message: 'Low scheduled content for Instagram (3 items remaining)', severity: 'warning' as const },
    { id: 'alert-2', message: 'No content scheduled in the next 7 days for YouTube', severity: 'critical' as const },
  ]

  return (
    <div className="space-y-8">
      <header className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-400">Unified analytics</p>
          <h1 className="text-3xl font-semibold text-white">Social performance dashboard</h1>
        </div>
        <div className="rounded-full border border-slate-800 bg-slate-900/60 px-4 py-2 text-sm text-slate-300">
          Placeholder filters wired to sidebar
        </div>
      </header>

      <AccountConnections />

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map((kpi) => (
          <KpiCard key={kpi.label} {...kpi} />
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <TimeSeriesChart />
        </div>
        <AlertsPanel alerts={alerts} />
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <PostsTable posts={posts} />
        </div>
        <ContentInventoryTable items={inventory} />
      </section>
    </div>
  )
}
