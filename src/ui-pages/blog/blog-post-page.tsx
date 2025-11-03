import { PostContent } from "@/components/blog/post-content";
import { LowerLayout } from "@/components/layout/lower-layout";
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
    <LowerLayout categories={categories} recentPosts={recentPosts}>
      <PostContent post={post} />
    </LowerLayout>
  );
}
