import { cn } from "@/lib/cn";

/*
 * Logotipo do Inter. Símbolo: inter.co/favicon.svg. Letras: SVG do cabeçalho de inter.co.
 * Marca registrada do Banco Inter, usada aqui só para dar fidelidade ao estudo conceitual.
 * Herda a cor do texto (fill="currentColor").
 */
const SYMBOL =
  "M10.6667 113.078H64.6613L64.9488 111.583L11.7017 100.543L12.7367 94.6199L65.9838 106.12L66.4438 104.05L16.1294 82.1994L18.3144 76.1616L68.7439 97.38L69.779 95.8849L25.0997 62.7061L29.6999 55.4608L74.0916 88.6396L75.4142 86.8571L40.4528 42.4653L49.0207 35.5076L83.6945 77.8292L85.1896 76.5067L65.0063 25.1571L77.2543 19.9819L96.2875 70.2964L97.7826 69.8364V14.0592H117.333V117.333H10.6667V113.078Z";

const LETTERS: [string, string][] = [
  // i
  ["matrix(0.2202 0 0 0.2202 66.4591 18.6709)", "M-14.47,56.94H14.47V-56.94H-14.47z"],
  // n
  [
    "matrix(0.2202 0 0 0.2202 84.0813 18.4769)",
    "M13.50,-57.82C-0.39,-57.82 -10.76,-49.80 -15.85,-37.27H-16.82V-56.06H-44.41V57.82H-15.45V-30.42H3.91C12.32,-30.42 15.45,-28.66 15.45,-19.66V57.82H44.41V-25.34C44.41,-48.23 33.46,-57.82 13.50,-57.82z",
  ],
  // t
  [
    "matrix(0.2202 0 0 0.2202 102.8665 15.8169)",
    "M11.15,44.85H34.44V69.90H15.06C-5.28,69.90 -17.80,62.86 -17.80,37.03V-18.93H-31.64C-34.07,-18.93 -35.34,-21.82 -33.69,-23.60L6.32,-69.00C8.03,-70.86 11.15,-69.65 11.15,-67.11V-43.98H34.24V-18.93H11.15z",
  ],
  // e
  [
    "matrix(0.2202 0 0 0.2202 131.3201 15.792)",
    "M-31.18,-45.62C-67.97,-45.62 -91.06,-18.81 -91.06,14.05C-91.06,46.92 -67.19,71.97 -31.97,71.97C-1.83,71.97 20.27,53.58 26.73,29.51H-4.18C-6.33,39.09 -16.90,46.92 -31.57,46.92C-47.94,46.92 -58.58,35.67 -60.13,18.75H26.73V10.14C26.73,-21.75 3.44,-45.62 -31.18,-45.62zM-59.29,-2.18C-54.76,-15.16 -43.75,-21.75 -31.18,-21.75C-16.84,-21.75 -7.59,-13.62 -3.20,-2.18z",
  ],
  // r
  [
    "matrix(0.2202 0 0 0.2202 146.5343 18.4771)",
    "M1.07,-35.90H-0.09V-56.06H-28.86V57.82H1.85V-28.86H28.81V-57.82H25.10C10.84,-57.82 4.59,-51.53 1.07,-35.90z",
  ],
];

export function InterLogo({ className, title = "Inter" }: { className?: string; title?: string }) {
  return (
    <svg
      viewBox="0 0 127 32"
      fill="currentColor"
      className={cn("block h-auto", className)}
      // sem título, o logo é decorativo: quem dá o nome é o elemento em volta (o link do cabeçalho, por exemplo)
      {...(title ? { role: "img", "aria-label": title } : { "aria-hidden": true })}
    >
      {/* símbolo: 128 x 128 reduzido para a altura das letras */}
      <path transform="translate(-3.2 -3.85) scale(0.302)" d={SYMBOL} />
      <g transform="translate(-26.3 0)">
        {LETTERS.map(([transform, d]) => (
          <path key={transform} transform={transform} d={d} />
        ))}
      </g>
    </svg>
  );
}
