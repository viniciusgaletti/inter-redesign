import { useId, type ComponentProps } from "react";
import { cn } from "@/lib/cn";

export function Input({
  label,
  hint,
  className,
  ...props
}: { label: string; hint?: string } & ComponentProps<"input">) {
  const id = useId();

  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 block text-sm font-semibold">
        {label}
      </label>
      <input
        id={id}
        aria-describedby={hint ? `${id}-hint` : undefined}
        className={cn(
          "h-12 w-full rounded-control border border-border bg-surface px-4 text-base tabular-nums transition-colors duration-200 placeholder:text-muted hover:border-text/40 focus-visible:border-brand-ink focus-visible:outline-offset-0",
        )}
        {...props}
      />
      {hint && (
        <p id={`${id}-hint`} className="mt-2 text-sm text-muted">
          {hint}
        </p>
      )}
    </div>
  );
}
