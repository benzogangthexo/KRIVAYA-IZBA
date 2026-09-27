import { z } from "zod";

/* Меню: общие типы, схемы и фильтр. Им пользуются и роут /api/menu, и клиент (скелетон той же геометрии) */

export const MENU_CATEGORIES = [
  { id: "fire", label: "Люля и мясо" },
  { id: "soups", label: "Супы" },
  { id: "poultry", label: "Птица" },
  { id: "fish", label: "Рыба и гарниры" },
  { id: "home", label: "По-домашнему" },
] as const;

export const MenuCategorySchema = z.enum(["fire", "soups", "poultry", "fish", "home"]);
export type MenuCategory = z.infer<typeof MenuCategorySchema>;
export const DEFAULT_CATEGORY: MenuCategory = "fire";

export const MenuItemSchema = z.object({
  id: z.string(),
  category: MenuCategorySchema,
  title: z.string(),
  meta: z.string().optional(),
  /** рубли; null = цены нет в источниках, уточнить в зале */
  price: z.number().int().positive().nullable(),
  photo: z.string().optional(),
});
export type MenuItem = z.infer<typeof MenuItemSchema>;

export const MenuQuerySchema = z.object({
  category: MenuCategorySchema.default(DEFAULT_CATEGORY),
  q: z.string().trim().max(40, "Слишком длинный запрос").optional().default(""),
});
export type MenuQuery = z.infer<typeof MenuQuerySchema>;

export const MenuResponseSchema = z.object({
  category: MenuCategorySchema,
  q: z.string(),
  items: z.array(MenuItemSchema),
});
export type MenuResponse = z.infer<typeof MenuResponseSchema>;

const norm = (s: string) => s.toLowerCase().replaceAll("ё", "е");

/** Поиск идёт по всему меню, без поиска показываем выбранный раздел */
export function filterMenu(items: readonly MenuItem[], { category, q }: MenuQuery): MenuItem[] {
  const query = norm(q.trim());
  if (query) return items.filter((it) => norm(`${it.title} ${it.meta ?? ""}`).includes(query));
  return items.filter((it) => it.category === category);
}

export const menuKey = ({ category, q }: MenuQuery) => `${category}|${q.trim()}`;

const rub = new Intl.NumberFormat("ru-RU");
export const formatPrice = (price: number) => `${rub.format(price)} ₽`;
