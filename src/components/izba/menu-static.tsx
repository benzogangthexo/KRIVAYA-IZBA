import { Search } from "lucide-react";

import { formatPrice, MENU_CATEGORIES, type MenuResponse } from "@/lib/menu";
import { cn } from "@/lib/utils";

/**
 * Серверная копия стартового состояния MenuList: та же разметка и геометрия, ноль JS.
 * Видна без JS и до подгрузки интерактивного меню (оно монтируется на подходе к секции).
 */
export function MenuStatic({ initial }: { initial: MenuResponse }) {
  const label = MENU_CATEGORIES.find((c) => c.id === initial.category)?.label;
  return (
    <div>
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div role="group" aria-label="Разделы меню" className="flex flex-wrap gap-2">
          {MENU_CATEGORIES.map((c) => (
            <span
              key={c.id}
              className={cn(
                "relative isolate inline-flex h-11 items-center gap-2 rounded-[var(--radius-pill)] border border-line px-4 text-sm",
                c.id === initial.category ? "bg-brand text-brand-ink" : "text-fg",
              )}
            >
              {c.label}
            </span>
          ))}
        </div>
        <div className="relative block w-full xl:max-w-[17rem]" aria-hidden="true">
          <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-fg-muted" />
          <span className="field leading-[3rem] text-fg-muted" style={{ paddingLeft: "2.75rem" }}>
            Найти: борщ, люля
          </span>
        </div>
      </div>

      <p className="mt-6 min-h-6 text-[0.95rem] text-fg-muted">
        {label}: {initial.items.length}
      </p>

      <div className="mt-3">
        <ul className="border-t border-line">
          {initial.items.map((it) => (
            <li key={it.id} className="border-b border-line">
              <div className="flex min-h-16 w-full items-center gap-4 py-4 text-left sm:gap-6 sm:py-5">
                <span className="min-w-0 flex-1">
                  <span className="block">
                    <span className="font-display text-[1.28rem] leading-[1.2]">{it.title}</span>
                  </span>
                  {it.meta ? (
                    <span className="mt-1 block text-fg-muted">
                      <span className="text-[0.95rem]">{it.meta}</span>
                    </span>
                  ) : null}
                </span>
                <span className="shrink-0 text-right">
                  {it.price ? (
                    <span className="tabular font-display text-[1.25rem] text-brand">{formatPrice(it.price)}</span>
                  ) : (
                    <span className="text-[0.95rem] text-fg-muted">в зале</span>
                  )}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
