// Splits on ==marked== spans and renders them as a solid accent highlight.
export default function HighlightText({ text }: { text: string }) {
  const parts = text.split(/==(.+?)==/g);

  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <mark
            key={i}
            className="box-decoration-clone rounded-[4px] bg-accent px-1 text-text-dark"
          >
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </>
  );
}
