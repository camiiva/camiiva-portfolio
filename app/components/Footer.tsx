const footerLinkClass =
  "transition-opacity duration-default hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent";

interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

const links: FooterLink[] = [
  { label: "Linkedin", href: "https://www.linkedin.com/in/camila-valencia/", external: true },
  { label: "camilavalenciasampedro@gmail.com", href: "mailto:camilavalenciasampedro@gmail.com" },
];

export default function Footer({ light = false }: { light?: boolean }) {
  return (
    <footer
      className={light ? "border-t-2 border-content-border" : "bg-footer"}
    >
      <div className="w-full max-w-425 mx-auto px-12 md:px-8 xl:px-16 flex flex-col gap-4 py-5 md:flex-row md:items-center">
        <div
        className={`flex flex-col gap-4 font-heading text-base font-medium underline decoration-dotted md:flex-row md:gap-8 xl:gap-12 ${
          light ? "text-content-text decoration-content-text" : "text-accent decoration-footer"
        }`}
      >
        {links.map(({ label, href, external }) => (
          <a
            key={href}
            href={href}
            className={footerLinkClass}
            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          >
            {label}
          </a>
        ))}
        </div>
      </div>
    </footer>
  );
}
