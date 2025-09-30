import { BlogLayout } from "@/components/blog/blog-layout";
import { PostContent } from "@/components/blog/post-content";
import { StructuredData } from "@/components/seo/structured-data";
import { getAllCategories, getAllPosts, getPostBySlug } from "@/lib/blog-api";
import { generateBlogPostMetadata } from "@/lib/seo";
import { Metadata } from "next";
import { notFound } from "next/navigation";

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const posts = await getAllPosts();

  return posts.map((post) => ({
    slug: post.slug.current,
  }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return generateBlogPostMetadata(post);
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const [post, categories, allPosts] = await Promise.all([
    getPostBySlug(params.slug),
    getAllCategories(),
    getAllPosts(),
  ]);

  if (!post) {
    notFound();
  }

  return (
    <>
      <StructuredData type="article" data={post} />
      <BlogLayout categories={categories} recentPosts={allPosts.slice(0, 5)}>
        <PostContent post={post} />
      </BlogLayout>
    </>
  );
}
