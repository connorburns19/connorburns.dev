import { Download, Mail } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "../BrandIcons";

export function Hero() {
  return (
    <section className="relative z-10 max-w-4xl mx-auto px-6 pt-32 pb-12">
      <h1 className="text-5xl sm:text-7xl font-bold tracking-tight text-zinc-100 mb-6 leading-none">
        Connor Burns
      </h1>
      <p className="text-xl sm:text-2xl text-zinc-300 max-w-xl mb-10 leading-relaxed">
        Full-Stack Software Developer  |  U of T Alumni
      </p>
      <div className="flex flex-wrap items-center gap-6 text-zinc-300 mb-8">
        <a
          href="https://github.com/connorburns19"
          className="flex items-center gap-2 hover:text-zinc-100 transition-colors text-sm"
        >
          <GitHubIcon size={15} />
          GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/connor-burns19/"
          className="flex items-center gap-2 hover:text-zinc-100 transition-colors text-sm"
        >
          <LinkedInIcon size={15} />
          LinkedIn
        </a>
        <a
          href="mailto:connorburnsdev@outlook.com"
          className="flex items-center gap-2 hover:text-zinc-100 transition-colors text-sm"
        >
          <Mail size={15} />
          Email
        </a>
      </div>
      <a
        href="/resume.pdf"
        download="Connor_Burns_Resume.pdf"
        className="inline-flex items-center gap-2 text-sm font-medium text-zinc-100 border border-zinc-700 rounded-md px-4 py-2.5 hover:border-zinc-500 hover:bg-zinc-900 transition-all"
      >
        <Download size={14} />
        Download Resume
      </a>
    </section>
  );
}
