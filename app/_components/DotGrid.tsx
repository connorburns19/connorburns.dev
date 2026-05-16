"use client";

import { useEffect, useRef } from "react";
import { THEME_CHANGED_EVENT } from "../_lib/theme";

const GRID = 28;
const DOT_R = 1;
const LERP = 0.12;
const PULL_RADIUS = 80;
const MAX_PULL = 8;
const DOT_ALPHA = 0.18;

export function DotGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = window.innerWidth;
    let H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;

    let bgColor = "#09090b";
    let dotColor = "#a1a1aa";

    const refreshColors = () => {
      const cs = getComputedStyle(document.documentElement);
      const bg = cs.getPropertyValue("--bg-color").trim();
      const dot = cs.getPropertyValue("--dot-color").trim();
      if (bg) bgColor = bg;
      if (dot) dotColor = dot;
    };

    refreshColors();
    const themeLink = document.getElementById(
      "currentTheme"
    ) as HTMLLinkElement | null;
    if (themeLink && !themeLink.sheet) {
      themeLink.addEventListener("load", refreshColors, { once: true });
    }
    const onThemeChange = () => {
      requestAnimationFrame(refreshColors);
    };
    window.addEventListener(THEME_CHANGED_EVENT, onThemeChange);

    let curX = -9999;
    let curY = -9999;
    let targetX = -9999;
    let targetY = -9999;
    let rafId: number;

    const frame = () => {
      curX += (targetX - curX) * LERP;
      curY += (targetY - curY) * LERP;

      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, W, H);

      ctx.globalCompositeOperation = "source-over";
      ctx.globalAlpha = DOT_ALPHA;
      ctx.fillStyle = dotColor;

      const cols = Math.ceil(W / GRID);
      const rows = Math.ceil(H / GRID);

      for (let row = 0; row <= rows; row++) {
        for (let col = 0; col <= cols; col++) {
          const bx = col * GRID;
          const by = row * GRID;
          const dx = curX - bx;
          const dy = curY - by;
          const dist = Math.sqrt(dx * dx + dy * dy);

          let x = bx;
          let y = by;
          if (dist < PULL_RADIUS && dist > 1) {
            const force = (1 - dist / PULL_RADIUS) ** 2;
            x = bx + (dx / dist) * force * MAX_PULL;
            y = by + (dy / dist) * force * MAX_PULL;
          }

          ctx.beginPath();
          ctx.arc(x, y, DOT_R, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      ctx.globalAlpha = 1;

      rafId = requestAnimationFrame(frame);
    };

    const onMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const onMouseLeave = () => {
      targetX = -9999;
      targetY = -9999;
    };

    const onResize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W;
      canvas.height = H;
    };

    rafId = requestAnimationFrame(frame);
    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("resize", onResize);
      window.removeEventListener(THEME_CHANGED_EVENT, onThemeChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
