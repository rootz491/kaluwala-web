import { HomeLayout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Heading, Text } from "@/components/ui/typography";
import supportContent from "@/data/support-content.json";
import { ChevronDown, Mail, MessageCircle, Phone } from "lucide-react";
import Link from "next/link";

const iconMap = {
  mail: Mail,
  phone: Phone,
  "message-circle": MessageCircle,
};

export function SupportPage() {
  const { hero, faq, supportChannels } = supportContent;

  return (
    <HomeLayout>
      <div className="min-h-screen pt-20">
        <main className="flex-1">
          {/* Hero Section */}
          <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="text-center space-y-4 mb-16">
              <Heading level={1}>{hero.title}</Heading>
              <Text variant="lead" className="max-w-2xl mx-auto">
                {hero.subtitle}
              </Text>
            </div>

            <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* FAQ Section */}
              <div className="lg:col-span-2 space-y-8">
                <div>
                  <Heading level={2} className="mb-6">
                    {faq.title}
                  </Heading>
                  <div className="space-y-6">
                    {faq.categories.map((category, categoryIndex) => (
                      <Card key={categoryIndex}>
                        <CardHeader>
                          <CardTitle>{category.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {category.questions.map((item, questionIndex) => (
                              <div key={questionIndex}>
                                <details className="group">
                                  <summary className="flex justify-between items-center cursor-pointer list-none">
                                    <Text className="font-medium pr-4">
                                      {item.question}
                                    </Text>
                                    <ChevronDown className="h-4 w-4 text-muted-foreground group-open:rotate-180 transition-transform" />
                                  </summary>
                                  <div className="mt-3 pr-4">
                                    <Text
                                      variant="muted"
                                      className="text-sm leading-relaxed"
                                    >
                                      {item.answer}
                                    </Text>
                                  </div>
                                </details>
                                {questionIndex <
                                  category.questions.length - 1 && (
                                  <Separator className="mt-4" />
                                )}
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>

              {/* Support Channels and Emergency Info */}
              <div className="space-y-8">
                {/* Support Channels */}
                <Card>
                  <CardHeader>
                    <CardTitle>{supportChannels.title}</CardTitle>
                    <Text variant="muted">{supportChannels.description}</Text>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {supportChannels.channels.map((channel, index) => {
                        const Icon =
                          iconMap[channel.icon as keyof typeof iconMap];
                        return (
                          <div key={index} className="space-y-2">
                            <div className="flex items-center gap-2">
                              <Icon className="h-4 w-4" />
                              <Text className="font-medium">
                                {channel.title}
                              </Text>
                            </div>
                            <Text variant="muted" className="text-sm">
                              {channel.description}
                            </Text>
                            <div className="flex flex-col gap-1">
                              <Text className="text-sm font-mono">
                                {channel.contact}
                              </Text>
                              <Text variant="muted" className="text-xs">
                                {channel.responseTime}
                              </Text>
                            </div>
                            {index < supportChannels.channels.length - 1 && (
                              <Separator className="mt-4" />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>

                {/* Contact Card */}
                <Card>
                  <CardHeader>
                    <CardTitle>Still Need Help?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Text variant="muted" className="text-sm mb-4">
                      Can&apos;t find what you&apos;re looking for? Our team is
                      here to help.
                    </Text>
                    <Button asChild className="w-full">
                      <Link href="/contact">Contact Us</Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </HomeLayout>
  );
}
