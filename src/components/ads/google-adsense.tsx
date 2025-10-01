"use client";

import Script from "next/script";
import { useEffect } from "react";

interface GoogleAdSenseProps {
  adClient: string;
  adSlot: string;
  adFormat?: string;
  adLayoutKey?: string;
  style?: React.CSSProperties;
  className?: string;
}

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

export function GoogleAdSense({
  adClient,
  adSlot,
  adFormat = "fluid",
  adLayoutKey = "-6t+ed+2i-1n-4w",
  style = { display: "block" },
  className = "",
}: GoogleAdSenseProps) {
  useEffect(() => {
    try {
      if (typeof window !== "undefined" && window.adsbygoogle) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (error) {
      console.error("AdSense error:", error);
    }
  }, []);

  return (
    <>
      <Script
        async
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adClient}`}
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />
      <ins
        className={`adsbygoogle ${className}`}
        style={style}
        data-ad-format={adFormat}
        data-ad-layout-key={adLayoutKey}
        data-ad-client={adClient}
        data-ad-slot={adSlot}
      />
    </>
  );
}
