import { Heading, Text } from "@/components/ui/typography";
import Image from "next/image";

interface ContentSectionProps {
  title: string;
  description: string;
  image: {
    src: string;
    alt: string;
  };
  reverse?: boolean;
}

export function ContentSection({
  title,
  description,
  image,
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
      {image && (
        <div
          className={`relative aspect-square max-w-sm sm:max-w-md mx-auto lg:max-w-none rounded-3xl overflow-hidden ${
            reverse ? "lg:col-start-1 lg:row-start-1" : ""
          }`}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
      )}
    </div>
  );
}
