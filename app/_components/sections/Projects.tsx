import { ExternalLink } from "lucide-react";
import { GitHubIcon } from "../BrandIcons";

const PROJECTS = [
  {
    title: "Project Alpha",
    description:
      "Placeholder description for a web application that solves a real problem. Built with modern technologies and shipped with care.",
    demoUrl: "#",
    repoUrl: "#",
  },
  {
    title: "Project Beta",
    description:
      "Another placeholder project. This one focuses on performance and user experience, with an emphasis on accessibility.",
    demoUrl: "#",
    repoUrl: "#",
  },
  {
    title: "Project Gamma",
    description:
      "A third placeholder project demonstrating full-stack capabilities from API design through to polished frontend delivery.",
    demoUrl: "#",
    repoUrl: "#",
  },
];

export function Projects() {
  return (
    <section
      id="projects"
      className="relative z-10"
    >
      <div className="max-w-4xl mx-auto px-6 py-24">
        <h2 className="text-xs font-semibold tracking-widest uppercase text-zinc-500 mb-10">
          Projects
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {PROJECTS.map((project) => (
            <article
              key={project.title}
              className="border border-zinc-800 rounded-lg overflow-hidden hover:border-zinc-700 transition-colors bg-zinc-950/50"
            >
              <div className="aspect-video bg-zinc-900" />
              <div className="p-5">
                <h3 className="font-semibold text-zinc-100 mb-2">
                  {project.title}
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed mb-4">
                  {project.description}
                </p>
                <div className="flex items-center gap-4 text-xs text-zinc-500">
                  <a
                    href={project.demoUrl}
                    className="flex items-center gap-1.5 hover:text-zinc-300 transition-colors"
                  >
                    <ExternalLink size={11} />
                    Live demo
                  </a>
                  <a
                    href={project.repoUrl}
                    className="flex items-center gap-1.5 hover:text-zinc-300 transition-colors"
                  >
                    <GitHubIcon size={11} />
                    Source
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
