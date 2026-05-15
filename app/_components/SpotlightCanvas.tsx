"use client";

import { useEffect, useRef, useState } from "react";

const GRID = 28;
const DOT_ALPHA = 0.07;
const GRAVITY_RADIUS = 110;
const GRAVITY_STRENGTH = 0.6;

export function SpotlightCanvas() {
  const [isHover, setIsHover] = useState<boolean | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rawMouse = useRef({ x: -9999, y: -9999 });
  const smoothMouse = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    setIsHover(window.matchMedia("(hover: hover)").matches);
  }, []);

  useEffect(() => {
    if (!isHover) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: MouseEvent) => {
      rawMouse.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMove);

    const draw = () => {
      // Smooth mouse with lerp
      smoothMouse.current.x +=
        (rawMouse.current.x - smoothMouse.current.x) * 0.12;
      smoothMouse.current.y +=
        (rawMouse.current.y - smoothMouse.current.y) * 0.12;

      const { width, height } = canvas;
      const mx = smoothMouse.current.x;
      const my = smoothMouse.current.y;

      ctx.clearRect(0, 0, width, height);

      for (let gx = 0; gx <= width + GRID; gx += GRID) {
        for (let gy = 0; gy <= height + GRID; gy += GRID) {
          const dx = mx - gx;
          const dy = my - gy;
          const dist = Math.sqrt(dx * dx + dy * dy);

          let x = gx;
          let y = gy;
          let alpha = DOT_ALPHA;

          if (dist < GRAVITY_RADIUS && dist > 0) {
            const t = 1 - dist / GRAVITY_RADIUS;
            const force = t * t * GRAVITY_STRENGTH * GRID;
            x += (dx / dist) * force;
            y += (dy / dist) * force;
          }

          ctx.beginPath();
          ctx.arc(x, y, 1, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255,255,255,${alpha})`;
          ctx.fill();
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, [isHover]);

  // Touch: static CSS dot grid
  if (isHover === false) {
    return (
      <div
        aria-hidden
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.25) 1px, transparent 1px)",
          backgroundSize: `${GRID}px ${GRID}px`,
          zIndex: 0,
        }}
      />
    );
  }

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
