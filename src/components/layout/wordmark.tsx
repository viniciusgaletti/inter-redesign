import { InterLogo } from "@/components/brand/inter-logo";
import { cn } from "@/lib/cn";

export function Wordmark({ className }: { className?: string }) {
  return (
    <a href="#topo" aria-label="Inter, início" className={cn("inline-flex shrink-0 text-brand", className)}>
      <InterLogo title="" className="w-20 sm:w-[5.75rem]" />
    </a>
  );
}
