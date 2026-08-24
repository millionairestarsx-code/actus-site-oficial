type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  const alignment = align === "center" ? "mx-auto text-center" : "";

  return (
    <div className={`max-w-2xl ${alignment}`}>
      <p className="mb-4 flex items-center gap-3 text-xs font-medium tracking-[0.22em] text-accent uppercase">
        <span aria-hidden="true" className="h-px w-8 bg-accent" />
        {eyebrow}
      </p>
      <h2 className="font-display text-3xl leading-tight font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}
