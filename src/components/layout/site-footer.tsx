import homepageContent from "@/data/homepage-content.json";
import { Instagram, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";

const socialIcons = {
  instagram: Instagram,
  linkedin: Linkedin,
  twitter: Twitter,
};

export function SiteFooter() {
  const { footer } = homepageContent;

  return (
    <footer className="bg-background border-t border-border py-16 md:py-20 px-6 md:px-12 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground">
              {footer.title}
            </h3>
            <p className="text-muted-foreground max-w-md">
              {footer.description}
            </p>
            <div className="flex gap-4 pt-4">
              {footer.social.map((item) => {
                const Icon = socialIcons[item.icon as keyof typeof socialIcons];
                return (
                  <Link
                    key={item.platform}
                    href={item.href}
                    className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                    aria-label={item.platform}
                  >
                    <Icon size={20} />
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Explore</h4>
            <ul className="space-y-2">
              {footer.navigation.explore.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Support</h4>
            <ul className="space-y-2">
              {footer.navigation.support.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
