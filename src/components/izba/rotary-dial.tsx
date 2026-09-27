"use client";

import { Phone } from "lucide-react";
import { scroll } from "motion";
import { Fragment, useEffect, useRef } from "react";

import { Container } from "@/components/layout/container";
import { Eyebrow } from "@/components/layout/eyebrow";
import { MagneticButton } from "@/components/motion/magnetic-button";
import { motionAllowed, useScrollAnim } from "@/components/motion/use-scroll-anim";
import { Button } from "@/components/ui/button";
import { site, telHref } from "@/content/site";

/*
 * Геометрия диска (viewBox 400): углы по часовой от направления «на 3 часа».
 * Упор справа внизу; «1» в 60° от упора против часовой, «0» в 30° за упором, как на настоящем аппарате.
 * Чтобы набрать цифру, отверстие доводят по часовой до упора: поворот (индекс + 2) * 30°.
 */
const C = 200;
const STOP = 50;
const RING = 128;
const HOLE = 25;
const ORDER = "1234567890";
const holeAngle = (i: number) => STOP - (i + 2) * 30;
const pullAngle = (digit: string) => (ORDER.indexOf(digit) + 2) * 30;
const rad = (deg: number) => (deg * Math.PI) / 180;
const at = (r: number, deg: number) => [C + r * Math.cos(rad(deg)), C + r * Math.sin(rad(deg))] as const;
const circle = (x: number, y: number, r: number) =>
  `M${(x - r).toFixed(2)} ${y.toFixed(2)}a${r} ${r} 0 1 0 ${2 * r} 0a${r} ${r} 0 1 0 ${-2 * r} 0Z`;

const WHEEL = [
  circle(C, C, 186),
  circle(C, C, 80),
  ...Array.from(ORDER, (_, i) => {
    const [x, y] = at(RING, holeAngle(i));
    return circle(x, y, HOLE);
  }),
].join("");

/* Сценарий набора от скролла: доли прогресса секции */
const DIGITS = Array.from(site.dialDigits);
const T0 = 0.06;
const T1 = 0.9;
const L = (T1 - T0) / DIGITS.length;
const PEAK = 0.5;
const HOLD = 0.62;

const FRAMES = (() => {
  const transform = ["rotate(0deg)"];
  const times = [0];
  DIGITS.forEach((d, k) => {
    const s = T0 + k * L;
    const a = pullAngle(d);
    if (k === 0) {
      transform.push("rotate(0deg)");
      times.push(s);
    }
    transform.push(`rotate(${a}deg)`, `rotate(${a}deg)`, "rotate(0deg)");
    times.push(s + PEAK * L, s + HOLD * L, s + L);
  });
  transform.push("rotate(0deg)");
  times.push(1);
  return { transform, times: times.map((t) => Math.round(t * 10000) / 10000) };
})();

/* +7 (902) 582-11-77: где стоят разделители между цифрами набора */
const SEPARATORS: Record<number, string> = { 0: "+7 (", 3: ") ", 6: "-", 8: "-" };

/** Дисковый телефон. Паттерн 3: вращение от скролла (номер набирается, пока листаете) */
export function RotaryDial() {
  const track = useRef<HTMLDivElement>(null);
  const wheel = useRef<HTMLDivElement>(null);
  const number = useRef<HTMLSpanElement>(null);
  const plate = useRef<SVGGElement>(null);

  useScrollAnim(wheel, { transform: FRAMES.transform }, { target: track, offset: ["start start", "end end"], times: FRAMES.times });

  useEffect(() => {
    const el = track.current;
    const num = number.current;
    const base = plate.current;
    if (!el || !num || !base || !motionAllowed()) return;
    const slots = Array.from(num.querySelectorAll<HTMLElement>("[data-slot]"));
    const marks = Array.from(base.querySelectorAll<SVGTextElement>("[data-digit]"));
    let shown = -1;
    let active = "";
    const paint = (p: number) => {
      let dialed = 0;
      let current = "";
      DIGITS.forEach((d, k) => {
        const s = T0 + k * L;
        if (p >= s + PEAK * L) dialed = k + 1;
        if (p >= s && p < s + L) current = d;
      });
      if (dialed !== shown) {
        shown = dialed;
        slots.forEach((n, i) => n.toggleAttribute("data-off", i >= dialed));
        el.toggleAttribute("data-done", dialed === DIGITS.length);
      }
      if (current !== active) {
        active = current;
        marks.forEach((m) => m.toggleAttribute("data-active", m.dataset.digit === current));
      }
    };
    paint(0);
    const stop = scroll(paint, { target: el, offset: ["start start", "end end"] });
    return () => {
      stop();
      slots.forEach((n) => n.removeAttribute("data-off"));
      el.removeAttribute("data-done");
    };
  }, []);

  const [sx0, sy0] = at(150, STOP);
  const [sx1, sy1] = at(197, STOP);

  return (
    <section id="call" aria-labelledby="call-title" className="relative">
      <div ref={track} className="dial-track relative">
        <div className="dial-sticky sticky top-0 flex min-h-[100svh] items-center overflow-clip py-6 lg:py-10">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(55%_45%_at_68%_52%,rgb(143_217_200/0.1),transparent_70%)]"
          />
          <Container className="grid items-center gap-x-[var(--col-gap)] gap-y-5 sm:gap-y-8 lg:grid-cols-12 lg:grid-rows-[auto_auto]">
            <div className="lg:col-span-5 lg:self-end">
              <Eyebrow index="04">Позвонить в избу</Eyebrow>
              <h2 id="call-title" className="t-h1 mt-4 lg:mt-6">
                Диск наберёт сам
              </h2>
              <p className="mt-4 hidden max-w-[28rem] text-fg-muted sm:block">
                Листайте вниз: диск наберёт номер избы, вам останется нажать «Позвонить». Бронь, день рождения, кабинка на компанию: всё по этому номеру.
              </p>
            </div>

            <div className="flex justify-center lg:col-span-7 lg:col-start-6 lg:row-span-2 lg:row-start-1">
              <div className="relative aspect-square w-[min(76vw,44svh,33rem)] lg:w-[min(100%,62svh,34rem)]">
                <div aria-hidden="true" className="absolute inset-[1.5%] rounded-full shadow-[0_40px_80px_-30px_rgb(10_0_2/0.9),0_0_0_1px_rgb(243_230_204/0.08)]" />
                <svg viewBox="0 0 400 400" aria-hidden="true" className="absolute inset-0 size-full">
                  <defs>
                    <radialGradient id="dial-plate" cx="50%" cy="42%" r="62%">
                      <stop offset="0" stopColor="#fbf3e2" />
                      <stop offset="1" stopColor="#dccaa6" />
                    </radialGradient>
                  </defs>
                  <circle cx={C} cy={C} r="198" fill="#1d0709" />
                  <circle cx={C} cy={C} r="190" fill="url(#dial-plate)" />
                </svg>

                <div ref={wheel} data-motion className="absolute inset-0 will-change-transform">
                  <svg viewBox="0 0 400 400" aria-hidden="true" className="size-full">
                    <defs>
                      <radialGradient id="dial-wheel" cx="42%" cy="34%" r="72%">
                        <stop offset="0" stopColor="#c2f1e6" />
                        <stop offset="0.55" stopColor="#8fd9c8" />
                        <stop offset="1" stopColor="#57a896" />
                      </radialGradient>
                    </defs>
                    <path d={WHEEL} fill="url(#dial-wheel)" fillRule="evenodd" />
                    <circle cx={C} cy={C} r="180" fill="none" stroke="#fff" strokeOpacity=".35" strokeWidth="2" />
                    <circle cx={C} cy={C} r="84" fill="none" stroke="#1d0709" strokeOpacity=".22" strokeWidth="3" />
                    {Array.from(ORDER, (d, i) => {
                      const [x, y] = at(RING, holeAngle(i));
                      return <circle key={d} cx={x} cy={y} r={HOLE + 1} fill="none" stroke="#1d0709" strokeOpacity=".28" strokeWidth="2.5" />;
                    })}
                    <g ref={plate}>
                    {Array.from(ORDER, (d, i) => {
                      const [x, y] = at(RING, holeAngle(i));
                      return (
                        <text
                          key={d}
                          data-digit={d}
                          x={x}
                          y={y}
                          textAnchor="middle"
                          dominantBaseline="central"
                          className="fill-[#2b1810] font-display text-[31px] transition-[fill] duration-200 data-active:fill-[#b8321f]"
                        >
                          {d}
                        </text>
                      );
                    })}
                  </g>
                  </svg>
                </div>

                <svg viewBox="0 0 400 400" aria-hidden="true" className="absolute inset-0 size-full">
                  <line x1={sx0} y1={sy0} x2={sx1} y2={sy1} stroke="#9a6515" strokeWidth="15" strokeLinecap="round" />
                  <line x1={sx0} y1={sy0} x2={sx1} y2={sy1} stroke="#f0c46a" strokeWidth="5" strokeLinecap="round" />
                  <circle cx={C} cy={C} r="74" fill="#f6ecd6" stroke="#c9b58f" strokeWidth="2" />
                  <circle cx={C} cy={C} r="64" fill="none" stroke="#c9b58f" strokeDasharray="3 5" />
                  <text x={C} y="186" textAnchor="middle" className="fill-[#2a0c0f] font-mark text-[31px]">
                    Кривая изба
                  </text>
                  <path d="M152 200h96" stroke="#b8321f" strokeWidth="1.5" />
                  <text x={C} y="226" textAnchor="middle" className="fill-[#2b1810] font-display text-[23px]">
                    582-11-77
                  </text>
                  <text x={C} y="247" textAnchor="middle" className="fill-[#6b4a35] font-display text-[13px]">
                    Марата, 7А
                  </text>
                </svg>
              </div>
            </div>

            <div className="lg:col-span-5 lg:self-start">
              <a
                href={telHref}
                aria-label={`Позвонить: ${site.phone}`}
                className="tabular inline-flex min-h-11 items-center font-display text-[clamp(1.75rem,1.3rem+1.9vw,3.1rem)] leading-none text-fg hover:text-brand-2"
              >
                <span ref={number} aria-hidden="true">
                  {DIGITS.map((d, i) => (
                    <Fragment key={i}>
                      {SEPARATORS[i] ?? ""}
                      <span data-slot className="dial-digit">
                        {d}
                      </span>
                    </Fragment>
                  ))}
                </span>
              </a>
              <div className="mt-4 flex flex-wrap gap-3 sm:mt-6">
                <MagneticButton asChild size="lg" className="dial-call">
                  <a href={telHref}>
                    <Phone aria-hidden="true" />
                    Позвонить
                  </a>
                </MagneticButton>
                <Button asChild variant="outline" size="lg" className="hidden sm:inline-flex">
                  <a href={site.links.vk} target="_blank" rel="noopener noreferrer">
                    Написать во ВКонтакте
                  </a>
                </Button>
              </div>
            </div>
          </Container>
        </div>
      </div>
    </section>
  );
}
