import * as React from "react";
import { cn, cvx, VariantsType } from "str-merge";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantsType<typeof inputVariants> {
  unstyled?: boolean;
  style?: React.CSSProperties & { [key: string]: any };
}
const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    className,
    value,
    disabled,
    onChange,
    type = "text",
    spellCheck = false,
    autoComplete = "off",
    unstyled,
    variant,
    ...props
  },
  ref
) {
  const [numb, setNumb] = React.useState(value || "");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (type === "number") {
      const numeric = e.target.value.replace(/[^0-9]/g, "");
      if (/^\d*$/.test(numeric)) setNumb(numeric);
    }
    if (type === "date") {
      formatDate(new Date(e.target.value));
    }
    onChange?.(e);
  };

  return (
    <input
      {...{
        ref,
        disabled,
        spellCheck,
        autoComplete,
        onChange: handleChange,
        "aria-invalid": "false",
        "aria-disabled": disabled ? "true" : undefined,
        type: type === "number" ? "text" : type,
        value: type === "number" ? numb : value,
        className: cn(
          // @ts-ignore
          !unstyled && inputVariants({ variant: variant || type || "default" }),
          className
        ),
        ...props
      }}
    />
  );
});
Input.displayName = "Input";

const formatDate = (date: Date) => {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
};

const inputVariants = cvx({
  assign:
    "stylelayer-required relative flex h-9 w-full max-w-full cursor-pointer appearance-none rounded-lg border bg-background px-3 py-2 text-sm ring-offset-constructive/35 transition-colors [-moz-appearance:none] [-webkit-appearance:none] placeholder:text-muted-foreground focus-visible:border-constructive focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-transparent focus-visible:ring-offset-2 focus-visible:placeholder:text-transparent disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-[disabled='true']:cursor-not-allowed aria-[disabled='true']:opacity-50",
  variants: {
    variant: {
      default: "",
      button: "min-w-9 justify-center active:scale-95 transition-transform",
      checkbox:
        "inline-block h-[--required-sz] w-[--required-sz] max-w-[--required-sz] rounded-md p-0 align-middle outline-0 transition-colors duration-200 delay-200 checked:bg-color checked:delay-0 [--required-sz:22px]",
      color: "rounded-xl bg-transparent bg-none py-0 px-0 min-w-9",
      date: "min-w-52 text-muted-foreground [&:where(:is(:not([value=''])))]:text-color",
      "datetime-local":
        "min-w-52 text-muted-foreground [&:where(:is(:not([value=''])))]:text-color",
      email:
        "cursor-text justify-start [--bg-required:hsl(var(--background))_var(--bg-atmail)] focus-visible:[--bg-required:hsl(var(--background))]",
      file: "text-muted-foreground [&:where(:is(:not([value=''])))]:text-color [&:where(:is(:not([value=''])))]:border-constructive [&:where(:is(:not([value=''])))]:bg-constructive/30 [&:where(:is(:not([value=''])))]:ring-constructive break-words h-52 w-80 items-center justify-center rounded-2xl border-2 file:border-constructive outline-none ring-1 ring-transparent ring-offset-2 ring-offset-background pt-[45%] pb-0 px-[15%] border-dashed file:border-0 file:bg-transparent file:text-sm file:font-medium",
      hidden: "sr-only !hidden",
      image:
        "bg-center text-transparent align-middle h-52 w-80 items-center justify-center rounded-2xl border py-0 px-0 outline-0 outline-none [&>*]:border-0 [&>*]:outline-0 [&>*]:outline-none",
      month:
        "min-w-52 text-muted-foreground [&:where(:is(:not([value=''])))]:text-color",
      number: "cursor-text justify-start",
      password: "cursor-text justify-start",
      radio: "",
      range:
        "h-max items-center overflow-x-hidden rounded-full border-0 bg-transparent p-0 text-constructive [--thumb-border:calc(var(--thumb-size)/3.5)] [--thumb-inner-color:--track-color-active] [--thumb-outer-color:hsl(var(--pure-white))] [--thumb-size:1rem] [--track-color-active:hsl(var(--constructive))] [--track-height:calc(var(--thumb-size)/2)]",
      reset: "min-w-9 justify-center active:scale-95 transition-transform",
      search: "cursor-text justify-start",
      submit: "min-w-9 justify-center active:scale-95 transition-transform",
      tel: "cursor-text justify-start",
      text: "cursor-text justify-start",
      time: "min-w-52 text-muted-foreground [&:where(:is(:not([value=''])))]:text-color",
      url: "cursor-text justify-start",
      week: "min-w-52 text-muted-foreground [&:where(:is(:not([value=''])))]:text-color",
      pin: "block h-10 w-10 max-w-full rounded-md border bg-transparent p-0 text-center text-[20px] font-bold leading-[20px] shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[24px] placeholder:text-muted-foreground/80 focus:placeholder:opacity-0 focus-visible:border-transparent focus-visible:outline-0 focus-visible:ring-2 focus-visible:ring-[#2f81f7] focus-visible:ring-offset-0"
    }
  }
});

export { Input, inputVariants };
