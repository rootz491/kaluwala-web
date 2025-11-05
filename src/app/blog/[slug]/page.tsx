import { StructuredData } from "@/components/seo/structured-data";
import { getAllCategories, getAllPosts, getPostBySlug } from "@/lib/blog-api";
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

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://kaluwala.in";
  const canonicalUrl = `${siteUrl}/blog/${slug}`;

  const metadata = generateBlogPostMetadata(post);

  return {
    ...metadata,
    alternates: {
      canonical: canonicalUrl,
    },
  };
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
