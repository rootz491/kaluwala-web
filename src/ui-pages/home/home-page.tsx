import { HomeLayout } from "@/components/layout";
import { ContentSection } from "@/components/ui/content-section";
import {
  ForestVisual,
  RiverVisual,
  TempleVisual,
} from "@/components/ui/visuals";
import homepageContent from "@/data/homepage-content.json";
import { HeroSection } from "../../components/ui/hero-section";
import { VillageMap } from "../../components/village-map";

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
          visual={<VillageMap />}
        />

        {/* Village Map Section */}
        {/* <section className="py-16 md:py-24 px-6 md:px-12 lg:px-16 bg-muted/30">
          <div className="max-w-7xl mx-auto text-center mb-6">
            <div className="space-y-6 order-2 lg:order-1 mb-12">
              <Heading level={1}>{hero.title}</Heading>
              <Text variant="large" className="max-w-lg">
                {hero.subtitle}
              </Text>
            </div>
            <VillageMap />
          </div>
        </section> */}

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
