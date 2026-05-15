import Image from "next/image";
import { ExternalLink } from "lucide-react";

const PROJECTS = [
  {
    title: "Paw Pirates",
    description:
      "A two-versus-two party game built in Unity with C#. Awarded third place for accessibility at the 2024 Level Up student games showcase. Contributed game logic for player movement, item interaction, and scoring. Developed custom shaders using Unity Shader Graph.",
    tech: "Unity · C#",
    demoUrl: "https://store.steampowered.com/app/2927380/Paw_Pirates/",
    image: "/paw-pirates.png",
  },
];

export function Projects() {
  return (
    <section id="projects" className="relative z-10">
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
              <div className="aspect-video bg-zinc-900 relative overflow-hidden">
                {project.image && (
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                )}
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-zinc-100 mb-1">
                  {project.title}
                </h3>
                <p className="text-xs text-zinc-600 mb-3">{project.tech}</p>
                <p className="text-sm text-zinc-400 leading-relaxed mb-4">
                  {project.description}
                </p>
                <div className="flex items-center gap-4 text-xs text-zinc-500">
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 hover:text-zinc-300 transition-colors"
                  >
                    <ExternalLink size={11} />
                    View on Steam
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
