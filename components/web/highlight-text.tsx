import * as React from "react";
import { cn } from "str-merge";

interface CSSProperties extends React.CSSProperties {
  [key: string]: any;
}
type StylesNames<T extends string> = {
  classNames?: Partial<Record<T, string>>;
  styles?: Partial<Record<T, CSSProperties>>;
  style?: CSSProperties;
};
type Props = StylesNames<"text" | "highlight"> & {
  text: string;
  highlight?: string;
  el?: React.ElementType;
} & Omit<
    React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLParagraphElement>,
      HTMLParagraphElement
    >,
    "children"
  >;

export const HighlightText = React.forwardRef<HTMLParagraphElement, Props>(
  function HighlightText(
    {
      el = "p",
      text,
      highlight = "",
      className,
      classNames,
      style,
      styles,
      ...props
    },
    ref
  ) {
    const P = el as React.ElementType;

    const getHighlightedText = (text: string, highlight: string) => {
      if (!highlight.trim()) return [text];
      const regex = new RegExp(`(${highlight})`, "gi"); // Case-insensitive regex.
      return text.split(regex);
    };

    const parts = getHighlightedText(text, highlight);

    return (
      <P
        {...{
          ref,
          className: cn(className, classNames?.text),
          style: { ...style, ...styles?.text },
          ...props
        }}>
        {parts.map((part, index) =>
          part.toLowerCase() === highlight.toLowerCase() ? (
            <mark
              key={index}
              {...{
                className: classNames?.highlight,
                style: styles?.highlight
              }}>
              {part}
            </mark>
          ) : (
            part // Part without highlight.
          )
        )}
      </P>
    );
  }
);
HighlightText.displayName = "HighlightText";
