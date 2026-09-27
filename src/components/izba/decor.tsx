import type { SVGProps } from "react";

/* Линейные SVG-иллюстрации бренда. Всё серверное: геометрия считается при сборке, в клиент не уходит */

const TAU = Math.PI * 2;
const pt = (cx: number, cy: number, r: number, a: number) =>
  `${(cx + r * Math.cos(a)).toFixed(2)} ${(cy + r * Math.sin(a)).toFixed(2)}`;

/** Марка: кривая изба (крыша набок, труба, дверь) */
export function HutMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M4.8 15.8 16.4 5.4l10.8 8.6" />
      <path d="M7.6 13.7V27h17.8V12.6" />
      <path d="M21.4 8.9V5.6h2.8v5.6" />
      <path d="M13.4 27v-6.4h5V27" />
    </svg>
  );
}

/** Вязаная салфетка: фестоны, лепестки, кольцо петель */
export function Doily(props: SVGProps<SVGSVGElement>) {
  const c = 110;
  const n = 28;
  let edge = "";
  for (let i = 0; i < n; i++) {
    const a0 = (i / n) * TAU;
    const a1 = ((i + 1) / n) * TAU;
    const chord = 2 * 100 * Math.sin(Math.PI / n);
    edge += `${i === 0 ? `M${pt(c, c, 100, a0)}` : ""} A${(chord / 2).toFixed(2)} ${(chord / 2).toFixed(2)} 0 0 1 ${pt(c, c, 100, a1)} `;
  }
  const petals = Array.from({ length: 16 }, (_, i) => i * 22.5);
  const loops = Array.from({ length: 12 }, (_, i) => (i / 12) * TAU);
  return (
    <svg viewBox="0 0 220 220" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true" {...props}>
      <path d={`${edge}Z`} />
      <circle cx={c} cy={c} r="88" strokeDasharray="2 5" />
      {petals.map((deg) => (
        <ellipse key={deg} cx={c} cy={c - 60} rx="8" ry="22" transform={`rotate(${deg} ${c} ${c})`} />
      ))}
      <circle cx={c} cy={c} r="34" />
      {loops.map((a) => (
        <circle key={a} cx={c + 34 * Math.cos(a)} cy={c + 34 * Math.sin(a)} r="6" />
      ))}
      <circle cx={c} cy={c} r="14" />
      <path d={`M${c - 7} ${c}h14M${c} ${c - 7}v14`} />
    </svg>
  );
}

/** Подстаканник со стаканом чая и ложкой */
export function GlassHolder(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 170 230" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M72 40c-8-9 6-15-1-25M92 36c-8-9 6-15-1-25" strokeDasharray="3 5" />
      <path d="M50 46h72l-7 150H57Z" />
      <path d="M53 78h66" />
      <path d="M86 186 128 14" />
      <ellipse cx="130" cy="9" rx="5" ry="3.4" transform="rotate(-14 130 9)" />
      <path d="M46 118h80l-6 80H52Z" />
      <path d="M58 132c6 16 14 16 20 0 6 16 14 16 20 0 6 16 14 16 20 0" />
      <path d="M60 170h52" />
      <path d="M42 198h88l-6 12H48Z" />
      <path d="M126 128c26-2 34 30 12 48l-16 8" />
    </svg>
  );
}

/** Ковёр на стене: кайма, поле с ромбами, центральный медальон, бахрома. Дальний план hero */
export function CarpetRug(props: SVGProps<SVGSVGElement>) {
  const fringe = Array.from({ length: 62 }, (_, i) => 14 + i * 8)
    .map((x) => `M${x} 0v10M${x} 690v10`)
    .join("");
  let zig = "";
  for (let x = 38; x <= 478; x += 16) zig += `${x === 38 ? "M" : "L"}${x} ${x % 32 === 6 ? 34 : 44}`;
  let zigB = "";
  for (let x = 38; x <= 478; x += 16) zigB += `${x === 38 ? "M" : "L"}${x} ${x % 32 === 6 ? 666 : 656}`;
  return (
    <svg viewBox="0 0 520 700" aria-hidden="true" {...props}>
      <defs>
        <pattern id="rug-cell" width="52" height="52" patternUnits="userSpaceOnUse">
          <path d="M26 6 46 26 26 46 6 26Z" fill="none" stroke="#f3e6cc" strokeOpacity=".1" />
          <path d="M26 17 35 26 26 35 17 26Z" fill="#d9483b" fillOpacity=".24" />
          <circle cx="26" cy="26" r="1.8" fill="#e3a73c" fillOpacity=".4" />
        </pattern>
      </defs>
      <path d={fringe} stroke="#f3e6cc" strokeOpacity=".22" strokeWidth="1.4" />
      <rect x="10" y="10" width="500" height="680" rx="6" fill="#4b181d" stroke="#f3e6cc" strokeOpacity=".14" />
      <rect x="30" y="30" width="460" height="640" fill="none" stroke="#d9483b" strokeOpacity=".32" strokeWidth="16" />
      <path d={zig} fill="none" stroke="#e3a73c" strokeOpacity=".35" strokeWidth="1.5" />
      <path d={zigB} fill="none" stroke="#e3a73c" strokeOpacity=".35" strokeWidth="1.5" />
      <rect x="52" y="52" width="416" height="596" fill="url(#rug-cell)" stroke="#f3e6cc" strokeOpacity=".12" />
      <path d="M260 170 390 350 260 530 130 350Z" fill="#2a0c0f" fillOpacity=".55" stroke="#e3a73c" strokeOpacity=".4" />
      <path d="M260 225 350 350 260 475 170 350Z" fill="#d9483b" fillOpacity=".28" stroke="#f3e6cc" strokeOpacity=".22" />
      <path d="M260 288 305 350 260 412 215 350Z" fill="#8fd9c8" fillOpacity=".14" stroke="#8fd9c8" strokeOpacity=".35" />
      <path d="M52 52h70L52 122ZM468 52h-70l70 70ZM52 648h70l-70-70ZM468 648h-70l70-70Z" fill="#d9483b" fillOpacity=".2" />
    </svg>
  );
}

/** Чертёж кривой избы с пометками от руки (линии дорисовываются от скролла, data-draw) */
export function HutBlueprint(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 640 430"
      fill="none"
      role="img"
      aria-label="Чертёж кривой избы: крыша чуть набок, окно с занавеской, дверь открыта с 12:00 до 24:00"
      {...props}
    >
      <g stroke="var(--brand-2)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path data-draw d="M24 352h592" />
        <path data-draw d="M152 352l7-160 272-12 5 172" />
        <path data-draw d="M128 200 302 72l154 116" />
        <path data-draw d="M160 190 302 94l128 90" />
        <path data-draw d="M374 128V84h28v68" />
        <path data-draw d="M388 76c-14-16 16-24 2-40-10-12 8-20 2-30" strokeDasharray="4 6" />
        <path data-draw d="M202 232h80v70h-80Zm40 0v70m-40-36h80" />
        <path data-draw d="M206 235c22 18 10 46 2 64m70-64c-22 18-10 46-2 64" />
        <path data-draw d="M332 352V252h58v100" />
        <path data-draw d="M152 382h284m-284-9v18m284-18v18" />
        <path data-draw d="M312 80 468 52" strokeDasharray="3 5" />
        <path data-draw d="M392 300h92" strokeDasharray="3 5" />
        <path data-draw d="M202 250 118 178" strokeDasharray="3 5" />
      </g>
      <circle cx="380" cy="304" r="3.5" fill="var(--brand-2)" />
      <g fill="var(--fg-muted)" className="font-hand" fontSize="23">
        <text x="474" y="58">крыша: чуть набок</text>
        <text x="490" y="296">дверь открыта</text>
        <text x="490" y="322">с 12:00 до 24:00</text>
        <text x="24" y="170">окно с занавеской</text>
        <text x="294" y="414" textAnchor="middle">ширина: на глаз</text>
      </g>
    </svg>
  );
}
