import { Phone } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { site, telHref } from "@/content/site";

import { HutMark } from "./decor";
import { Wordmark } from "./wordmark";

const nav = [
  { href: "#menu", label: "Меню" },
  { href: "#prices", label: "Цены" },
  { href: "#hall", label: "Зал" },
  { href: "#reviews", label: "Отзывы" },
];

/** Шапка не липкая: уезжает со скроллом (на телефоне есть нижняя панель) */
export function SiteHeader() {
  return (
    <header className="relative z-20">
      <Container className="flex h-[var(--header-h)] items-center justify-between gap-3">
        <a href="#hero" aria-label="Кривая изба, едальня: в начало" className="-ml-1 flex min-h-11 items-center gap-2 px-1 text-brand-2">
          <HutMark className="size-7 shrink-0 -rotate-6" />
          <Wordmark className="text-[1.95rem] sm:text-[2.1rem]" />
          <span className="t-eyebrow mt-1 hidden text-fg-muted sm:inline">едальня</span>
        </a>
        <nav aria-label="Разделы" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.map((n) => (
              <li key={n.href}>
                <a
                  href={n.href}
                  className="inline-flex min-h-11 items-center rounded-[var(--radius-pill)] px-3.5 text-[0.95rem] text-fg-muted transition-colors hover:bg-[color-mix(in_oklab,var(--fg)_7%,transparent)] hover:text-fg"
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <a href={telHref} className="tabular hidden min-h-11 items-center px-2 text-[0.95rem] text-fg hover:text-brand-2 lg:inline-flex">
            {site.phone}
          </a>
          <a
            href={telHref}
            aria-label={`Позвонить: ${site.phone}`}
            className="grid size-11 place-items-center rounded-full border border-line-strong text-fg transition-colors hover:border-brand-2 hover:text-brand-2 lg:hidden"
          >
            <Phone aria-hidden="true" className="size-[1.1rem]" />
          </a>
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <a href="#booking">Забронировать</a>
          </Button>
        </div>
      </Container>
    </header>
  );
}
