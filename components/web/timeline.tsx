"use client";
import * as React from "react";
import { cn } from "str-merge";

enum Align {
  left = "left",
  right = "right"
}

type Colors = React.CSSProperties["color"] | (string & NonNullable<unknown>);
type LineVariant = React.CSSProperties["borderStyle"];
interface SharedProps {
  lineStyle?: {
    clr?: Colors;
    width?: number;
    variant?: LineVariant;
  };
}
interface TimelineListProps
  extends SharedProps,
    React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    > {
  align?: "left" | "right";
  bulletStyle?: {
    size?: number;
    round?: number;
    ring?: Colors;
    variant?: LineVariant;
  };
}

export const TimelineList = React.forwardRef<HTMLDivElement, TimelineListProps>(
  function TimelineList(List, ref) {
    const {
      className,
      style,
      role = "list",
      align = "left",
      lineStyle = {},
      bulletStyle = {},
      ...props
    } = List;
    const {
      width = 2,
      variant = "solid",
      clr = "hsl(var(--muted))"
    } = lineStyle;
    const {
      ring = "var(--tl-line-clr)",
      round = 9999,
      size = 24,
      variant: bulletVarian = "solid"
    } = bulletStyle;
    return (
      <TimelineProvider {...{ align }}>
        <div
          {...{
            ref,
            role,
            "data-align": align,
            className: cn("group/tl timeline", className),
            style: {
              "--tl-bullet-size": `${size}px`,
              "--tl-bullet-round": `${round}px`,
              "--tl-bullet-ring": ring,
              "--tl-bullet-style": bulletVarian,
              "--tl-line-clr": clr,
              "--tl-line-width": `${width}px`,
              "--tl-line-style": variant,
              ...style
            } as React.CSSProperties,
            ...props
          }}
        />
      </TimelineProvider>
    );
  }
);

type TimelineItemOrigin = "list" | "bullet" | "body" | "title" | "content";
interface TimelineItemType
  extends SharedProps,
    Omit<
      React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLDivElement>,
        HTMLDivElement
      >,
      "title" | "content"
    > {
  active?: boolean;
  activeStyle?: {
    bg?: Colors;
    clr?: Colors;
    line?: string;
  };
  notice?: boolean;
  noticeStyle?: {
    clr?: Colors;
    ring?: Colors;
  };
  title?: React.ReactNode;
  bullet?: React.ReactNode;
  content?: React.ReactNode;
  classNames?: Partial<Record<TimelineItemOrigin, string>>;
  styles?: Partial<
    Record<TimelineItemOrigin, React.CSSProperties & { [key: string]: any }>
  >;
}

export const TimelineItem = React.forwardRef<HTMLDivElement, TimelineItemType>(
  function TimelineItem(Item, ref) {
    const {
      children,
      bullet,
      title,
      content,
      className,
      classNames,
      style,
      styles,
      role = "listbox",
      lineStyle,
      active,
      activeStyle = {},
      notice,
      noticeStyle = {},
      ...props
    } = Item;
    const {
      bg = "hsl(var(--pure-white))",
      clr = "hsl(var(--pure-black))",
      line = "hsl(var(--constructive))"
    } = activeStyle;
    const {
      clr: noticeClr = "hsl(42deg 100% 50%)",
      ring = "hsl(var(--background))"
    } = noticeStyle;
    return (
      <div
        {...{
          ref,
          role,
          "data-tl": "item",
          "data-active": active ? "true" : undefined,
          className: cn(
            "group/tli timeline-item relative text-[#c9c9c9] pb-4",
            classNames?.list
          ),
          style: {
            "--tli-line-clr": lineStyle?.clr,
            "--tli-line-style": lineStyle?.variant,
            "--tli-line-width": lineStyle?.width
              ? `${lineStyle?.width}px`
              : undefined,
            "--tli-active-bg": active ? bg : undefined,
            "--tli-active-clr": active ? clr : undefined,
            "--tli-active-line": active ? line : undefined,
            "--tli-notice-clr": notice ? noticeClr : undefined,
            "--tli-notice-ring": notice ? ring : undefined,
            ...style
          } as React.CSSProperties,
          ...props
        }}
      >
        <div
          {...{
            "data-tli": "bullet",
            "data-active": active ? "true" : undefined,
            "data-bullet": bullet ? "true" : undefined,
            "data-notice": notice ? "true" : undefined,
            className: cn(
              "bg-background timeline-item-bullet",
              classNames?.bullet
            )
          }}
        >
          {bullet}
        </div>

        <div {...{ "data-tli": "body", className: cn("", classNames?.body) }}>
          {title && (
            <h4
              {...{
                className: cn(
                  "font-medium leading-none mb-1.5 text-color",
                  classNames?.title
                )
              }}
            >
              {title}
            </h4>
          )}
          {!children && content ? (
            <div
              {...{ className: cn("text-muted-foreground", classNames?.content) }}
            >
              {content}
            </div>
          ) : (
            children
          )}
        </div>
      </div>
    );
  }
);

export const Timeline = {
  List: TimelineList,
  Item: TimelineItem
};

interface CtxProps {
  align?: `${Align}`;
}

interface ProviderProps extends CtxProps {
  children: React.ReactNode;
}

const Ctx = React.createContext<CtxProps | undefined>(undefined);

export function TimelineProvider({ children, ...props }: ProviderProps) {
  return <Ctx.Provider value={{ ...props }}>{children}</Ctx.Provider>;
}

export const useTimelineCtx = () => {
  const ctx = React.useContext(Ctx);
  if (!ctx) {
    throw new Error("useTimelineCtx must be wrap an <TimelineProvider>");
  }
  return ctx;
};
