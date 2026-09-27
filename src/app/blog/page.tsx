import type { Metadata } from "next";
import { PageHead } from "@/components/ui";
import { BlogIndex } from "@/components/blog-index";
import { getAllPosts, getCategories } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Notes on engineering, distributed systems, and learning in public.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  const posts = getAllPosts();
  const categories = getCategories();

  return (
    <div className="pb-4">
      <PageHead
        title="Blog"
        description="Thoughts, notes, and write-ups on engineering and learning."
      />
      <BlogIndex posts={posts} categories={categories} />
    </div>
  );
}
