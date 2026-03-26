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
  description: string;
  role: string;
  projectType: string;
  deliverables: string[];
  client: string;
}

export default function ProjectHeader({
  title,
  description,
  role,
  projectType,
  deliverables,
  client,
}: ProjectHeaderProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

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

      {/* Title */}
      <h1
        className="mb-6 font-heading text-[36px] font-bold leading-[1.1] tracking-[-0.64px] md:mb-8 md:text-[48px] xl:mb-6 xl:text-[64px]"
        style={animStyle(mounted, 100)}
      >
        {title}
      </h1>

      {/* Description + metadata */}
      <div
        className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between md:gap-48 xl:justify-start"
        style={animStyle(mounted, 200)}
      >
        <p className="font-body text-base leading-[1.4] text-white md:text-[20px] xl:flex-1">
          {description}
        </p>
        <div className="shrink-0 font-body text-base leading-[1.6] text-white md:w-[260px] md:text-[20px] xl:w-[360px]">
          <p>My role: {role}</p>
          <p>Project type: {projectType}</p>
          <p>Deliverables: {deliverables.join(", ")}</p>
          <p>Client: {client}</p>
        </div>
      </div>
    </div>
  );
}
