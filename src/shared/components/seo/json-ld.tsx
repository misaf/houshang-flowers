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
          // Structured data is built from our own data; safe to inline.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(block) }}
        />
      ))}
    </>
  );
}
