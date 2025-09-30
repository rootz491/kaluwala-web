import { BlogLayout } from "@/components/blog/blog-layout";
import { PostsGrid } from "@/components/blog/posts-grid";
import { StructuredData } from "@/components/seo/structured-data";
import { getAllCategories, getAllPosts } from "@/lib/blog-api";
import { generateCategoryMetadata } from "@/lib/seo";
import { Metadata } from "next";
import { notFound } from "next/navigation";

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const categories = await getAllCategories();

  return categories.map((category) => ({
    slug: category.slug.current,
  }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const [categories, posts] = await Promise.all([
    getAllCategories(),
    getAllPosts(),
  ]);

  const category = categories.find((cat) => cat.slug.current === params.slug);

  if (!category) {
    return {
      title: "Category Not Found",
    };
  }

  const categoryPosts = posts.filter((post) =>
    post.categories?.some((cat) => cat.slug.current === params.slug)
  );

  return generateCategoryMetadata(category, categoryPosts.length);
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const [allPosts, categories] = await Promise.all([
    getAllPosts(),
    getAllCategories(),
  ]);

  const category = categories.find((cat) => cat.slug.current === params.slug);

  if (!category) {
    notFound();
  }

  const categoryPosts = allPosts.filter((post) =>
    post.categories?.some((cat) => cat.slug.current === params.slug)
  );

  return (
    <>
      <StructuredData
        type="website"
        data={{
          title: `${category.title} | Kaluwala Blog`,
          description: category.description || `Posts about ${category.title}`,
          url: `${
            process.env.NEXT_PUBLIC_SITE_URL || "https://kaluwala.in"
          }/blog/category/${category.slug.current}`,
        }}
      />
      <BlogLayout categories={categories} recentPosts={allPosts.slice(0, 5)}>
        <div className="space-y-8">
          <div className="text-center space-y-4 py-8">
            <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
              {category.title}
            </h1>
            {category.description && (
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                {category.description}
              </p>
            )}
            <p className="text-sm text-muted-foreground">
              {categoryPosts.length}{" "}
              {categoryPosts.length === 1 ? "post" : "posts"}
            </p>
          </div>

          {categoryPosts.length > 0 ? (
            <PostsGrid posts={categoryPosts} />
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                No posts found in this category yet.
              </p>
            </div>
          )}
        </div>
      </BlogLayout>
    </>
  );
}
