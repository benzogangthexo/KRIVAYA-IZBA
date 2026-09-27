import { menu } from "@/content/menu";
import { fail, flaky, invalid, latency, ok } from "@/lib/api/http";
import { filterMenu, MenuQuerySchema, type MenuResponse } from "@/lib/menu";

/** GET /api/menu?category=fire&q=борщ : 200 / 422 (неверный запрос) / 503 (сбой, ?chaos=1) */
export async function GET(req: Request) {
  const params = Object.fromEntries(new URL(req.url).searchParams);
  const parsed = MenuQuerySchema.safeParse(params);
  if (!parsed.success) return invalid(parsed.error);

  await latency(350, 900);
  if (flaky(req)) return fail(503, "unavailable", "Меню не загрузилось");

  const body: MenuResponse = {
    category: parsed.data.category,
    q: parsed.data.q,
    items: filterMenu(menu, parsed.data),
  };
  return ok(body);
}
