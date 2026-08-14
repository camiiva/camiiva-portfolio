import { notFound } from "next/navigation";
import NavBar from "@/app/components/NavBar";
import Footer from "@/app/components/Footer";
import TableOfContents from "@/app/components/TableOfContents";
import ProjectCard from "@/app/components/ProjectCard";
import CursorGlow from "@/app/components/CursorGlow";
import ProjectHeader from "@/app/components/ProjectHeader";
import ProjectSection from "@/app/components/ProjectSection";
import ProjectImpact from "@/app/components/ProjectImpact";
import HighlightText from "@/app/components/HighlightText";
import projects from "@/data/projects.json";

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export function generateStaticParams() {
  return projects.map((p) => ({ id: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);
  if (!project) return {};
  return {
    title: `${project.title} — Camila Valencia`,
    description: project.overview,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);

  if (!project) notFound();

  const otherProjects = projects.filter((p) => p.id !== id);

  const impactSection = project.impact?.length
    ? { id: "impact-and-learnings", title: "Impact and learnings" }
    : null;

  return (
    <div className="min-h-screen bg-content-bg md:cursor-none">
      <CursorGlow />

      {/* ── Dark header ─────────────────────────────────────── */}
      <header className="bg-bg text-white">
        <NavBar />
        <ProjectHeader
          title={project.title}
          projectType={project.product}
          deliverables={project.deliverables}
          client={project.client}
          year={project.year}
        />
      </header>

      {/* ── Light content area ───────────────────────────────── */}
      <main className="container-page py-12 md:py-16 xl:py-20">
        <div className="xl:flex xl:items-start xl:gap-48">
          <div className="xl:flex-1">
            {/* Problem statement + goal intro */}
            <div id="intro" className="mb-14 md:mb-18 xl:mb-20 xl:max-w-[885px]">
              <div className="flex flex-col gap-6 font-heading text-[20px] font-bold leading-[1.3] text-content-text md:text-[24px]">
                <p>{project.overview}</p>
                <p>
                  <HighlightText text={project.goal} />
                </p>
              </div>
              <div className="mt-10 border-t-2 border-dotted border-content-border md:mt-12" />
            </div>

            {/* Sections */}
            <div className="flex flex-col gap-14 md:gap-18 xl:gap-20">
              {project.process.map((section, i) => (
                <ProjectSection
                  key={i}
                  sectionId={slugify(section.title)}
                  title={section.title}
                  body={section.description}
                />
              ))}

              {impactSection && (
                <ProjectImpact
                  sectionId={impactSection.id}
                  title={impactSection.title}
                  items={project.impact}
                />
              )}
            </div>
          </div>

          {/* Table of contents — xl only */}
          <TableOfContents
            sections={[
              { id: "intro", title: "Intro" },
              ...project.process.map((s) => ({
                id: slugify(s.title),
                title: s.title,
              })),
              ...(impactSection ? [impactSection] : []),
            ]}
          />
        </div>
      </main>

      {/* ── Other projects ───────────────────────────────────── */}
      <section className="bg-bg text-white hidden">
        <div className="container-page py-12 md:py-16 xl:py-20">
          <h2 className="mb-8 font-heading text-[28px] font-bold leading-[1.1] tracking-[-0.24px] md:mb-10 md:text-[36px] xl:mb-12 xl:text-[40px]">
            Other projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 xl:gap-8">
            {otherProjects.map((p) => (
              <ProjectCard
                key={p.id}
                title={p.title}
                description={p.tagline}
                company={p.client}
                year={p.year}
                image={p.image}
                href={`/projects/${p.id}`}
                compact
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Light footer ─────────────────────────────────────── */}
      <Footer light />
    </div>
  );
}
