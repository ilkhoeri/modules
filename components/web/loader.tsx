import * as React from "react";
import { cnx } from "str-merge";

import classes from "./loader.module.css";

interface LoaderSpinnerProps extends React.ComponentProps<"div"> {
  size?: string | number;
  classNames?: Partial<Record<"root" | "bar", string>>;
  style?: React.CSSProperties & { [key: string]: any };
  color?: React.CSSProperties["color"] | "currentColor" | (string & {});
}

export const LoaderSpinner = React.forwardRef<
  HTMLDivElement,
  LoaderSpinnerProps
>(function LoaderSpinner(
  {
    size = "20px",
    color = "hsl(var(--color))",
    style,
    className,
    classNames,
    ...props
  },
  ref
) {
  return (
    <div
      {...{
        ref,
        className: cnx(classes.spinner, className, classNames?.root),
        style: {
          "--spinner-color-set": String(color),
          "--spinner-size": String(
            typeof size === "number" ? `${size}px` : size
          ),
          ...style
        } as React.CSSProperties,
        "data-loader": "spinner",
        ...props
      }}
    >
      {[...Array(12)].map((_, index) => (
        <div key={index} className={cnx(classes.bar, classNames?.bar)} />
      ))}
    </div>
  );
});
LoaderSpinner.displayName = "LoaderSpinner";
