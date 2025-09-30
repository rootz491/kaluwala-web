'use client'

import { AdSenseAd } from './AdSenseAd'
import { AD_SLOTS } from '@/lib/adsense'

interface TestAdProps {
  className?: string
  style?: React.CSSProperties
  showLabel?: boolean
}

export function TestAd({ 
  className = '', 
  style = { display: 'block' },
  showLabel = false 
}: TestAdProps) {
  return (
    <div className={className}>
      {showLabel && (
        <p className="text-xs text-muted-foreground mb-2 text-center">Advertisement</p>
      )}
      <AdSenseAd 
        adSlot={AD_SLOTS.test}
        adFormat="auto"
        adStyle={style}
      />
    </div>
  )
}