import homepageContent from "@/data/homepage-content.json";
import { Instagram, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";

const socialIcons = {
  instagram: Instagram,
  linkedin: Linkedin,
  twitter: Twitter,
};

export default function HomePage() {
  const { hero, sections, footer } = homepageContent;

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <header className="absolute top-0 left-0 right-0 z-10 p-6 md:p-8">
        <nav className="flex items-center justify-between">
          <Link href="/" className="text-2xl md:text-3xl font-bold text-black">
            Kaluwala
          </Link>
          <div className="flex gap-6 md:gap-8">
            <Link
              href="/blog"
              className="text-sm md:text-base font-medium text-black hover:text-gray-600 transition-colors"
            >
              Blogs
            </Link>
            <Link
              href="/news"
              className="text-sm md:text-base font-medium text-black hover:text-gray-600 transition-colors"
            >
              News
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center px-6 md:px-12 lg:px-16 pt-20 lg:pt-0">
        <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <div className="space-y-6 order-2 lg:order-1">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-black">
              {hero.title}
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed max-w-lg">
              {hero.subtitle}
            </p>
          </div>
          <div className="relative aspect-square max-w-sm sm:max-w-md mx-auto lg:max-w-none lg:ml-auto order-1 lg:order-2">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-200 via-purple-300 to-purple-400 rounded-lg transform rotate-3"></div>
            <div className="relative bg-gradient-to-br from-purple-300 via-purple-400 to-purple-500 rounded-lg p-6 sm:p-8 md:p-12 lg:p-16">
              <div className="absolute inset-0 opacity-30">
                <div className="w-full h-full bg-gradient-to-br from-white/20 to-transparent rounded-lg"></div>
              </div>
              <div className="relative">
                {/* Butterfly SVG Pattern */}
                <svg viewBox="0 0 200 200" className="w-full h-full">
                  <defs>
                    <pattern
                      id="dots"
                      x="0"
                      y="0"
                      width="4"
                      height="4"
                      patternUnits="userSpaceOnUse"
                    >
                      <circle cx="2" cy="2" r="1" fill="white" opacity="0.6" />
                    </pattern>
                  </defs>
                  {/* Butterfly wings */}
                  <path
                    d="M100 80 Q120 60 140 80 Q130 100 100 100 Q70 100 60 80 Q80 60 100 80"
                    fill="url(#dots)"
                  />
                  <path
                    d="M100 120 Q120 140 140 120 Q130 100 100 100 Q70 100 60 120 Q80 140 100 120"
                    fill="url(#dots)"
                  />
                  {/* Butterfly body */}
                  <ellipse
                    cx="100"
                    cy="100"
                    rx="2"
                    ry="40"
                    fill="white"
                    opacity="0.8"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sections */}
      <section className="py-16 md:py-24 px-6 md:px-12 lg:px-16">
        <div className="max-w-7xl mx-auto space-y-16 md:space-y-24">
          {sections.map((section, index) => (
            <div
              key={section.id}
              className={`grid lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
                index % 2 === 1 ? "lg:grid-flow-col-dense" : ""
              }`}
            >
              <div
                className={`space-y-4 ${
                  index % 2 === 1 ? "lg:col-start-2" : ""
                }`}
              >
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold text-black">
                  {section.title}
                </h2>
                <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed">
                  {section.description}
                </p>
              </div>
              <div
                className={`relative aspect-square max-w-sm sm:max-w-md mx-auto lg:max-w-none ${
                  index % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""
                }`}
              >
                <div className="w-full h-full rounded-lg overflow-hidden">
                  {section.id === "forest" && (
                    <div className="w-full h-full bg-gradient-to-br from-green-200 to-green-300 relative">
                      <svg viewBox="0 0 200 200" className="w-full h-full">
                        <defs>
                          <pattern
                            id="forest-pattern"
                            x="0"
                            y="0"
                            width="20"
                            height="20"
                            patternUnits="userSpaceOnUse"
                          >
                            <path
                              d="M5 15 Q10 5 15 15"
                              stroke="#8B5A3C"
                              strokeWidth="3"
                              fill="none"
                            />
                          </pattern>
                        </defs>
                        <rect
                          width="200"
                          height="200"
                          fill="url(#forest-pattern)"
                        />
                      </svg>
                    </div>
                  )}
                  {section.id === "song-river" && (
                    <div className="w-full h-full bg-gradient-to-br from-blue-200 via-purple-200 to-purple-300 relative">
                      <div className="absolute inset-0 opacity-40">
                        <div
                          className="w-full h-full"
                          style={{
                            background:
                              "repeating-linear-gradient(45deg, white 0px, white 1px, transparent 1px, transparent 3px)",
                          }}
                        ></div>
                      </div>
                    </div>
                  )}
                  {section.id === "kalusidh-temple" && (
                    <div className="w-full h-full relative overflow-hidden rounded-lg">
                      <div
                        className="absolute inset-0 grid gap-1"
                        style={{
                          gridTemplateColumns: "repeat(20, 1fr)",
                          gridTemplateRows: "repeat(20, 1fr)",
                        }}
                      >
                        {Array.from({ length: 400 }, (_, i) => {
                          const colors = [
                            "#D4B5A0",
                            "#A67C5A",
                            "#8B6F47",
                            "#B4A7D6",
                            "#9B8DC4",
                          ];
                          const randomColor =
                            colors[Math.floor(Math.random() * colors.length)];
                          return (
                            <div
                              key={i}
                              className="w-full h-full"
                              style={{ backgroundColor: randomColor }}
                            />
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-16 md:py-20 px-6 md:px-12 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {/* Brand */}
            <div className="lg:col-span-2 space-y-4">
              <h3 className="text-2xl md:text-3xl font-bold text-black">
                {footer.title}
              </h3>
              <p className="text-gray-600 max-w-md">{footer.description}</p>
              <div className="flex gap-4 pt-4">
                {footer.social.map((item) => {
                  const Icon =
                    socialIcons[item.icon as keyof typeof socialIcons];
                  return (
                    <Link
                      key={item.platform}
                      href={item.href}
                      className="p-2 text-gray-600 hover:text-black transition-colors"
                      aria-label={item.platform}
                    >
                      <Icon size={20} />
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Navigation */}
            <div className="space-y-4">
              <h4 className="font-semibold text-black">Explore</h4>
              <ul className="space-y-2">
                {footer.navigation.explore.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-gray-600 hover:text-black transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-black">Support</h4>
              <ul className="space-y-2">
                {footer.navigation.support.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-gray-600 hover:text-black transition-colors"
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
    </div>
  );
}
