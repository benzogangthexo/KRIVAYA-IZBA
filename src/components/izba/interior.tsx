import Image from "next/image";

import { Container } from "@/components/layout/container";
import { Eyebrow } from "@/components/layout/eyebrow";
import { Section } from "@/components/layout/section";
import { DrawOnScroll } from "@/components/motion/draw-path";
import { GrowMedia } from "@/components/motion/grow-media";
import { Reveal } from "@/components/motion/reveal";
import { photos } from "@/content/photos";

import { HutBlueprint } from "./decor";
import { AlbumPrint } from "./print";

/** Зал: чертёж избы от скролла, фото растёт на скролле, мозаика отпечатков */
export function Interior() {
  return (
    <Section id="hall" labelledBy="hall-title">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-6">
            <Eyebrow index="05">Зал</Eyebrow>
            <h2 id="hall-title" className="t-h1 mt-6">
              Ковры, бирюзовые стулья и «Выбирай сердцем»
            </h2>
            <p className="t-lead mt-6 max-w-[34rem] text-fg-muted">
              Гости называют интерьер советской коммуналкой. Мы не спорим: ковры висят, чайник стоит, на картине написано «Выбирай сердцем».
            </p>
          </div>
          <DrawOnScroll className="lg:col-span-6" offset={["start 0.95", "end 0.5"]}>
            <HutBlueprint className="h-auto w-full" />
          </DrawOnScroll>
        </div>

        <div className="mt-14 grid grid-cols-2 items-start gap-x-5 gap-y-10 sm:gap-x-8 lg:mt-20 lg:grid-cols-12 lg:gap-x-[var(--col-gap)] lg:gap-y-16">
          <figure className="col-span-2 lg:col-span-7" data-cursor="view" data-cursor-label="Зал">
            <GrowMedia from={0.82} className="aspect-[4/3] rounded-[var(--radius)]">
              <Image
                src={photos.zal.src}
                alt={photos.zal.alt}
                fill
                sizes="(min-width: 1024px) 56vw, 92vw"
                quality={75}
                placeholder="blur"
                className="object-cover object-[50%_40%]"
              />
            </GrowMedia>
            <figcaption className="t-hand mt-3 text-fg-muted">зал зимой, ёлку ещё не убрали</figcaption>
          </figure>

          <Reveal className="col-span-1 lg:col-span-4 lg:col-start-9 lg:mt-24">
            <AlbumPrint photo={photos.koverYuma} caption="юма харт, юма соул" tilt={2.5} sizes="(min-width: 1024px) 30vw, 46vw" />
          </Reveal>
          <Reveal delay={0.08} className="col-span-1 mt-10 lg:col-span-3 lg:col-start-2 lg:mt-0">
            <AlbumPrint photo={photos.vybiraySerdcem} caption="выбирай сердцем" tilt={-2.5} sizes="(min-width: 1024px) 22vw, 46vw" />
          </Reveal>
          <Reveal delay={0.12} className="col-span-1 lg:col-span-4 lg:col-start-5 lg:mt-20">
            <AlbumPrint photo={photos.stolKompaniya} caption="стол на компанию" tilt={1.5} sizes="(min-width: 1024px) 30vw, 46vw" />
          </Reveal>
          <Reveal delay={0.16} className="col-span-1 mt-10 lg:col-span-3 lg:col-start-10 lg:mt-6">
            <AlbumPrint photo={photos.tarelka} caption="курица с огня" tilt={-1.5} sizes="(min-width: 1024px) 22vw, 46vw" />
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
