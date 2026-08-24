export function SiteMark({ compact = false }: { compact?: boolean }) {
  return (
    <span className="inline-flex items-center gap-3">
      <span
        aria-hidden="true"
        className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-sm bg-accent text-graphite"
      >
        <span className="absolute inset-x-2 top-2 h-[3px] rounded-full bg-graphite/90" />
        <span className="mt-1 h-4 w-[3px] rounded-full bg-graphite/80" />
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-display text-[1.15rem] font-semibold tracking-[0.22em]">
          ACTUS
        </span>
        {!compact ? (
          <span className="mt-1 hidden text-[0.62rem] tracking-[0.18em] text-muted uppercase sm:block">
            Automação Comercial
          </span>
        ) : null}
      </span>
    </span>
  );
}
