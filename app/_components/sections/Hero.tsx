import { Mail } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "../BrandIcons";

export function Hero() {
  return (
    <section className="relative z-10 max-w-4xl mx-auto px-6 pt-32 pb-28">
<h1 className="text-5xl sm:text-7xl font-bold tracking-tight text-zinc-100 mb-6 leading-none">
        Connor Burns
      </h1>
      <p className="text-xl sm:text-2xl text-zinc-400 max-w-xl mb-12 leading-relaxed">
        Full-Stack Software Developer  |  U of T Alumni
      </p>
      <div className="flex flex-wrap items-center gap-6 text-zinc-400">
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
    </section>
  );
}
