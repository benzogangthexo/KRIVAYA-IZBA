import { ArrowUpRight } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Eyebrow } from "@/components/layout/eyebrow";
import { Section } from "@/components/layout/section";
import { site, telHref } from "@/content/site";

import { DeferredBooking } from "./deferred";

const ext = { target: "_blank", rel: "noopener noreferrer" } as const;
const link = "inline-flex min-h-11 items-center gap-1 text-brand-2 underline-offset-4 hover:underline";

/** Бронь стола: мастер записи + контакты */
export function BookingSection() {
  return (
    <Section id="booking" labelledBy="booking-title">
      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-x-[var(--col-gap)]">
        <div className="lg:col-span-5">
          <Eyebrow index="07">Бронь</Eyebrow>
          <h2 id="booking-title" className="t-h1 mt-6">
            Забронировать стол
          </h2>
          <p className="t-lead mt-6 max-w-[32rem] text-fg-muted">
            Выберите, сколько вас, день и время. Администратор перезвонит и подтвердит.
          </p>
          <dl className="mt-10 divide-y divide-line border-y border-line">
            <div className="grid gap-1 py-4 sm:grid-cols-[8rem_1fr]">
              <dt className="text-fg-muted">Адрес</dt>
              <dd>
                {site.city}, {site.street}
                <span className="flex flex-wrap gap-x-5">
                  <a href={site.links.yandex} {...ext} className={link}>
                    Яндекс Карты <ArrowUpRight aria-hidden="true" className="size-4" />
                  </a>
                  <a href={site.links.twoGis} {...ext} className={link}>
                    2ГИС <ArrowUpRight aria-hidden="true" className="size-4" />
                  </a>
                </span>
              </dd>
            </div>
            <div className="grid gap-1 py-4 sm:grid-cols-[8rem_1fr]">
              <dt className="text-fg-muted">Телефон</dt>
              <dd>
                <a href={telHref} className="tabular inline-flex min-h-11 items-center text-[1.15rem] hover:text-brand-2">
                  {site.phone}
                </a>
              </dd>
            </div>
            <div className="grid gap-1 py-4 sm:grid-cols-[8rem_1fr]">
              <dt className="text-fg-muted">Часы</dt>
              <dd>каждый день с 12:00 до 24:00</dd>
            </div>
            <div className="grid gap-1 py-4 sm:grid-cols-[8rem_1fr]">
              <dt className="text-fg-muted">Соцсети</dt>
              <dd className="flex flex-wrap gap-x-5">
                <a href={site.links.vk} {...ext} className={link}>
                  ВКонтакте <ArrowUpRight aria-hidden="true" className="size-4" />
                </a>
                <a href={site.links.instagram} {...ext} className={link}>
                  Instagram* <ArrowUpRight aria-hidden="true" className="size-4" />
                </a>
              </dd>
            </div>
          </dl>
          <p className="t-hand mt-8 max-w-[30rem] text-brand-2">
            Компания до 10 человек? Есть отдельная кабинка, напишите о ней в комментарии.
          </p>
        </div>
        <div className="lg:col-span-7">
          <DeferredBooking className="min-h-[34rem] sm:min-h-[25.75rem] lg:min-h-[27.25rem] xl:min-h-[26.3rem]" successNote={`Администратор перезвонит и подтвердит бронь. Планы поменялись: позвоните, ${site.phone}.`}>
            <div className="booking flex min-h-[34rem] sm:min-h-[25.75rem] lg:min-h-[27.25rem] xl:min-h-[26.3rem] flex-col justify-center gap-4 rounded-[var(--radius-xl)] border border-line bg-surface p-5 sm:p-8">
              <p className="t-h3">Форма брони загружается</p>
              <p className="text-fg-muted">
                Быстрее всего забронировать по телефону:{" "}
                <a href={telHref} className="tabular text-brand-2 underline underline-offset-4">
                  {site.phone}
                </a>
              </p>
            </div>
          </DeferredBooking>
        </div>
      </Container>
    </Section>
  );
}
