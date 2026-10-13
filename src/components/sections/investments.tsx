"use client";

import { useId, useMemo, useState, type PointerEvent } from "react";
import { Highlight, SectionHeading } from "@/components/ui/section-heading";
import { brl, brlCompact } from "@/lib/format";

// Taxas fictícias, só para a demonstração.
const SERIES = [
  { key: "cdb", label: "CDB 100% do CDI", rate: 0.1, color: "var(--chart-1)" },
  { key: "poupanca", label: "Poupança", rate: 0.06, color: "var(--chart-2)" },
] as const;

const W = 640;
const H = 300;
const PAD = { top: 16, right: 16, bottom: 30, left: 16 };

function project(initial: number, monthly: number, months: number, yearlyRate: number) {
  const r = Math.pow(1 + yearlyRate, 1 / 12) - 1;
  const out = [initial];
  for (let m = 1; m <= months; m++) out.push(out[m - 1] * (1 + r) + monthly);
  return out;
}

function Slider({
  label,
  value,
  display,
  onChange,
  ...range
}: {
  label: string;
  value: number;
  display: string;
  onChange: (n: number) => void;
  min: number;
  max: number;
  step: number;
}) {
  const id = useId();
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <label htmlFor={id} className="text-sm text-muted">
          {label}
        </label>
        <span className="font-display text-xl font-semibold tracking-[-0.03em] tabular-nums">{display}</span>
      </div>
      <input
        id={id}
        type="range"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-valuetext={display}
        className="mt-3 h-6 w-full cursor-pointer accent-brand"
        {...range}
      />
    </div>
  );
}

export function Investments() {
  const [initial, setInitial] = useState(5000);
  const [monthly, setMonthly] = useState(300);
  const [years, setYears] = useState(5);
  const [hover, setHover] = useState<number | null>(null);

  const months = years * 12;
  const data = useMemo(
    () => SERIES.map((s) => ({ ...s, values: project(initial, monthly, months, s.rate) })),
    [initial, monthly, months],
  );

  const invested = initial + monthly * months;
  const max = data[0].values[months] * 1.06;
  const min = initial * 0.9;
  const x = (m: number) => PAD.left + (m / months) * (W - PAD.left - PAD.right);
  const y = (v: number) => H - PAD.bottom - ((v - min) / (max - min)) * (H - PAD.top - PAD.bottom);
  const line = (values: number[]) => values.map((v, m) => `${m ? "L" : "M"}${x(m).toFixed(1)} ${y(v).toFixed(1)}`).join("");

  const final = data[0].values[months];
  const at = hover ?? months;

  function onMove(event: PointerEvent<SVGSVGElement>) {
    const box = event.currentTarget.getBoundingClientRect();
    const ratio = ((event.clientX - box.left) / box.width) * W;
    const m = Math.round(((ratio - PAD.left) / (W - PAD.left - PAD.right)) * months);
    setHover(Math.min(months, Math.max(0, m)));
  }

  const ticks = Array.from({ length: years + 1 }, (_, i) => i).filter((i) => years <= 6 || i % 2 === 0);

  return (
    <section id="investimentos" aria-labelledby="invest-titulo" className="container-page py-24 lg:py-36">
      <div id="invest-titulo">
        <SectionHeading
          eyebrow="Investimentos"
          title={
            <>
              Dinheiro parado <Highlight>perde a corrida.</Highlight>
            </>
          }
          lead="Mexa nos valores e veja a diferença que o tempo faz. Do primeiro Porquinho à carteira completa, tudo na mesma tela."
        />
      </div>

      <div className="reveal mt-14 grid gap-4 lg:grid-cols-[22rem_1fr]">
        <div className="flex flex-col gap-7 rounded-card border border-border bg-surface p-7">
          <Slider label="Para começar" value={initial} display={brl(initial, 0)} onChange={setInitial} min={0} max={50000} step={500} />
          <Slider label="Todo mês" value={monthly} display={brl(monthly, 0)} onChange={setMonthly} min={0} max={3000} step={50} />
          <Slider
            label="Por quanto tempo"
            value={years}
            display={`${years} ${years === 1 ? "ano" : "anos"}`}
            onChange={(n) => {
              setYears(n);
              setHover(null);
            }}
            min={1}
            max={10}
            step={1}
          />

          <div className="mt-auto rounded-2xl bg-brand-soft p-5" aria-live="polite">
            <p className="text-sm text-muted">Em {years} {years === 1 ? "ano" : "anos"} no CDB você teria</p>
            <p className="mt-1 font-display text-4xl font-medium tracking-[-0.04em] tabular-nums">{brl(final, 0)}</p>
            <p className="mt-2 text-sm text-muted">
              <span className="font-semibold text-positive">{brl(final - invested, 0)}</span> de rendimento sobre{" "}
              {brl(invested, 0)} investidos.
            </p>
          </div>
        </div>

        <figure className="flex flex-col rounded-card border border-border bg-surface p-5 sm:p-7">
          <figcaption className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
            <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
              {data.map((s) => (
                <li key={s.key} className="flex items-center gap-2">
                  <span aria-hidden className="h-0.5 w-4 rounded-full" style={{ background: s.color }} />
                  <span className="text-muted">{s.label}</span>
                  <span className="font-semibold tabular-nums">{brl(s.values[at], 0)}</span>
                </li>
              ))}
            </ul>
            <p className="text-sm text-muted tabular-nums">
              {at === 0 ? "Hoje" : at % 12 === 0 ? `${at / 12} ${at === 12 ? "ano" : "anos"}` : `${at} meses`}
            </p>
          </figcaption>

          <svg
            viewBox={`0 0 ${W} ${H}`}
            role="img"
            aria-label={`Gráfico de linhas: em ${years} anos, ${data.map((s) => `${s.label} chega a ${brl(s.values[months], 0)}`).join("; ")}.`}
            className="mt-5 w-full flex-1 touch-pan-y"
            onPointerMove={onMove}
            onPointerLeave={() => setHover(null)}
          >
            <defs>
              <linearGradient id="invest-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="var(--chart-1)" stopOpacity="0.18" />
                <stop offset="1" stopColor="var(--chart-1)" stopOpacity="0" />
              </linearGradient>
            </defs>

            {[0.25, 0.5, 0.75, 1].map((t) => {
              const v = min + (max - min) * t * 0.94;
              return (
                <g key={t}>
                  <line x1={PAD.left} x2={W - PAD.right} y1={y(v)} y2={y(v)} stroke="var(--border)" strokeDasharray="2 5" />
                  <text x={PAD.left} y={y(v) - 6} fontSize="11" fill="var(--text-muted)">
                    {brlCompact(v)}
                  </text>
                </g>
              );
            })}

            {ticks.map((i) => (
              <text
                key={i}
                x={x(i * 12)}
                y={H - 8}
                fontSize="11"
                fill="var(--text-muted)"
                textAnchor={i === 0 ? "start" : i === years ? "end" : "middle"}
              >
                {i === 0 ? "Hoje" : `${i}a`}
              </text>
            ))}

            <path d={`${line(data[0].values)}L${x(months)} ${H - PAD.bottom}L${x(0)} ${H - PAD.bottom}Z`} fill="url(#invest-fill)" />
            {[...data].reverse().map((s) => (
              <path key={s.key} d={line(s.values)} fill="none" stroke={s.color} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
            ))}

            <line x1={x(at)} x2={x(at)} y1={PAD.top} y2={H - PAD.bottom} stroke="var(--text-muted)" strokeOpacity={hover === null ? 0 : 0.5} />
            {data.map((s) => (
              <circle key={s.key} cx={x(at)} cy={y(s.values[at])} r="5" fill={s.color} stroke="var(--surface)" strokeWidth="2" />
            ))}
          </svg>

          <table className="sr-only">
            <caption>Projeção ano a ano</caption>
            <thead>
              <tr>
                <th scope="col">Ano</th>
                {data.map((s) => (
                  <th key={s.key} scope="col">
                    {s.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: years }, (_, i) => i + 1).map((yr) => (
                <tr key={yr}>
                  <th scope="row">{yr}</th>
                  {data.map((s) => (
                    <td key={s.key}>{brl(s.values[yr * 12], 0)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </figure>
      </div>
      <p className="mt-4 text-xs text-muted">
        Simulação ilustrativa com taxas fictícias de 10% e 6% ao ano, sem impostos. Não é recomendação de investimento.
      </p>
    </section>
  );
}
