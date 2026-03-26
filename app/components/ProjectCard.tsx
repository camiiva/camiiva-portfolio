"use client";

import Image from "next/image";
import Button from "./Button";
import { useEffect, useRef, useState } from "react";

export interface ProjectCardProps {
  title: string;
  description: string;
  company: string;
  year: string;
  href: string;
  image?: string;
  featured?: boolean;
  compact?: boolean;
}

export default function ProjectCard({
  title,
  description,
  company,
  year,
  href,
  image = "/project-02.png",
  featured = false,
  compact = false,
}: ProjectCardProps) {
  const articleRef = useRef<HTMLElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  // Scroll-triggered reveal
  useEffect(() => {
    if (compact) return;
    const el = articleRef.current;
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
  }, [compact]);

  // Parallax on scroll — desktop only
  useEffect(() => {
    if (compact) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const article = articleRef.current;
    const wrap = parallaxRef.current;
    if (!article || !wrap) return;

    let rafId: number;
    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const rect = article.getBoundingClientRect();
        const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
        const offset = (progress - 0.5) * 60; // ±30px range
        wrap.style.transform = `translateY(${offset}px)`;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // set initial position
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, [compact]);

  return (
    <article
      ref={articleRef}
      className={`group border-b-2 border-border hover:bg-surface ${
        compact ? "" : "py-6 md:py-8 xl:py-20"
      } ${featured ? "border-t-2" : "border-t-0"}`}
      style={compact ? {} : {
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(24px)",
        transition: "opacity 0.7s ease, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1), background-color 200ms ease",
      }}
    >
      <div
        className={
          compact
            ? "flex flex-col"
            : "container-page flex flex-col gap-12 md:flex-row md:items-start md:gap-10 xl:gap-18"
        }
      >
        {/* Image */}
        <div
          className={
            compact
              ? "relative w-full h-44 bg-img-bg overflow-hidden"
              : "relative w-full h-64 rounded-card bg-img-bg overflow-hidden order-1 md:order-2 md:h-75 md:w-[75%] xl:h-150"
          }
        >
          {compact ? (
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover transition-transform duration-600 ease-out group-hover:scale-[1.1]"
            />
          ) : (
            // Parallax wrapper extends 40px beyond the container on each side so the
            // image never exposes a gap during the ±30px vertical scroll shift.
            <div
              ref={parallaxRef}
              className="absolute inset-x-0 will-change-transform"
              style={{ top: "-40px", bottom: "-40px" }}
            >
              <Image
                src={image}
                alt={title}
                fill
                className="object-cover transition-transform duration-600 ease-out group-hover:scale-[1.08]"
              />
            </div>
          )}
        </div>

        {/* Text */}
        <div
          className={
            compact
              ? "flex flex-col gap-4 p-5"
              : "flex flex-col items-start justify-between self-stretch min-w-0 order-2 md:order-1 md:w-[35%]"
          }
        >
          <div
            className={
              compact
                ? "flex flex-col gap-2"
                : "flex flex-col gap-6 w-full md:gap-6"
            }
          >
            <h2 className="font-heading text-xl font-bold leading-[1.1] tracking-[-0.24px] text-white md:text-2xl">
              {title}
            </h2>
            <p className="font-body text-base leading-[1.4] text-white md:text-[20px]">
              {description}
            </p>
            <div className="flex items-center gap-2 font-heading text-base font-medium leading-[1.4] text-accent md:text-[20px]">
              <span>{company}</span>
              <span>·</span>
              <span>{year}</span>
            </div>
          </div>
          <Button href={href} className={compact ? "mt-3" : "mt-6 w-full md:w-auto md:mt-8"}>
            View case study
          </Button>
        </div>
      </div>
    </article>
  );
}
