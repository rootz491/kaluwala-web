import { Heading, Text } from "@/components/ui/typography";

interface HeroSectionProps {
  title: string;
  subtitle: string;
  visual?: React.ReactNode;
}

export function HeroSection({ title, subtitle, visual }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center px-6 md:px-12 lg:px-16 pt-32 md:pt-40 pb-20 lg:pb-24">
      <div className="max-w-7xl mx-auto w-full">
        <div className="space-y-8 text-center mb-8 lg:mb-10">
          <Heading level={1}>{title}</Heading>
          <Text variant="large" className="max-w-2xl mx-auto">
            {subtitle}
          </Text>
        </div>
        {visual && (
          <div className="relative aspect-auto w-4/5 sm:w-full max-w-5xl mx-auto">
            {visual}
          </div>
        )}
      </div>
    </section>
  );
}
