"use client";

import { useEffect, useState } from "react";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-md bg-zinc-950/80 border-b border-zinc-800/60"
          : ""
      }`}
    >
      <nav className="relative z-10 max-w-4xl mx-auto px-6 h-14 flex items-center justify-between">
        <span className="text-sm font-semibold tracking-tight text-zinc-100">
          CB
        </span>
        <ul className="flex items-center gap-6 text-sm text-zinc-400">
          <li>
            <a
              href="#about"
              className="hover:text-zinc-100 transition-colors"
            >
              About
            </a>
          </li>
          <li>
            <a
              href="#projects"
              className="hover:text-zinc-100 transition-colors"
            >
              Projects
            </a>
          </li>
          <li>
            <a
              href="#freelance"
              className="hover:text-zinc-100 transition-colors"
            >
              Freelance
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
