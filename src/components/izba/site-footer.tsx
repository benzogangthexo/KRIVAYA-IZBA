import { Container } from "@/components/layout/container";
import { GiantWordmark } from "@/components/motion/giant-wordmark";
import { site, telHref } from "@/content/site";

const ext = { target: "_blank", rel: "noopener noreferrer" } as const;
const link = "inline-flex min-h-11 items-center hover:text-brand-2";

/** Футер: контакты и огромное «КРИВАЯ ИЗБА» с кривой линией букв, как на вывеске */
export function SiteFooter() {
  return (
    <footer className="relative overflow-clip border-t border-line pb-[calc(var(--mobile-cta-h)+env(safe-area-inset-bottom)+1.5rem)] pt-16 md:pb-10">
      <Container>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <p className="t-hand max-w-[16rem] text-[1.6rem] text-brand-2">Заходите, разуваться не надо</p>
          <div>
            <p className="t-eyebrow text-fg-muted">Адрес</p>
            <p className="mt-3">
              {site.city}, {site.street}
            </p>
            <p className="text-fg-muted">{site.district}</p>
            <a href={site.links.yandex} {...ext} className={`${link} text-brand-2`}>
              Как добраться
            </a>
          </div>
          <div>
            <p className="t-eyebrow text-fg-muted">Телефон и часы</p>
            <a href={telHref} className={`${link} tabular mt-1 text-[1.15rem]`}>
              {site.phone}
            </a>
            <p className="text-fg-muted">каждый день 12:00-24:00</p>
          </div>
          <div>
            <p className="t-eyebrow text-fg-muted">Соцсети</p>
            <ul className="mt-1">
              <li>
                <a href={site.links.vk} {...ext} className={link}>
                  ВКонтакте
                </a>
              </li>
              <li>
                <a href={site.links.instagram} {...ext} className={link}>
                  Instagram*
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="crooked-giant mt-16 text-brand-2">
          <GiantWordmark text="КРИВАЯ ИЗБА" ratio={0.4} className="font-mark py-[0.04em]" />
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t border-line pt-6 text-[0.85rem] text-fg-muted sm:flex-row sm:justify-between">
          <p>© 2026 «Кривая изба», едальня. Ульяновск, {site.street}</p>
          <p>* Instagram принадлежит компании Meta, признанной экстремистской и запрещённой в России.</p>
        </div>
      </Container>
    </footer>
  );
}
