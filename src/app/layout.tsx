import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import type { ReactNode } from "react";

import { Cursor } from "@/components/motion/cursor";
import { headScript } from "@/components/motion/preloader";
import { SmoothScroll } from "@/components/motion/smooth-scroll";
import { Providers } from "@/components/providers";
import { Toaster } from "@/components/ui/sonner";
import { site } from "@/content/site";

import "./globals.css";

const display = localFont({
  src: [{ path: "../fonts/kurale-400.woff2", weight: "400", style: "normal" }],
  variable: "--ff-display",
  display: "swap",
  adjustFontFallback: "Times New Roman",
});

const body = localFont({
  src: [
    { path: "../fonts/literata-400.woff2", weight: "400", style: "normal" },
    { path: "../fonts/literata-600.woff2", weight: "600", style: "normal" },
  ],
  variable: "--ff-body",
  display: "swap",
  adjustFontFallback: "Times New Roman",
});

const hand = localFont({
  src: [{ path: "../fonts/caveat-500.woff2", weight: "500", style: "normal" }],
  variable: "--ff-hand",
  display: "swap",
  preload: false,
  adjustFontFallback: false,
});

const mark = localFont({
  src: [{ path: "../fonts/amatic-sc-700.woff2", weight: "700", style: "normal" }],
  variable: "--ff-mark",
  display: "swap",
  adjustFontFallback: false,
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3104";
const description =
  "Едальня с домашней кухней в интерьере советской квартиры: пельмени, борщ, лагман, люля на огне. Каждый день 12:00-24:00, Ульяновск, ул. Марата, 7А.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Кривая изба: едальня на Марата, 7А в Ульяновске",
  description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: "Кривая изба",
    title: "Кривая изба, едальня в Ульяновске",
    description,
  },
  twitter: { card: "summary_large_image" },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#3a1216",
  colorScheme: "dark",
  viewportFit: "cover",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: site.name,
  description,
  url: siteUrl,
  image: `${siteUrl}/opengraph-image.jpg`,
  telephone: site.phoneE164,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.street,
    addressLocality: site.city,
    addressRegion: site.postalRegion,
    addressCountry: "RU",
  },
  geo: { "@type": "GeoCoordinates", latitude: site.geo.lat, longitude: site.geo.lng },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "12:00",
      closes: "23:59",
    },
  ],
  servesCuisine: ["Домашняя кухня", "Русская кухня"],
  acceptsReservations: true,
  hasMenu: `${siteUrl}/#prices`,
  paymentAccepted: "Наличные, банковская карта",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: site.rating,
    bestRating: 5,
    ratingCount: site.ratingCount,
    reviewCount: site.reviewCount,
  },
  sameAs: [site.links.vk, site.links.instagram, site.links.yandex, site.links.twoGis],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="ru"
      className={`${display.variable} ${body.variable} ${hand.variable} ${mark.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: headScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
      </head>
      <body className="grain">
        <a
          href="#main"
          className="sr-only-focusable fixed left-4 top-4 z-[110] rounded-full bg-brand px-5 py-3 text-brand-ink"
        >
          К содержимому
        </a>
        <Providers>
          <SmoothScroll />
          <Cursor />
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
