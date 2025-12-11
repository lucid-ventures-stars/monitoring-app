import type { Account, Platform } from '../config/accounts'
import type { InventoryItem, PostMetrics, Kpi } from '../types/analytics'

// TODO: Replace mocked responses with real API calls to Facebook Graph, Instagram Graph, and YouTube Data APIs.
export async function fetchPlatformKpis(
  _platforms: Platform[],
  _accounts: Account[],
): Promise<Kpi[]> {
  return [
    { label: 'Total Likes', value: '12.5k', change: '+4.2% vs last week' },
    { label: 'Comments', value: '3.1k', change: '+1.1% vs last week' },
    { label: 'Views', value: '210k', change: '+12.6% vs last week' },
  ]
}

// TODO: Replace with per-platform fetching and mapping to domain model once APIs are wired.
export async function fetchTopPosts(
  _platforms: Platform[],
  _accounts: Account[],
): Promise<PostMetrics[]> {
  return [
    {
      id: 'post-1',
      platform: 'facebook',
      account: { id: 'fb-page-1', name: 'FB Page - North Region', platform: 'facebook' },
      title: 'Community highlights and wins',
      url: 'https://facebook.com/posts/1',
      publishDate: '2024-08-12',
      likes: 320,
      comments: 45,
      views: 5000,
    },
    {
      id: 'post-2',
      platform: 'instagram',
      account: { id: 'ig-biz-1', name: 'IG Biz - Fashion', platform: 'instagram' },
      title: 'Autumn lookbook drop',
      url: 'https://instagram.com/p/abc',
      publishDate: '2024-08-10',
      likes: 980,
      comments: 120,
      views: 18000,
    },
  ]
}

// TODO: Connect to Google Sheets inventories (via Google Drive/Sheets APIs) and normalize rows.
export async function fetchContentInventory(): Promise<InventoryItem[]> {
  return [
    {
      id: 'inventory-1',
      status: 'SCHEDULED',
      platform: 'instagram',
      title: 'Behind-the-scenes Reel',
      scheduledDate: '2024-08-18',
    },
    {
      id: 'inventory-2',
      status: 'DRAFT',
      platform: 'youtube',
      title: 'Product teardown',
      scheduledDate: '2024-08-22',
    },
    {
      id: 'inventory-3',
      status: 'PUBLISHED',
      platform: 'facebook',
      title: 'Regional community meetup recap',
      scheduledDate: '2024-08-08',
    },
  ]
}
