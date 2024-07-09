"use client";
import React from "react";
import { useCommandContext } from "./command-context";

import { factory, useProps, CompoundStylesApiProps, ElementProps, Factory } from "@/modules/factory";

export type CommandActionsListStylesNames = "actionBody" | "actionsList";

export interface CommandActionsListProps
  extends CompoundStylesApiProps<CommandActionsListFactory>,
    ElementProps<"div"> {
  loading?: boolean;
  loadingComponent?: React.ReactNode;
}

export type CommandActionsListFactory = Factory<{
  props: CommandActionsListProps;
  ref: HTMLDivElement;
  stylesNames: CommandActionsListStylesNames;
  compound: true;
}>;

const defaultProps: Partial<CommandActionsListProps> = {};

export const CommandActionsList = factory<CommandActionsListFactory>((props, ref) => {
  const { id, className, classNames, style, styles, loading, loadingComponent, ...others } = useProps(
    "CommandActionsList",
    defaultProps,
    props,
  );
  const ctx = useCommandContext();

  if (loading && loadingComponent) {
    return loadingComponent;
  }

  return (
    <div {...ctx.getStyles("actionBody", { id, className, classNames, style, styles })}>
      <div ref={ref} {...ctx.getStyles("actionsList", { id, className, classNames, style, styles })} {...others} />
    </div>
  );
});
