import {
  ArrowDownLeft,
  ArrowLeftRight,
  Barcode,
  ChartNoAxesColumn,
  CreditCard,
  Eye,
  House,
  QrCode,
  ShoppingBag,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { HomeBar, StatusBar } from "@/components/mockups/phone";

const actions = [
  { icon: QrCode, label: "Pix" },
  { icon: Barcode, label: "Pagar" },
  { icon: ArrowLeftRight, label: "Transferir" },
  { icon: CreditCard, label: "Cartões" },
];

const activity = [
  { icon: ArrowDownLeft, title: "Pix recebido", meta: "Lucas Andrade", value: "+ R$ 480,00", positive: true },
  { icon: ShoppingBag, title: "Mercado Central", meta: "Crédito · cashback R$ 3,12", value: "R$ 208,40", positive: false },
];

const tabs = [
  { icon: House, label: "Início", active: true },
  { icon: ChartNoAxesColumn, label: "Investir", active: false },
  { icon: Sparkles, label: "Seven", active: false },
  { icon: ShoppingBag, label: "Shop", active: false },
];

/** Tela inicial fictícia do app. Nomes e valores são ilustrativos. */
export function AppHome() {
  return (
    <div className="relative flex h-full flex-col bg-bg text-[0.6875rem] leading-tight text-text">
      <StatusBar />
      <div className="flex flex-1 flex-col px-4 pb-6 pt-1">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex size-7 items-center justify-center rounded-full bg-brand text-[0.625rem] font-bold text-on-brand">
            MA
          </span>
          <span className="font-semibold">Olá, Marina</span>
        </div>
        <Eye className="size-3.5 text-muted" />
      </div>

      <div className="mt-4">
        <p className="text-muted">Saldo em conta</p>
        <p className="mt-0.5 font-display text-[1.625rem] font-semibold tracking-[-0.04em] tabular-nums">
          R$ 12.480<span className="text-muted">,90</span>
        </p>
      </div>

      <div className="mt-3.5 grid grid-cols-4 gap-1.5">
        {actions.map(({ icon: Icon, label }) => (
          <div key={label} className="flex flex-col items-center gap-1.5">
            <span className="flex aspect-square w-full items-center justify-center rounded-2xl bg-surface-2">
              <Icon className="size-4" />
            </span>
            <span className="text-[0.625rem] text-muted">{label}</span>
          </div>
        ))}
      </div>

      <div className="mt-3.5 rounded-2xl bg-[#1a1614] p-3 text-[#f6f1ea] dark:bg-surface-2">
        <div className="flex items-center justify-between">
          <span className="text-[#a39a90]">Fatura atual</span>
          <span className="rounded-full bg-brand px-1.5 py-0.5 text-[0.5625rem] font-bold text-on-brand">vence 12/11</span>
        </div>
        <p className="mt-1 font-display text-lg font-semibold tracking-[-0.03em] tabular-nums">R$ 1.284,30</p>
        <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/15">
          <div className="h-full w-[38%] rounded-full bg-brand" />
        </div>
        <p className="mt-1.5 text-[0.5625rem] text-[#a39a90]">Limite disponível R$ 6.715,70</p>
      </div>

      <div className="mt-2 flex items-center gap-2.5 rounded-2xl border border-border bg-surface p-3">
        <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-positive/12 text-positive">
          <TrendingUp className="size-3.5" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-muted">Investimentos</p>
          <p className="font-semibold tabular-nums">R$ 34.902,18</p>
        </div>
        <span className="font-semibold text-positive tabular-nums">+ R$ 286,12</span>
      </div>

      <ul className="mt-3 space-y-2.5">
        {activity.map(({ icon: Icon, title, meta, value, positive }) => (
          <li key={title} className="flex items-center gap-2.5">
            <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-surface-2">
              <Icon className="size-3.5" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate font-semibold">{title}</p>
              <p className="truncate text-[0.625rem] text-muted">{meta}</p>
            </div>
            <span className={positive ? "font-semibold text-positive tabular-nums" : "font-semibold tabular-nums"}>
              {value}
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-auto grid grid-cols-4 rounded-full border border-border bg-surface p-1">
        {tabs.map(({ icon: Icon, label, active }) => (
          <div
            key={label}
            className={
              active
                ? "flex flex-col items-center gap-0.5 rounded-full bg-brand-soft py-1.5 text-brand-ink"
                : "flex flex-col items-center gap-0.5 py-1.5 text-muted"
            }
          >
            <Icon className="size-3.5" />
            <span className="text-[0.5625rem] font-medium">{label}</span>
          </div>
        ))}
      </div>
      </div>
      <HomeBar />
    </div>
  );
}
