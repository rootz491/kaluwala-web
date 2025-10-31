import { AdSenseScript } from "@/components/adsense";
import { StructuredData } from "@/components/seo/structured-data";
import TelegramProvider from "@/context/telegram-context";
import { generateSEOMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = generateSEOMetadata({
  title: "Kaluwala Web",
  description:
    "A modern web application built with Next.js, Sanity CMS, Tailwind CSS, and shadcn/ui",
  type: "website",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AdSenseScript />
        <StructuredData
          type="organization"
          data={{
            title: "Kaluwala",
            description:
              "A modern web development company specializing in Next.js, React, and modern web technologies.",
          }}
        />
        <TelegramProvider>
          <div className="relative flex min-h-screen flex-col">
            <main className="flex-1">{children}</main>
          </div>
        </TelegramProvider>
      </body>
    </html>
  );
}
