"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { FileText, FolderOpen, Home, Menu, Search } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navigation = [
  { name: "Home", href: "/", icon: Home },
  { name: "Blog", href: "/blog", icon: FileText },
  { name: "Categories", href: "/blog/categories", icon: FolderOpen },
  { name: "Search", href: "/blog/search", icon: Search },
];

const blogSubNav = [
  { name: "All Posts", href: "/blog" },
  { name: "Tech", href: "/blog/category/technology" },
  { name: "Development", href: "/blog/category/development" },
  { name: "Tutorials", href: "/blog/category/tutorials" },
];

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isBlogSection = pathname.startsWith("/blog");

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <div className="font-bold text-xl gradient-text">Kaluwala</div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "transition-colors hover:text-foreground/80",
                  pathname === item.href
                    ? "text-foreground"
                    : "text-foreground/60"
                )}
              >
                <div className="flex items-center space-x-2">
                  <item.icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </div>
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          {/* Blog Sub-navigation for desktop */}
          {isBlogSection && (
            <nav className="hidden lg:flex items-center space-x-4">
              {blogSubNav.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "text-sm transition-colors hover:text-foreground",
                    pathname === item.href
                      ? "text-foreground font-medium"
                      : "text-muted-foreground"
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          )}

          {/* Mobile menu */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
              >
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="pr-0">
              <SheetHeader>
                <SheetTitle>
                  <Link href="/" className="flex items-center">
                    <span className="font-bold gradient-text">Kaluwala</span>
                  </Link>
                </SheetTitle>
                <SheetDescription>Navigate through the site</SheetDescription>
              </SheetHeader>
              <div className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
                <div className="flex flex-col space-y-3">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        "flex items-center space-x-2 text-foreground/60 transition-colors hover:text-foreground",
                        pathname === item.href && "text-foreground font-medium"
                      )}
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.name}</span>
                    </Link>
                  ))}

                  {isBlogSection && (
                    <>
                      <div className="py-2">
                        <div className="h-px bg-border" />
                      </div>
                      <div className="pb-2">
                        <h4 className="text-sm font-semibold">
                          Blog Categories
                        </h4>
                      </div>
                      {blogSubNav.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className={cn(
                            "pl-4 text-sm text-foreground/60 transition-colors hover:text-foreground",
                            pathname === item.href &&
                              "text-foreground font-medium"
                          )}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>

          {/* Right side actions */}
          <div className="flex items-center space-x-2">
            {isBlogSection && (
              <Badge variant="outline" className="hidden sm:inline-flex">
                Blog
              </Badge>
            )}
            <Button variant="ghost" size="sm" asChild>
              <Link href="/blog/search">
                <Search className="h-4 w-4" />
                <span className="sr-only">Search</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
