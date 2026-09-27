import type { Metadata } from "next";
import { PageHead } from "@/components/ui";
import { IconDownload, IconExternal } from "@/components/icons";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Resume",
  description: `View and download ${site.name}'s professional resume.`,
  alternates: { canonical: "/resume" },
};

export default function ResumePage() {
  return (
    <div className="pb-4">
      <PageHead
        title="Resume"
        description="View and download my professional resume."
      />

      <div className="flex flex-wrap gap-2">
        <a
          href="/resume.pdf"
          download
          className="inline-flex items-center gap-2 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--card)] px-3.5 py-2 text-[13px] text-[var(--foreground)] transition-colors duration-150 hover:border-[color-mix(in_oklab,var(--foreground)_25%,transparent)] hover:bg-[var(--accent)]"
        >
          <IconDownload />
          Download PDF
        </a>
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--card)] px-3.5 py-2 text-[13px] text-[var(--muted-foreground)] transition-colors duration-150 hover:border-[color-mix(in_oklab,var(--foreground)_25%,transparent)] hover:text-[var(--foreground)]"
        >
          <IconExternal />
          Open in a new tab
        </a>
      </div>

      {/* The browser's own PDF viewer, so there is no third-party embed to
          break and no floating toolbar sitting on top of the document. */}
      <div className="mt-5 overflow-hidden rounded-[calc(var(--radius)*1.4)] border border-[var(--border)] bg-[var(--card)]">
        <object
          data="/resume.pdf"
          type="application/pdf"
          className="block h-[70vh] min-h-[28rem] w-full"
          aria-label="Resume"
        >
          <div className="flex h-full flex-col items-center justify-center gap-3 p-8 text-center">
            <p className="text-[14px] text-[var(--muted-foreground)]">
              Your browser cannot display the PDF inline.
            </p>
            <a
              href="/resume.pdf"
              download
              className="text-[13px] text-[var(--foreground)] underline decoration-[color-mix(in_oklab,var(--foreground)_30%,transparent)] underline-offset-3 transition-colors duration-150 hover:decoration-[var(--foreground)]"
            >
              Download it instead
            </a>
          </div>
        </object>
      </div>
    </div>
  );
}
