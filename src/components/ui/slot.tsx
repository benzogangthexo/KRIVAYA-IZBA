import { Children, cloneElement, isValidElement, type CSSProperties, type ReactNode } from "react";

import { cn } from "@/lib/utils";

type AnyProps = Record<string, unknown> & { className?: string; style?: CSSProperties; children?: ReactNode };
type Handler = (...args: unknown[]) => void;

/**
 * Минимальный Slot для asChild: переносит пропсы на единственный дочерний элемент,
 * склеивает className и style, обработчики on* вызывает оба (сначала дочерний).
 * Замена `Slot` из пакета radix-ui: бочка тянула весь radix в стартовый бандл (+50 КБ gzip).
 */
export function Slot({ children, className, style, ...props }: AnyProps) {
  const child = Children.only(children);
  if (!isValidElement<AnyProps>(child)) return null;
  const merged: AnyProps = { ...props };
  for (const [key, value] of Object.entries(child.props)) {
    const own = props[key];
    if (/^on[A-Z]/.test(key) && typeof own === "function" && typeof value === "function") {
      merged[key] = (...args: unknown[]) => {
        (value as Handler)(...args);
        (own as Handler)(...args);
      };
    } else {
      merged[key] = value;
    }
  }
  merged.className = cn(className, child.props.className);
  merged.style = { ...style, ...child.props.style };
  return cloneElement(child, merged);
}
