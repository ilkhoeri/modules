import * as React from "react";
import { twMerge, cvx, type VariantsType } from "str-merge";

type Selector = NonNullable<VariantsType<typeof variants>["selector"]>;
type TableElement<T extends Selector> = React.ComponentPropsWithoutRef<T> & {
  unstyled?: boolean;
  style?: React.CSSProperties & { [key: string]: any };
};

const Table = React.forwardRef<
  HTMLTableElement,
  TableElement<"table"> & {
    wrap?: boolean;
    classNames?: Partial<Record<"wrap" | "table", string>>;
  }
>(({ unstyled, className, classNames, wrap, ...props }, ref) => {
  const table = (
    <table
      {...{
        ref,
        ...classes("table", {
          unstyled,
          className: twMerge(className, classNames?.table)
        }),
        ...props
      }}
    />
  );

  if (wrap) {
    return (
      <div
        data-table="scroll-area"
        {...classes("div", { unstyled, className: classNames?.wrap })}>
        {table}
      </div>
    );
  }
  return table;
});
Table.displayName = "Table";

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  TableElement<"thead">
>(({ unstyled, className, ...props }, ref) => (
  <thead {...{ ref, ...classes("thead", { unstyled, className }), ...props }} />
));
TableHeader.displayName = "TableHeader";

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  TableElement<"tbody">
>(({ unstyled, className, ...props }, ref) => (
  <tbody {...{ ref, ...classes("tbody", { unstyled, className }), ...props }} />
));
TableBody.displayName = "TableBody";

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  TableElement<"tfoot">
>(({ unstyled, className, ...props }, ref) => (
  <tfoot {...{ ref, ...classes("tfoot", { unstyled, className }), ...props }} />
));
TableFooter.displayName = "TableFooter";

const TableRow = React.forwardRef<HTMLTableRowElement, TableElement<"tr">>(
  ({ unstyled, className, ...props }, ref) => (
    <tr {...{ ref, ...classes("tr", { unstyled, className }), ...props }} />
  )
);
TableRow.displayName = "TableRow";

const TableHead = React.forwardRef<HTMLTableCellElement, TableElement<"th">>(
  ({ unstyled, className, ...props }, ref) => (
    <th {...{ ref, ...classes("th", { unstyled, className }), ...props }} />
  )
);
TableHead.displayName = "TableHead";

const TableData = React.forwardRef<HTMLTableCellElement, TableElement<"td">>(
  ({ unstyled, className, ...props }, ref) => (
    <td {...{ ref, ...classes("td", { unstyled, className }), ...props }} />
  )
);
TableData.displayName = "TableData";

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  TableElement<"caption">
>(({ unstyled, className, ...props }, ref) => (
  <caption
    {...{ ref, ...classes("caption", { unstyled, className }), ...props }}
  />
));
TableCaption.displayName = "TableCaption";

const variants = cvx({
  variants: {
    selector: {
      div: "relative border border-border rounded-lg w-full min-w-full max-w-full overflow-x-auto [scrollbar-color:#adb3bd_#0000] [scrollbar-width:thin] [scrollbar-gutter:auto] [&>table]:min-w-full [&>table]:max-w-max",
      table:
        "w-max caption-bottom text-sm [&:where(:not([data-table=scroll-area])>table)]:max-w-full",
      thead:
        "relative after:content-[''] after:absolute after:w-full after:h-px after:bg-border after:inset-x-0 after:bottom-[3px]",
      tbody:
        "last:border-b-0 [&_tr:last-child]:border-0 hover:[&_tr]:bg-muted/55 data-[state=active]:[&_tr]:bg-muted/55",
      tfoot: "bg-muted font-medium",
      tr: "border-b appearance-none relative",
      th: "pl-3 pr-3 first:pl-4 last:pr-4 py-[10px] font-mono h-12 text-left font-medium align-middle text-color [&:has([role=checkbox])]:pr-0",
      td: "pl-3 pr-3 first:pl-4 last:pr-4 py-4 font-mono [&:where(:not([data-table=scroll-area])_td)]:align-text-top",
      caption: "mt-4 text-sm text-muted-foreground"
    }
  }
});

function classes(
  selector?: VariantsType<typeof variants>["selector"],
  options: { unstyled?: boolean; className?: string } = {}
) {
  return {
    className: twMerge(
      !options?.unstyled && variants({ selector }),
      options?.className
    )
  };
}

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableData,
  TableCaption
};
