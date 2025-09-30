import { BlogLayout } from "@/components/blog/blog-layout";
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
import { ArrowRight, FolderOpen } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Categories | Kaluwala Blog",
  description: "Browse blog posts by category and topic.",
};

export default async function CategoriesPage() {
  const [categories, posts] = await Promise.all([
    getAllCategories(),
    getAllPosts(),
  ]);

  return (
    <BlogLayout categories={categories} recentPosts={posts.slice(0, 5)}>
      <div className="space-y-8">
        <div className="text-center space-y-4 py-8">
          <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
            Categories
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore our content organized by topics and categories.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Card
              key={category._id}
              className="group hover:shadow-lg transition-all duration-200"
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <FolderOpen className="h-5 w-5 text-primary" />
                    <CardTitle className="text-lg">{category.title}</CardTitle>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {category.postCount || 0} posts
                  </Badge>
                </div>
                {category.description && (
                  <CardDescription>{category.description}</CardDescription>
                )}
              </CardHeader>
              <CardContent>
                <Button
                  asChild
                  className="w-full group-hover:bg-primary/90 transition-colors"
                >
                  <Link
                    href={`/blog/category/${category.slug.current}`}
                    className="inline-flex items-center"
                  >
                    View Posts
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {categories.length === 0 && (
          <div className="text-center py-12">
            <FolderOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Categories Yet</h3>
            <p className="text-muted-foreground">
              Categories will appear here once they are created in the CMS.
            </p>
          </div>
        )}
      </div>
    </BlogLayout>
  );
}
