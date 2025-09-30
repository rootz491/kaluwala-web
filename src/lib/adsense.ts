export const ADSENSE_CONFIG = {
  publisherId: 'ca-pub-1885905784997014',
  scriptUrl: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js',
} as const

export const AD_SLOTS = {
  test: '1114489979',
  header: 'your-header-ad-slot',
  sidebar: 'your-sidebar-ad-slot', 
  content: 'your-content-ad-slot',
  footer: 'your-footer-ad-slot',
} as const

export const pushAd = () => {
  if (typeof window !== 'undefined' && window.adsbygoogle) {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch (error) {
      console.error('AdSense push error:', error)
    }
  }
}

export const isAdSenseLoaded = (): boolean => {
  return typeof window !== 'undefined' && !!window.adsbygoogle
}