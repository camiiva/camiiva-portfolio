import Image from "next/image";
import Button from "./Button";

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
  return (
    <article
      className={`group border-b-2 border-border transition-colors duration-default hover:bg-surface ${
        compact ? "" : "py-6 md:py-8 xl:py-20"
      } ${featured ? "border-t-2" : "border-t-0"}`}
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
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-600 ease-out group-hover:scale-[1.1]"
          />
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
