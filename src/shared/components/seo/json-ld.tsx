const JSON_LD_ESCAPES: Record<string, string> = {
  "<": "\\u003c",
  ">": "\\u003e",
  "&": "\\u0026",
};

/**
 * Serialize a JSON-LD block for inlining inside a <script> tag. `JSON.stringify`
 * leaves `<` intact, so a backend-sourced value containing `</script>` would
 * close the tag early and let the rest render as markup. Escape the characters
 * that are unsafe between script tags.
 */
function serializeJsonLd(data: object): string {
  return JSON.stringify(data).replace(
    /[<>&]/g,
    (char) => JSON_LD_ESCAPES[char] ?? char
  );
}

/**
 * Renders one or more JSON-LD structured-data blocks. Server component —
 * the markup is emitted directly into the HTML so crawlers see it without
 * executing JavaScript.
 */
export function JsonLd({ data }: { data: object | object[] }) {
  const blocks = Array.isArray(data) ? data : [data];

  return (
    <>
      {blocks.map((block, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(block) }}
        />
      ))}
    </>
  );
}
