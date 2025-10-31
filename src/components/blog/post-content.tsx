"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { urlFor } from "@/lib/sanity";
import { BlogPost, Post } from "@/types/sanity";
import { ArrowLeft, Calendar, Share2 } from "lucide-react";
import Link from "next/link";
import { PortableTextRenderer } from "./portable-text";

interface PostContentProps {
  post: Post;
  relatedPosts?: BlogPost[];
}

export function PostContent({ post, relatedPosts = [] }: PostContentProps) {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href,
        });
      } catch (err) {
        console.log("Error sharing:", err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const authorImage = post.author?.image
    ? typeof post.author.image === "string"
      ? post.author.image
      : urlFor(post.author.image).url()
    : null;

  return (
    <article className="max-w-4xl mx-auto">
      <div className="mb-8">
        <Button variant="ghost" asChild className="mb-6">
          <Link href="/blog" className="inline-flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Link>
        </Button>

        <div className="space-y-6">
          <div className="flex flex-wrap gap-2">
            {post.categories?.map((category) => (
              <Badge key={category._id} variant="secondary">
                <Link href={`/blog/category/${category.slug?.current}`}>
                  {category.title}
                </Link>
              </Badge>
            ))}
          </div>

          <h1 className="text-4xl font-bold tracking-tight lg:text-5xl leading-tight">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="text-xl text-muted-foreground leading-relaxed">
              {post.excerpt}
            </p>
          )}

          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center space-x-4">
              <Avatar className="h-12 w-12">
                {authorImage && (
                  <AvatarImage src={authorImage} alt={post.author?.name} />
                )}
                <AvatarFallback>
                  {getInitials(post.author?.name || "A")}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">
                  {post.author && (
                    <Link
                      href={`/blog/author/${post.author?.slug}`}
                      className="hover:text-primary transition-colors"
                    >
                      {post.author.name}
                    </Link>
                  )}
                </p>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-3 w-3" />
                    <span>
                      {post.publishedAt
                        ? formatDate(post.publishedAt)
                        : "No date"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={handleShare}>
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
        </div>
      </div>

      <div className="prose prose-lg max-w-none">
        {post.body && <PortableTextRenderer content={post.body} />}
      </div>

      {post.author?.bio && (
        <div className="bg-muted/30 rounded-lg p-6 mb-12">
          <div className="flex items-start space-x-4">
            <Avatar className="h-16 w-16">
              {authorImage && (
                <AvatarImage src={authorImage} alt={post.author.name} />
              )}
              <AvatarFallback>{getInitials(post.author.name)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-2">About the Author</h3>
              <h4 className="font-medium mb-2">
                <Link
                  href={`/blog/author/${post.author.slug?.current}`}
                  className="hover:text-primary transition-colors"
                >
                  {post.author.name}
                </Link>
              </h4>
              <div className="text-muted-foreground prose prose-sm">
                <PortableTextRenderer content={post.author.bio} />
              </div>
            </div>
          </div>
        </div>
      )}

      {relatedPosts.length > 0 && (
        <div className="mt-12">
          <h3 className="text-2xl font-bold mb-6">Related Posts</h3>
          <div className="grid gap-6 md:grid-cols-2">
            {relatedPosts.slice(0, 2).map((relatedPost) => (
              <div key={relatedPost._id} className="group">
                <Link href={`/blog/${relatedPost.slug?.current}`}>
                  <div className="bg-muted/30 rounded-lg p-4 transition-colors group-hover:bg-muted/50">
                    <h4 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                      {relatedPost.title}
                    </h4>
                    {relatedPost.excerpt && (
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {relatedPost.excerpt}
                      </p>
                    )}
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
