import Link from "next/link";
import type { ReactNode } from "react";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className = "",
}: ButtonLinkProps) {
  const base =
    "btn-motion inline-flex min-h-12 items-center justify-center rounded-sm px-6 text-sm font-semibold tracking-wide focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent";

  const styles =
    variant === "primary"
      ? "btn-motion-primary bg-accent text-graphite hover:bg-accent-hover"
      : "border border-line bg-transparent text-foreground hover:border-accent hover:text-accent";

  return (
    <Link href={href} className={`${base} ${styles} ${className}`}>
      {children}
    </Link>
  );
}
