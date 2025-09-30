import { PostsGrid } from "@/components/blog/posts-grid";
import { HomeLayout } from "@/components/layout";
import { Heading, Text } from "@/components/ui/typography";
import { BlogPost, Category } from "@/types/sanity";

interface BlogPageProps {
  posts: BlogPost[];
  categories: Category[];
}

export function BlogPage({ posts }: BlogPageProps) {
  return (
    <HomeLayout>
      <div className="min-h-screen pt-20">
        <main className="flex-1">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="space-y-8">
              <div className="text-center space-y-4">
                <Heading level={1}>Blog</Heading>
                <Text variant="lead" className="max-w-2xl mx-auto">
                  Discover insights, tutorials, and stories from our journey in
                  building modern web experiences.
                </Text>
              </div>
              <PostsGrid posts={posts} />
            </div>
          </div>
        </main>
      </div>
    </HomeLayout>
  );
}
