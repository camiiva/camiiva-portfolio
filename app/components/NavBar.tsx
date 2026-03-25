"use client";

import { useState } from "react";

const navLinkClass =
  "no-underline transition-all duration-default hover:underline hover:decoration-accent hover:decoration-wavy focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent";

interface NavLink {
  label: string;
  href: string;
}

const links: NavLink[] = [
  { label: "WORK", href: "/" },
  { label: "ABOUT", href: "#about" },
  { label: "RESUME", href: "#resume" },
];

export default function NavBar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Top bar */}
      <div className="w-full max-w-425 mx-auto">
        <nav className="px-6 md:px-8 xl:px-16 flex items-center py-6 md:py-5 xl:py-6 md:justify-center">
          {/* Mobile hamburger — top left */}
          <button
            className="md:hidden text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen(true)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="3" y1="7" x2="21" y2="7" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="17" x2="21" y2="17" />
            </svg>
          </button>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8 xl:gap-12 font-heading text-base font-medium tracking-[1.28px] text-white">
            {links.map(({ label, href }) => (
              <a key={href} href={href} className={navLinkClass}>
                {label}
              </a>
            ))}
          </div>
        </nav>
      </div>

      {/* Full-screen overlay */}
      <div className={`fixed inset-0 z-50 bg-bg flex flex-col px-6 pt-6 md:hidden transition-all duration-300 ease-in-out ${open ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"}`}>
          {/* Close button — mirrors hamburger position */}
          <button
            className="self-start text-white mb-12 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {/* Links */}
          <div className="flex flex-col gap-8 font-heading text-[32px] font-medium tracking-[1.28px] text-white">
            {links.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                className={navLinkClass}
                onClick={() => setOpen(false)}
              >
                {label}
              </a>
            ))}
          </div>
        </div>
    </>
  );
}
