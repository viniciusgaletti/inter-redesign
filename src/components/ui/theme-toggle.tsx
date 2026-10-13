"use client";

import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/cn";

export function ThemeToggle({ className }: { className?: string }) {
  function toggle() {
    const root = document.documentElement;
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {}
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Alternar entre tema claro e escuro"
      className={cn(
        "inline-flex size-10 items-center justify-center rounded-full text-text transition-colors duration-200 hover:bg-surface-2",
        className,
      )}
    >
      <Sun aria-hidden className="hidden size-[1.125rem] dark:block" />
      <Moon aria-hidden className="size-[1.125rem] dark:hidden" />
    </button>
  );
}
