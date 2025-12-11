import type { Alert } from '@/lib/types/analytics'

export function AlertsPanel({ alerts }: { alerts: Alert[] }) {
  return (
    <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-amber-100">
      <div className="mb-2 flex items-center gap-2">
        <span className="text-xl">⚠️</span>
        <p className="text-sm font-semibold uppercase tracking-wide">Alerts</p>
      </div>
      <ul className="space-y-2 text-sm">
        {alerts.length === 0 ? <li className="text-amber-200/80">All systems look good.</li> : null}
        {alerts.map((alert) => (
          <li key={alert.id} className="flex items-start gap-2">
            <span className="mt-0.5 h-2 w-2 rounded-full bg-amber-300" />
            <p>{alert.message}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
