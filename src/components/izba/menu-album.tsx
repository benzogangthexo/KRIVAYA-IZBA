import { Container } from "@/components/layout/container";
import { Eyebrow } from "@/components/layout/eyebrow";
import { Section } from "@/components/layout/section";
import { StickyStack } from "@/components/motion/sticky-stack";
import { photos, type PhotoKey } from "@/content/photos";
import { formatPrice } from "@/lib/menu";
import { cn } from "@/lib/utils";

import { AlbumPrint } from "./print";

type Page = {
  id: string;
  photo: PhotoKey;
  caption: string;
  title: string;
  text: string;
  rows: { name: string; price: number | null }[];
  tilt: number;
  /** аспект отпечатка на широком экране: под исходный кадр */
  ratio: string;
};

/* Цены с меню на столе (см. DECISIONS.md). null = цена не видна в источниках */
const pages: Page[] = [
  {
    id: "pelmeni",
    photo: "obed",
    caption: "пельмени, борщ и селёдочка",
    title: "Пельмени",
    text: "Домашние пельмени, их отдельно хвалят в отзывах. На фото обед целиком: с борщом и селёдочкой.",
    rows: [
      { name: "Пельмени", price: null },
      { name: "Борщ, 250 г", price: 380 },
    ],
    tilt: -2,
    ratio: "md:aspect-[4/5]",
  },
  {
    id: "borsch",
    photo: "borsch",
    caption: "борщ, сало, бородинский",
    title: "Борщ с салом",
    text: "На говядине, со свёклой и капустой. Рядом сало, бородинский и зелёный лук.",
    rows: [
      { name: "Борщ, 250 г", price: 380 },
      { name: "Солянка мясная, 320 г", price: 390 },
    ],
    tilt: 1.5,
    ratio: "md:aspect-[4/5]",
  },
  {
    id: "lyulya",
    photo: "lyulya",
    caption: "люля, картошка из печи",
    title: "Люля на огне",
    text: "Три вида фарша. Подают с гарниром и картошкой из печи, 340 г.",
    rows: [
      { name: "Из говядины", price: 590 },
      { name: "Из свинины", price: 540 },
      { name: "Из курицы", price: 470 },
    ],
    tilt: -1.5,
    ratio: "md:aspect-[6/5]",
  },
  {
    id: "lagman",
    photo: "lagman",
    caption: "лагман, за окном снег",
    title: "Лагман",
    text: "Широкая лапша, мясо и овощи в бульоне. Из отзыва: «Брал лагман, понравился».",
    rows: [{ name: "Лагман", price: null }],
    tilt: 1,
    ratio: "md:aspect-[4/5]",
  },
  {
    id: "seledka",
    photo: "seledka",
    caption: "селёдочка с лучком",
    title: "Селёдочка с лучком",
    text: "Сельдь, картошка, красный лук и зелень. Судя по отзывам, к ней берут мандариновую настойку.",
    rows: [{ name: "Селёдочка с лучком", price: null }],
    tilt: 2,
    ratio: "md:aspect-[4/3]",
  },
  {
    id: "ryba",
    photo: "ryba",
    caption: "стейк из сёмги с огня",
    title: "Рыба на огне",
    text: "Сёмга, форель и дорадо с огня, креветки гриль. Рыбу считают поштучно.",
    rows: [
      { name: "Форель на огне", price: 960 },
      { name: "Стейк из сёмги", price: 1150 },
      { name: "Дорадо", price: 1300 },
    ],
    tilt: -1,
    ratio: "md:aspect-[4/5]",
  },
];

/** Меню-альбом. Паттерн 5: страницы альбома наезжают друг на друга (sticky-stack) */
export function MenuAlbum() {
  return (
    <Section id="menu" labelledBy="menu-title">
      <Container>
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Eyebrow index="02">Меню-альбом</Eyebrow>
            <h2 id="menu-title" className="t-h1 mt-6">
              Что едят в избе
            </h2>
          </div>
          <p className="t-lead text-fg-muted lg:col-span-5">
            Фото из зала, подписи от руки, цены с меню на столе. Где цены не видно, спросите в зале.
          </p>
        </div>

        <StickyStack top="clamp(0.75rem, 3svh, 2.5rem)" step={12} shrink={0.035} className="mt-12 lg:mt-16">
          {pages.map((p, i) => (
            <article
              key={p.id}
              aria-labelledby={`page-${p.id}`}
              className="album-page grid items-center gap-x-10 gap-y-4 p-4 sm:p-6 md:grid-cols-2 md:p-8 lg:gap-x-16 lg:p-12"
            >
              <AlbumPrint
                photo={photos[p.photo]}
                caption={p.caption}
                tilt={p.tilt}
                sizes="(min-width: 1024px) 34vw, (min-width: 768px) 42vw, 86vw"
                ratioClassName={cn("aspect-[16/10] [@media(min-height:760px)]:aspect-[4/3]", p.ratio)}
                cursorLabel="Ням"
                className="mx-auto w-full md:w-[min(100%,27rem,calc((100svh-12rem)*0.78))]"
              />
              <div className="min-w-0 md:py-4">
                <p className="t-hand text-brand-2">страница {i + 1}</p>
                <h3 id={`page-${p.id}`} className="t-h2 mt-1">
                  {p.title}
                </h3>
                <p className="mt-3 max-w-[30rem] text-fg-muted">{p.text}</p>
                <dl className="mt-4 max-w-[30rem] border-t border-line md:mt-6">
                  {p.rows.map((r) => (
                    <div key={r.name} className="flex items-baseline gap-3 border-b border-line py-2 md:py-3">
                      <dt className="min-w-0">{r.name}</dt>
                      <span aria-hidden="true" className="h-px min-w-6 flex-1 translate-y-[-0.3em] border-b border-dotted border-line-strong" />
                      <dd className={cn("tabular shrink-0", r.price ? "font-display text-[1.25rem] text-brand" : "text-[0.95rem] text-fg-muted")}>
                        {r.price ? formatPrice(r.price) : "в зале"}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </article>
          ))}
        </StickyStack>
      </Container>
    </Section>
  );
}
