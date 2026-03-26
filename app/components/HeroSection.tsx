"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const EASING = "cubic-bezier(0.16, 1, 0.3, 1)";

function animStyle(visible: boolean, delay: number) {
  return {
    opacity: visible ? 1 : 0,
    transform: visible ? "none" : "translateY(20px)",
    transition: `opacity 0.9s ${EASING} ${delay}ms, transform 0.9s ${EASING} ${delay}ms`,
  };
}

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  // Trigger entrance animation after mount
  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  // 3D tilt on cursor move — desktop only
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const section = sectionRef.current;
    const img = imageRef.current;
    if (!section || !img) return;

    const onMove = (e: MouseEvent) => {
      const rect = img.getBoundingClientRect();
      const dx = Math.max(-1, Math.min(1, (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2)));
      const dy = Math.max(-1, Math.min(1, (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2)));
      img.style.transition = "transform 0.15s ease-out";
      img.style.transform = `perspective(800px) rotateY(${dx * 12}deg) rotateX(${-dy * 12}deg)`;
    };
    const onLeave = () => {
      img.style.transition = "transform 0.6s ease-out";
      img.style.transform = "perspective(800px) rotateY(0deg) rotateX(0deg)";
    };

    section.addEventListener("mousemove", onMove);
    section.addEventListener("mouseleave", onLeave);
    return () => {
      section.removeEventListener("mousemove", onMove);
      section.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <>
      <style>{`
        @keyframes accent-shimmer {
          0%, 100% { text-shadow: none; }
          50%       { text-shadow: 0 0 28px rgba(51, 250, 179, 0.55); }
        }
        .accent-shimmer { animation: accent-shimmer 3s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .accent-shimmer { animation: none; }
        }
      `}</style>

      <div className="container-page">
        <section
          ref={sectionRef}
          className="flex flex-col gap-10 rounded-3xl bg-linear-to-b from-surface to-bg px-4 py-8 md:flex-row md:items-center md:gap-10 md:rounded-4xl md:p-10 xl:gap-14 xl:rounded-[48px] xl:p-40"
        >
          {/* Profile photo — tilts on cursor */}
          <div
            ref={imageRef}
            className="relative self-center shrink-0 h-38.5 w-28.5 rounded-card border-[7px] border-border overflow-hidden will-change-transform md:self-start md:h-68.5 md:w-51"
            style={animStyle(mounted, 0)}
          >
            <Image src="/me-img.png" alt="Camila Valencia" fill className="object-cover" priority />
          </div>

          {/* Text */}
          <div className="flex flex-col gap-4 text-white text-center md:text-left md:gap-4 xl:gap-4">
            <p
              className="font-heading text-[24px] font-medium leading-[1.2] md:text-[32px] xl:text-[40px]"
              style={animStyle(mounted, 120)}
            >
              Hey, I&apos;m Camila! 👋
            </p>
            <h1
              className="font-heading text-[28px] font-bold leading-[1.1] tracking-[-0.64px] md:text-[48px] xl:text-[64px]"
              style={animStyle(mounted, 240)}
            >
              Senior product designer crafting smart,{" "}
              <span className="text-accent accent-shimmer">scalable</span> design for digital
              products
            </h1>
          </div>
        </section>
      </div>
    </>
  );
}
