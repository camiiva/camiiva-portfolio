"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface ProjectSectionProps {
  title: string;
  body: string;
  sectionId: string;
  image?: string;
}

export default function ProjectSection({ title, body, sectionId, image = "/project-02.png" }: ProjectSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const [firstParagraph, ...restParagraphs] = body.split("\n\n");

  return (
    <div
      ref={ref}
      id={sectionId}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(24px)",
        transition: "opacity 0.7s ease, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      <h2 className="mb-3 font-heading text-[22px] font-bold leading-[1.4] text-content-text md:text-[28px] xl:text-[32px]">
        {title}
      </h2>
      <p className="mb-12 font-body text-base leading-[1.4] text-content-text md:mb-16 md:text-[20px] xl:max-w-[1106px]">
        {firstParagraph}
      </p>
      <div className="relative aspect-video w-full overflow-hidden rounded-card bg-img-bg xl:max-w-[1106px]">
        <Image src={image} alt="" fill className="object-cover" />
      </div>
      {restParagraphs.map((paragraph, i) => (
        <p
          key={i}
          className="mt-12 font-body text-base leading-[1.4] text-content-text md:mt-16 md:text-[20px] xl:max-w-[1106px]"
        >
          {paragraph}
        </p>
      ))}
    </div>
  );
}
