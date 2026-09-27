import { BookingSection } from "@/components/izba/booking-section";
import { Curtain } from "@/components/izba/curtain";
import { Hero } from "@/components/izba/hero";
import { Interior } from "@/components/izba/interior";
import { Manifest } from "@/components/izba/manifest";
import { MenuAlbum } from "@/components/izba/menu-album";
import { Prices } from "@/components/izba/prices";
import { Reviews } from "@/components/izba/reviews";
import { RotaryDial } from "@/components/izba/rotary-dial";
import { SiteFooter } from "@/components/izba/site-footer";
import { SiteHeader } from "@/components/izba/site-header";
import { MobileCta } from "@/components/layout/mobile-cta";
import { menu } from "@/content/menu";
import { site } from "@/content/site";
import { DEFAULT_CATEGORY, filterMenu, type MenuResponse } from "@/lib/menu";

export default function Page() {
  const query = { category: DEFAULT_CATEGORY, q: "" };
  const initialMenu: MenuResponse = { ...query, items: filterMenu(menu, query) };

  return (
    <>
      <Curtain />
      <SiteHeader />
      <main id="main">
        <Hero />
        <Manifest />
        <MenuAlbum />
        <Prices initial={initialMenu} />
        <RotaryDial />
        <Interior />
        <Reviews />
        <BookingSection />
      </main>
      <SiteFooter />
      <MobileCta label="Забронировать стол" phone={site.phone} />
    </>
  );
}
