import { SiteFooter, SiteHeader } from "@/components/layout";

interface HomeLayoutProps {
  children: React.ReactNode;
}

export function HomeLayout({ children }: HomeLayoutProps) {
  return (
    <div className="relative">
      <SiteHeader variant="overlay" />
      {children}
      <SiteFooter />
    </div>
  );
}
