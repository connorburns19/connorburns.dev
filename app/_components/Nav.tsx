"use client";

import { useEffect, useState } from "react";
import { ThemePicker } from "./ThemePicker";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
        scrolled
          ? "backdrop-blur-md bg-bg/80 border-sub-alt"
          : "border-transparent"
      }`}
    >
      <nav className="relative z-10 px-6 h-14 flex items-center justify-center sm:justify-between">
        <span className="hidden sm:inline text-sm font-semibold tracking-tight text-main">
          connorburns.dev
        </span>
        <div className="flex items-center gap-4">
          <ul className="flex items-center gap-6 text-sm text-main">
            <li>
              <a
                href="#about"
                className="hover:text-text transition-colors"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#experience"
                className="hover:text-text transition-colors"
              >
                Experience
              </a>
            </li>
            <li>
              <a
                href="#projects"
                className="hover:text-text transition-colors"
              >
                Projects
              </a>
            </li>
            <li>
              <a
                href="#freelance"
                className="hover:text-text transition-colors"
              >
                Hire Me
              </a>
            </li>
          </ul>
          <ThemePicker />
        </div>
      </nav>
    </header>
  );
}
