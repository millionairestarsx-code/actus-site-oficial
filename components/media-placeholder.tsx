import type { ReactNode } from "react";

type MediaPlaceholderProps = {
  label: string;
  children?: ReactNode;
  className?: string;
};

export function MediaPlaceholder({
  label,
  children,
  className = "",
}: MediaPlaceholderProps) {
  return (
    <figure
      className={`relative overflow-hidden rounded-sm border border-line bg-steel ${className}`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(242,194,0,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(242,194,0,0.06) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />
      <span
        aria-hidden="true"
        className="absolute top-3 left-3 h-5 w-5 border-t border-l border-accent"
      />
      <span
        aria-hidden="true"
        className="absolute top-3 right-3 h-5 w-5 border-t border-r border-accent"
      />
      <span
        aria-hidden="true"
        className="absolute bottom-3 left-3 h-5 w-5 border-b border-l border-accent"
      />
      <span
        aria-hidden="true"
        className="absolute right-3 bottom-3 h-5 w-5 border-r border-b border-accent"
      />
      <div className="relative flex h-full min-h-[280px] items-center justify-center p-8">
        {children}
      </div>
      <figcaption className="sr-only">{label}</figcaption>
      <p className="absolute inset-x-0 bottom-5 text-center text-[0.68rem] tracking-[0.2em] text-muted uppercase">
        {label}
      </p>
    </figure>
  );
}
