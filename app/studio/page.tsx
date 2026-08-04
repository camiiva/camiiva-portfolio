"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import projects from "@/data/projects.json";

export default function StudioPage() {
  const dotRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    let rafId: number;
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        if (dotRef.current) {
          dotRef.current.style.transform = `translate3d(${e.clientX - 4}px, ${e.clientY - 4}px, 0)`;
        }
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <style>{`
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .anim {
          opacity: 0;
          animation: fade-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      <div className="min-h-screen bg-bg text-white selection:bg-accent selection:text-text-dark md:cursor-none">

        {/* Cursor dot */}
        <div
          ref={dotRef}
          className="pointer-events-none fixed top-0 left-0 z-40 h-2 w-2 rounded-full bg-accent will-change-transform hidden md:block"
          style={{ transform: "translate3d(-100px, -100px, 0)" }}
        />

        {/* Fixed nav */}
        <header className="fixed top-0 left-0 right-0 z-20 flex items-center justify-between px-6 py-6 md:px-12 xl:px-16">
          <a
            href="/"
            className="font-heading text-sm font-medium tracking-[2px] text-white/40 transition-colors duration-default hover:text-white"
          >
            CV
          </a>
          <nav className="hidden md:flex gap-8 font-heading text-sm font-medium tracking-[1.28px] text-white">
            <a href="/" className="transition-colors duration-default hover:text-accent">WORK</a>
            <a href="#about" className="transition-colors duration-default hover:text-accent">ABOUT</a>
            <a href="#resume" className="transition-colors duration-default hover:text-accent">RESUME</a>
          </nav>
        </header>

        {/* Hero — full screen, content pinned to bottom */}
        <section className="relative flex min-h-screen flex-col justify-end px-6 pb-16 pt-24 md:px-12 xl:px-16">
          <p
            className="anim font-heading text-xs font-medium tracking-[4px] text-accent uppercase mb-8"
            style={{ animationDelay: "0ms" }}
          >
            Hey, I&apos;m Camila 👋
          </p>
          <h1 className="font-heading font-bold uppercase leading-[0.88] tracking-[-0.04em]">
            <span className="anim block text-[clamp(52px,9vw,160px)]" style={{ animationDelay: "80ms" }}>
              Senior
            </span>
            <span className="anim block text-[clamp(52px,9vw,160px)]" style={{ animationDelay: "160ms" }}>
              Product
            </span>
            <span className="anim block text-[clamp(52px,9vw,160px)] text-accent" style={{ animationDelay: "240ms" }}>
              Designer
            </span>
          </h1>
          <div
            className="anim mt-10 flex flex-wrap items-center gap-5"
            style={{ animationDelay: "360ms" }}
          >
            <a
              href="#work"
              className="inline-flex items-center gap-2 rounded-pill bg-accent px-8 py-3 font-heading text-[18px] font-bold leading-[1.1] tracking-[-0.2px] text-text-dark transition-all duration-default hover:brightness-90 active:scale-[0.97]"
            >
              See my work
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <span className="font-body text-sm text-white/30">Scroll ↓</span>
          </div>
        </section>

        {/* Projects — accordion list */}
        <section id="work" className="px-6 pb-32 md:px-12 xl:px-16">
          <p className="font-heading text-xs font-medium tracking-[4px] text-accent uppercase mb-12">
            Selected work
          </p>

          {projects.map((project, i) => (
            <article
              key={project.id}
              className="border-t border-border"
              onMouseEnter={() => setActive(project.id)}
              onMouseLeave={() => setActive(null)}
            >
              {/* Row header */}
              <div className="flex cursor-default items-center gap-6 py-6 md:py-8">
                <span className="w-8 shrink-0 font-heading text-sm font-medium tabular-nums text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2 className="flex-1 min-w-0 font-heading text-2xl font-bold leading-none text-white transition-colors duration-default group-hover:text-accent md:text-4xl xl:text-5xl">
                  {project.title}
                </h2>
                <div className="hidden shrink-0 items-center gap-6 md:flex">
                  <span className="font-heading text-sm font-medium text-white/40">{project.client}</span>
                  <span className="font-heading text-sm font-medium text-white/40">{project.year}</span>
                </div>
                <svg
                  className={`h-5 w-5 shrink-0 text-accent transition-transform duration-300 ease-in-out ${active === project.id ? "translate-x-1" : ""}`}
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path d="M4 10h12M12 6l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>

              {/* Expandable panel — CSS grid trick for smooth auto-height animation */}
              <div
                className={`grid transition-[grid-template-rows] duration-500 ease-in-out ${
                  active === project.id ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="flex flex-col gap-6 pb-10 md:flex-row md:items-start md:gap-10">
                    <div className="relative h-48 w-full shrink-0 overflow-hidden rounded-card bg-img-bg md:h-60 md:w-80 xl:h-72 xl:w-[440px]">
                      <Image
                        src={project.image ?? "/project-02.png"}
                        alt={project.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-1 flex-col gap-6">
                      <div className="flex flex-wrap gap-2">
                        {project.deliverables.map((d) => (
                          <span
                            key={d}
                            className="rounded-pill border border-border px-3 py-1 font-heading text-xs font-medium tracking-[0.5px] text-white/50"
                          >
                            {d}
                          </span>
                        ))}
                      </div>
                      <p className="max-w-lg font-body text-base leading-[1.6] text-white/70">
                        {project.tagline}
                      </p>
                      <a
                        href={`/projects/${project.id}`}
                        className="self-start inline-flex items-center gap-2 rounded-pill bg-accent px-6 py-2.5 font-heading text-sm font-bold text-text-dark transition-all duration-default hover:brightness-90 active:scale-[0.97]"
                      >
                        View case study →
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}

          <div className="border-t border-border" />
        </section>

        {/* Footer */}
        <footer className="bg-footer px-6 py-6 md:px-12 xl:px-16">
          <div className="flex flex-col gap-4 font-heading text-sm font-medium text-accent underline decoration-dotted decoration-footer md:flex-row md:gap-8">
            <a
              href="https://www.linkedin.com/in/camila-valencia/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-opacity duration-default hover:opacity-70"
            >
              Linkedin
            </a>
            <a
              href="mailto:camilavalenciasampedro@gmail.com"
              className="transition-opacity duration-default hover:opacity-70"
            >
              camilavalenciasampedro@gmail.com
            </a>
          </div>
        </footer>
      </div>
    </>
  );
}
