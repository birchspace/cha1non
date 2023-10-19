import { ComponentProps } from "react";
import { tv, VariantProps } from "tailwind-variants";

const typography = tv({
  variants: {
    variant: {
      default: "text-foreground font-normal",
      primary: "text-primary font-medium",
      muted: "text-neutral-400 font-medium",
    },
    size: {
      default: "text-md",
      sm: "text-sm",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

type TypographyProps = ComponentProps<"p"> & VariantProps<typeof typography>;

export function Typography({
  variant,
  size,
  className,
  ...props
}: TypographyProps) {
  return <p className={typography({ variant, size, className })} {...props} />;
}
