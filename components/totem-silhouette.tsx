type TotemVariant = "hero" | "one" | "pro" | "premium" | "flex" | "onic";

const titles: Record<TotemVariant, string> = {
  hero: "Representação visual de um totem ACTUS",
  one: "Silhueta do ACTUS ONE, totem de parede",
  pro: "Silhueta do ACTUS PRO, totem com pedestal",
  premium: "Silhueta do ACTUS PREMIUM, gabinete completo",
  flex: "Silhueta do ACTUS FLEX, totem de balcão",
  onic: "Silhueta do ACTUS ONIC, totem vertical estreito",
};

export function TotemSilhouette({ variant }: { variant: TotemVariant }) {
  return (
    <svg
      viewBox="0 0 160 220"
      className="h-[70%] max-h-72 w-auto text-accent/80"
      role="img"
      aria-label={titles[variant]}
    >
      {variant === "one" ? <OnePath /> : null}
      {variant === "pro" || variant === "hero" ? <ProPath /> : null}
      {variant === "premium" ? <PremiumPath /> : null}
      {variant === "flex" ? <FlexPath /> : null}
      {variant === "onic" ? <OnicPath /> : null}
    </svg>
  );
}

function Screen({ x, y, w, h }: { x: number; y: number; w: number; h: number }) {
  return (
    <>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx="4"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <rect
        x={x + 8}
        y={y + 8}
        width={w - 16}
        height={h - 16}
        rx="2"
        fill="currentColor"
        opacity="0.16"
      />
    </>
  );
}

function OnePath() {
  return (
    <g>
      <rect
        x="38"
        y="42"
        width="84"
        height="118"
        rx="3"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.45"
      />
      <Screen x={48} y={54} w={64} h={88} />
    </g>
  );
}

function ProPath() {
  return (
    <g>
      <Screen x={48} y={18} w={64} h={88} />
      <rect x="77" y="106" width="6" height="78" fill="currentColor" opacity="0.7" />
      <ellipse
        cx="80"
        cy="192"
        rx="28"
        ry="8"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
    </g>
  );
}

function PremiumPath() {
  return (
    <g>
      <rect
        x="46"
        y="16"
        width="68"
        height="188"
        rx="4"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <Screen x={54} y={28} w={52} h={74} />
      <rect
        x="58"
        y="118"
        width="44"
        height="70"
        fill="currentColor"
        opacity="0.12"
      />
    </g>
  );
}

function FlexPath() {
  return (
    <g>
      <Screen x={40} y={58} w={80} h={72} />
      <rect x="52" y="130" width="56" height="10" fill="currentColor" opacity="0.7" />
      <line
        x1="24"
        y1="152"
        x2="136"
        y2="152"
        stroke="currentColor"
        strokeWidth="2"
        opacity="0.4"
      />
    </g>
  );
}

function OnicPath() {
  return (
    <g>
      <rect
        x="64"
        y="12"
        width="32"
        height="188"
        rx="4"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <rect
        x="70"
        y="22"
        width="20"
        height="52"
        rx="2"
        fill="currentColor"
        opacity="0.2"
      />
    </g>
  );
}
