import type { Kpi } from '@/lib/types/analytics'

export function KpiCard({ label, value, change }: Kpi) {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-slate-800 bg-slate-900/60 p-4 shadow-lg shadow-slate-900/30">
      <p className="text-sm text-slate-400">{label}</p>
      <div className="flex items-baseline justify-between">
        <span className="text-3xl font-semibold text-white">{value}</span>
        {change ? <span className="text-xs text-emerald-400">{change}</span> : null}
      </div>
    </div>
  )
}
