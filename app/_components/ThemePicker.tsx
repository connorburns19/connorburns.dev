"use client";

import { useEffect, useId, useRef, useState } from "react";
import { PRESETS } from "../_lib/themes";
import { useTheme } from "../_lib/themeStore";

function PaletteIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="13.5" cy="6.5" r="0.5" fill="currentColor" />
      <circle cx="17.5" cy="10.5" r="0.5" fill="currentColor" />
      <circle cx="8.5" cy="7.5" r="0.5" fill="currentColor" />
      <circle cx="6.5" cy="12.5" r="0.5" fill="currentColor" />
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
    </svg>
  );
}

export function ThemePicker() {
  const { preset, setPreset } = useTheme();
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    const onMouseDown = (e: MouseEvent) => {
      if (!wrapperRef.current) return;
      if (!wrapperRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onMouseDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onMouseDown);
    };
  }, [open]);

  return (
    <div ref={wrapperRef} className="relative">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={panelId}
        aria-haspopup="dialog"
        aria-label="Change theme"
        className="inline-flex items-center justify-center w-9 h-9 rounded-md text-main hover:bg-sub-alt transition-colors focus-visible:outline-2 focus-visible:outline-main focus-visible:outline-offset-2"
      >
        <PaletteIcon />
      </button>

      {open && (
        <section
          id={panelId}
          role="dialog"
          aria-label="Theme picker"
          className="absolute right-0 top-full mt-2 w-[min(28rem,calc(100vw-2rem))] max-h-[calc(100vh-5rem)] overflow-y-auto rounded-lg border border-sub-alt bg-bg shadow-2xl p-3 z-50"
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {PRESETS.map((p) => {
              const active = p.name === preset;
              return (
                <button
                  key={p.name}
                  type="button"
                  data-theme={p.name}
                  aria-pressed={active}
                  aria-label={p.displayName}
                  onClick={() => {
                    setPreset(p.name);
                    setOpen(false);
                    triggerRef.current?.focus();
                  }}
                  style={{
                    background: p.bg,
                    color: p.main,
                    outline: active
                      ? `2px solid ${p.main}`
                      : `1px solid ${p.main}40`,
                    outlineOffset: active ? "2px" : "0",
                  }}
                  className="text-sm py-2 px-3 rounded-md transition-[filter] hover:brightness-125 focus-visible:outline-2"
                >
                  {p.displayName}
                </button>
              );
            })}
          </div>
          <p className="mt-3 text-xs text-text-dim text-center">
            Palettes from{" "}
            <a
              href="https://monkeytype.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-text transition-colors"
            >
              monkeytype
            </a>
          </p>
        </section>
      )}
    </div>
  );
}
