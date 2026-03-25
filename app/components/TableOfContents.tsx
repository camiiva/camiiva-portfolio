"use client";

import { useEffect, useState } from "react";

interface Section {
  id: string;
  title: string;
}

export default function TableOfContents({ sections }: { sections: Section[] }) {
  const [activeId, setActiveId] = useState<string>(sections[0]?.id ?? "");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      // Observe a band in the upper third of the viewport, below the navbar
      { rootMargin: "-96px 0px -66% 0px", threshold: 0 }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    const offset = 112; // navbar height + breathing room
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <nav
      aria-label="Table of contents"
      className={`hidden xl:block sticky top-28 h-fit w-[360px] shrink-0 transition-opacity duration-slow ${
        mounted ? "opacity-100" : "opacity-0"
      }`}
    >
      <p className="mb-4 font-heading text-md font-medium uppercase tracking-[2px] text-content-text opacity-60">
        Contents
      </p>
      <ul className="flex flex-col">
        {sections.map(({ id, title }) => {
          const isActive = activeId === id;
          return (
            <li key={id}>
              <a
                href={`#${id}`}
                onClick={(e) => handleClick(e, id)}
                className={`block border-l-2 py-2 font-heading text-md leading-[1.4] transition-all duration-default focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                  isActive
                    ? "border-accent pl-4 text-bg font-bold"
                    : "border-content-border pl-3 text-bg font-normal opacity-50 hover:opacity-80"
                }`}
              >
                {title}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
