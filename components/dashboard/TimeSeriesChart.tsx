'use client'

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from 'recharts'

const sampleData = [
  { date: 'Aug 1', engagement: 3200 },
  { date: 'Aug 5', engagement: 4800 },
  { date: 'Aug 9', engagement: 4100 },
  { date: 'Aug 12', engagement: 6200 },
  { date: 'Aug 15', engagement: 5600 },
]

export function TimeSeriesChart() {
  return (
    <div className="h-72 w-full rounded-xl border border-slate-800 bg-slate-900/60 p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-400">Engagement over time</p>
          <p className="text-lg font-semibold text-white">Last 2 weeks</p>
        </div>
        <span className="rounded-full bg-indigo-500/10 px-3 py-1 text-xs text-indigo-300">Placeholder</span>
      </div>
      <div className="mt-4 h-56">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={sampleData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
            <XAxis dataKey="date" stroke="#94a3b8" tickLine={false} axisLine={false} />
            <YAxis stroke="#94a3b8" tickLine={false} axisLine={false} />
            <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1f2937', color: '#e2e8f0' }} />
            <Line type="monotone" dataKey="engagement" stroke="#818cf8" strokeWidth={2} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
