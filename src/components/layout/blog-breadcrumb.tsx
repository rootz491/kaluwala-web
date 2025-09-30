"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Home } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";

interface BreadcrumbItemData {
  title: string;
  href?: string;
  isCurrentPage?: boolean;
}

export function BlogBreadcrumb() {
  const pathname = usePathname();

  const generateBreadcrumbs = (): BreadcrumbItemData[] => {
    const segments = pathname.split("/").filter(Boolean);
    const breadcrumbs: BreadcrumbItemData[] = [{ title: "Home", href: "/" }];

    if (segments.length === 0) {
      return breadcrumbs;
    }

    // Handle blog routes
    if (segments[0] === "blog") {
      breadcrumbs.push({ title: "Blog", href: "/blog" });

      if (segments.length > 1) {
        if (segments[1] === "category" && segments[2]) {
          breadcrumbs.push({ title: "Categories", href: "/blog/categories" });
          breadcrumbs.push({
            title: decodeURIComponent(segments[2])
              .replace(/-/g, " ")
              .replace(/\b\w/g, (l) => l.toUpperCase()),
            isCurrentPage: true,
          });
        } else if (segments[1] === "author" && segments[2]) {
          breadcrumbs.push({ title: "Authors", href: "/blog/authors" });
          breadcrumbs.push({
            title: decodeURIComponent(segments[2])
              .replace(/-/g, " ")
              .replace(/\b\w/g, (l) => l.toUpperCase()),
            isCurrentPage: true,
          });
        } else if (segments[1] === "search") {
          breadcrumbs.push({ title: "Search", isCurrentPage: true });
        } else {
          // Individual blog post
          breadcrumbs.push({
            title: decodeURIComponent(segments[1])
              .replace(/-/g, " ")
              .replace(/\b\w/g, (l) => l.toUpperCase()),
            isCurrentPage: true,
          });
        }
      } else {
        breadcrumbs[breadcrumbs.length - 1].isCurrentPage = true;
      }
    }

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  if (breadcrumbs.length <= 1) {
    return null;
  }

  return (
    <div className="border-b bg-muted/30">
      <div className="container py-3">
        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumbs.map((item, index) => (
              <Fragment key={index}>
                <BreadcrumbItem>
                  {item.isCurrentPage ? (
                    <BreadcrumbPage>{item.title}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink asChild>
                      <Link href={item.href!} className="flex items-center">
                        {index === 0 && <Home className="h-4 w-4 mr-1" />}
                        {item.title}
                      </Link>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
                {index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
              </Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </div>
  );
}
