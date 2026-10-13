import clsx, { type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// Os utilitários type-* definem tamanho de fonte; sem isto o merge os trataria como cor de texto.
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [{ type: ["display", "h2", "h3", "lead", "label"] }],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
