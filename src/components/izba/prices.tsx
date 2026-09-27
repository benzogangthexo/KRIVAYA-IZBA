import { Container } from "@/components/layout/container";
import { Eyebrow } from "@/components/layout/eyebrow";
import { Section } from "@/components/layout/section";
import { photos } from "@/content/photos";
import type { MenuResponse } from "@/lib/menu";

import { DeferredMenuList } from "./deferred";
import { MenuStatic } from "./menu-static";
import { AlbumPrint } from "./print";

/** Меню с ценами: данные из /api/menu, первый экран отрисован сервером (без скелетона) */
export function Prices({ initial }: { initial: MenuResponse }) {
  return (
    <Section id="prices" labelledBy="prices-title">
      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-x-[var(--col-gap)]">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-8">
            <Eyebrow index="03">Меню с ценами</Eyebrow>
            <h2 id="prices-title" className="t-h1 mt-6">
              Всё меню
            </h2>
            <p className="mt-6 max-w-[30rem] text-fg-muted">
              Переписали с меню, которое лежит на столах. Если цена поменялась, официант подскажет. Где на фото меню цену не разобрать, пишем «в зале».
            </p>
            <AlbumPrint
              photo={photos.menuNaStole}
              caption="так меню лежит на столе"
              tilt={2}
              sizes="(min-width: 1024px) 22vw, 40vw"
              ratioClassName="aspect-[3/4]"
              className="mt-10 hidden w-[78%] max-w-[19rem] md:block"
            />
          </div>
        </div>
        <div className="lg:col-span-8">
          <DeferredMenuList initial={initial}>
            <MenuStatic initial={initial} />
          </DeferredMenuList>
        </div>
      </Container>
    </Section>
  );
}
