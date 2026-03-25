import { notFound } from "next/navigation";
import Image from "next/image";
import NavBar from "@/app/components/NavBar";
import Footer from "@/app/components/Footer";
import TableOfContents from "@/app/components/TableOfContents";
import ProjectCard from "@/app/components/ProjectCard";
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
    description: project.description,
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
    <div className="min-h-screen bg-content-bg">
      {/* ── Dark header ─────────────────────────────────────── */}
      <header className="bg-bg text-white">
        <NavBar />

        <div className="container-page pt-8 pb-14 md:pt-10 md:pb-16 xl:pt-12 xl:pb-26">
          {/* Back link */}
          <a
            href="/#work"
            className="mb-8 inline-block font-heading text-base font-bold leading-[1.1] tracking-[-0.16px] text-accent transition-opacity duration-default hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent md:mb-10 xl:mb-12"
          >
            ← Back
          </a>

          {/* Title */}
          <h1 className="mb-6 font-heading text-[36px] font-bold leading-[1.1] tracking-[-0.64px] md:mb-8 md:text-[48px] xl:mb-6 xl:text-[64px]">
            {project.title}
          </h1>

          {/* Description + metadata row */}
          <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between md:gap-48 xl:justify-start">
            {/* Description */}
            <p className="font-body text-base leading-[1.4] text-white md:text-[20px] xl:flex-1">
              {project.description}
            </p>

            {/* Metadata */}
            <div className="shrink-0 font-body text-base leading-[1.6] text-white md:w-[260px] md:text-[20px] xl:w-[360px]">
              <p>My role: {project.role}</p>
              <p>Project type: {project.projectType}</p>
              <p>Deliverables: {project.deliverables.join(", ")}</p>
              <p>Client: {project.client}</p>
            </div>
          </div>
        </div>
      </header>

      {/* ── Light content area ───────────────────────────────── */}
      <main className="container-page py-12 md:py-16 xl:py-20">
        <div className="xl:flex xl:items-start xl:gap-48">
          {/* Sections */}
          <div className="flex flex-col gap-14 md:gap-18 xl:gap-20 xl:flex-1">
            {project.sections.map((section, i) => {
              const id = slugify(section.title);
              return (
                <div key={i} id={id}>
                  {/* Section title */}
                  <h2 className="mb-3 font-heading text-[22px] font-bold leading-[1.4] text-content-text md:text-[28px] xl:text-[32px]">
                    {section.title}
                  </h2>

                  {/* Body text */}
                  <p className="mb-12 font-body text-base leading-[1.4] text-content-text md:mb-16 md:text-[20px] xl:max-w-[1106px]">
                    {section.body}
                  </p>

                  {/* Image placeholder */}
                  <div className="relative h-52 w-full overflow-hidden rounded-card bg-img-bg md:h-72 xl:h-[600px] xl:max-w-[1106px]">
                    <Image src="/project-02.png" alt="" fill className="object-cover" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Table of contents — xl only */}
          <TableOfContents
            sections={project.sections.map((s) => ({
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
                description={p.description}
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
