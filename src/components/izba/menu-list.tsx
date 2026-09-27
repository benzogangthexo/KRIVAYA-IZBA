"use client";

import { RotateCcw, Search } from "lucide-react";
import { MotionConfig } from "motion/react";
import { useEffect, useMemo, useState } from "react";

import { HoverImageList, type HoverImageItem } from "@/components/motion/hover-image-list";
import { Button } from "@/components/ui/button";
import { FilterChips } from "@/components/ui/filter-chips";
import { Skeleton } from "@/components/ui/skeleton";
import { menu } from "@/content/menu";
import { photos, type PhotoKey } from "@/content/photos";
import { useResource } from "@/hooks/use-resource";
import { apiFetch } from "@/lib/api/client";
import {
  filterMenu,
  formatPrice,
  MENU_CATEGORIES,
  menuKey,
  MenuResponseSchema,
  type MenuCategory,
  type MenuResponse,
} from "@/lib/menu";

const isPhoto = (key: string | undefined): key is PhotoKey => !!key && key in photos;
const options = MENU_CATEGORIES.map((c) => ({ id: c.id, label: c.label }));

/**
 * Меню с ценами из /api/menu. Паттерн 4: превью фото плывёт за курсором (lerp + наклон).
 * Состояния: loading (скелетон той же геометрии, число строк считает общий фильтр), success, empty, error + повтор.
 */
export function MenuList({ initial }: { initial: MenuResponse }) {
  const [category, setCategory] = useState<MenuCategory>(initial.category);
  const [input, setInput] = useState("");
  const [q, setQ] = useState("");

  useEffect(() => {
    const t = setTimeout(() => setQ(input.trim()), 320);
    return () => clearTimeout(t);
  }, [input]);

  const key = menuKey({ category, q });
  const expected = useMemo(() => filterMenu(menu, { category, q }).length, [category, q]);
  const { status, data, error, retry } = useResource(
    key,
    (signal) =>
      apiFetch(`/api/menu?${new URLSearchParams({ category, q })}`, { schema: MenuResponseSchema, signal }),
    { initial: { key: menuKey(initial), data: initial }, isEmpty: (d) => d.items.length === 0 },
  );

  const items: HoverImageItem[] = (data?.items ?? []).map((it) => ({
    id: it.id,
    title: <span className="font-display text-[1.28rem] leading-[1.2]">{it.title}</span>,
    meta: it.meta ? <span className="text-[0.95rem]">{it.meta}</span> : undefined,
    aside: it.price ? (
      <span className="tabular font-display text-[1.25rem] text-brand">{formatPrice(it.price)}</span>
    ) : (
      <span className="text-[0.95rem] text-fg-muted">в зале</span>
    ),
    image: isPhoto(it.photo) ? photos[it.photo].src : undefined,
    alt: isPhoto(it.photo) ? photos[it.photo].alt : undefined,
    cursorLabel: "Ням",
  }));

  return (
    <MotionConfig reducedMotion="user">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <FilterChips
          label="Разделы меню"
          options={options}
          value={category}
          onChange={(id) => {
            setCategory(id);
            setInput("");
            setQ("");
          }}
        />
        <label className="relative block w-full xl:max-w-[17rem]">
          <span className="sr-only">Найти блюдо по всему меню</span>
          <Search aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-fg-muted" />
          <input
            type="search"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Найти: борщ, люля"
            maxLength={40}
            className="field"
            style={{ paddingLeft: "2.75rem" }}
          />
        </label>
      </div>

      <p className="mt-6 min-h-6 text-[0.95rem] text-fg-muted" aria-live="polite">
        {q
          ? status === "loading"
            ? "Ищем по всему меню"
            : `Поиск по всему меню: ${data?.items.length ?? 0}`
          : `${MENU_CATEGORIES.find((c) => c.id === category)?.label}: ${expected}`}
      </p>

      <div className="mt-3" aria-busy={status === "loading"}>
        {status === "loading" ? (
          <ul className="border-t border-line" aria-label="Загружаем меню">
            {Array.from({ length: Math.max(1, expected) }, (_, i) => (
              <li key={i} className="flex min-h-16 items-center gap-4 border-b border-line py-4 sm:gap-6 sm:py-5">
                <span className="min-w-0 flex-1">
                  <Skeleton className="h-[1.55rem] w-[62%] max-w-[18rem]" />
                  <Skeleton className="mt-1 h-[1.45rem] w-[38%] max-w-[11rem]" />
                </span>
                <Skeleton className="h-[1.55rem] w-16 shrink-0" />
              </li>
            ))}
          </ul>
        ) : status === "error" ? (
          <div role="alert" className="flex flex-col items-start gap-4 rounded-[var(--radius)] border border-line bg-surface p-6">
            <p className="t-h3">Меню не загрузилось</p>
            <p className="text-fg-muted">{error?.message ?? "Сервер не ответил"}. Попробуйте ещё раз или позвоните нам.</p>
            <Button variant="outline" onClick={retry}>
              <RotateCcw aria-hidden="true" />
              Повторить
            </Button>
          </div>
        ) : status === "empty" ? (
          <div className="flex flex-col items-start gap-3 border-y border-line py-10">
            <p className="t-h3">Такого в меню нет</p>
            <p className="text-fg-muted">Попробуйте «борщ», «люля» или «пельмени». Или спросите в зале, вдруг приготовят.</p>
            <Button variant="outline" onClick={() => setInput("")}>
              Сбросить поиск
            </Button>
          </div>
        ) : (
          <HoverImageList
            items={items}
            previewClassName="h-[17rem] w-[13.5rem] border-[9px] border-b-[26px] border-[#faf2e1] rounded-[2px]"
            className="[&_.hover-thumb]:hidden"
          />
        )}
      </div>
    </MotionConfig>
  );
}
