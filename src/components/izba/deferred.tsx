"use client";

import { lazy, Suspense, useEffect, useRef, useState, type ReactNode } from "react";

import type { MenuResponse } from "@/lib/menu";

/*
 * Отложенный монтаж тяжёлых блоков ниже сгиба (меню с zod-схемами, мастер записи):
 * их JS грузится отдельным чанком, когда до секции остаётся ~1000 px.
 * До этого показываем серверную разметку той же геометрии (она же видна без JS).
 */
function useNear<T extends Element>(margin = "1000px 0px") {
  const ref = useRef<T>(null);
  const [near, setNear] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: margin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [margin]);
  return [ref, near] as const;
}

const LazyMenuList = lazy(() => import("./menu-list").then((m) => ({ default: m.MenuList })));
const LazyBooking = lazy(() => import("./booking-lazy").then((m) => ({ default: m.BookingWizardLazy })));

type MenuProps = { initial: MenuResponse };

export function DeferredMenuList({ initial, children }: MenuProps & { children: ReactNode }) {
  const [ref, near] = useNear<HTMLDivElement>();
  return (
    <div ref={ref}>
      {near ? (
        <Suspense fallback={children}>
          <LazyMenuList initial={initial} />
        </Suspense>
      ) : (
        children
      )}
    </div>
  );
}

type BookingProps = { successNote?: ReactNode; className?: string };


export function DeferredBooking({ children, className, ...props }: BookingProps & { children: ReactNode }) {
  const [ref, near] = useNear<HTMLDivElement>("2000px 0px");
  return (
    <div ref={ref} className={className}>
      {near ? (
        <Suspense fallback={children}>
          <LazyBooking {...props} />
        </Suspense>
      ) : (
        children
      )}
    </div>
  );
}
