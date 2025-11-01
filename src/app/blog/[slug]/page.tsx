import { StructuredData } from "@/components/seo/structured-data";
import {
  getAllCategories,
  getAllPosts,
  getPostBySlug,
} from "@/lib/blog-api-new";
import { generateBlogPostMetadata } from "@/lib/seo";
import { BlogPostPage } from "@/ui-pages";
import { Metadata } from "next";
import { notFound } from "next/navigation";

// Enable ISR: revalidate every 1 hour (3600 seconds)
export const revalidate = 3600;

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const posts = await getAllPosts();

  return posts
    .filter((post) => post.slug?.current)
    .map((post) => ({
      slug: post.slug!.current,
    }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return generateBlogPostMetadata(post);
}

export default async function BlogPostPageRoute({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const [post, categories, allPosts] = await Promise.all([
    getPostBySlug(slug),
    getAllCategories(),
    getAllPosts(),
  ]);

  if (!post) {
    notFound();
  }

  return (
    <>
      <StructuredData type="article" data={post} />
      <BlogPostPage
        post={post}
        categories={categories}
        recentPosts={allPosts.slice(0, 5)}
      />
    </>
  );
}
