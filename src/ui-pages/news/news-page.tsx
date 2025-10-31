import { HomeLayout } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heading, Text } from "@/components/ui/typography";
import { Bird, Coffee, MapPin, Newspaper, TreePine } from "lucide-react";

export function NewsPage() {
  return (
    <HomeLayout>
      <div className="min-h-screen pt-20">
        <main className="flex-1">
          {/* Hero Section */}
          <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="text-center space-y-4 mb-16">
              <div className="flex justify-center mb-4">
                <Newspaper className="h-16 w-16 text-muted-foreground" />
              </div>
              <Heading level={1}>Kaluwala News</Heading>
              <Text variant="lead" className="max-w-2xl mx-auto">
                The latest happenings from our peaceful village by the Song
                River
              </Text>
            </div>

            <div className="max-w-4xl mx-auto space-y-12">
              {/* Main News Section */}
              <Card className="border-dashed border-2">
                <CardHeader className="text-center">
                  <CardTitle className="flex items-center justify-center gap-2">
                    <Coffee className="h-5 w-5" />
                    Breaking News... Sort Of
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-6">
                  <Text variant="lead" className="text-muted-foreground">
                    Nothing particularly exciting happens in this village
                  </Text>

                  <div className="prose prose-lg max-w-none">
                    <Text>
                      Welcome to Kaluwala&apos;s news section! We&apos;re
                      working hard to find something newsworthy to report from
                      our serene village. So far, the most exciting developments
                      include:
                    </Text>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 mt-8">
                    <Card className="bg-muted/30">
                      <CardContent className="p-6 text-center">
                        <Bird className="h-8 w-8 mx-auto mb-3 text-blue-500" />
                        <Text className="font-semibold mb-2">
                          Wildlife Update
                        </Text>
                        <Text variant="muted" className="text-sm">
                          The same birds continue to chirp at dawn.
                          Revolutionary stuff.
                        </Text>
                      </CardContent>
                    </Card>

                    <Card className="bg-muted/30">
                      <CardContent className="p-6 text-center">
                        <TreePine className="h-8 w-8 mx-auto mb-3 text-green-500" />
                        <Text className="font-semibold mb-2">
                          Environmental News
                        </Text>
                        <Text variant="muted" className="text-sm">
                          Trees still growing. Rivers still flowing. Nature
                          doing its thing.
                        </Text>
                      </CardContent>
                    </Card>

                    <Card className="bg-muted/30">
                      <CardContent className="p-6 text-center">
                        <MapPin className="h-8 w-8 mx-auto mb-3 text-orange-500" />
                        <Text className="font-semibold mb-2">Local Events</Text>
                        <Text variant="muted" className="text-sm">
                          The weekly village meeting discussed the important
                          matter of whose turn it is to sweep the temple steps.
                        </Text>
                      </CardContent>
                    </Card>

                    <Card className="bg-muted/30">
                      <CardContent className="p-6 text-center">
                        <Coffee className="h-8 w-8 mx-auto mb-3 text-amber-500" />
                        <Text className="font-semibold mb-2">
                          Community Updates
                        </Text>
                        <Text variant="muted" className="text-sm">
                          The local chai stall is still serving excellent tea.
                          Standards remain high.
                        </Text>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>

              {/* Coming Soon Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-center">Stay Tuned!</CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                  <Text>
                    When something genuinely newsworthy happens in Kaluwala,
                    you&apos;ll be the first to know. Until then, enjoy the
                    peaceful tranquility of our little village.
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
