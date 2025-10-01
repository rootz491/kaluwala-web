import { BlogLayout } from "@/components/blog/blog-layout";
import { PostContent } from "@/components/blog/post-content";
import { BlogPost, Category, Post } from "@/types/sanity";

interface BlogPostPageProps {
  post: Post;
  categories: Category[];
  recentPosts: BlogPost[];
}

export function BlogPostPage({
  post,
  categories,
  recentPosts,
}: BlogPostPageProps) {
  return (
    <BlogLayout categories={categories} recentPosts={recentPosts}>
      <PostContent post={post} />
    </BlogLayout>
  );
}
