import { ArrowUpRight } from "lucide-react";
import type { CSSProperties } from "react";

import { Container } from "@/components/layout/container";
import { Eyebrow } from "@/components/layout/eyebrow";
import { Counter } from "@/components/motion/counter";
import { Reveal } from "@/components/motion/reveal";
import { reviews } from "@/content/reviews";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

const tone = { paper: "", mint: "note--mint", lined: "note--lined" } as const;

/** Отзывы с Яндекс Карт: записки, приколотые к ковру */
export function Reviews() {
  return (
    <section id="reviews" aria-labelledby="reviews-title" className="carpet relative py-[var(--section-y)]">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Eyebrow index="06">Отзывы</Eyebrow>
            <h2 id="reviews-title" className="t-h1 mt-6">
              Записки гостей
            </h2>
            <p className="t-lead mt-6 max-w-[34rem] text-fg-muted">
              Переписали с Яндекс Карт, только поправили опечатки. Хвалят пельмени, лагман, мясо с мангала и мандариновую настойку. Ругают очерёдность подачи блюд.
            </p>
          </div>
          <div className="flex items-end gap-5 lg:col-span-5 lg:justify-end">
            <p className="w-[1.75em] shrink-0 font-display text-[clamp(4rem,3rem+4vw,7rem)] leading-[0.85] text-brand">
              <Counter value={site.rating} decimals={1} />
            </p>
            <div className="pb-1">
              <p className="text-fg">из 5 на Яндекс Картах</p>
              <p className="text-fg-muted">
                {site.ratingCount} оценок, {site.reviewCount} отзыва
              </p>
              <a
                href={site.links.yandexReviews}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-flex min-h-11 items-center gap-1 text-brand-2 underline-offset-4 hover:underline"
              >
                Все отзывы
                <ArrowUpRight aria-hidden="true" className="size-4" />
              </a>
            </div>
          </div>
        </div>

        <ul className="mt-16 columns-1 gap-8 sm:columns-2 lg:mt-20 lg:columns-4">
          {reviews.map((r, i) => (
            <li key={r.id} className="mb-12 break-inside-avoid pt-3">
              <Reveal delay={(i % 4) * 0.06}>
                <figure className={cn("note px-5 pb-5 pt-7", tone[r.tone])} style={{ "--tilt": `${r.tilt}deg` } as CSSProperties}>
                  <span aria-hidden="true" className="note__pin" />
                  <blockquote className="font-hand text-[1.34rem] font-medium leading-[1.3]">{r.text}</blockquote>
                  <figcaption className="mt-4 flex flex-wrap items-baseline justify-between gap-x-3 text-[0.9rem] text-[#6b4a35]">
                    <span className="font-semibold text-paper-ink">{r.name}</span>
                    <span>{r.date}</span>
                  </figcaption>
                </figure>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
