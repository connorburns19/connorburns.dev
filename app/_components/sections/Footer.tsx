import { Mail } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "../BrandIcons";

export function Footer() {
  return (
    <footer className="relative z-10">
      <div className="max-w-4xl mx-auto px-6 py-10 flex items-center justify-between text-sm text-text-dim">
        <div className="flex flex-col gap-0.5">
          <span className="text-sm font-semibold tracking-tight text-main">connorburns.dev</span>
          <span className="text-xs text-text-dim">
            © {new Date().getFullYear()} Connor Burns
          </span>
        </div>
        <div className="flex items-center gap-5">
          <a
            href="https://github.com/connorburns19"
            aria-label="GitHub"
            className="hover:text-text transition-colors"
          >
            <GitHubIcon size={15} />
          </a>
          <a
            href="https://www.linkedin.com/in/connor-burns19/"
            aria-label="LinkedIn"
            className="hover:text-text transition-colors"
          >
            <LinkedInIcon size={15} />
          </a>
          <a
            href="mailto:connorburnsdev@outlook.com"
            aria-label="Email"
            className="hover:text-text transition-colors"
          >
            <Mail size={15} />
          </a>
        </div>
      </div>
    </footer>
  );
}
