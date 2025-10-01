import { getAllCategories } from "@/lib/blog-api-new";
import { BlogSearchPage } from "@/ui-pages";

export default async function SearchPage() {
  const categories = await getAllCategories();

  return <BlogSearchPage categories={categories} />;
}
