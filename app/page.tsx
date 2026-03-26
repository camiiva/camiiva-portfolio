import NavBar from "./components/NavBar";
import ProjectCard from "./components/ProjectCard";
import Footer from "./components/Footer";
import CursorGlow from "./components/CursorGlow";
import HeroSection from "./components/HeroSection";
import projects from "@/data/projects.json";

export default function Home() {
  return (
    <div className="min-h-screen bg-bg text-white md:cursor-none">
      <CursorGlow />
      <NavBar />
      <HeroSection />

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
