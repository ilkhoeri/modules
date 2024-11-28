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
  highlight: string;
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
      highlight,
      className,
      classNames,
      style,
      styles,
      ...props
    },
    ref
  ) {
    const P = el as React.ElementType;

    const lowerTitle = text.toLowerCase();
    const lowerQuery = highlight.toLowerCase();
    const startIndex = lowerTitle.indexOf(lowerQuery);
    const endIndex = startIndex + lowerQuery.length;
    const before = text.slice(0, startIndex);
    const match = text.slice(startIndex, endIndex);
    const after = text.slice(endIndex);

    return (
      <P
        {...{
          ref,
          className: cn(className, classNames?.text),
          style: { ...style, ...styles?.text },
          ...props
        }}>
        {before}
        <mark
          {...{
            className: classNames?.text,
            style: styles?.highlight
          }}>
          {match}
        </mark>
        {after}
      </P>
    );
  }
);
HighlightText.displayName = "HighlightText";
