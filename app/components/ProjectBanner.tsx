"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

export default function ProjectBanner({ image }: { image: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);

  // Parallax on scroll — desktop only
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const container = containerRef.current;
    const wrap = parallaxRef.current;
    if (!container || !wrap) return;

    let rafId: number;
    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const rect = container.getBoundingClientRect();
        const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
        const offset = (progress - 0.5) * 120; // ±60px range
        wrap.style.transform = `translateY(${offset}px)`;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // set initial position
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative hidden w-full overflow-hidden rounded-[8px] md:block md:h-80 xl:h-[520px]"
    >
      {/* Parallax wrapper extends 70px beyond the container on each side so the
          image never exposes a gap during the ±60px vertical scroll shift. */}
      <div
        ref={parallaxRef}
        className="absolute inset-x-0 will-change-transform"
        style={{ top: "-70px", bottom: "-70px" }}
      >
        <Image src={image} alt="" fill className="object-cover" priority />
      </div>
    </div>
  );
}
