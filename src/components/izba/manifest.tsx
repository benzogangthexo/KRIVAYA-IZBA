import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Counter } from "@/components/motion/counter";
import { ScrollMarquee } from "@/components/motion/scroll-marquee";
import { WordReveal } from "@/components/motion/word-reveal";
import { photos } from "@/content/photos";
import { site } from "@/content/site";

import { HutMark } from "./decor";
import { AlbumPrint } from "./print";

const dishes = ["пельмени", "борщ с салом", "лагман", "люля на огне", "селёдочка с лучком", "картошка из печи", "солянка", "чай в чайнике"];

const text =
  "Почему изба кривая? Потому что ровно бывает в столовой. А у нас как у бабушки: ковры на стенах, занавески на окнах, бирюзовые стулья и чайник на столе. Готовим по-домашнему: пельмени, борщ, лагман, селёдочка с картошкой. Люля и шашлык жарим на огне.";

/** Бегущая строка от скролла + манифест. Паттерн 2: текст проявляется по словам */
export function Manifest() {
  return (
    <>
      <div className="border-y border-line py-5" aria-hidden="true">
        <ScrollMarquee
          items={dishes}
          distance={28}
          separator={<HutMark className="size-[0.7em] text-brand-2" />}
          itemClassName="font-display text-[clamp(1.7rem,1.2rem+2.2vw,3.4rem)] leading-[1.15] text-fg"
        />
      </div>

      <Section id="about" labelledBy="about-title">
        <Container>
          <div className="paper-sheet relative rounded-[0.6rem] px-5 py-10 [rotate:-0.6deg] sm:px-10 sm:py-12 lg:grid lg:grid-cols-12 lg:gap-x-[var(--col-gap)] lg:px-14 lg:py-16">
            <div className="lg:col-span-8">
              <p className="t-eyebrow flex items-center gap-3 text-[#6b4a35]">
                <span className="tabular text-[#a3322a]">01</span>
                <span>Страница первая</span>
                <span aria-hidden="true" className="h-px min-w-8 flex-1 bg-[#6b4a35]/30" />
              </p>
              <h2 id="about-title" className="sr-only">
                Почему изба кривая
              </h2>
              <WordReveal
                as="p"
                text={text}
                accent={[0, 1, 2]}
                accentClassName="text-[#a3322a]"
                className="mt-6 font-display text-[clamp(1.45rem,1.05rem+1.9vw,2.9rem)] leading-[1.2]"
              />
            </div>
            <div className="mt-10 lg:col-span-4 lg:mt-2">
              <AlbumPrint
                photo={photos.koverSeledka}
                caption="ковёр, морс, селёдочка"
                tilt={3}
                sizes="(min-width: 1024px) 24vw, (min-width: 640px) 50vw, 80vw"
                className="mx-auto w-[82%] max-w-[22rem] lg:w-full"
              />
            </div>
            <dl className="mt-12 grid gap-6 border-t border-[#6b4a35]/25 pt-8 sm:grid-cols-3 lg:col-span-12">
              <div className="flex flex-col">
                <dt className="text-[0.95rem] text-[#6b4a35]">на Яндекс Картах, {site.ratingCount} оценок</dt>
                <dd className="order-first font-display text-[clamp(2.6rem,2rem+2.4vw,4rem)] leading-none text-[#a3322a]">
                  <Counter value={site.rating} decimals={1} />
                </dd>
              </div>
              <div className="flex flex-col">
                <dt className="text-[0.95rem] text-[#6b4a35]">каждый день, без выходных</dt>
                <dd className="order-first font-display text-[clamp(2.6rem,2rem+2.4vw,4rem)] leading-none">12-24</dd>
              </div>
              <div className="flex flex-col">
                <dt className="text-[0.95rem] text-[#6b4a35]">гостей в отдельной кабинке</dt>
                <dd className="order-first font-display text-[clamp(2.6rem,2rem+2.4vw,4rem)] leading-none">до 10</dd>
              </div>
            </dl>
          </div>
        </Container>
      </Section>
    </>
  );
}
