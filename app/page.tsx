import Image from "next/image";
import NavBar from "./components/NavBar";
import ProjectCard from "./components/ProjectCard";
import Footer from "./components/Footer";
import projects from "@/data/projects.json";

export default function Home() {
  return (
    <div className="min-h-screen bg-bg text-white">
      <NavBar />

      {/* Hero */}
      <div className="container-page pt-0 pb-0 md:pt-0 xl:pt-0">
        <section className="flex flex-col gap-10 rounded-[24px] bg-gradient-to-b from-surface to-bg px-4 py-8 md:flex-row md:items-center md:gap-10 md:rounded-[32px] md:p-10 xl:gap-[56px] xl:rounded-[48px] xl:p-40">
          <div className="relative self-center shrink-0 h-[154px] w-[114px] rounded-card border-[7px] border-border overflow-hidden md:self-start md:h-[274px] md:w-[204px]">
            <Image
              src="/me-img.png"
              alt="Camila Valencia"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="flex flex-col gap-4 text-white text-center md:text-left md:gap-4 xl:gap-4">
            <p className="font-heading text-[24px] font-medium leading-[1.2] md:text-[32px] xl:text-[40px]">
              Hey, I&apos;m Camila! 👋
            </p>
            <h1 className="font-heading text-[28px] font-bold leading-[1.1] tracking-[-0.64px] md:text-[48px] xl:text-[64px]">
              Senior product designer crafting smart,{" "}
              <span className="text-accent">scalable</span> design for digital
              products
            </h1>
          </div>
        </section>
      </div>

      {/* Projects */}
      <main id="work">
        {projects.map((project, i) => (
          <ProjectCard
            key={project.id}
            title={project.title}
            description={project.description}
            company={project.client}
            year={project.year}
            image={project.image}
            href={`/projects/${project.id}`}
            featured={i === 0}
          />
        ))}
      </main>

      <Footer />
    </div>
  );
}
