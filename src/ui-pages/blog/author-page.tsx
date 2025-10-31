import { BlogLayout } from "@/components/blog/blog-layout";
import { PortableTextRenderer } from "@/components/blog/portable-text";
import { PostsGrid } from "@/components/blog/posts-grid";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Author, BlogPost, Category } from "@/types/sanity";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface AuthorPageProps {
  author: Author;
  authorPosts: BlogPost[];
  categories: Category[];
  recentPosts: BlogPost[];
}

export function AuthorPage({
  author,
  authorPosts,
  categories,
  recentPosts,
}: AuthorPageProps) {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const authorImageUrl =
    typeof author.image === "string" ? author.image : author.image?.asset?.url;

  return (
    <BlogLayout categories={categories} recentPosts={recentPosts}>
      <div className="space-y-8">
        <Button variant="ghost" asChild className="mb-6">
          <Link href="/blog" className="inline-flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Link>
        </Button>

        <div className="text-center space-y-6">
          <Avatar className="h-32 w-32 mx-auto">
            {authorImageUrl && (
              <AvatarImage src={authorImageUrl} alt={author.name} />
            )}
            <AvatarFallback className="text-2xl">
              {getInitials(author.name)}
            </AvatarFallback>
          </Avatar>

          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
              {author.name}
            </h1>
            <p className="text-xl text-muted-foreground">
              {authorPosts.length} article
              {authorPosts.length !== 1 ? "s" : ""} published
            </p>
          </div>

          {author.bio && (
            <div className="max-w-2xl mx-auto text-left">
              <div className="prose prose-lg max-w-none">
                <PortableTextRenderer content={author.bio} />
              </div>
            </div>
          )}

          {author.social && (
            <div className="flex justify-center space-x-4">
              {author.social.website && (
                <Button variant="outline" asChild>
                  <Link
                    href={author.social.website}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Website
                  </Link>
                </Button>
              )}
              {author.social.twitter && (
                <Button variant="outline" asChild>
                  <Link
                    href={`https://twitter.com/${author.social.twitter}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Twitter
                  </Link>
                </Button>
              )}
              {author.social.linkedin && (
                <Button variant="outline" asChild>
                  <Link
                    href={author.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    LinkedIn
                  </Link>
                </Button>
              )}
            </div>
          )}
        </div>

        <Separator />

        <div className="space-y-6 pb-10">
          {authorPosts.length > 0 ? (
            <PostsGrid posts={authorPosts} />
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                No published articles yet.
              </p>
            </div>
          )}
        </div>
      </div>
    </BlogLayout>
  );
}
