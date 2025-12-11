import type { InventoryItem } from '@/lib/types/analytics'
import { PLATFORM_LABELS } from '@/lib/config/accounts'

const statusStyles: Record<InventoryItem['status'], string> = {
  DRAFT: 'bg-amber-500/10 text-amber-300',
  SCHEDULED: 'bg-indigo-500/10 text-indigo-200',
  PUBLISHED: 'bg-emerald-500/10 text-emerald-300',
}

export function ContentInventoryTable({ items }: { items: InventoryItem[] }) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-400">Content inventory</p>
          <p className="text-lg font-semibold text-white">Google Sheets monitor</p>
        </div>
        <span className="rounded-full bg-indigo-500/10 px-3 py-1 text-xs text-indigo-300">Placeholder</span>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-800 text-sm">
          <thead className="bg-slate-900/40 text-left text-xs uppercase text-slate-400">
            <tr>
              <th className="px-3 py-2">Title</th>
              <th className="px-3 py-2">Platform</th>
              <th className="px-3 py-2">Status</th>
              <th className="px-3 py-2">Scheduled</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-slate-800/30">
                <td className="px-3 py-2 text-slate-100">{item.title}</td>
                <td className="px-3 py-2 text-slate-200">{PLATFORM_LABELS[item.platform]}</td>
                <td className="px-3 py-2">
                  <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[item.status]}`}>
                    {item.status}
                  </span>
                </td>
                <td className="px-3 py-2 text-slate-300">{item.scheduledDate || '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
