'use client'

import Script from 'next/script'

export function AdSenseScript() {
  return (
    <Script
      async
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1885905784997014"
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  )
}