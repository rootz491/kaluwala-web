import { HomeLayout } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Heading, Text } from "@/components/ui/typography";
import legalContent from "@/data/legal-content.json";

export function LegalPage() {
  const { hero, sections } = legalContent;

  return (
    <HomeLayout>
      <div className="min-h-screen pt-20">
        <main className="flex-1">
          <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="text-center space-y-4 mb-16">
              <Heading level={1}>{hero.title}</Heading>
              <Text variant="lead" className="max-w-2xl mx-auto">
                {hero.subtitle}
              </Text>
            </div>

            <div className="max-w-4xl mx-auto space-y-8">
              {sections.map((section, sectionIndex) => (
                <Card key={sectionIndex}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle>{section.title}</CardTitle>
                      <Text variant="muted" className="text-sm">
                        Last updated: {section.lastUpdated}
                      </Text>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {section.content.map((item, itemIndex) => (
                        <div key={itemIndex}>
                          <Heading level={3} className="text-lg mb-3">
                            {item.heading}
                          </Heading>
                          <Text variant="muted" className="leading-relaxed">
                            {item.text}
                          </Text>
                          {itemIndex < section.content.length - 1 && (
                            <Separator className="mt-6" />
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="max-w-4xl mx-auto mt-12">
              <Card>
                <CardHeader>
                  <CardTitle>Questions About These Terms?</CardTitle>
                </CardHeader>
                <CardContent>
                  <Text variant="muted">
                    If you have any questions about these legal terms or need
                    clarification on any policies, please don&apos;t hesitate to
                    contact us at{" "}
                    <span className="font-medium text-foreground">
                      legal@kaluwala.in
                    </span>{" "}
                    or through our{" "}
                    <a href="/contact" className="text-primary hover:underline">
                      contact page
                    </a>
                    .
                  </Text>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </HomeLayout>
  );
}
