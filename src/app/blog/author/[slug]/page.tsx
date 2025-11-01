import { StructuredData } from "@/components/seo/structured-data";
import { getAllCategories, getAllPosts, getAuthorBySlug } from "@/lib/blog-api";
import { generateAuthorMetadata } from "@/lib/seo";
import { AuthorPage } from "@/ui-pages";
import { Metadata } from "next";
import { notFound } from "next/navigation";

interface AuthorPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  const authorSlugs = new Set<string>();

  posts.forEach((post) => {
    // For BlogPost type, author.slug is already a string
    if (post.author?.slug && typeof post.author.slug === "string") {
      authorSlugs.add(post.author.slug);
    }
  });

  return Array.from(authorSlugs).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: AuthorPageProps): Promise<Metadata> {
  const { slug } = await params;
  const author = await getAuthorBySlug(slug);

  if (!author) {
    return {
      title: "Author Not Found",
    };
  }

  const posts = await getAllPosts();
  const authorPosts = posts.filter((post) => post.author?.slug === slug);

  return generateAuthorMetadata(author, authorPosts.length);
}

export default async function AuthorPageRoute({ params }: AuthorPageProps) {
  const { slug } = await params;
  const [author, allPosts, categories] = await Promise.all([
    getAuthorBySlug(slug),
    getAllPosts(),
    getAllCategories(),
  ]);

  if (!author) {
    notFound();
  }

  const authorPosts = allPosts.filter((post) => post.author?.slug === slug);

  return (
    <>
      <StructuredData type="person" data={author} />
      <AuthorPage
        author={author}
        authorPosts={authorPosts}
        categories={categories}
        recentPosts={allPosts.slice(0, 5)}
      />
    </>
  );
}
