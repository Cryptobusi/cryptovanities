import { cn } from "@/lib/utils";

type MarkProps = {
  className?: string;
  decorative?: boolean;
};

export function HashgraphMark({ className, decorative = true }: MarkProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={cn("text-fg", className)}
      fill="none"
      aria-hidden={decorative}
      role={decorative ? "presentation" : "img"}
    >
      {decorative ? null : <title>Egonomic Anonymous</title>}
      <circle cx="16" cy="16" r="2.4" fill="currentColor" />
      <circle cx="16" cy="5.5" r="1.6" fill="currentColor" opacity="0.9" />
      <circle cx="25.2" cy="11" r="1.6" fill="currentColor" opacity="0.85" />
      <circle cx="25.2" cy="21" r="1.6" fill="currentColor" opacity="0.85" />
      <circle cx="16" cy="26.5" r="1.6" fill="currentColor" opacity="0.9" />
      <circle cx="6.8" cy="21" r="1.6" fill="currentColor" opacity="0.85" />
      <circle cx="6.8" cy="11" r="1.6" fill="currentColor" opacity="0.85" />
      <path
        d="M16 7.2v6.2M22.8 12.2 18.2 14.6M22.8 19.8 18.2 17.4M16 24.8v-6.2M9.2 19.8l4.6-2.4M9.2 12.2l4.6 2.4"
        stroke="currentColor"
        strokeWidth="1.15"
        strokeLinecap="round"
        opacity="0.7"
      />
    </svg>
  );
}
