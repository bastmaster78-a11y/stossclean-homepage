import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface BaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  className?: string;
  children: ReactNode;
}

interface ButtonAsButton
  extends BaseProps,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  href?: undefined;
}

interface ButtonAsLink extends BaseProps {
  href: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
}

type ButtonProps = ButtonAsButton | ButtonAsLink;

const VARIANT_STYLES: Record<ButtonVariant, string> = {
  primary:
    "bg-brand-600 text-white shadow-lg shadow-brand-600/25 hover:bg-brand-700 hover:shadow-brand-700/30",
  secondary: "bg-white text-brand-700 shadow-md hover:bg-brand-50",
  outline:
    "border-2 border-white/70 text-white hover:bg-white/10 backdrop-blur-sm",
  ghost: "text-brand-700 hover:bg-brand-50",
};

const SIZE_STYLES: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm gap-1.5",
  md: "px-6 py-3 text-base gap-2",
  lg: "px-8 py-4 text-base md:text-lg gap-2.5",
};

export default function Button({
  variant = "primary",
  size = "md",
  icon,
  iconPosition = "left",
  className,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center rounded-full font-semibold transition-all duration-300 active:scale-95 cursor-pointer",
    VARIANT_STYLES[variant],
    SIZE_STYLES[size],
    className,
  );

  const content = (
    <>
      {icon && iconPosition === "left" && <span className="shrink-0">{icon}</span>}
      {children}
      {icon && iconPosition === "right" && <span className="shrink-0">{icon}</span>}
    </>
  );

  if ("href" in props && props.href) {
    const { href, target, rel, onClick } = props as ButtonAsLink;
    return (
      <Link href={href} target={target} rel={rel} onClick={onClick} className={classes}>
        {content}
      </Link>
    );
  }

  const buttonProps = props as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button className={classes} {...buttonProps}>
      {content}
    </button>
  );
}
