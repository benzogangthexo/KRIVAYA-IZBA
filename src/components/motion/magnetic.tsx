"use client";

import { useEffect, useRef, type ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * Магнитное притяжение к курсору: lerp-инерция на requestAnimationFrame
 * (без motion/react, чтобы он не попадал в стартовый бандл). Внешний span не двигается
 * и служит для замера, внутренний смещается. Только точный указатель и без reduced-motion.
 */
export function Magnetic({
  children,
  strength = 0.32,
  reach = 1.35,
  className,
}: {
  children: ReactNode;
  strength?: number;
  /** зона захвата: множитель от большей стороны элемента */
  reach?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inner = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    const move = inner.current;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!el || !move || !fine || reduce) return;
    let raf = 0;
    let px = -1e4;
    let py = -1e4;
    let cx = 0;
    let cy = 0;
    const tick = () => {
      const r = el.getBoundingClientRect();
      const dx = px - (r.left + r.width / 2);
      const dy = py - (r.top + r.height / 2);
      const inside = Math.hypot(dx, dy) < Math.max(r.width, r.height) * reach;
      const tx = inside ? dx * strength : 0;
      const ty = inside ? dy * strength : 0;
      cx += (tx - cx) * 0.18;
      cy += (ty - cy) * 0.18;
      const moving = Math.abs(tx - cx) + Math.abs(ty - cy) > 0.08;
      move.style.transform = moving || inside ? `translate3d(${cx.toFixed(2)}px, ${cy.toFixed(2)}px, 0)` : "";
      raf = moving ? requestAnimationFrame(tick) : 0;
    };
    const onMove = (e: PointerEvent) => {
      px = e.clientX;
      py = e.clientY;
      if (!raf) raf = requestAnimationFrame(tick);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [reach, strength]);

  return (
    <span ref={ref} className={cn("inline-block", className)}>
      <span ref={inner} className="inline-block will-change-transform">
        {children}
      </span>
    </span>
  );
}
