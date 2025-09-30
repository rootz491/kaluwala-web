import { Author, Post } from "@/types/sanity"
import {
  generateArticleStructuredData,
  generateWebsiteStructuredData,
  generateOrganizationStructuredData,
  generateBreadcrumbStructuredData,
  generatePersonStructuredData
} from "@/lib/structured-data"

interface StructuredDataProps {
  type: "article" | "website" | "organization" | "breadcrumb" | "person"
  data?:
    | Post
    | Author
    | { title: string; description: string; url?: string }
    | Array<{ name: string; url: string }>
    | Record<string, unknown>
}

export function StructuredData({ type, data }: StructuredDataProps) {
  let structuredData: unknown = {}

  switch (type) {
    case "article":
      structuredData = generateArticleStructuredData(data as Post)
      break
    case "website":
      structuredData = generateWebsiteStructuredData(
        data as { title: string; description: string; url?: string }
      )
      break
    case "organization":
      structuredData = data && Object.keys(data).length > 0 
        ? (data as Record<string, unknown>)
        : generateOrganizationStructuredData()
      break
    case "breadcrumb":
      structuredData = generateBreadcrumbStructuredData(
        data as Array<{ name: string; url: string }>
      )
      break
    case "person":
      structuredData = generatePersonStructuredData(data as Author)
      break
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}