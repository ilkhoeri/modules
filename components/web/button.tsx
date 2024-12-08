import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn, cvx, type VariantsType } from "str-merge";
import { LoaderSpinner } from "@/modules/components/web";

export const variantsButton = cvx({
  assign:
    "transition-colors rounded-md font-medium text-span text-[14px] leading-tight disabled:pointer-events-none disabled:gap-2",
  variants: {
    variant: {
      default:
        "bg-color text-background border border-background [@media(hover:hover)]:hover:bg-color/90 disabled:opacity-50",
      destructive:
        "bg-destructive text-white [@media(hover:hover)]:hover:bg-destructive-foreground",
      constructive:
        "bg-constructive text-white [@media(hover:hover)]:hover:bg-constructive-foreground",
      conservative:
        "bg-conservative text-white [@media(hover:hover)]:hover:bg-conservative-foreground",
      primitive:
        "bg-primitive-foreground/35 text-color border border-primitive-emphasis [@media(hover:hover)]:hover:bg-accent [@media(hover:hover)]:hover:text-primitive/40",
      outline:
        "border bg-background text-muted-foreground [@media(hover:hover)]:hover:bg-muted [@media(hover:hover)]:hover:text-color",
      ghost: "[@media(hover:hover)]:hover:bg-muted hover:text-muted-foreground",
      link: "text-color underline-offset-4 active:scale-95 [@media(hover:hover)]:hover:text-constructive [@media(hover:hover)]:hover:underline"
    },
    size: {
      default: "h-8 px-4 py-2",
      sm: "h-8 px-3",
      lg: "h-10 px-8",
      icon: "sizer [--sz:--sz-4]"
    }
  },
  defaultVariants: {
    variant: "default"
  }
});

type Variants = VariantsType<typeof variantsButton> & { unstyled?: boolean };
export function buttonStyle(props: Variants = {}, className?: string) {
  const { unstyled, ...rest } = props;
  return { className: cn(!unstyled && variantsButton({ ...rest }), className) };
}

export type MouseEventButtonType = React.MouseEvent<
  HTMLButtonElement,
  MouseEvent
>;

export interface UnstyledButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "style"> {
  asChild?: boolean;
  loading?: boolean;
  style?: React.CSSProperties & { [key: string]: any };
}
export const UnstyledButton = React.forwardRef<
  HTMLButtonElement,
  UnstyledButtonProps
>(function UnstyledButton(
  { asChild = false, type = "button", children, loading, disabled, ...props },
  ref
) {
  const O = asChild ? Slot : "button";
  return (
    <O
      {...{
        ref,
        type,
        disabled: loading || disabled,
        ...props
      }}
    >
      {loading && <LoaderSpinner />}
      {children}
    </O>
  );
});
UnstyledButton.displayName = "UnstyledButton";

export interface ButtonProps
  extends UnstyledButtonProps,
    VariantsType<typeof variantsButton> {
  unstyled?: boolean;
}
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    { unstyled, className, variant = "default", size, ...props },
    ref
  ) {
    return (
      <UnstyledButton
        {...{
          ref,
          className: cn(
            !unstyled && variantsButton({ variant, size }),
            className
          ),
          ...props
        }}
      />
    );
  }
);
Button.displayName = "Button";
