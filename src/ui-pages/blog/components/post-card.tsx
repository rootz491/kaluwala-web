"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BlogPost } from "@/types/sanity";
import { Calendar, Clock, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface PostCardProps {
  post: BlogPost;
  variant?: "default" | "featured" | "compact";
}

export function PostCard({ post, variant = "default" }: PostCardProps) {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
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
              <Badge key={category.slug?.current} variant="secondary">
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
                    src={
                      typeof post.author?.image === "string"
                        ? post.author.image
                        : post.author?.image?.asset?.url
                    }
                    alt={post.author?.name}
                  />
                  <AvatarFallback>
                    {getInitials(post.author?.name || "A")}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm text-muted-foreground">
                  {post.author?.name}
                </span>
              </div>
              <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                <Calendar className="h-3 w-3" />
                <span>{formatDate(post.publishedAt!)}</span>
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
                key={category.slug?.current}
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
              <span>{post.author?.name}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar className="h-3 w-3" />
              <span>{formatDate(post.publishedAt!)}</span>
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

  return (
    <Card className="overflow-hidden h-full">
      <div className="relative h-48 w-full">
        {post.featuredImage ? (
          <Image
            src={post.featuredImage}
            alt={post.title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
            <div className="text-center p-4">
              <h3 className="font-bold">{post.title}</h3>
            </div>
          </div>
        )}
      </div>
      <CardContent className="p-4">
        <div className="flex flex-wrap gap-1 mb-3">
          {post.categories?.slice(0, 2).map((category) => (
            <Badge
              key={category.slug?.current}
              variant="secondary"
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
        {post.excerpt && (
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
            {post.excerpt}
          </p>
        )}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Avatar className="h-6 w-6">
              <AvatarImage
                src={
                  typeof post.author?.image === "string"
                    ? post.author.image
                    : post.author?.image?.asset?.url
                }
                alt={post.author?.name}
              />
              <AvatarFallback className="text-xs">
                {getInitials(post.author?.name || "A")}
              </AvatarFallback>
            </Avatar>
            <span className="text-xs text-muted-foreground">
              {post.author?.name}
            </span>
          </div>
          <div className="flex items-center space-x-1 text-xs text-muted-foreground">
            <Calendar className="h-3 w-3" />
            <span>{formatDate(post.publishedAt!)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
