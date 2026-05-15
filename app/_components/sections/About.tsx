import { Download } from "lucide-react";

export function About() {
  return (
    <section
      id="about"
      className="relative z-10"
    >
      <div className="max-w-4xl mx-auto px-6 py-24">
        <h2 className="text-xs font-semibold tracking-widest uppercase text-zinc-500 mb-10">
          About
        </h2>
        <div className="grid md:grid-cols-[1fr_auto] gap-12 items-start">
          <p className="text-zinc-300 leading-relaxed text-lg max-w-prose">
            I&apos;m a full-stack software developer based in Toronto. I graduated from the University of Toronto majoring in computer science and minoring in math. I care about strong engineering and thoughtful UX — building things that work well and feel intuitive to use.
          </p>
          <a
            href="/resume.pdf"
            download="Connor_Burns_Resume.pdf"
            className="inline-flex items-center gap-2 text-sm font-medium text-zinc-100 border border-zinc-700 rounded-md px-4 py-2.5 hover:border-zinc-500 hover:bg-zinc-900 transition-all whitespace-nowrap"
          >
            <Download size={14} />
            Download Resume
          </a>
        </div>
      </div>
    </section>
  );
}
