/* Факты заведения: только из источников (Яндекс Карты, 2ГИС, ВКонтакте, меню на столе) */
export const site = {
  name: "Кривая изба",
  kind: "едальня",
  tagline: "Едальня «Кривая изба»: готовим вкусно, как у бабушки",
  city: "Ульяновск",
  street: "ул. Марата, 7А",
  streetFull: "улица Марата, 7А",
  district: "Ленинский район",
  postalRegion: "Ульяновская область",
  phone: "+7 (902) 582-11-77",
  phoneE164: "+79025821177",
  /** цифры, которые набирает диск: после +7 */
  dialDigits: "9025821177",
  hoursLabel: "12:00-24:00",
  hoursText: "Каждый день с 12:00 до 24:00",
  rating: 4.9,
  ratingCount: 46,
  reviewCount: 34,
  geo: { lat: 54.323342, lng: 48.393755 },
  links: {
    vk: "https://vk.ru/club235279739",
    instagram: "https://www.instagram.com/krivaya_izba_ulsk/",
    yandex: "https://yandex.ru/maps/org/krivaya_izba/57047655220/",
    yandexReviews: "https://yandex.ru/maps/org/krivaya_izba/57047655220/reviews/",
    twoGis: "https://2gis.ru/ulyanovsk/firm/70000001112681557",
  },
} as const;

export const telHref = `tel:${site.phoneE164}`;
