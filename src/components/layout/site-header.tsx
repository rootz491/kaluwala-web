import Link from "next/link";

interface SiteHeaderProps {
  variant?: "default" | "overlay";
}

export function SiteHeader({ variant = "default" }: SiteHeaderProps) {
  const headerClasses =
    variant === "overlay"
      ? "absolute top-0 left-0 right-0 z-10 p-6 md:p-8"
      : "border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full";

  const navClasses =
    variant === "overlay"
      ? "flex items-center justify-between"
      : "container flex h-14 items-center justify-between";

  const logoClasses =
    variant === "overlay"
      ? "text-2xl md:text-3xl font-bold text-foreground"
      : "text-xl font-bold text-foreground";

  const linkClasses =
    variant === "overlay"
      ? "text-sm md:text-base font-medium text-foreground hover:text-muted-foreground transition-colors"
      : "text-sm font-medium text-foreground hover:text-muted-foreground transition-colors";

  return (
    <header className={headerClasses}>
      <nav className={navClasses}>
        <Link href="/" className={logoClasses}>
          Kaluwala
        </Link>
        <div className="flex gap-6 md:gap-8">
          <Link href="/blog" className={linkClasses}>
            Blogs
          </Link>
          <Link href="/news" className={linkClasses}>
            News
          </Link>
        </div>
      </nav>
    </header>
  );
}
