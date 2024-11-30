import * as React from "react";
import { createPortal } from "react-dom";
import * as Primitive from "@radix-ui/react-tooltip";
import { cn } from "str-merge";

type TooltipOrigin = "trigger" | "content";
type KeyType = "side" | "align" | "sideOffset";
interface CSSProperties extends React.CSSProperties {
  [key: string]: any;
}
type StylesNames<T extends string> = {
  classNames?: Partial<Record<T, string>>;
  styles?: Partial<Record<T, CSSProperties>>;
  style?: CSSProperties;
};
type TooltipProps = Omit<Primitive.TooltipTriggerProps, "content"> & {
  touch?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  disableHoverableContent?: boolean;
  delayDuration?: number;
  defaultOpen?: boolean;
  skipDelayDuration?: number;
  content?: React.ReactNode;
  withArrow?: boolean;
  contentProps?: Omit<Primitive.TooltipContentProps, KeyType>;
} & Pick<Primitive.TooltipContentProps, KeyType> &
  StylesNames<TooltipOrigin>;

const TooltipProvider = Primitive.Provider;

const TooltipRoot = Primitive.Root;

const TooltipTrigger = React.forwardRef<
  React.ElementRef<typeof Primitive.Trigger>,
  Primitive.TooltipTriggerProps & { touch?: boolean }
>(function TooltipTrigger({ touch, ...props }, ref) {
  console.log("touch: is", touch);
  return <Primitive.Trigger {...{ ref, ...props }} />;
});
TooltipTrigger.displayName = Primitive.TooltipTrigger.displayName;

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof Primitive.Content>,
  Primitive.TooltipContentProps & { withArrow?: boolean }
>(function TooltipContent(
  { className, sideOffset = 4, children, withArrow, align, side, ...props },
  ref
) {
  if (typeof document === "undefined") return null;
  return createPortal(
    <Primitive.Content
      {...{
        ref,
        align,
        side,
        sideOffset: withArrow ? Number(sideOffset) + 9 : sideOffset,
        className: cn(
          "group/content relative z-50 flex items-center justify-center rounded-md border bg-background px-3 py-1.5 text-sm text-muted-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 [&_[data-tooltip]]:text-background",
          className
        ),
        ...props
      }}>
      {children}

      {withArrow && (
        <svg
          fill="currentColor"
          viewBox="0 0 15 6"
          strokeWidth="0"
          data-side={side}
          data-align={align}
          data-tooltip="arrow"
          className={arrow}>
          <path d="m.7.4c.4,0,.8.2,1.1.5l4,4.1c.5.5,1.1.7,1.7.7s1.2-.2,1.7-.7L13.2.9c.3-.3.7-.5,1.1-.5s.4-.2.4-.4H.3c0,.2.2.4.4.4Z" />
          <path
            data-arrow="border"
            d="m12.9.6l-4,4.1c-.8.8-2,.8-2.8,0L2.1.6c-.4-.4-.9-.6-1.4-.6h-.7c0,.4.3.7.7.7s.7.1.9.4l4,4.1c.5.5,1.2.8,1.9.8s1.4-.3,1.9-.8L13.4,1.1c.2-.2.6-.4.9-.4S15,.4,15,0h-.7C13.8,0,13.3.2,12.9.6Z"
          />
        </svg>
      )}
    </Primitive.Content>,
    document.body
  );
});
TooltipContent.displayName = Primitive.Content.displayName;

const Tooltip = React.forwardRef<
  React.ElementRef<typeof Primitive.Trigger>,
  TooltipProps
>(function Tooltip(_props, ref) {
  const {
    open,
    onOpenChange,
    defaultOpen,
    delayDuration = 0,
    disableHoverableContent,
    content,
    contentProps,
    sideOffset,
    skipDelayDuration,
    className,
    classNames,
    style,
    styles,
    withArrow,
    touch,
    align = "center",
    side = "bottom",
    ...props
  } = _props;
  return (
    <TooltipProvider {...{ skipDelayDuration }}>
      <TooltipRoot
        {...{
          open,
          onOpenChange,
          defaultOpen,
          delayDuration,
          disableHoverableContent
        }}>
        <TooltipTrigger
          {...{
            ref,
            touch,
            className: cn(className, classNames?.trigger),
            style: { ...style, ...styles?.trigger },
            ...props
          }}
        />
        {content && (
          <TooltipContent
            {...{
              side,
              align,
              sideOffset,
              withArrow,
              className: cn(classNames?.content, contentProps?.className),
              style: { ...styles?.content, ...contentProps?.style }
            }}
            {...contentProps}>
            {content}
          </TooltipContent>
        )}
      </TooltipRoot>
    </TooltipProvider>
  );
});
Tooltip.displayName = "Tooltip";

const arrow = cn(
  "absolute !h-[9px] !w-[23px] group-data-[align=center]/content:group-data-[side=bottom]/content:inset-x-auto group-data-[align=center]/content:group-data-[side=left]/content:inset-y-auto group-data-[align=center]/content:group-data-[side=right]/content:inset-y-auto group-data-[align=center]/content:group-data-[side=top]/content:inset-x-auto group-data-[align=end]/content:group-data-[side=bottom]/content:right-2 group-data-[align=end]/content:group-data-[side=left]/content:bottom-4 group-data-[align=end]/content:group-data-[side=right]/content:bottom-4 group-data-[align=end]/content:group-data-[side=top]/content:right-2 group-data-[align=start]/content:group-data-[side=bottom]/content:left-2 group-data-[align=start]/content:group-data-[side=left]/content:top-4 group-data-[align=start]/content:group-data-[side=right]/content:top-4 group-data-[align=start]/content:group-data-[side=top]/content:left-2 group-data-[side=bottom]/content:bottom-[calc(100%-0px)] group-data-[side=left]/content:left-[calc(100%-7px)] group-data-[side=right]/content:right-[calc(100%-7px)] group-data-[side=top]/content:top-[calc(100%-0px)] group-data-[side=bottom]/content:rotate-180 group-data-[side=left]/content:-rotate-90 group-data-[side=right]/content:rotate-90 group-data-[side=top]/content:rotate-0 [&_[data-arrow=border]]:text-border"
);

export {
  Tooltip,
  TooltipRoot,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider
};
