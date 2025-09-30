import { Heading, Text } from "@/components/ui/typography";

interface HeroSectionProps {
  title: string;
  subtitle: string;
  visual?: React.ReactNode;
}

export function HeroSection({ title, subtitle, visual }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center px-6 md:px-12 lg:px-16 pt-20 lg:pt-0">
      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
        <div className="space-y-6 order-2 lg:order-1">
          <Heading level={1}>{title}</Heading>
          <Text variant="large" className="max-w-lg">
            {subtitle}
          </Text>
        </div>
        {visual && (
          <div className="relative aspect-square max-w-sm sm:max-w-md mx-auto lg:max-w-none lg:ml-auto order-1 lg:order-2">
            {visual}
          </div>
        )}
      </div>
    </section>
  );
}
