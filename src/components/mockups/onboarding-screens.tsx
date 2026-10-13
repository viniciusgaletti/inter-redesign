import type { CSSProperties, ReactNode } from "react";
import {
  ArrowLeftRight,
  Barcode,
  Check,
  ChevronLeft,
  ChevronUp,
  CreditCard,
  QrCode,
  X,
} from "lucide-react";
import type { OnboardingKey } from "@/content/onboarding";
import { HomeBar, StatusBar } from "@/components/mockups/phone";
import { InterLogo } from "@/components/brand/inter-logo";
import { cn } from "@/lib/cn";

/*
 * Cada tela anima a partir de --q, o progresso interno (0 a 1) que o scroll controla.
 * Os helpers abaixo traduzem "aparece em 0,4" ou "digita entre 0,1 e 0,3" para CSS.
 * Nomes, documentos e valores são fictícios.
 */
const ramp = (from: number, to: number) => `clamp(0, calc((var(--q) - ${from}) / ${to - from}), 1)`;

const appear = (at: number): CSSProperties => ({ opacity: ramp(at, at + 0.08) });
const vanish = (at: number): CSSProperties => ({ opacity: `calc(1 - ${ramp(at, at + 0.08)})` });
const during = (from: number, to: number): CSSProperties => ({
  opacity: `min(${ramp(from, from + 0.07)}, calc(1 - ${ramp(to, to + 0.07)}))`,
});
const rise = (at: number, distance = 16): CSSProperties => ({
  opacity: ramp(at, at + 0.1),
  transform: `translateY(calc((1 - ${ramp(at, at + 0.14)}) * ${distance}px))`,
});
/** Revela o texto da esquerda para a direita, como se estivesse sendo digitado. */
const typed = (from: number, to: number): CSSProperties => ({
  clipPath: `inset(0 calc((1 - ${ramp(from, to)}) * 100%) 0 0)`,
});

const PAPER = "#fbf8f4";

function Field({ label, children, style }: { label: string; children: ReactNode; style?: CSSProperties }) {
  return (
    <div className="border-b border-border pb-[9px]">
      <p className="text-[11px] text-muted">{label}</p>
      <p className="mt-[3px] h-[20px] whitespace-nowrap text-[15px] font-medium tabular-nums" style={style}>
        {children}
      </p>
    </div>
  );
}

function Tick({ at, className }: { at: number; className?: string }) {
  return (
    <span className={cn("relative flex size-[18px] shrink-0 items-center justify-center rounded-full border border-border", className)}>
      <span className="absolute inset-[-1px] flex items-center justify-center rounded-full bg-brand text-on-brand" style={appear(at)}>
        <Check className="size-[11px]" strokeWidth={3.5} />
      </span>
    </span>
  );
}

function FormHeader({ from, to }: { from: number; to: number }) {
  return (
    <div className="flex items-center gap-[12px] px-[18px]">
      <ChevronLeft className="size-[20px]" />
      <span className="h-[4px] flex-1 overflow-hidden rounded-full bg-surface-2">
        <span
          className="block h-full origin-left rounded-full bg-brand"
          style={{ transform: `scaleX(calc(${from} + ${ramp(0, 1)} * ${to - from}))` }}
        />
      </span>
    </div>
  );
}

function PrimaryButton({ children, at }: { children: ReactNode; at: number }) {
  return (
    <div className="relative flex h-[46px] items-center justify-center rounded-full bg-surface-2 text-[14px] font-semibold text-muted">
      {children}
      <span className="absolute inset-0 flex items-center justify-center rounded-full bg-brand text-on-brand" style={appear(at)}>
        {children}
      </span>
    </div>
  );
}

/* 1 — Boas-vindas */
function Welcome() {
  return (
    <div className="flex h-full flex-col bg-gradient-to-b from-[#ff8f24] to-[#ef6600]" style={{ color: PAPER }}>
      <StatusBar />
      <div className="flex flex-1 flex-col items-center justify-center pb-[30px]">
        <InterLogo title="" className="w-[168px]" />
        <p className="mt-[14px] text-[13px] font-medium opacity-75" style={rise(0.08, 8)}>
          Sua vida financeira inteira, num app só.
        </p>
      </div>
      <div className="px-[18px] pb-[34px]" style={rise(0.22)}>
        <div
          className="relative flex h-[50px] items-center justify-center overflow-hidden rounded-full text-[14px] font-semibold"
          style={{ background: PAPER, color: "#b84e00" }}
        >
          Abrir uma conta gratuita
          {/* toque no botão */}
          <span
            className="absolute size-[46px] rounded-full bg-[#ff7a00]/25"
            style={{ ...during(0.66, 0.9), transform: `scale(calc(0.4 + ${ramp(0.66, 0.95)} * 2.4))` }}
          />
        </div>
        <p className="mt-[14px] text-center text-[13px] font-semibold">Já sou cliente</p>
      </div>
      <HomeBar />
    </div>
  );
}

/* 2 — Dados e códigos de segurança */
function Details() {
  const code = ["4", "8", "2", "0", "1", "7"];
  return (
    <div className="relative flex h-full flex-col bg-bg text-text">
      <StatusBar />
      <FormHeader from={0.08} to={0.36} />
      <div className="px-[18px] pt-[22px]">
        <h4 className="font-display text-[23px] font-medium leading-[1.1] tracking-[-0.03em]">Para começar, quem é você?</h4>
        <div className="mt-[22px] space-y-[14px]">
          <Field label="Nome completo" style={typed(0.04, 0.24)}>
            Marina Alves Costa
          </Field>
          <Field label="Data de nascimento" style={typed(0.26, 0.36)}>
            14/03/1996
          </Field>
          <Field label="Celular" style={typed(0.38, 0.5)}>
            (31) 9 8421-0073
          </Field>
        </div>
        <div className="mt-[16px] flex items-center gap-[9px] text-[12px] text-muted">
          <Tick at={0.52} className="rounded-[5px] [&>span]:rounded-[5px]" />
          Li e concordo com os Termos e Condições
        </div>
      </div>

      {/* folha do código enviado por SMS */}
      <div className="absolute inset-0 bg-black/35" style={appear(0.6)} />
      <div
        className="absolute inset-x-0 bottom-0 rounded-t-[26px] bg-surface px-[18px] pb-[34px] pt-[10px] shadow-[0_-12px_40px_rgb(0_0_0/0.18)]"
        style={{ transform: `translateY(calc((1 - ${ramp(0.6, 0.74)}) * 100%))` }}
      >
        <span className="mx-auto block h-[4px] w-[36px] rounded-full bg-border" />
        <p className="mt-[16px] font-display text-[19px] font-medium tracking-[-0.03em]">Código de segurança</p>
        <p className="mt-[4px] text-[12px] leading-snug text-muted">Enviamos por SMS para (31) 9 ••••-0073</p>
        <div className="mt-[16px] grid grid-cols-6 gap-[6px]">
          {code.map((digit, i) => (
            <span
              key={i}
              className="flex h-[44px] items-center justify-center rounded-[10px] border border-border bg-bg text-[19px] font-semibold tabular-nums"
            >
              <span style={appear(0.76 + i * 0.03)}>{digit}</span>
            </span>
          ))}
        </div>
        <div className="mt-[16px]">
          <PrimaryButton at={0.94}>Confirmar</PrimaryButton>
        </div>
      </div>
      <HomeBar />
    </div>
  );
}

/* 3 — Foto do documento, frente e verso */
function Document() {
  const flip = ramp(0.44, 0.6);
  return (
    <div className="relative flex h-full flex-col bg-[#0b0a09] text-[#f6f1ea]">
      <StatusBar />
      <div className="flex items-center justify-between px-[18px]">
        <X className="size-[20px]" />
        <div className="flex rounded-full bg-white/10 p-[3px] text-[11px] font-semibold">
          <span className="px-[11px] py-[5px] text-white/55">RG</span>
          <span className="rounded-full bg-white px-[11px] py-[5px] text-[#0b0a09]">CNH</span>
          <span className="px-[11px] py-[5px] text-white/55">RNE</span>
        </div>
        <span className="size-[20px]" />
      </div>

      <div className="relative mt-[26px] h-[26px] text-center font-display text-[20px] font-medium tracking-[-0.03em]">
        <p className="absolute inset-0" style={vanish(0.46)}>
          Frente do documento
        </p>
        <p className="absolute inset-0" style={appear(0.54)}>
          Verso do documento
        </p>
      </div>
      <p className="mt-[5px] text-center text-[12px] text-white/55">Encaixe o documento na moldura</p>

      {/* visor */}
      <div className="relative mx-[18px] mt-[24px] h-[178px] rounded-[18px] bg-white/[0.04] [perspective:700px]">
        {["left-0 top-0 border-l-2 border-t-2 rounded-tl-[18px]", "right-0 top-0 border-r-2 border-t-2 rounded-tr-[18px]", "bottom-0 left-0 border-b-2 border-l-2 rounded-bl-[18px]", "bottom-0 right-0 border-b-2 border-r-2 rounded-br-[18px]"].map((corner) => (
          <span key={corner} className={cn("absolute size-[26px] border-brand", corner)} />
        ))}

        <div
          className="absolute inset-[16px] [transform-style:preserve-3d]"
          style={{ transform: `rotateY(calc(${flip} * 180deg))` }}
        >
          {/* frente */}
          <div className="absolute inset-0 flex gap-[12px] rounded-[10px] bg-gradient-to-br from-[#dfe6dc] to-[#b9c7bb] p-[12px] [backface-visibility:hidden]">
            <span className="h-[62px] w-[50px] shrink-0 rounded-[5px] bg-[#8a9a90]" />
            <div className="flex-1 space-y-[7px] pt-[2px]">
              <span className="block h-[6px] w-[88%] rounded-full bg-[#4f5f56]/70" />
              <span className="block h-[5px] w-[62%] rounded-full bg-[#4f5f56]/45" />
              <span className="block h-[5px] w-[74%] rounded-full bg-[#4f5f56]/45" />
              <span className="block h-[5px] w-[46%] rounded-full bg-[#4f5f56]/45" />
            </div>
          </div>
          {/* verso */}
          <div className="absolute inset-0 flex flex-col justify-between rounded-[10px] bg-gradient-to-br from-[#d5ddd3] to-[#b1c0b4] p-[12px] [backface-visibility:hidden] [transform:rotateY(180deg)]">
            <div className="space-y-[7px]">
              <span className="block h-[5px] w-[90%] rounded-full bg-[#4f5f56]/45" />
              <span className="block h-[5px] w-[70%] rounded-full bg-[#4f5f56]/45" />
              <span className="block h-[5px] w-[82%] rounded-full bg-[#4f5f56]/45" />
            </div>
            <span className="block h-[26px] rounded-[3px] opacity-70 [background:repeating-linear-gradient(90deg,#2f3a34_0_2px,transparent_2px_5px,#2f3a34_5px_6px,transparent_6px_9px)]" />
          </div>
        </div>

        <span className="absolute inset-x-[10px] h-[2px] rounded-full bg-brand shadow-[0_0_14px_3px_rgb(255_122_0/0.55)] [animation:scan_1.7s_ease-in-out_infinite_alternate]" />
        {/* clarão do disparo */}
        <span className="absolute inset-0 rounded-[18px] bg-white" style={during(0.36, 0.38)} />
        <span className="absolute inset-0 rounded-[18px] bg-white" style={during(0.86, 0.88)} />
      </div>

      <div className="mt-[20px] flex justify-center gap-[8px] text-[12px] font-semibold">
        {[
          ["Frente", 0.4],
          ["Verso", 0.9],
        ].map(([label, at]) => (
          <span key={label} className="flex items-center gap-[7px] rounded-full bg-white/10 py-[6px] pl-[6px] pr-[12px]">
            <Tick at={at as number} className="border-white/25" />
            {label}
          </span>
        ))}
      </div>

      <div className="mt-auto flex justify-center pb-[40px]">
        <span className="flex size-[62px] items-center justify-center rounded-full border-[3px] border-white/85">
          <span className="size-[48px] rounded-full bg-white" />
        </span>
      </div>
      <HomeBar />
    </div>
  );
}

/* 4 — Prova de vida */
function Liveness() {
  // direita até 1/3, esquerda até 2/3, depois para cima
  const sway = `calc(sin(${ramp(0, 0.66)} * 6.283) * 1px)`;
  const lift = `calc(${ramp(0.68, 0.86)} * -1px)`;
  const head: CSSProperties = { transform: `translate(calc(${sway} * 9), calc(${lift} * 7))` };
  const face: CSSProperties = { transform: `translate(calc(${sway} * 17), calc(${lift} * 13))` };
  const prompts: [string, number, number][] = [
    ["Vire o rosto para a direita", 0, 0.3],
    ["Agora para a esquerda", 0.36, 0.62],
    ["Olhe para cima", 0.68, 0.9],
  ];

  return (
    <div className="relative flex h-full flex-col bg-[#0b0a09] text-[#f6f1ea]">
      <StatusBar />
      <div className="flex items-center justify-between px-[18px]">
        <X className="size-[20px]" />
        <span className="text-[13px] font-semibold">Prova de vida</span>
        <span className="size-[20px]" />
      </div>

      <div className="relative mx-auto mt-[34px] h-[250px] w-[190px]">
        {/* anel de progresso */}
        <span
          className="absolute inset-0 rounded-[50%]"
          style={{
            background: `conic-gradient(var(--brand) calc(${ramp(0.02, 0.9)} * 360deg), rgb(255 255 255 / 0.16) 0)`,
            mask: "radial-gradient(farthest-side, transparent calc(100% - 5px), #000 calc(100% - 4px))",
            WebkitMask: "radial-gradient(farthest-side, transparent calc(100% - 5px), #000 calc(100% - 4px))",
          }}
        />
        <div className="absolute inset-[11px] overflow-hidden rounded-[50%] bg-gradient-to-b from-[#2a2623] to-[#171412]">
          {/* ombros */}
          <span className="absolute -bottom-[34px] left-1/2 h-[104px] w-[176px] -translate-x-1/2 rounded-[50%] bg-[#4a433d]" />
          {/* cabeça */}
          <div className="absolute left-1/2 top-[44px] h-[112px] w-[88px] -translate-x-1/2">
            <div className="h-full w-full rounded-[46%] bg-[#6b6159]" style={head}>
              <div className="relative h-full w-full" style={face}>
                <span className="absolute left-[19px] top-[46px] h-[5px] w-[13px] rounded-full bg-[#1a1614]/70" />
                <span className="absolute right-[19px] top-[46px] h-[5px] w-[13px] rounded-full bg-[#1a1614]/70" />
                <span className="absolute left-1/2 top-[56px] h-[17px] w-[4px] -translate-x-1/2 rounded-full bg-[#1a1614]/30" />
                <span className="absolute left-1/2 top-[84px] h-[4px] w-[24px] -translate-x-1/2 rounded-full bg-[#1a1614]/45" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative mt-[26px] h-[28px] text-center font-display text-[19px] font-medium tracking-[-0.03em]">
        {prompts.map(([text, from, to]) => (
          <p key={text} className="absolute inset-0" style={during(from, to)}>
            {text}
          </p>
        ))}
        <p className="absolute inset-0" style={appear(0.94)}>
          Tudo certo, é você
        </p>
      </div>

      <div className="mt-[20px] flex justify-center gap-[8px]">
        {[0.3, 0.62, 0.9].map((at, i) => (
          <span key={at} className="relative flex size-[34px] items-center justify-center rounded-full bg-white/10">
            {i === 2 ? <ChevronUp className="size-[16px] text-white/50" /> : <ChevronLeft className={cn("size-[16px] text-white/50", i === 0 && "rotate-180")} />}
            <span className="absolute inset-0 flex items-center justify-center rounded-full bg-brand text-on-brand" style={appear(at)}>
              <Check className="size-[15px]" strokeWidth={3.5} />
            </span>
          </span>
        ))}
      </div>
      <p className="mt-auto pb-[34px] text-center text-[11px] text-white/45">Fique em um lugar bem iluminado</p>
      <HomeBar />
    </div>
  );
}

/* 5 — Endereço, profissão e senha */
function Signup() {
  const rules: [string, number][] = [
    ["8 a 20 caracteres", 0.66],
    ["Maiúsculas e minúsculas", 0.74],
    ["Números e símbolos", 0.82],
  ];
  return (
    <div className="relative flex h-full flex-col bg-bg text-text">
      <StatusBar />
      <FormHeader from={0.5} to={0.96} />
      <div className="px-[18px] pt-[22px]">
        <h4 className="font-display text-[23px] font-medium leading-[1.1] tracking-[-0.03em]">Quase lá. Só faltam três coisas.</h4>
        <div className="mt-[20px] space-y-[13px]">
          <div>
            <Field label="CEP" style={typed(0.03, 0.13)}>
              01310-100
            </Field>
            <p className="mt-[6px] text-[11px] text-muted" style={appear(0.15)}>
              Av. Paulista, 1000 · São Paulo, SP
            </p>
          </div>
          <Field label="Profissão" style={typed(0.26, 0.4)}>
            Designer de produto
          </Field>
          <div>
            <Field label="Crie sua senha" style={typed(0.46, 0.8)}>
              <span className="tracking-[0.18em]">••••••••••••</span>
            </Field>
            <div className="mt-[9px] grid grid-cols-4 gap-[4px]">
              {[0.5, 0.6, 0.7, 0.8].map((at) => (
                <span key={at} className="h-[4px] overflow-hidden rounded-full bg-surface-2">
                  <span className="block h-full bg-brand" style={appear(at)} />
                </span>
              ))}
            </div>
          </div>
        </div>
        <ul className="mt-[14px] space-y-[8px] text-[12px] text-muted">
          {rules.map(([rule, at]) => (
            <li key={rule} className="flex items-center gap-[9px]">
              <Tick at={at} />
              {rule}
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-auto px-[18px] pb-[34px]">
        <PrimaryButton at={0.9}>Enviar cadastro</PrimaryButton>
      </div>
      <HomeBar />
    </div>
  );
}

/* 6 — Análise e conta aberta */
function Review() {
  const checks: [string, number][] = [
    ["Dados pessoais", 0.1],
    ["Documento", 0.22],
    ["Prova de vida", 0.34],
  ];
  const actions = [
    { icon: QrCode, label: "Pix" },
    { icon: Barcode, label: "Pagar" },
    { icon: ArrowLeftRight, label: "Transferir" },
    { icon: CreditCard, label: "Cartão" },
  ];
  return (
    <div className="relative h-full bg-bg text-text">
      <StatusBar />

      {/* em análise */}
      <div className="absolute inset-0 flex flex-col items-center px-[22px] pt-[132px]" style={vanish(0.46)}>
        <span className="size-[52px] animate-spin rounded-full border-[4px] border-surface-2 border-t-brand" />
        <p className="mt-[22px] text-center font-display text-[22px] font-medium leading-[1.1] tracking-[-0.03em]">
          Analisando seu cadastro
        </p>
        <p className="mt-[8px] text-[12px] text-muted">Resposta em até 3 dias úteis</p>
        <ul className="mt-[26px] w-full space-y-[8px]">
          {checks.map(([label, at]) => (
            <li key={label} className="flex items-center justify-between rounded-[14px] bg-surface-2 px-[14px] py-[12px] text-[13px] font-medium">
              {label}
              <Tick at={at} />
            </li>
          ))}
        </ul>
      </div>

      {/* conta aberta */}
      <div className="absolute inset-0 flex flex-col px-[18px] pt-[86px]" style={appear(0.54)}>
        <span
          className="mx-auto flex size-[64px] items-center justify-center rounded-full bg-brand text-on-brand"
          style={{ transform: `scale(calc(0.5 + ${ramp(0.54, 0.68)} * 0.5))` }}
        >
          <Check className="size-[30px]" strokeWidth={3} />
        </span>
        <p className="mt-[18px] text-center font-display text-[27px] font-medium tracking-[-0.035em]">Conta aberta!</p>
        <p className="mt-[4px] text-center text-[13px] text-muted">Bem-vinda ao Inter, Marina.</p>

        <div className="mt-[30px] rounded-[20px] bg-[#1a1614] p-[16px] text-[#f6f1ea] dark:bg-surface-2" style={rise(0.7)}>
          <p className="text-[11px] text-[#a39a90]">Saldo disponível</p>
          <p className="mt-[2px] font-display text-[26px] font-semibold tracking-[-0.04em] tabular-nums">R$ 0,00</p>
        </div>

        <div className="mt-[12px] grid grid-cols-4 gap-[8px]" style={rise(0.78)}>
          {actions.map(({ icon: Icon, label }) => (
            <div key={label} className="flex flex-col items-center gap-[6px]">
              <span className="flex aspect-square w-full items-center justify-center rounded-[16px] bg-surface-2">
                <Icon className="size-[18px]" />
              </span>
              <span className="text-[10px] text-muted">{label}</span>
            </div>
          ))}
        </div>

        <div className="mt-[12px] flex items-center gap-[10px] rounded-[16px] border border-border bg-surface p-[12px]" style={rise(0.86)}>
          <span className="flex size-[30px] shrink-0 items-center justify-center rounded-full bg-positive/15 text-positive">
            <Check className="size-[15px]" strokeWidth={3} />
          </span>
          <p className="text-[12px] leading-snug">
            <span className="font-semibold">Sua chave Pix está pronta</span>
            <span className="block text-muted">Já dá para receber.</span>
          </p>
        </div>
      </div>
      <HomeBar />
    </div>
  );
}

const screens: Record<OnboardingKey, () => ReactNode> = {
  app: Welcome,
  dados: Details,
  documento: Document,
  rosto: Liveness,
  cadastro: Signup,
  analise: Review,
};

export function OnboardingScreen({ step }: { step: OnboardingKey }) {
  const Screen = screens[step];
  return <Screen />;
}
