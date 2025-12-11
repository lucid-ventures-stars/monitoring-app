'use client'

import { useEffect, useMemo, useState } from 'react'
import { ACCOUNTS, PLATFORM_LABELS, type Account, type Platform } from '@/lib/config/accounts'

type Connection = {
  accessToken: string
  connectedAt: string
}

type ConnectionMap = Record<string, Connection>

const STORAGE_KEY = 'monitoring-app:connections'

function loadConnections(): ConnectionMap {
  if (typeof window === 'undefined') return {}
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as ConnectionMap) : {}
  } catch (error) {
    console.error('Failed to parse stored connections', error)
    return {}
  }
}

function persistConnections(map: ConnectionMap) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(map))
}

function groupAccountsByPlatform(accounts: Account[]) {
  return accounts.reduce<Record<Platform, Account[]>>(
    (acc, account) => {
      acc[account.platform].push(account)
      return acc
    },
    { facebook: [], instagram: [], youtube: [] },
  )
}

export function AccountConnections() {
  const [connections, setConnections] = useState<ConnectionMap>({})
  const [selectedAccount, setSelectedAccount] = useState<string>(ACCOUNTS[0]?.id ?? '')
  const [tokenInput, setTokenInput] = useState('')
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    const stored = loadConnections()
    setConnections(stored)
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (hydrated) {
      persistConnections(connections)
    }
  }, [connections, hydrated])

  const groupedAccounts = useMemo(() => groupAccountsByPlatform(ACCOUNTS), [])

  const connectedCount = Object.keys(connections).length

  const connectAccount = () => {
    if (!selectedAccount || !tokenInput.trim()) return
    setConnections((prev) => ({
      ...prev,
      [selectedAccount]: {
        accessToken: tokenInput.trim(),
        connectedAt: new Date().toISOString(),
      },
    }))
    setTokenInput('')
  }

  const disconnectAccount = (accountId: string) => {
    setConnections((prev) => {
      const next = { ...prev }
      delete next[accountId]
      return next
    })
  }

  return (
    <section className="space-y-4 rounded-xl border border-slate-800 bg-slate-900/40 p-6 shadow-xl shadow-slate-900/40">
      <header className="flex flex-col justify-between gap-3 lg:flex-row lg:items-center">
        <div>
          <p className="text-sm uppercase tracking-wide text-slate-400">Account access</p>
          <h2 className="text-2xl font-semibold text-white">Connect multiple social accounts</h2>
          <p className="mt-1 text-sm text-slate-400">
            Store access tokens securely in your browser so Facebook, Instagram, and YouTube profiles stay connected.
          </p>
        </div>
        <div className="rounded-lg border border-slate-800 bg-slate-950 px-4 py-3 text-center">
          <p className="text-xs uppercase tracking-wide text-slate-400">Connected</p>
          <p className="text-2xl font-semibold text-indigo-300">{connectedCount}</p>
        </div>
      </header>

      <div className="flex flex-col gap-4 rounded-lg border border-slate-800 bg-slate-900/60 p-4 sm:flex-row sm:items-end sm:gap-3">
        <div className="flex-1 space-y-1">
          <label className="text-sm font-medium text-slate-200">Account</label>
          <select
            value={selectedAccount}
            onChange={(event) => setSelectedAccount(event.target.value)}
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 focus:border-indigo-500 focus:outline-none"
          >
            {ACCOUNTS.map((account) => (
              <option key={account.id} value={account.id}>
                {PLATFORM_LABELS[account.platform]} — {account.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex-1 space-y-1">
          <label className="text-sm font-medium text-slate-200">Access token</label>
          <input
            type="text"
            value={tokenInput}
            onChange={(event) => setTokenInput(event.target.value)}
            placeholder="Paste token from Meta or Google"
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 focus:border-indigo-500 focus:outline-none"
          />
        </div>
        <button
          onClick={connectAccount}
          className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-500"
        >
          Connect account
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {(Object.keys(groupedAccounts) as Platform[]).map((platform) => (
          <div key={platform} className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-400">{PLATFORM_LABELS[platform]}</p>
                <p className="text-lg font-semibold text-white">
                  {groupedAccounts[platform].length} account{groupedAccounts[platform].length === 1 ? '' : 's'}
                </p>
              </div>
              <span className="rounded-full border border-slate-800 bg-slate-950 px-3 py-1 text-xs text-slate-300">
                {groupedAccounts[platform].filter((acct) => connections[acct.id]).length} connected
              </span>
            </div>

            <div className="mt-4 space-y-3">
              {groupedAccounts[platform].map((account) => {
                const connection = connections[account.id]
                return (
                  <div
                    key={account.id}
                    className="rounded-lg border border-slate-800 bg-slate-950/60 p-3 text-sm text-slate-200"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-semibold text-white">{account.name}</p>
                        {connection ? (
                          <p className="text-xs text-slate-400">
                            Connected {new Date(connection.connectedAt).toLocaleString()}
                          </p>
                        ) : (
                          <p className="text-xs text-slate-500">Not connected</p>
                        )}
                      </div>
                      {connection ? (
                        <button
                          onClick={() => disconnectAccount(account.id)}
                          className="rounded-md border border-slate-700 px-2 py-1 text-xs text-slate-200 transition hover:border-red-500 hover:text-red-200"
                        >
                          Disconnect
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            setSelectedAccount(account.id)
                            setTokenInput(`mock-token-${account.id}`)
                          }}
                          className="rounded-md border border-slate-700 px-2 py-1 text-xs text-slate-200 transition hover:border-indigo-500 hover:text-indigo-200"
                        >
                          Prepare token
                        </button>
                      )}
                    </div>
                    {connection ? (
                      <p className="mt-2 truncate rounded-md border border-slate-800 bg-slate-900 px-2 py-1 text-[11px] text-slate-300">
                        Token: {connection.accessToken}
                      </p>
                    ) : null}
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
