import type { MenuItem } from "@/lib/menu";

/*
 * Меню переписано с фото меню «Кривой избы» на столе (Яндекс Карты, кадры y011 и y016).
 * Цена стоит только там, где её видно чётко. Пельмени, лагман и закуски есть в меню
 * и в отзывах, но цена на фото не читается: пишем «в зале».
 */
export const menu: MenuItem[] = [
  { id: "lyulya-beef", category: "fire", title: "Люля из говядины", meta: "340 г, с гарниром и картошкой из печи", price: 590, photo: "lyulya" },
  { id: "lyulya-pork", category: "fire", title: "Люля из свинины", meta: "340 г, с гарниром и картошкой из печи", price: 540, photo: "lyulya" },
  { id: "lyulya-chicken", category: "fire", title: "Люля из курицы", meta: "340 г, с гарниром и картошкой из печи", price: 470, photo: "lyulya" },
  { id: "sheya", category: "fire", title: "Шашлык из свиной шейки", meta: "300 г", price: 510 },
  { id: "rebra", category: "fire", title: "Свиные рёбра", meta: "300 г", price: 490 },
  { id: "kost", category: "fire", title: "Свинина на кости", meta: "320 г", price: 520 },
  { id: "pechen", category: "fire", title: "Говяжья печень", meta: "320 г", price: 530 },
  { id: "potroha", category: "fire", title: "Бараньи потроха", meta: "320 г", price: 510 },
  { id: "set-1", category: "fire", title: "Мясной сет на 1 кг", meta: "на компанию", price: 2400, photo: "stolKompaniya" },
  { id: "set-2", category: "fire", title: "Мясной сет на 2 кг", meta: "на большую компанию", price: 4600 },

  { id: "borsch", category: "soups", title: "Борщ", meta: "250 г, на говядине, со свёклой и капустой", price: 380, photo: "borsch" },
  { id: "solyanka", category: "soups", title: "Солянка мясная", meta: "320 г, с солёным огурцом и лимоном", price: 390 },
  { id: "lapsha", category: "soups", title: "Лапша куриная", meta: "260 г", price: 290 },
  { id: "lapsha-griby", category: "soups", title: "Лапша куриная с грибами", meta: "260 г", price: 320 },
  { id: "lagman", category: "soups", title: "Лагман", meta: "лапша, мясо, овощи", price: null, photo: "lagman" },

  { id: "kur-shashlyk", category: "poultry", title: "Куриный шашлык", meta: "310 г", price: 450 },
  { id: "krylyshki", category: "poultry", title: "Куриные крылышки", meta: "310 г", price: 440 },
  { id: "krylyshki-ostrye", category: "poultry", title: "Крылышки острые", meta: "310 г", price: 460 },
  { id: "serdechki", category: "poultry", title: "Куриные сердечки", meta: "300 г", price: 430 },
  { id: "detskiy", category: "poultry", title: "Детский шашлычок", meta: "из курицы", price: 420 },
  { id: "indeyka-krylya", category: "poultry", title: "Крылышки индейки", meta: "310 г", price: 460 },
  { id: "indeyka-file", category: "poultry", title: "Филе из индейки", meta: "310 г", price: 490 },

  { id: "semga", category: "fish", title: "Стейк из сёмги", meta: "на огне, штучно", price: 1150, photo: "ryba" },
  { id: "forel", category: "fish", title: "Форель на огне", meta: "штучно", price: 960 },
  { id: "dorado", category: "fish", title: "Дорадо", meta: "штучно", price: 1300 },
  { id: "krevetki", category: "fish", title: "Креветки гриль", meta: "8 шт.", price: 920 },
  { id: "kartofel", category: "fish", title: "Картофель из печи", meta: "300 г", price: 240 },
  { id: "ovoshi", category: "fish", title: "Овощи гриль", meta: "300 г", price: 360 },
  { id: "griby", category: "fish", title: "Грибы на огне", meta: "300 г", price: 320 },
  { id: "garnir", category: "fish", title: "Дополнительный гарнир", meta: "помидоры, баклажан, кабачки или перец, 1 шт.", price: 90 },

  { id: "pelmeni", category: "home", title: "Пельмени", meta: "домашние", price: null, photo: "obed" },
  { id: "seledka", category: "home", title: "Селёдочка с лучком", meta: "сельдь, картофель, лук, зелень", price: null, photo: "seledka" },
  { id: "salo", category: "home", title: "Сало домашнее с горчицей", meta: "к борщу и не только", price: null, photo: "zakuski" },
  { id: "tbilisi", category: "home", title: "Салат «Тбилиси»", meta: "говядина, красная фасоль, перец", price: null, photo: "salat" },
  { id: "raznosol", category: "home", title: "Русский разносол", meta: "соленья к столу", price: null },
  { id: "gruzdi", category: "home", title: "Грузди со сметаной", meta: "закуска", price: null },
  { id: "kapusta", category: "home", title: "Капуста квашеная с клюквой", meta: "закуска", price: null },
  { id: "chay", category: "home", title: "Чай в чайнике", meta: "фруктовый, облепиховый, чёрный с чабрецом", price: null },
];
