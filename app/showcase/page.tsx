import NavBar from "../components/NavBar";
import Button from "../components/Button";
import ProjectCard from "../components/ProjectCard";
import Footer from "../components/Footer";

const sampleProject = {
  id: 1,
  title: "B2B Help Center",
  description:
    "Customer Portal or Help Center that provides customers with easy access to product documentation and knowledge articles, enabling them to learn how to use the product and submit support tickets when needed.",
  company: "Evinova",
  year: "2024",
  href: "#",
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-8 px-5 py-12 border-b border-border md:px-8 xl:px-12">
      <h2 className="font-heading text-xs font-medium tracking-[2px] uppercase text-accent opacity-60">
        {title}
      </h2>
      {children}
    </section>
  );
}

function Swatch({ label, className }: { label: string; className: string }) {
  return (
    <div className="flex flex-col gap-2">
      <div className={`h-16 w-32 rounded-card border border-border ${className}`} />
      <span className="font-heading text-xs text-white/60">{label}</span>
    </div>
  );
}

export default function Showcase() {
  return (
    <div className="min-h-screen bg-bg text-white">
      {/* Header */}
      <div className="px-5 py-10 border-b-2 border-border md:px-8 xl:px-12">
        <p className="font-heading text-xs font-medium tracking-[2px] uppercase text-accent mb-3">
          Design System
        </p>
        <h1 className="font-heading text-[40px] font-bold leading-[1.1] tracking-[-0.4px]">
          Component Showcase
        </h1>
        <p className="font-body text-base text-white/60 mt-2">
          All reusable components for the Camila Valencia portfolio.
        </p>
      </div>

      {/* Colors */}
      <Section title="Colors">
        <div className="flex flex-wrap gap-6">
          <Swatch label="bg-bg" className="bg-bg" />
          <Swatch label="bg-surface" className="bg-surface" />
          <Swatch label="bg-footer" className="bg-footer" />
          <Swatch label="bg-img-bg" className="bg-img-bg" />
          <Swatch label="bg-accent" className="bg-accent" />
          <Swatch label="border-border" className="bg-border" />
          <Swatch label="text-text-dark" className="bg-text-dark" />
        </div>
      </Section>

      {/* Typography */}
      <Section title="Typography">
        <div className="flex flex-col gap-6">
          <div>
            <p className="font-heading text-xs text-white/40 mb-1">Hero headline — Space Grotesk Bold 64px</p>
            <p className="font-heading text-[64px] font-bold leading-[1.1] tracking-[-0.64px]">
              Crafting smart, <span className="text-accent">scalable</span> design
            </p>
          </div>
          <div>
            <p className="font-heading text-xs text-white/40 mb-1">Hero greeting — Space Grotesk Medium 40px</p>
            <p className="font-heading text-[40px] font-medium leading-[1.2]">Hey, I&apos;m Camila! 👋</p>
          </div>
          <div>
            <p className="font-heading text-xs text-white/40 mb-1">Project title — Space Grotesk Bold 24px</p>
            <p className="font-heading text-2xl font-bold leading-[1.1] tracking-[-0.24px]">B2B Help Center</p>
          </div>
          <div>
            <p className="font-heading text-xs text-white/40 mb-1">Body text — IBM Plex Sans Regular 20px</p>
            <p className="font-body text-[20px] leading-[1.4]">
              Customer Portal that provides easy access to product documentation and knowledge articles.
            </p>
          </div>
          <div>
            <p className="font-heading text-xs text-white/40 mb-1">Nav / metadata — Space Grotesk Medium 16px, tracking 1.28px</p>
            <p className="font-heading text-base font-medium tracking-[1.28px]">WORK · ABOUT · RESUME</p>
          </div>
        </div>
      </Section>

      {/* Buttons */}
      <Section title="Button">
        <div className="flex flex-wrap items-center gap-6">
          <div className="flex flex-col gap-2 items-start">
            <p className="font-heading text-xs text-white/40">Default</p>
            <Button href="#">View case study</Button>
          </div>
          <div className="flex flex-col gap-2 items-start">
            <p className="font-heading text-xs text-white/40">Hover (simulate)</p>
            <Button href="#" className="brightness-90">View case study</Button>
          </div>
          <div className="flex flex-col gap-2 items-start">
            <p className="font-heading text-xs text-white/40">Active (simulate)</p>
            <Button href="#" className="scale-[0.97] brightness-75">View case study</Button>
          </div>
        </div>
        <div className="mt-2 font-heading text-xs text-white/40 space-y-1">
          <p>hover: brightness-90</p>
          <p>active: scale-[0.97] brightness-75</p>
          <p>focus: outline-2 outline-offset-2 outline-accent</p>
        </div>
      </Section>

      {/* NavBar */}
      <Section title="Navigation Bar">
        <div className="border border-border rounded-card overflow-hidden">
          <NavBar />
        </div>
      </Section>

      {/* Project Card */}
      <Section title="Project Card">
        <div className="border border-border rounded-card overflow-hidden">
          <ProjectCard {...sampleProject} />
        </div>
      </Section>

      {/* Footer */}
      <Section title="Footer">
        <div className="border border-border rounded-card overflow-hidden">
          <Footer />
        </div>
      </Section>

      {/* Spacing & Tokens reference */}
      <Section title="Design Tokens Reference">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
          <div className="flex flex-col gap-3">
            <p className="font-heading text-sm font-medium text-accent">Border Radius</p>
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 bg-surface border border-border rounded-card" />
              <span className="font-heading text-xs text-white/60">rounded-card (12px)</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="h-12 w-24 bg-surface border border-border rounded-pill" />
              <span className="font-heading text-xs text-white/60">rounded-pill (999px)</span>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <p className="font-heading text-sm font-medium text-accent">Transition Durations</p>
            <p className="font-heading text-xs text-white/60">duration-fast — 150ms</p>
            <p className="font-heading text-xs text-white/60">duration-default — 200ms</p>
            <p className="font-heading text-xs text-white/60">duration-slow — 300ms</p>
          </div>
          <div className="flex flex-col gap-3">
            <p className="font-heading text-sm font-medium text-accent">Fonts</p>
            <p className="font-heading text-sm">font-heading — Space Grotesk</p>
            <p className="font-body text-sm">font-body — IBM Plex Sans</p>
          </div>
        </div>
      </Section>
    </div>
  );
}
