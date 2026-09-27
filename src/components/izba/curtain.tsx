import { Preloader, PreloaderCount } from "@/components/motion/preloader";

import { Wordmark } from "./wordmark";

/** Прелоадер: бордовая занавеска с бахромой уезжает вверх, счётчик 0-100 в старом телевизоре */
export function Curtain() {
  return (
    <Preloader className="curtain">
      <div className="tv">
        <svg viewBox="0 0 220 200" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" className="absolute inset-0 size-full text-fg">
          <path className="preloader__draw" pathLength={1} d="M92 38 62 6M128 38l32-34" />
          <path
            className="preloader__draw"
            pathLength={1}
            d="M24 38h172c7 0 12 5 12 12v120c0 7-5 12-12 12H24c-7 0-12-5-12-12V50c0-7 5-12 12-12Z"
          />
          <path className="preloader__draw" pathLength={1} d="M44 182l-8 16M176 182l8 16" />
          <circle className="preloader__draw" pathLength={1} cx="186" cy="84" r="7" />
          <circle className="preloader__draw" pathLength={1} cx="186" cy="112" r="7" />
          <path className="preloader__draw" pathLength={1} d="M181 140h10M181 148h10" />
        </svg>
        <PreloaderCount className="tv__count" />
      </div>
      <Wordmark className="text-[2.6rem] text-brand-2" />
    </Preloader>
  );
}
