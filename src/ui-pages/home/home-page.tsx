import { HomeLayout } from "@/components/layout";
import { ContentSection } from "@/components/ui/content-section";
import { HeroSection } from "@/components/ui/hero-section";
import {
  ButterflyVisual,
  ForestVisual,
  RiverVisual,
  TempleVisual,
} from "@/components/ui/visuals";
import homepageContent from "@/data/homepage-content.json";

const visualComponents = {
  forest: ForestVisual,
  "song-river": RiverVisual,
  "kalusidh-temple": TempleVisual,
};

export function HomePage() {
  const { hero, sections } = homepageContent;

  return (
    <HomeLayout>
      <div className="min-h-screen">
        <HeroSection
          title={hero.title}
          subtitle={hero.subtitle}
          visual={<ButterflyVisual />}
        />

        <section className="py-16 md:py-24 px-6 md:px-12 lg:px-16">
          <div className="max-w-7xl mx-auto space-y-16 md:space-y-24">
            {sections.map((section, index) => {
              const VisualComponent =
                visualComponents[section.id as keyof typeof visualComponents];
              return (
                <ContentSection
                  key={section.id}
                  title={section.title}
                  description={section.description}
                  visual={VisualComponent ? <VisualComponent /> : undefined}
                  reverse={index % 2 === 1}
                />
              );
            })}
          </div>
        </section>
      </div>
    </HomeLayout>
  );
}
