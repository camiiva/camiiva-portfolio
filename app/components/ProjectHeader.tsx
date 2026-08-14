"use client";

import { useEffect, useState } from "react";

const EASING = "cubic-bezier(0.16, 1, 0.3, 1)";

function animStyle(visible: boolean, delay: number) {
  return {
    opacity: visible ? 1 : 0,
    transform: visible ? "none" : "translateY(20px)",
    transition: `opacity 0.9s ${EASING} ${delay}ms, transform 0.9s ${EASING} ${delay}ms`,
  };
}

interface ProjectHeaderProps {
  title: string;
  projectType: string;
  deliverables: string[];
  client: string;
  year: string;
}

export default function ProjectHeader({
  title,
  projectType,
  deliverables,
  client,
  year,
}: ProjectHeaderProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const tags = [
    projectType,
    ...deliverables.filter(
      (d) => d.trim().toLowerCase() !== projectType.trim().toLowerCase()
    ),
  ];

  return (
    <div className="container-page pt-8 pb-14 md:pt-10 md:pb-16 xl:pt-12 xl:pb-26">
      {/* Back link */}
      <a
        href="/#work"
        className="mb-8 inline-block font-heading text-base font-bold leading-[1.1] tracking-[-0.16px] text-accent transition-opacity duration-default hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent md:mb-10 xl:mb-12"
        style={animStyle(mounted, 0)}
      >
        ← Back
      </a>

      <div className="xl:max-w-[885px]">
        {/* Title + client/year metadata */}
        <div className="mb-8 flex flex-col gap-3 md:mb-10 md:gap-4" style={animStyle(mounted, 100)}>
          <h1 className="font-heading text-[36px] font-bold leading-[1.1] tracking-[-0.64px] md:text-[48px] xl:text-[64px]">
            {title}
          </h1>
          <div className="flex items-center gap-2 font-heading text-[16px] font-medium uppercase leading-[1.4] tracking-[1.28px] text-meta">
            <span>Client: {client}</span>
            <span>·</span>
            <span>{year}</span>
          </div>
        </div>

        {/* Metadata tags */}
        <div className="flex flex-wrap gap-2" style={animStyle(mounted, 200)}>
          {tags.map((tag, i) => (
            <span
              key={`${tag}-${i}`}
              className="inline-flex items-center rounded-pill bg-surface px-4 py-2 font-body text-sm font-medium leading-[1.4] text-accent md:text-base"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
