import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";

/**
 * The elements MDX is allowed to render. Anything not listed falls back to
 * the paragraph style defined in globals.css.
 */
function components() {
  return {
    a: (props: React.ComponentPropsWithoutRef<"a">) => {
      const href = props.href ?? "#";
      const external = /^https?:\/\//.test(href);
      return (
        <a
          {...props}
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        />
      );
    },
  };
}

export function Mdx({ source }: { source: string }) {
  return (
    <div className="prose-post">
      <MDXRemote
        source={source}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [rehypeSlug],
          },
        }}
        components={components()}
      />
    </div>
  );
}
