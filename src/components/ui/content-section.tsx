import { Heading, Text } from "@/components/ui/typography";

interface ContentSectionProps {
  title: string;
  description: string;
  visual?: React.ReactNode;
  reverse?: boolean;
}

export function ContentSection({
  title,
  description,
  visual,
  reverse = false,
}: ContentSectionProps) {
  return (
    <div
      className={`grid lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
        reverse ? "lg:grid-flow-col-dense" : ""
      }`}
    >
      <div className={`space-y-4 ${reverse ? "lg:col-start-2" : ""}`}>
        <Heading level={2}>{title}</Heading>
        <Text>{description}</Text>
      </div>
      {visual && (
        <div
          className={`relative aspect-square max-w-sm sm:max-w-md mx-auto lg:max-w-none ${
            reverse ? "lg:col-start-1 lg:row-start-1" : ""
          }`}
        >
          {visual}
        </div>
      )}
    </div>
  );
}
