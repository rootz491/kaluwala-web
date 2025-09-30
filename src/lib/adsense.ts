// AdSense configuration and utilities
export const ADSENSE_CONFIG = {
  publisherId: 'ca-pub-1885905784997014',
  scriptUrl: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js',
} as const

// Common ad slot configurations
export const AD_SLOTS = {
  // You can add your actual ad slot IDs here once you create them in AdSense
  header: 'your-header-ad-slot',
  sidebar: 'your-sidebar-ad-slot', 
  content: 'your-content-ad-slot',
  footer: 'your-footer-ad-slot',
} as const

// Helper function to push ads to adsbygoogle
export const pushAd = () => {
  if (typeof window !== 'undefined' && window.adsbygoogle) {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch (error) {
      console.error('AdSense push error:', error)
    }
  }
}

// Check if AdSense is loaded
export const isAdSenseLoaded = (): boolean => {
  return typeof window !== 'undefined' && !!window.adsbygoogle
}