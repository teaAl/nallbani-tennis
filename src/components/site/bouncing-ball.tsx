"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";

/**
 * A tennis ball that hops from one home-page section to the next as the visitor scrolls.
 * Sections marked with `data-ball-stop` are the "floors": the ball rests on a section's top
 * edge when that edge reaches the landing line, and arcs across the viewport in between.
 * Purely decorative: pointer-events none, hidden for reduced-motion.
 * Rendered into <body> through a portal: the page-enter transform would otherwise
 * turn `position: fixed` into page-relative positioning.
 */
export function BouncingBall() {
  const ballRef = useRef<HTMLDivElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);
  // true once we are on the client (portals need `document`).
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  useEffect(() => {
    if (!mounted || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ball = ballRef.current;
    const shadow = shadowRef.current;
    if (!ball || !shadow) return;

    let stops: number[] = [];
    let raf = 0;

    const measure = () => {
      const els = Array.from(document.querySelectorAll<HTMLElement>("[data-ball-stop]"));
      stops = els.map((el) => el.getBoundingClientRect().top + window.scrollY);
      const footer = document.querySelector("footer");
      if (footer) stops.push(footer.getBoundingClientRect().top + window.scrollY);
      stops.sort((a, b) => a - b);
    };

    const smooth = (t: number) => t * t * (3 - 2 * t);

    const draw = () => {
      raf = 0;
      if (stops.length < 2) return;
      const vh = window.innerHeight;
      const vw = window.innerWidth;
      const small = vw < 768;
      const size = small ? 30 : 46;
      const lineY = vh * 0.72; // landing line in the viewport
      const arcH = Math.min(vh * 0.38, 360);
      const p = window.scrollY + lineY; // document position of the landing line

      // Which hop are we on?
      let i = 0;
      while (i < stops.length - 2 && p >= stops[i + 1]!) i++;
      const a = stops[i]!;
      const b = stops[i + 1]!;
      let t = (p - a) / (b - a);
      let opacity = 1;
      if (p < a) {
        t = 0;
        opacity = 0; // before the first floor (hero top): not born yet
      }
      if (p > b) {
        t = 1;
        opacity = Math.max(0, 1 - (p - b) / 200); // past the footer edge: fade out
      }
      t = Math.min(1, Math.max(0, t));

      const margin = small ? 14 : Math.max(24, (vw - 1152) / 2 - size - 8);
      const left = margin;
      const right = vw - margin - size;
      const from = i % 2 === 0 ? left : right;
      const to = i % 2 === 0 ? right : left;
      const x = from + (to - from) * smooth(t);
      const lift = Math.sin(Math.PI * t); // 0 on the floors, 1 mid-air
      const y = lineY - size - arcH * lift;

      // Squash on landing, stretch mid-air.
      const near = Math.max(0, 1 - Math.min(t, 1 - t) / 0.08);
      const sx = 1 + 0.22 * near;
      const sy = 1 - 0.22 * near;
      const spin = (window.scrollY / 3) % 360;

      ball.style.opacity = String(opacity);
      ball.style.width = ball.style.height = `${size}px`;
      ball.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${sx}, ${sy}) rotate(${spin}deg)`;
      ball.style.transformOrigin = "50% 100%";

      const sw = size * (1.1 - 0.5 * lift);
      shadow.style.opacity = String(opacity * (0.28 - 0.2 * lift));
      shadow.style.width = `${sw}px`;
      shadow.style.height = `${size * 0.22}px`;
      shadow.style.transform = `translate3d(${x + (size - sw) / 2}px, ${lineY - size * 0.11}px, 0)`;
    };

    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(draw);
    };
    const remeasure = () => {
      measure();
      schedule();
    };

    measure();
    draw();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", remeasure);
    const ro = new ResizeObserver(remeasure);
    ro.observe(document.body);
    // Content (images, reveals) settles after first paint.
    const late = window.setTimeout(remeasure, 800);

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", remeasure);
      ro.disconnect();
      window.clearTimeout(late);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [mounted]);

  if (!mounted) return null;
  return createPortal(
    <div className="pointer-events-none fixed inset-0 z-20 overflow-hidden motion-reduce:hidden" aria-hidden="true">
      <div ref={shadowRef} className="absolute top-0 left-0 rounded-full bg-navy opacity-0 blur-[3px]" />
      <div ref={ballRef} className="absolute top-0 left-0 opacity-0 drop-shadow-[0_6px_10px_rgba(15,31,61,0.25)]">
        <svg viewBox="0 0 48 48" className="size-full">
          <circle cx="24" cy="24" r="23" fill="var(--lime)" />
          <path d="M8 6.5 C 22 16, 22 32, 8 41.5" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
          <path d="M40 6.5 C 26 16, 26 32, 40 41.5" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
          <circle cx="24" cy="24" r="23" fill="none" stroke="rgba(15,31,61,0.18)" strokeWidth="1.5" />
        </svg>
      </div>
    </div>,
    document.body,
  );
}
