import type { ReactNode } from "react";
import type { JSONContent } from "@tiptap/core";
import { renderToReactElement } from "@tiptap/static-renderer/pm/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import TiptapImage from "@tiptap/extension-image";

// Mirror the backend TipTap editor so rendered output matches what authors
// composed. StarterKit (v3) already bundles bold, italic, strike, code,
// code blocks, blockquotes, headings, lists, horizontal rules, links and
// underline; TextAlign and Image cover the remaining common tags. Add the
// matching extension here when the editor enables a new node/mark.
const TIPTAP_RENDER_EXTENSIONS = [
  StarterKit,
  TextAlign.configure({
    types: ["heading", "paragraph"],
    alignments: ["start", "end", "left", "center", "right", "justify"],
  }),
  TiptapImage,
];

function isTiptapDocument(value: unknown): value is JSONContent {
  return Boolean(
    value &&
      typeof value === "object" &&
      "type" in value &&
      (value as { type?: unknown }).type === "doc"
  );
}

function hasRenderableTiptap(value: unknown): value is JSONContent {
  return (
    isTiptapDocument(value) &&
    Array.isArray(value.content) &&
    value.content.length > 0
  );
}

/** Whether `content` has anything renderable — use to gate wrappers/cards. */
export function hasRichTextContent(value: unknown): boolean {
  if (hasRenderableTiptap(value)) {
    return true;
  }
  return typeof value === "string" && value.trim().length > 0;
}

interface RichTextProps {
  /** TipTap rich-text document (preferred), or a plain-text string fallback. */
  content: unknown;
  className?: string;
}

/**
 * Renders TipTap rich-text authored in the backend editor via the TipTap
 * extensions (headings, lists, marks, alignment, images, …). Falls back to
 * splitting a plain string into paragraphs when the content isn't a TipTap
 * document.
 */
export function RichText({ content, className }: RichTextProps) {
  if (hasRenderableTiptap(content)) {
    let rendered: ReactNode = null;
    try {
      rendered = renderToReactElement({
        content,
        extensions: TIPTAP_RENDER_EXTENSIONS,
        staticEditorOptions: { textDirection: "auto" },
      });
    } catch {
      rendered = null;
    }

    if (rendered) {
      return <div className={className}>{rendered}</div>;
    }
  }

  if (typeof content === "string") {
    const paragraphs = content
      .split(/\n{2,}/)
      .map((block) => block.trim())
      .filter(Boolean);

    if (paragraphs.length > 0) {
      return (
        <div className={className}>
          {paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      );
    }
  }

  return null;
}
