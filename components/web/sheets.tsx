"use client";
import * as React from "react";
import { XIcon } from "@/modules/icons";
import { twMerge, cvx, InferTypes } from "str-merge";
import {
  ClickOpenOptions,
  DataOrigin,
  DataSide,
  useOpenState
} from "@/hooks/use-open-state";
import {
  createSafeContext,
  hasSpecificChildren
} from "@/hooks/open-state-context";
import { mergeRefs } from "@/hooks/use-merged-ref";

import "./sheets.css";

export enum SheetsVariant {
  Accordion = "accordion",
  Collapsible = "collapsible",
  Dropdown = "dropdown",
  Dialog = "dialog",
  Drawer = "drawer"
}
type SharedType = {
  unstyled?: boolean;
  className?: string;
  style?: React.CSSProperties & { [key: string]: any };
};
type SheetsValuesType = ClickOpenOptions & {
  children: React.ReactNode;
  variant?: `${SheetsVariant}`;
  multipleOpen?: boolean;
  openId?: string | null;
  setOpenId?: React.Dispatch<React.SetStateAction<string | null>>;
};
type SheetsType = React.ComponentPropsWithoutRef<"div"> & SheetsValuesType;
type SheetsValue = InferTypes<typeof useOpenState> &
  Omit<SheetsValuesType, "children">;
type SheetsSharedType<T extends React.ElementType> =
  React.ComponentPropsWithoutRef<T> & SharedType;

const DedicatedContext = React.createContext<{
  openId: string | null;
  setOpenId: React.Dispatch<React.SetStateAction<string | null>>;
}>({
  openId: null,
  setOpenId: () => {}
});
const useDedicatedContext = () => React.useContext(DedicatedContext);
export function DedicatedProvider({ children }: { children: React.ReactNode }) {
  const [openId, setOpenId] = React.useState<string | null>(null);
  return (
    <DedicatedContext.Provider value={{ openId, setOpenId }}>
      {children}
    </DedicatedContext.Provider>
  );
}

const [Provider, useSheetsContext] = createSafeContext<SheetsValue>(
  "Sheets component trees must be wrap within an <SheetsProvider> or <Sheets>"
);

const SheetsProvider = (props: SheetsValuesType) => {
  const {
    variant = "accordion",
    side,
    modal,
    multipleOpen,
    children,
    ...rest
  } = props;

  const ctx = useOpenState({
    observe: {
      align: variant === SheetsVariant.Dropdown,
      side: ["dropdown", "drawer"].includes(variant),
      offset: variant === SheetsVariant.Dropdown,
      sideswipe: variant === SheetsVariant.Dropdown,
      orientation: variant === SheetsVariant.Accordion,
      multipleOpen: multipleOpen || variant !== SheetsVariant.Accordion,
      availableSize: ["accordion", "collapsible"].includes(variant),
      contentRect: ["collapsible", "dropdown"].includes(variant)
    },
    side: side || (variant === "dropdown" ? "bottom" : "right"),
    modal: modal || ["dialog", "drawer"].includes(variant),
    trigger: "click",
    ...rest
  });

  return (
    <Provider value={{ variant, multipleOpen, ...ctx, ...rest }}>
      {children}
    </Provider>
  );
};

function SheetsDedicatedProvider(
  props: Omit<SheetsValuesType, "openId" | "setOpenId">
) {
  const { variant = "accordion", children, ...rest } = props;
  const { openId, setOpenId } = useDedicatedContext();

  if (variant !== SheetsVariant.Accordion) return null;

  return (
    <SheetsProvider
      variant="accordion"
      openId={openId}
      setOpenId={setOpenId}
      {...rest}>
      {children}
    </SheetsProvider>
  );
}

const Sheets = React.forwardRef<React.ElementRef<"div">, SheetsType>(
  (
    {
      align,
      side,
      open,
      onOpenChange,
      sideOffset,
      clickOutsideToClose,
      defaultOpen,
      variant = "accordion",
      children,
      openId,
      setOpenId,
      delay,
      multipleOpen,
      hotKeys,
      modal,
      popstate,
      ...props
    },
    ref
  ) => {
    const rest = {
      align,
      side,
      open,
      onOpenChange,
      sideOffset,
      clickOutsideToClose,
      defaultOpen,
      variant,
      openId,
      setOpenId,
      delay,
      multipleOpen,
      hotKeys,
      modal,
      popstate
    };

    const hasSheetsChild = hasSpecificChildren(children, [
      SheetsTrigger,
      SheetsContent
    ]);

    const renderContent = (content: React.ReactNode) => (
      <SheetsProvider {...rest}>
        <SheetsRoot ref={ref} {...props}>
          {content}
        </SheetsRoot>
      </SheetsProvider>
    );

    switch (variant) {
      case SheetsVariant.Accordion:
        return multipleOpen
          ? renderContent(children)
          : renderContent(<DedicatedProvider>{children}</DedicatedProvider>);

      case SheetsVariant.Collapsible:
        return hasSheetsChild ? (
          renderContent(children)
        ) : (
          <SheetsProvider {...rest}>
            <SheetsContent ref={ref} {...props}>
              {children}
            </SheetsContent>
          </SheetsProvider>
        );

      default:
        return <SheetsProvider {...rest}>{children}</SheetsProvider>;
    }
  }
);
Sheets.displayName = "Sheets";

const SheetsRoot = React.forwardRef<
  React.ElementRef<"div">,
  SheetsSharedType<"div">
>(({ className, unstyled, style, ...props }, ref) => {
  const { variant, ...ctx } = useSheetsContext();

  return (
    <div
      ref={mergeRefs(ctx.refs.root, ref)}
      {...classes("root", { variant, className, unstyled })}
      {...ctx.styleAt("root", { style })}
      {...props}
    />
  );
});
SheetsRoot.displayName = "SheetsRoot";

const SheetsItem = React.forwardRef<
  React.ElementRef<"div">,
  SheetsSharedType<"div">
>(({ className, unstyled, style, ...props }, ref) => {
  const { variant, multipleOpen, ...ctx } = useSheetsContext();

  const item = (
    <div
      ref={mergeRefs(ctx.refs.item, ref)}
      {...classes("item", { variant, className, unstyled })}
      {...ctx.styleAt("item", { style })}
      {...props}
    />
  );

  if (variant === SheetsVariant.Accordion) {
    return multipleOpen ? (
      <SheetsProvider multipleOpen>{item}</SheetsProvider>
    ) : (
      <SheetsDedicatedProvider>{item}</SheetsDedicatedProvider>
    );
  }
  return item;
});
SheetsItem.displayName = "SheetsItem";

const SheetsTrigger = React.forwardRef<
  React.ElementRef<"button">,
  SheetsSharedType<"button">
>(({ type = "button", className, unstyled, style, onClick, ...props }, ref) => {
  const { variant, ...ctx } = useSheetsContext();

  return (
    <button
      ref={mergeRefs(ctx.refs.trigger, ref)}
      type={type}
      {...classes("trigger", { variant, className, unstyled })}
      {...ctx.styleAt("trigger", { style })}
      {...props}
    />
  );
});
SheetsTrigger.displayName = "SheetsTrigger";

const SheetsClosed = React.forwardRef<
  React.ElementRef<"button">,
  SheetsSharedType<"button">
>(
  (
    { type = "button", className, unstyled, onClick, children, ...props },
    ref
  ) => {
    const ctx = useSheetsContext();

    return (
      <button
        ref={ref}
        type={type}
        onClick={e => {
          onClick?.(e);
          ctx.toggle();
        }}
        className={twMerge(
          !unstyled &&
            "size-4 absolute right-4 top-4 text-muted-foreground hover:text-color rounded-sm disabled:opacity-50",
          className
        )}
        {...props}>
        {children || <XIcon />}
      </button>
    );
  }
);
SheetsClosed.displayName = "SheetsClosed";

const SheetsContent = React.forwardRef<
  React.ElementRef<"div">,
  SheetsSharedType<"div">
>(
  (
    { className, unstyled, "aria-disabled": arDsb, style, children, ...props },
    ref
  ) => {
    const { variant = "accordion", side, ...ctx } = useSheetsContext();
    const omitVariants = ["accordion", "collapsible"].includes(variant);

    if (!ctx.render && !omitVariants) return null;

    const content = (
      <div
        ref={mergeRefs(ctx.refs.content, ref)}
        {...classes("content", { variant, side, className, unstyled })}
        {...ctx.styleAt("content", { style })}
        role={omitVariants ? "region" : undefined}
        aria-labelledby={`${ctx.refs.trigger.current?.id}`}
        aria-disabled={arDsb || ctx.render ? "false" : "true"}
        hidden={!ctx.render}
        {...props}>
        {omitVariants ? (ctx.render ? children : null) : children}
      </div>
    );

    if (omitVariants) return content;

    return (
      <ctx.Portal render={ctx.render}>
        {variant !== SheetsVariant.Dropdown && <SheetsOverlay />}
        {content}
      </ctx.Portal>
    );
  }
);
SheetsContent.displayName = "SheetsContent";

const SheetsOverlay = React.forwardRef<
  React.ElementRef<"div">,
  SheetsSharedType<"div">
>(({ className, unstyled, style, onClick, ...props }, ref) => {
  const { variant, ...ctx } = useSheetsContext();

  return (
    <div
      ref={mergeRefs(ctx.refs.overlay, ref)}
      {...classes("overlay", { variant, className, unstyled })}
      {...ctx.styleAt("overlay", { style })}
      onClick={e => {
        onClick?.(e);
        ctx.toggle();
      }}
      {...props}
    />
  );
});
SheetsOverlay.displayName = "SheetsOverlay";

export {
  SheetsProvider,
  Sheets,
  SheetsItem,
  SheetsTrigger,
  SheetsClosed,
  SheetsContent
};

// styles
export const sheetsVariants = cvx({
  assign:
    "fixed z-[111] gap-4 bg-background p-6 shadow-lg transition ease-linear data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:duration-200 data-[state=closed]:duration-200",
  variants: {
    side: {
      top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
      bottom:
        "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
      left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
      right:
        "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm"
    }
  }
});

const contentClasses = (side: `${DataSide}`) =>
  cvx({
    variants: {
      variant: {
        accordion:
          "overflow-hidden transition-all data-[state=open]:animate-collapse-open data-[state=closed]:animate-collapse-closed data-[state=closed]:duration-200 bg-transparent m-0 p-0 w-full text-left",
        collapsible:
          "overflow-hidden transition-all data-[state=open]:animate-collapse-open data-[state=closed]:animate-collapse-closed bg-transparent m-0 p-0 w-full text-left",
        dropdown:
          "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-200 data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-100 data-[state=open]:zoom-in-100 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:data-[side=bottom]:slide-out-to-top-2 data-[state=closed]:data-[side=left]:slide-out-to-right-2 data-[state=closed]:data-[side=right]:slide-out-to-left-2 data-[state=closed]:data-[side=top]:slide-out-to-bottom-2 absolute z-[111] left-[--left] top-[--top] overflow-hidden bg-background rounded-md border",
        dialog:
          "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-200 data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:data-[side=bottom]:slide-out-to-top-2 data-[state=closed]:data-[side=left]:slide-out-to-right-2 data-[state=closed]:data-[side=right]:slide-out-to-left-2 data-[state=closed]:data-[side=top]:slide-out-to-bottom-2 fixed left-[50%] top-[50%] z-[111] w-80 h-80 translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95 data-[state=open]:slide-in-from-left-1/2 data-[state=closed]:slide-out-to-left-1/2 data-[state=open]:slide-in-from-top-[60%] data-[state=closed]:slide-out-to-top-[60%] rounded-lg",
        drawer: sheetsVariants({ side })
      }
    }
  });

interface ClassesProps {
  variant?: `${SheetsVariant}`;
  unstyled?: boolean;
  className?: string;
  side?: `${DataSide}`;
}

export default function classes(
  selector: `${DataOrigin}`,
  options: ClassesProps
) {
  const { variant, side = "right", unstyled, className } = options;

  switch (selector) {
    case "trigger":
      if (variant === "accordion") {
        return {
          className: twMerge(
            !unstyled &&
              "relative z-9 w-full flex flex-row items-center justify-between flex-1 py-4 rounded-none font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
            className
          )
        };
      }
      return {
        className: twMerge(
          !unstyled &&
            "relative rounded-md font-medium group min-w-24 z-50 bg-color text-background h-9 px-2 text-center",
          className
        )
      };

    case "content":
      return {
        className: twMerge(
          !unstyled && contentClasses(side)({ variant }),
          className
        )
      };

    case "overlay":
      return {
        className: twMerge(
          !unstyled &&
            "fixed inset-0 size-full z-[100] bg-background/50 supports-[backdrop-filter]:bg-background/50 cursor-default data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-200 data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0",
          className
        )
      };

    case "item":
      if (variant === "accordion") {
        return {
          className: twMerge(
            !unstyled &&
              "group relative flex flex-col h-auto border-0 select-none gap-[--offset] data-[side=top]:flex-col-reverse data-[side=right]:flex-row data-[side=bottom]:flex-col data-[side=left]:flex-row-reverse data-[align=start]:items-start data-[align=center]:items-center data-[align=end]:items-end border-b",
            className
          )
        };
      }
      return { className };

    default:
      return { className };
  }
}
