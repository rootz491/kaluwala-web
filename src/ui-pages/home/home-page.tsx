import { HomeLayout } from "@/components/layout";
import { ContentSection } from "@/components/ui/content-section";
import homepageContent from "@/data/homepage-content.json";
import { HeroSection } from "../../components/ui/hero-section";
import { VillageMap } from "../../components/village-map";

export function HomePage() {
  const { hero, sections } = homepageContent;

  return (
    <HomeLayout>
      <div className="min-h-screen">
        <HeroSection
          title={hero.title}
          subtitle={hero.subtitle}
          visual={<VillageMap />}
        />

        <section className="py-16 md:py-24 px-6 md:px-12 lg:px-16">
          <div className="max-w-7xl mx-auto space-y-16 md:space-y-24">
            {sections.map((section, index) => (
              <ContentSection
                key={section.id}
                title={section.title}
                description={section.description}
                image={section.image}
                reverse={index % 2 === 1}
              />
            ))}
          </div>
        </section>
      </div>
    </HomeLayout>
  );
}
