export interface OrizSiteConfig {
  slug: string
  name: string
  origin: string
  tagline: string
  description?: string
}

export const SITE_CONFIG: OrizSiteConfig = {
  slug: 'travel',
  name: 'Travel',
  origin: 'https://travel-blog.oriz.in',
  tagline: 'Field notes for Indian travellers — budget routes, solo safety, nomad visas',
  description:
    'Field notes for Indian travellers — budget routes, solo-travel safety, and digital-nomad visas, logged mile by mile.',
}
