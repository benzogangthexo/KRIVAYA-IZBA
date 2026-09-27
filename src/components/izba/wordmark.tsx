import { cn } from "@/lib/utils";

/** «Кривая изба» мятными рукописными буквами с кривой линией, как на вывеске */
export function Wordmark({ text = "Кривая изба", className }: { text?: string; className?: string }) {
  return (
    <span className={cn("crooked font-mark whitespace-nowrap leading-none", className)}>
      {Array.from(text).map((ch, i) => (
        <span key={i}>{ch === " " ? " " : ch}</span>
      ))}
    </span>
  );
}
