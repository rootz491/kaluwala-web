import { HomeLayout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Heading, Text } from "@/components/ui/typography";
import contactContent from "@/data/contact-content.json";
import { Clock, Mail, MapPin } from "lucide-react";

export function ContactPage() {
  const { hero, contactInfo, directions, contactForm } = contactContent;

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

            <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
              {/* Contact Information */}
              <div className="space-y-8">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Address */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <MapPin className="h-5 w-5" />
                        {contactInfo.address.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-1">
                        {contactInfo.address.lines.map((line, index) => (
                          <Text key={index} variant="muted">
                            {line}
                          </Text>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Email */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Mail className="h-5 w-5" />
                        {contactInfo.email.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-1">
                        <Text>{contactInfo.email.general}</Text>
                        <Text variant="muted">{contactInfo.email.support}</Text>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Hours */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Clock className="h-5 w-5" />
                        {contactInfo.hours.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-1">
                        <Text>Weekdays: {contactInfo.hours.weekdays}</Text>
                        <Text>Weekends: {contactInfo.hours.weekends}</Text>
                        <Text variant="muted" className="text-sm">
                          {contactInfo.hours.note}
                        </Text>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Directions */}
                <Card>
                  <CardHeader>
                    <CardTitle>{directions.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Text variant="muted" className="mb-4">
                      {directions.description}
                    </Text>
                    <div className="space-y-4">
                      {directions.routes.map((route, index) => (
                        <div key={index}>
                          <div className="flex justify-between items-start mb-2">
                            <Text className="font-medium">
                              From {route.from}
                            </Text>
                            <div className="text-right">
                              <Text className="text-sm">{route.distance}</Text>
                              <Text variant="muted" className="text-sm">
                                {route.duration}
                              </Text>
                            </div>
                          </div>
                          <Text variant="muted" className="text-sm">
                            {route.description}
                          </Text>
                          {index < directions.routes.length - 1 && (
                            <Separator className="mt-4" />
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Contact Form */}
              <Card>
                <CardHeader>
                  <CardTitle>{contactForm.title}</CardTitle>
                  <Text variant="muted">{contactForm.description}</Text>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">{contactForm.fields.name}</Label>
                        <Input id="name" placeholder="Your full name" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">
                          {contactForm.fields.email}
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone">
                          {contactForm.fields.phone}
                        </Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+91 9876543210"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="subject">
                          {contactForm.fields.subject}
                        </Label>
                        <Input id="subject" placeholder="What's this about?" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">
                        {contactForm.fields.message}
                      </Label>
                      <Textarea
                        id="message"
                        placeholder="Tell us how we can help you..."
                        rows={5}
                      />
                    </div>
                    <Button type="submit" className="w-full">
                      {contactForm.submitText}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </HomeLayout>
  );
}
