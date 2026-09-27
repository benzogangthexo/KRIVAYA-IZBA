import Image, { type StaticImageData } from "next/image";
import type { CSSProperties } from "react";

import { cn } from "@/lib/utils";

type Photo = { src: StaticImageData; alt: string };

/**
 * Отпечаток в семейном альбоме: кремовое поле, уголки-держатели, подпись от руки, наклон.
 * Геометрия задаётся классом аспекта (ratioClassName), поэтому CLS = 0.
 */
export function AlbumPrint({
  photo,
  caption,
  tilt = 0,
  sizes,
  ratioClassName = "aspect-[4/5]",
  eager = false,
  straighten = true,
  cursorLabel,
  objectPosition,
  className,
}: {
  photo: Photo;
  caption?: string;
  tilt?: number;
  sizes: string;
  ratioClassName?: string;
  /** LCP-кадр: грузить сразу и с высоким приоритетом */
  eager?: boolean;
  straighten?: boolean;
  cursorLabel?: string;
  objectPosition?: string;
  className?: string;
}) {
  return (
    <figure
      className={cn("print", className)}
      style={{ "--tilt": `${tilt}deg` } as CSSProperties}
      data-straighten={straighten ? "" : undefined}
      data-cursor={cursorLabel ? "view" : undefined}
      data-cursor-label={cursorLabel}
    >
      <div className={cn("print__photo", ratioClassName)}>
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes={sizes}
          quality={eager ? 70 : 75}
          placeholder="blur"
          loading={eager ? "eager" : undefined}
          fetchPriority={eager ? "high" : undefined}
          className="object-cover"
          style={objectPosition ? { objectPosition } : undefined}
        />
      </div>
      {caption ? <figcaption className="print__cap">{caption}</figcaption> : <div aria-hidden="true" className="h-[clamp(0.4rem,0.28rem+0.5vw,0.75rem)]" />}
      <span aria-hidden="true" className="print__corners" />
    </figure>
  );
}
