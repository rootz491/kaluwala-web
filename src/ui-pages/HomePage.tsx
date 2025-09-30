'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { AdSenseAd } from '@/components/adsense'
import { getSampleData } from '@/lib/sanity'
import { SanityDocument } from '@/types/sanity'

export function HomePage() {
  const [sanityStatus, setSanityStatus] = useState<'loading' | 'connected' | 'error'>('loading')
  const [sanityData, setSanityData] = useState<SanityDocument[]>([])

  useEffect(() => {
    const testSanityConnection = async () => {
      try {
        const data = await getSampleData()
        setSanityData(data)
        setSanityStatus('connected')
      } catch (error) {
        console.error('Sanity connection failed:', error)
        setSanityStatus('error')
      }
    }

    testSanityConnection()
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <header className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 gradient-text">
            Kaluwala Web
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A modern web application built with Next.js, Sanity CMS, Tailwind CSS, and shadcn/ui
          </p>
        </header>

        {/* Status Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {/* Next.js Status */}
          <div className="p-6 border rounded-lg bg-card">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <h3 className="font-semibold">Next.js 15</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              App Router with TypeScript support enabled
            </p>
          </div>

          {/* Tailwind CSS Status */}
          <div className="p-6 border rounded-lg bg-card">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <h3 className="font-semibold">Tailwind CSS v4</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Utility-first CSS framework configured
            </p>
          </div>

          {/* shadcn/ui Status */}
          <div className="p-6 border rounded-lg bg-card">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <h3 className="font-semibold">shadcn/ui</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Beautiful UI components library ready
            </p>
          </div>

          {/* Sanity CMS Status */}
          <div className="p-6 border rounded-lg bg-card">
            <div className="flex items-center gap-2 mb-2">
              <div className={`w-3 h-3 rounded-full ${
                sanityStatus === 'connected' ? 'bg-green-500' : 
                sanityStatus === 'error' ? 'bg-red-500' : 'bg-yellow-500'
              }`}></div>
              <h3 className="font-semibold">Sanity CMS</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              {sanityStatus === 'loading' && 'Testing connection...'}
              {sanityStatus === 'connected' && 'Client configured and ready'}
              {sanityStatus === 'error' && 'Configure environment variables'}
            </p>
          </div>
        </div>

        {/* Demo Section */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <h2 className="text-2xl font-bold mb-6">Demo Components</h2>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button variant="default">Primary Button</Button>
            <Button variant="secondary">Secondary Button</Button>
            <Button variant="outline">Outline Button</Button>
            <Button variant="ghost">Ghost Button</Button>
          </div>
        </div>

        {/* AdSense Demo Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center">Google AdSense Integration</h2>
          <div className="p-6 border rounded-lg bg-card space-y-4">
            <div className="text-center">
              <h3 className="font-semibold mb-2">Ad Demo</h3>
              <p className="text-sm text-muted-foreground mb-4">
                AdSense is configured and ready. Ads will appear once approved by Google.
              </p>
              
              {/* Demo Ad Placeholder */}
              <div className="border-2 border-dashed border-muted p-8 rounded-lg">
                <AdSenseAd 
                  adSlot="your-ad-slot-id"
                  adFormat="auto"
                  className="demo-ad"
                />
                <p className="text-sm text-muted-foreground mt-2">
                  📢 Ad space - Replace with your actual ad slot ID
                </p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-medium mb-2">✅ Configured:</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• AdSense script loaded</li>
                  <li>• ads.txt file in place</li>
                  <li>• Publisher ID: pub-1885905784997014</li>
                  <li>• Responsive ads enabled</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">📋 Next Steps:</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Create ad units in AdSense</li>
                  <li>• Replace demo slot IDs</li>
                  <li>• Wait for approval</li>
                  <li>• Monitor performance</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Sanity Data Preview */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">Sanity CMS Integration</h2>
          <div className="p-6 border rounded-lg bg-card">
            <h3 className="font-semibold mb-4">Connection Status:</h3>
            {sanityStatus === 'loading' && (
              <p className="text-muted-foreground">Testing Sanity connection...</p>
            )}
            {sanityStatus === 'error' && (
              <div className="space-y-2">
                <p className="text-red-500">Connection failed. Please configure your environment variables:</p>
                <div className="bg-muted p-4 rounded text-sm font-mono">
                  <p>NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id</p>
                  <p>NEXT_PUBLIC_SANITY_DATASET=production</p>
                  <p>NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01</p>
                </div>
              </div>
            )}
            {sanityStatus === 'connected' && (
              <div className="space-y-2">
                <p className="text-green-600">✅ Successfully connected to Sanity!</p>
                <p className="text-sm text-muted-foreground">
                  Data retrieved: {sanityData.length} documents
                </p>
                {sanityData.length === 0 && (
                  <p className="text-sm text-muted-foreground">
                    No documents found. Create some content in your Sanity Studio to see data here.
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Next Steps */}
        <div className="max-w-2xl mx-auto mt-16 p-6 border rounded-lg bg-muted/50">
          <h3 className="font-semibold mb-4">Next Steps:</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>1. Set up a Sanity project and configure environment variables</li>
            <li>2. Create schemas in Sanity Studio</li>
            <li>3. Add more shadcn/ui components as needed</li>
            <li>4. Build your application pages and components</li>
          </ul>
        </div>
      </div>
    </div>
  )
}