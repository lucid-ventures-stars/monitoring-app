import type { Platform, Account } from '../config/accounts'

export type Kpi = {
  label: string
  value: string
  change?: string
}

export type PostMetrics = {
  id: string
  platform: Platform
  account: Account
  title: string
  url: string
  publishDate: string
  likes: number
  comments: number
  views?: number
}

export type InventoryItem = {
  id: string
  status: 'DRAFT' | 'SCHEDULED' | 'PUBLISHED'
  platform: Platform
  title: string
  scheduledDate?: string
}

export type Alert = {
  id: string
  message: string
  severity: 'info' | 'warning' | 'critical'
}
