import { BlogLayout } from "@/components/blog/blog-layout";
import { PostsGrid } from "@/components/blog/posts-grid";
import { StructuredData } from "@/components/seo/structured-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getAllCategories, getAllPosts } from "@/lib/blog-api";
import { urlFor } from "@/lib/sanity";
import { generateSEOMetadata } from "@/lib/seo";
import { CalendarDays, Clock, User } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = generateSEOMetadata({
  title: "Blog | Kaluwala",
  description:
    "Discover insights, tutorials, and stories about technology, development, and innovation.",
  type: "website",
});

export default async function BlogPage() {
  const [posts, categories] = await Promise.all([
    getAllPosts(),
    getAllCategories(),
  ]);

  const featuredPost = posts[0];
  const regularPosts = posts.slice(1);

  return (
    <>
      <StructuredData
        type="website"
        data={{
          title: "Kaluwala Blog",
          description:
            "Discover insights, tutorials, and stories about technology, development, and innovation.",
          url: `${
            process.env.NEXT_PUBLIC_SITE_URL || "https://kaluwala.in"
          }/blog`,
        }}
      />
      <BlogLayout categories={categories} recentPosts={posts.slice(0, 5)}>
        <div className="space-y-8">
          <div className="text-center space-y-4 py-8">
            <h1 className="text-4xl font-bold tracking-tight lg:text-6xl">
              Blog
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover insights, tutorials, and stories about technology,
              development, and innovation.
            </p>
          </div>

          {featuredPost && (
            <section className="space-y-4">
              <h2 className="text-2xl font-bold">Featured Post</h2>
              <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="md:flex">
                  {featuredPost.featuredImage && (
                    <div className="md:w-1/2 relative aspect-video md:aspect-auto">
                      <Image
                        src={
                          typeof featuredPost.featuredImage === "string"
                            ? featuredPost.featuredImage
                            : urlFor(featuredPost.featuredImage).url()
                        }
                        alt={featuredPost.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="md:w-1/2 p-6 flex flex-col justify-center">
                    <CardHeader className="p-0 pb-4">
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-2">
                        <CalendarDays className="h-4 w-4" />
                        {featuredPost.publishedAt && (
                          <time dateTime={featuredPost.publishedAt}>
                            {new Date(
                              featuredPost.publishedAt
                            ).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </time>
                        )}
                        {featuredPost.readingTime && (
                          <>
                            <Clock className="h-4 w-4 ml-4" />
                            <span>{featuredPost.readingTime} min read</span>
                          </>
                        )}
                      </div>
                      <CardTitle className="text-xl md:text-2xl">
                        <Link
                          href={`/blog/${featuredPost.slug.current}`}
                          className="hover:text-primary transition-colors"
                        >
                          {featuredPost.title}
                        </Link>
                      </CardTitle>
                      <CardDescription className="text-base">
                        {featuredPost.excerpt}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <User className="h-4 w-4" />
                          <span className="text-sm text-muted-foreground">
                            {featuredPost.author?.name ||
                              featuredPost.authorName ||
                              "Anonymous"}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          {featuredPost.categories
                            ?.slice(0, 2)
                            .map((category: { _id: string; title: string }) => (
                              <Badge key={category._id} variant="secondary">
                                {category.title}
                              </Badge>
                            ))}
                        </div>
                      </div>
                      <Button asChild className="mt-4">
                        <Link href={`/blog/${featuredPost.slug.current}`}>
                          Read More
                        </Link>
                      </Button>
                    </CardContent>
                  </div>
                </div>
              </Card>
            </section>
          )}

          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Latest Posts</h2>
              <Button variant="outline" asChild>
                <Link href="/blog/all">View All Posts</Link>
              </Button>
            </div>
            <PostsGrid posts={regularPosts} />
          </section>
        </div>
      </BlogLayout>
    </>
  );
}
