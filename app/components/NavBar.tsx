const navLinkClass =
  "no-underline transition-all duration-default hover:underline hover:decoration-accent hover:decoration-wavy focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent";

interface NavLink {
  label: string;
  href: string;
}

const links: NavLink[] = [
  { label: "WORK", href: "#work" },
  { label: "ABOUT", href: "#about" },
  { label: "RESUME", href: "#resume" },
];

export default function NavBar() {
  return (
    <nav className="w-full max-w-425 mx-auto px-12 md:px-8 xl:px-16 flex items-center justify-center py-6 md:py-5 xl:py-6">
      <div className="flex items-center gap-12 font-heading text-base font-medium tracking-[1.28px] text-white md:gap-8 xl:gap-12">
        {links.map(({ label, href }) => (
          <a key={href} href={href} className={navLinkClass}>
            {label}
          </a>
        ))}
      </div>
    </nav>
  );
}
