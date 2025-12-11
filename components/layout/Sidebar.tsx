'use client'

import { useState } from 'react'
import { ACCOUNTS, PLATFORM_LABELS, type Platform } from '@/lib/config/accounts'

export type SidebarFilters = {
  platforms: Platform[]
  accounts: string[]
}

type SidebarProps = {
  onChange?: (filters: SidebarFilters) => void
}

export function Sidebar({ onChange }: SidebarProps) {
  const [selectedPlatforms, setSelectedPlatforms] = useState<Platform[]>(['facebook', 'instagram', 'youtube'])
  const [selectedAccounts, setSelectedAccounts] = useState<string[]>(ACCOUNTS.map((a) => a.id))

  const handlePlatformToggle = (platform: Platform) => {
    const nextPlatforms = selectedPlatforms.includes(platform)
      ? selectedPlatforms.filter((p) => p !== platform)
      : [...selectedPlatforms, platform]

    setSelectedPlatforms(nextPlatforms)
    const nextAccounts = selectedAccounts.filter((acct) => nextPlatforms.includes(ACCOUNTS.find((a) => a.id === acct)?.platform as Platform))
    setSelectedAccounts(nextAccounts)
    onChange?.({ platforms: nextPlatforms, accounts: nextAccounts })
  }

  const handleAccountToggle = (accountId: string) => {
    const nextAccounts = selectedAccounts.includes(accountId)
      ? selectedAccounts.filter((a) => a !== accountId)
      : [...selectedAccounts, accountId]
    setSelectedAccounts(nextAccounts)
    onChange?.({ platforms: selectedPlatforms, accounts: nextAccounts })
  }

  return (
    <aside className="w-72 shrink-0 border-r border-slate-800 bg-slate-900/40 p-6 backdrop-blur">
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold text-white">Platforms</h2>
          <div className="mt-3 space-y-2">
            {Object.entries(PLATFORM_LABELS).map(([value, label]) => {
              const platform = value as Platform
              const checked = selectedPlatforms.includes(platform)
              return (
                <label key={platform} className="flex cursor-pointer items-center gap-3 rounded-lg border border-slate-800 bg-slate-900/50 px-3 py-2 text-sm text-slate-200">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-slate-700 bg-slate-900 text-indigo-500"
                    checked={checked}
                    onChange={() => handlePlatformToggle(platform)}
                  />
                  <span>{label}</span>
                </label>
              )
            })}
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-white">Accounts</h2>
          <div className="mt-3 space-y-3">
            {selectedPlatforms.map((platform) => (
              <div key={platform} className="rounded-lg border border-slate-800 bg-slate-900/50 p-3">
                <p className="text-xs uppercase tracking-wide text-slate-400">{PLATFORM_LABELS[platform]}</p>
                <div className="mt-2 space-y-2">
                  {ACCOUNTS.filter((acct) => acct.platform === platform).map((account) => (
                    <label key={account.id} className="flex cursor-pointer items-center gap-3 text-sm text-slate-200">
                      <input
                        type="checkbox"
                        className="h-4 w-4 rounded border-slate-700 bg-slate-900 text-indigo-500"
                        checked={selectedAccounts.includes(account.id)}
                        onChange={() => handleAccountToggle(account.id)}
                      />
                      <span>{account.name}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  )
}
