"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BlogPost } from "@/types/sanity";
import { Clock, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface PostCardProps {
  post: BlogPost;
  variant?: "default" | "featured" | "compact";
}

export function PostCard({ post, variant = "default" }: PostCardProps) {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const resolveSlug = (
    s: string | { current?: string } | null | undefined
  ): string | undefined => {
    return typeof s === "string" ? s : s?.current;
  };

  if (variant === "featured") {
    return (
      <Card className="overflow-hidden">
        <div className="relative h-80 w-full">
          {post.featuredImage ? (
            <Image
              src={post.featuredImage}
              alt={post.title}
              fill
              className="object-cover"
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
              <div className="text-center p-8">
                <h3 className="text-2xl font-bold mb-2">{post.title}</h3>
                <p className="text-muted-foreground">Featured Post</p>
              </div>
            </div>
          )}
        </div>
        <CardContent className="p-6">
          <div className="flex flex-wrap gap-2 mb-4">
            {post.categories?.map((category) => (
              <Badge
                key={resolveSlug(category.slug) || category._id}
                variant="secondary"
              >
                {category.title}
              </Badge>
            ))}
          </div>
          <h2 className="text-2xl font-bold mb-3 line-clamp-2">
            <Link
              href={`/blog/${post.slug?.current}`}
              className="hover:text-primary transition-colors"
            >
              {post.title}
            </Link>
          </h2>
          {post.excerpt && (
            <p className="text-muted-foreground mb-4 line-clamp-3">
              {post.excerpt}
            </p>
          )}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={post.author?.image}
                    alt={post.author?.name}
                  />
                  <AvatarFallback>
                    {getInitials(post.author?.name || "A")}
                  </AvatarFallback>
                </Avatar>
                <Link
                  href={`/blog/author/${post.author?.slug}`}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {post.author?.name}
                </Link>
              </div>
              {post.readingTime && (
                <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>{post.readingTime} min read</span>
                </div>
              )}
            </div>
            <Button asChild>
              <Link href={`/blog/${post.slug?.current}`}>Read More</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (variant === "compact") {
    return (
      <div className="flex space-x-4 p-4 border-b last:border-b-0">
        <div className="flex-1">
          <div className="flex flex-wrap gap-1 mb-2">
            {post.categories?.slice(0, 2).map((category) => (
              <Badge
                key={resolveSlug(category.slug) || category._id}
                variant="outline"
                className="text-xs"
              >
                {category.title}
              </Badge>
            ))}
          </div>
          <h3 className="font-semibold mb-2 line-clamp-2">
            <Link
              href={`/blog/${post.slug?.current}`}
              className="hover:text-primary transition-colors"
            >
              {post.title}
            </Link>
          </h3>
          <div className="flex items-center space-x-4 text-xs text-muted-foreground">
            <div className="flex items-center space-x-1">
              <User className="h-3 w-3" />
              <Link
                href={`/blog/author/${post.author?.slug}`}
                className="hover:text-primary transition-colors"
              >
                {post.author?.name}
              </Link>
            </div>
          </div>
        </div>
        {post.featuredImage && (
          <div className="relative h-16 w-16 flex-shrink-0">
            <Image
              src={post.featuredImage}
              alt={post.title}
              fill
              className="object-cover rounded"
            />
          </div>
        )}
      </div>
    );
  }

  // Default masonry card with title overlay on blurred image
  return (
    <div className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
      <Link href={`/blog/${post.slug?.current}`} className="block">
        <div className="relative">
          {post.featuredImage ? (
            <>
              <Image
                src={post.featuredImage}
                alt={post.title}
                width={400}
                height={300}
                className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                style={{ aspectRatio: "auto" }}
              />
              {/* Overlay with blur effect */}
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300" />
              <div className="absolute inset-0 backdrop-blur-[1px] group-hover:backdrop-blur-sm transition-all duration-300" />

              {/* Title overlay */}
              <div className="absolute inset-0 flex flex-col justify-end p-4">
                <div className="space-y-2">
                  {post.categories && post.categories.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {post.categories.slice(0, 2).map((category) => (
                        <Badge
                          key={resolveSlug(category.slug) || category._id}
                          variant="secondary"
                          className="text-xs bg-white/90 text-black"
                        >
                          {category.title}
                        </Badge>
                      ))}
                    </div>
                  )}
                  <h3 className="font-bold text-white text-lg leading-tight line-clamp-3 drop-shadow-lg">
                    {post.title}
                  </h3>
                  <div className="flex items-center space-x-2">
                    <Avatar className="h-6 w-6 border-2 border-white/50">
                      <AvatarImage
                        src={post.author?.image}
                        alt={post.author?.name}
                      />
                      <AvatarFallback className="text-xs bg-white/90 text-black">
                        {getInitials(post.author?.name || "A")}
                      </AvatarFallback>
                    </Avatar>
                    <Link
                      href={`/blog/author/${post.author?.slug}`}
                      className="text-sm text-white/90 drop-shadow-lg hover:text-white transition-colors"
                    >
                      {post.author?.name}
                    </Link>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="w-full h-48 bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-6">
              <div className="text-center space-y-2">
                {post.categories && post.categories.length > 0 && (
                  <div className="flex flex-wrap gap-1 justify-center mb-2">
                    {post.categories.slice(0, 2).map((category) => (
                      <Badge
                        key={resolveSlug(category.slug) || category._id}
                        variant="secondary"
                        className="text-xs"
                      >
                        {category.title}
                      </Badge>
                    ))}
                  </div>
                )}
                <h3 className="font-bold text-lg text-gray-800 line-clamp-3">
                  {post.title}
                </h3>
                <div className="flex items-center justify-center space-x-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage
                      src={post.author?.image}
                      alt={post.author?.name}
                    />
                    <AvatarFallback className="text-xs">
                      {getInitials(post.author?.name || "A")}
                    </AvatarFallback>
                  </Avatar>
                  <Link
                    href={`/blog/author/${post.author?.slug}`}
                    className="text-sm text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    {post.author?.name}
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </Link>
    </div>
  );
}
