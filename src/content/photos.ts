import borsch from "@/assets/photos/borsch.jpg";
import fasad from "@/assets/photos/fasad.jpg";
import koverSeledka from "@/assets/photos/kover-seledka.jpg";
import koverYuma from "@/assets/photos/kover-yuma.jpg";
import lagman from "@/assets/photos/lagman.jpg";
import lyulya from "@/assets/photos/lyulya.jpg";
import menuNaStole from "@/assets/photos/menu-na-stole.jpg";
import obed from "@/assets/photos/obed-na-stole.jpg";
import ryba from "@/assets/photos/ryba.jpg";
import salat from "@/assets/photos/salat.jpg";
import seledka from "@/assets/photos/seledka.jpg";
import stolKompaniya from "@/assets/photos/stol-kompaniya.jpg";
import tarelka from "@/assets/photos/tarelka.jpg";
import vybiraySerdcem from "@/assets/photos/vybiray-serdcem.jpg";
import zakuski from "@/assets/photos/zakuski.jpg";
import zal from "@/assets/photos/zal.jpg";

/* Все фото реальные: Яндекс Карты (y0xx), 2ГИС (g001), ВКонтакте (v002). Происхождение: PHOTOS.md */
export const photos = {
  borsch: { src: borsch, alt: "Тарелка борща, рядом сало, бородинский хлеб и зелёный лук на деревянной доске" },
  fasad: { src: fasad, alt: "Вывеска «Кривая изба, едальня» над входом на улице Марата" },
  koverSeledka: { src: koverSeledka, alt: "Селёдка с картошкой, графин морса и вино на фоне красного ковра" },
  koverYuma: { src: koverYuma, alt: "Ковёр в раме с надписью «Юма харт юма соул» на стене зала" },
  lagman: { src: lagman, alt: "Лагман с широкой лапшой и мясом у окна, за окном снег" },
  lyulya: { src: lyulya, alt: "Люля-кебаб с печёной картошкой, кукурузой, овощами и соусом" },
  menuNaStole: { src: menuNaStole, alt: "Меню «Кривой избы» на столе: блюда на огне и супы с ценами" },
  obed: { src: obed, alt: "Стол с пельменями, борщом, селёдкой с картошкой и меню «Кривой избы»" },
  ryba: { src: ryba, alt: "Стейк из красной рыбы на огне с картошкой, кукурузой, лимоном и зеленью" },
  salat: { src: salat, alt: "Тёплый салат с говядиной, фасолью и перцем на тарелке с тёмным кантом" },
  seledka: { src: seledka, alt: "Селёдка с красным луком и картошкой на оранжевом блюде" },
  stolKompaniya: { src: stolKompaniya, alt: "Стол на компанию: курица и свинина с огня, овощи, соусы и пиво" },
  tarelka: { src: tarelka, alt: "Курица с огня, картошка, кукуруза, огурцы и соус на большой тарелке" },
  vybiraySerdcem: { src: vybiraySerdcem, alt: "Красная картина с надписью «Выбирай сердцем» на кирпичной стене" },
  zakuski: { src: zakuski, alt: "Сало, солёные помидоры, чеснок, зелёный лук и рюмки на фоне ковра" },
  zal: { src: zal, alt: "Зал с бирюзовыми стульями, надписью «Кривая изба» на стене и ёлкой" },
} as const;

export type PhotoKey = keyof typeof photos;
