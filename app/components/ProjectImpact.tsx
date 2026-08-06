"use client";

import { useEffect, useRef, useState } from "react";

interface ImpactItem {
  title: string;
  description: string;
  metric?: {
    value: string;
    label: string;
  };
}

interface ProjectImpactProps {
  sectionId: string;
  title: string;
  items: ImpactItem[];
}

export default function ProjectImpact({ sectionId, title, items }: ProjectImpactProps) {
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
      <h2 className="mb-8 font-heading text-[22px] font-bold leading-[1.4] text-content-text md:mb-10 md:text-[28px] xl:text-[32px]">
        {title}
      </h2>
      <div className="grid grid-cols-1 border-r border-b border-content-border sm:grid-cols-2 xl:grid-cols-3 xl:max-w-[1106px]">
        {items.map((item) => (
          <div
            key={item.title}
            className="flex flex-col border-t border-l border-content-border p-8"
          >
            <h3 className="mb-3 font-heading text-lg font-bold leading-[1.2] text-content-text">
              {item.title}
            </h3>
            <p className="font-body text-base leading-[1.5] text-content-text/70">
              {item.description}
            </p>
            {item.metric && (
              <div className="mt-auto pt-6">
                <p className="font-heading text-3xl font-bold leading-[1.1] text-content-text">
                  {item.metric.value}
                </p>
                <p className="font-body text-sm leading-[1.4] text-content-text/60">
                  {item.metric.label}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
