import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { GitHubIcon } from "../BrandIcons";

const PROJECTS = [
  {
    title: "Paw Pirates",
    description:
      "Collaborated with a multi-disciplinary team to build a two-versus-two party game in Unity with C#. Awarded third place for accessibility at the 2024 Level Up student games showcase. Contributed game logic for player movement, item interaction, and scoring. Developed custom shaders using Unity Shader Graph.",
    tech: "Unity · C#",
    demoUrl: "https://store.steampowered.com/app/2927380/Paw_Pirates/",
    demoLabel: "View on Steam",
    repoUrl: undefined,
    image: "/paw-pirates.png",
  },
  {
    title: "Playbook",
    description:
      "A typed, dependency-free rewrite of a 2021 jQuery school project. A TypeScript library for creating, saving, and animating American Football play diagrams, driven by the Web Animations API and shipping at ~5 KB gzipped. Includes a live, interactive demo.",
    tech: "TypeScript · Web Animations API",
    demoUrl: "/projects/playbook",
    demoLabel: "Live demo",
    repoUrl: "https://github.com/connorburns19/Playbook.js-V2",
    image: "/playbook-js.png",
  },
  {
    title: "Online Classroom Prototype",
    description:
      "Worked in a team to build an interactive high-fidelity Figma prototype for an online learning app. Reached the finalist round of a UX design competition.",
    tech: "Figma",
    demoUrl: "https://www.figma.com/proto/oROd76Jdl5AP27pMYJKRYo/funk?node-id=536-6278&scaling=scale-down&page-id=536%3A5983&starting-point-node-id=536%3A6278",
    demoLabel: "View prototype",
    repoUrl: undefined,
    image: "/ux-prototype.png",
  },
];

export function Projects() {
  return (
    <section id="projects" className="relative z-10">
      <div className="max-w-4xl mx-auto px-6 py-24">
        <h2 className="text-xs font-semibold tracking-widest uppercase text-label mb-10">
          Projects
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {PROJECTS.map((project) => (
            <article
              key={project.title}
              className="border border-sub-alt rounded-lg overflow-hidden hover:border-sub transition-colors bg-bg/50"
            >
              <div className="aspect-video bg-sub-alt relative overflow-hidden">
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
                <h3 className="font-semibold text-text mb-1">
                  {project.title}
                </h3>
                <p className="text-xs text-text-dim mb-3">{project.tech}</p>
                <p className="text-sm text-text-dim leading-relaxed mb-4">
                  {project.description}
                </p>
                <div className="flex items-center gap-4 text-xs text-text-dim">
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 hover:text-text transition-colors"
                    >
                      <ExternalLink size={11} />
                      {project.demoLabel ?? "Live demo"}
                    </a>
                  )}
                  {project.repoUrl && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 hover:text-text transition-colors"
                    >
                      <GitHubIcon size={11} />
                      Source
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
