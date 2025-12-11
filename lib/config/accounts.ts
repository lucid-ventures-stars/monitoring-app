export type Platform = 'facebook' | 'instagram' | 'youtube'

export type Account = {
  id: string
  name: string
  platform: Platform
}

export const PLATFORM_LABELS: Record<Platform, string> = {
  facebook: 'Facebook',
  instagram: 'Instagram',
  youtube: 'YouTube',
}

export const ACCOUNTS: Account[] = [
  { id: 'fb-page-1', name: 'FB Page - North Region', platform: 'facebook' },
  { id: 'fb-page-2', name: 'FB Page - South Region', platform: 'facebook' },
  { id: 'ig-biz-1', name: 'IG Biz - Fashion', platform: 'instagram' },
  { id: 'ig-biz-2', name: 'IG Biz - Lifestyle', platform: 'instagram' },
  { id: 'yt-channel-1', name: 'YouTube - Product Reviews', platform: 'youtube' },
  { id: 'yt-channel-2', name: 'YouTube - Tutorials', platform: 'youtube' },
]

export const PLATFORM_ENV_VARS = {
  facebook: 'META_ACCESS_TOKEN',
  instagram: 'META_ACCESS_TOKEN',
  youtube: 'YOUTUBE_API_KEY',
}

export const GOOGLE_SHEETS_ENV = {
  serviceAccountKey: 'GOOGLE_SERVICE_ACCOUNT_KEY',
  inventorySheetIds: ['GOOGLE_SHEET_ID_INVENTORY'],
}
