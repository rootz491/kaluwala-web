import { cn } from "@/lib/utils";
import { PortableTextBlock } from "@/types/sanity";
import type { PortableTextComponents } from "@portabletext/react";
import { PortableText } from "@portabletext/react";
import Image from "next/image";

interface PortableTextRendererProps {
  content: PortableTextBlock[];
  className?: string;
}

const portableTextComponents: PortableTextComponents = {
  block: {
    h1: ({ children }) => (
      <h1 className="text-4xl font-bold tracking-tight mb-6">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-3xl font-semibold tracking-tight mb-4 mt-8">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl font-semibold tracking-tight mb-3 mt-6">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-xl font-semibold mb-2 mt-4">{children}</h4>
    ),
    normal: ({ children }) => (
      <p className="text-base leading-7 mb-4">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-primary pl-6 italic my-6 text-muted-foreground">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-inside mb-4 space-y-2">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-inside mb-4 space-y-2">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="ml-4">{children}</li>,
    number: ({ children }) => <li className="ml-4">{children}</li>,
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    code: ({ children }) => (
      <code className="bg-muted px-1 py-0.5 rounded text-sm font-mono">
        {children}
      </code>
    ),
    link: ({ children, value }) => (
      <a
        href={value?.href}
        className="text-primary underline hover:no-underline"
        target={value?.blank ? "_blank" : undefined}
        rel={value?.blank ? "noopener noreferrer" : undefined}
      >
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset?.url) return null;
      return (
        <div className="my-8">
          <Image
            src={value.asset.url}
            alt={value.alt || ""}
            width={800}
            height={450}
            className="rounded-lg w-full h-auto"
          />
          {value.caption && (
            <p className="text-sm text-muted-foreground text-center mt-2 italic">
              {value.caption}
            </p>
          )}
        </div>
      );
    },
    code: ({ value }) => (
      <pre className="bg-muted p-4 rounded-lg overflow-x-auto my-6">
        <code className="text-sm font-mono">{value?.code}</code>
      </pre>
    ),
  },
};

export function PortableTextRenderer({
  content,
  className,
}: PortableTextRendererProps) {
  return (
    <div className={cn("prose prose-lg max-w-none", className)}>
      <PortableText value={content} components={portableTextComponents} />
    </div>
  );
}
