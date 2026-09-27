import { Clock } from "lucide-react";
import type { CSSProperties } from "react";

import { Container } from "@/components/layout/container";
import { MagneticButton } from "@/components/motion/magnetic-button";
import { MaskReveal } from "@/components/motion/mask-reveal";
import { Parallax } from "@/components/motion/parallax";
import { Button } from "@/components/ui/button";
import { photos } from "@/content/photos";
import { site, telHref } from "@/content/site";

import { CarpetRug, Doily, GlassHolder } from "./decor";
import { AlbumPrint } from "./print";

const d = (s: string) => ({ "--d": s }) as CSSProperties;

/**
 * Hero. Паттерн 1, слоёный параллакс: дальний план ковёр (0.3), средний отпечатки (0),
 * ближний салфетка и подстаканник (-0.45).
 */
export function Hero() {
  return (
    <section id="hero" aria-labelledby="hero-title" className="relative isolate overflow-clip pb-[clamp(3.5rem,2rem+5vw,7rem)] pt-[clamp(1rem,0.5rem+2vw,2.5rem)]">
      <Parallax speed={0.3} className="pointer-events-none absolute -right-[34%] top-[10%] -z-10 w-[92%] opacity-40 sm:-right-[12%] sm:opacity-60 sm:w-[62%] lg:-right-[4%] lg:top-[-4%] lg:w-[46%] lg:opacity-80">
        <CarpetRug className="h-auto w-full -rotate-[4deg]" />
      </Parallax>
      <Parallax speed={-0.45} className="pointer-events-none absolute -left-16 bottom-[6%] -z-[5] w-40 text-fg/25 sm:w-52 lg:bottom-[2%] lg:left-[2%] lg:w-60">
        <Doily className="h-auto w-full" />
      </Parallax>
      <Parallax speed={-0.45} className="pointer-events-none absolute left-[43%] top-[30%] -z-[5] hidden w-24 text-brand/40 lg:block xl:w-28">
        <GlassHolder className="h-auto w-full rotate-[8deg]" />
      </Parallax>

      <Container className="grid grid-cols-4 gap-x-[var(--col-gap)] gap-y-12 md:grid-cols-6 lg:grid-cols-12">
        <div className="col-span-4 md:col-span-6 lg:col-span-7 lg:pt-6">
          <p className="fade-immediate t-eyebrow text-brand-2" style={d("0.05s")}>
            Едальня · Ульяновск, ул. Марата, 7А
          </p>
          <h1 id="hero-title" className="mt-5">
            <span className="sr-only">Кривая изба, едальня в Ульяновске. </span>
            <MaskReveal as="span" immediate lines={["Ковёр на стене,", "борщ на столе"]} className="t-hero block" />
          </h1>
          <p className="fade-immediate t-lead mt-6 max-w-[34rem] text-fg-muted" style={d("0.35s")}>
            Домашняя кухня в интерьере советской квартиры. Пельмени, борщ с салом, лагман и люля на огне. Как у бабушки, только на Марата.
          </p>
          <div className="fade-immediate mt-8 flex flex-wrap items-center gap-3" style={d("0.5s")}>
            <MagneticButton asChild size="lg">
              <a href="#booking">Забронировать стол</a>
            </MagneticButton>
            <Button asChild variant="outline" size="lg" className="tabular">
              <a href={telHref}>{site.phone}</a>
            </Button>
          </div>
          <p className="fade-immediate mt-6 flex items-center gap-2 text-fg-muted" style={d("0.65s")}>
            <Clock aria-hidden="true" className="size-4 text-brand-2" />
            Каждый день с 12:00 до 24:00
          </p>

          <div className="mt-14 hidden items-start gap-10 lg:flex">
            <AlbumPrint
              photo={photos.zakuski}
              caption="сало, соленья, по рюмочке"
              tilt={3}
              sizes="17rem"
              ratioClassName="aspect-[4/3]"
              className="w-[15rem] shrink-0 xl:w-[17rem]"
            />
            <AlbumPrint
              photo={photos.fasad}
              caption="ищите эту вывеску"
              tilt={-2}
              sizes="26rem"
              ratioClassName="aspect-[2.35/1]"
              className="mt-10 w-full max-w-[24rem]"
            />
          </div>
        </div>

        <div className="col-span-4 md:col-span-6 lg:col-span-5">
          <AlbumPrint
            photo={photos.obed}
            caption="пельмени, борщ, селёдочка и меню"
            tilt={-2}
            eager
            sizes="(min-width: 1024px) 36vw, (min-width: 768px) 70vw, 86vw"
            cursorLabel="Ням"
            className="mx-auto w-full max-w-[34rem]"
          />
          <div className="mt-10 grid grid-cols-2 items-start gap-5 sm:gap-8 lg:hidden">
            <AlbumPrint photo={photos.zakuski} caption="сало и соленья" tilt={3} sizes="(min-width: 768px) 34vw, 44vw" ratioClassName="aspect-[4/3]" />
            <AlbumPrint
              photo={photos.fasad}
              caption="ищите эту вывеску"
              tilt={-2}
              sizes="(min-width: 768px) 38vw, 52vw"
              ratioClassName="aspect-[4/3]"
              objectPosition="45% 50%"
              className="mt-8"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
