import { notFound } from "next/navigation";
import NavBar from "@/app/components/NavBar";
import Footer from "@/app/components/Footer";
import TableOfContents from "@/app/components/TableOfContents";
import ProjectCard from "@/app/components/ProjectCard";
import CursorGlow from "@/app/components/CursorGlow";
import ProjectHeader from "@/app/components/ProjectHeader";
import ProjectSection from "@/app/components/ProjectSection";
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

  return (
    <div className="min-h-screen bg-content-bg md:cursor-none">
      <CursorGlow />

      {/* ── Dark header ─────────────────────────────────────── */}
      <header className="bg-bg text-white">
        <NavBar />
        <ProjectHeader
          title={project.title}
          description={project.overview}
          role={project.role}
          projectType={project.product}
          deliverables={project.deliverables}
          client={project.client}
        />
      </header>

      {/* ── Light content area ───────────────────────────────── */}
      <main className="container-page py-12 md:py-16 xl:py-20">
        <div className="xl:flex xl:items-start xl:gap-48">
          {/* Sections */}
          <div className="flex flex-col gap-14 md:gap-18 xl:gap-20 xl:flex-1">
            {project.process.map((section, i) => (
              <ProjectSection
                key={i}
                sectionId={slugify(section.title)}
                title={section.title}
                body={section.description}
              />
            ))}
          </div>

          {/* Table of contents — xl only */}
          <TableOfContents
            sections={project.process.map((s) => ({
              id: slugify(s.title),
              title: s.title,
            }))}
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
