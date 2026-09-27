# «Кривая изба», едальня · Ульяновск, ул. Марата, 7А

Сайт-концепт «Бабушкин фотоальбом»: домашняя кухня в интерьере советской квартиры. Next.js 16 (App Router, TS strict), Tailwind v4, shadcn/ui, Motion, Lenis, zod.

## Запуск
```bash
pnpm i
pnpm dev                      # http://localhost:3000
pnpm build && pnpm start      # прод-сборка
pnpm lint
```
Без сети pnpm может пытаться скачать версию из `packageManager`: тогда `export npm_config_manage_package_manager_versions=false`.

Переменные окружения: `.env.example` (`NEXT_PUBLIC_SITE_URL`).

## Где контент
- `src/content/site.ts`: адрес, телефон, часы, рейтинг, ссылки (Яндекс Карты, 2ГИС, ВК, Instagram).
- `src/content/menu.ts`: меню и цены (переписаны с фото меню на столе; где цены нет, в интерфейсе «в зале»).
- `src/content/reviews.ts`: отзывы с Яндекс Карт.
- `src/content/photos.ts` + `src/assets/photos/`: фото с alt-текстами (отбор и обработка в `PHOTOS.md`).
- `src/content/booking.ts`: бронь стола (часы 12:00-24:00, Europe/Ulyanovsk, слоты по 30 минут).

## Структура
- `src/app/page.tsx`: порядок секций. `layout.tsx`: шрифты, метаданные, JSON-LD Restaurant. `icon.svg`, `opengraph-image.jpg`, `robots.ts`, `sitemap.ts`.
- `src/components/izba/`: секции сайта (шапка, hero, манифест, меню-альбом, меню с ценами, дисковый телефон, зал, отзывы, бронь, футер) и бренд-примитивы (отпечаток альбома, SVG-декор, вордмарк, прелоадер-занавеска).
- `src/components/motion/`: анимации шаблона (параллакс, проявление по словам, вращение от скролла, превью за курсором, sticky-stack, огромное название).
- `src/app/api/`: `menu` (GET, zod, задержка, 422/503), `slots`, `slots/hold` (409), `booking` (201/422/409, идемпотентный requestId). `?chaos=1` в адресе страницы включает сбои, чтобы показать error-состояния.
- `scripts/qa.mjs`: проверка на 10 ширинах (`node scripts/qa.mjs http://localhost:3104 --shots=375,1440`).

## Решения
`DECISIONS.md` (шрифты, палитра, факты, производительность, самокритика), `PHOTOS.md` (источники и оценки фото), `PROGRESS.md` (статус фаз).

## GitHub Pages (статическая версия, бесплатный хостинг)
- Адрес: https://benzogangthexo.github.io/KRIVAYA-IZBA/
- Собрать заново: `pnpm build:pages` (результат в `docs/`, закоммитить и запушить). Запись, фильтры и меню работают прямо в браузере теми же обработчиками API (`src/lib/api/local.ts`), фото заранее нарезаны в WebP под все ширины экрана.
- Включить один раз: Settings -> Pages -> Build and deployment: Deploy from a branch -> ветка `claude/sleepy-brahmagupta-jy6nfi` (или `main` после слияния PR) -> папка `/docs` -> Save.
- Полная версия с сервером (заявки уходят на бэкенд): `pnpm build && pnpm start` или Vercel.
