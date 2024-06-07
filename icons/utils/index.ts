import * as React from "react";
export * from "./Svg";

import type { CSSProperties } from "../../utils/record-types";
import type { NamedColor } from "../../types/shared";

export interface IconTree {
  tag: string;
  attr: {
    [key: string]: string;
  };
  child: IconTree[];
}
export declare function GenIcon(data: IconTree): (props: _SVGType) => React.JSX.Element;
export interface _SVGType extends React.SVGAttributes<SVGElement> {
  children?: React.ReactNode;
  /**
   * @summary size
   *```js
   * type size?: "xs" | "base" | "sm" | "md" | "lg" | "xl" | "xxl" | "xxxl" | (string & {}) | number | undefined
   * ```
   */
  size?: ArmSize;
  h?: string | number | undefined;
  w?: string | number | undefined;
  color?: ArmColor;
  ref?: React.Ref<SVGSVGElement>;
  style?: CSSProperties;
}
export type IconType = (props: _SVGType) => JSX.Element;
export declare function IconBase(
  props: _SVGType & {
    attr?: Record<string, string>;
  },
): JSX.Element;

export interface SvgProps extends Omit<_SVGType, "children" | "eb"> {}

export type InitialSize = "xxs" | "xxxs" | "xs" | "base" | "sm" | "md" | "lg" | "xl" | "xxl" | "xxxl";
export type ArmSize = InitialSize | (string & {}) | number | undefined;
export interface SizesProps {
  /**
   * @summary size
   *```js
   * type size?: "xxs" | "xxxs" | "xs" | "base" | "sm" | "md" | "lg" | "xl" | "xxl" | "xxxl" | (string & {}) | number | undefined
   * ```
   */
  size?: ArmSize;
  h?: string | number | undefined;
  w?: string | number | undefined;
}
export const getSv = (size: ArmSize): string => {
  const sizeMap: Record<InitialSize, string> = {
    xs: "10px",
    xxs: "12px",
    xxxs: "14px",
    base: "16px",
    sm: "18px",
    md: "20px",
    lg: "32px",
    xl: "48px",
    xxl: "86px",
    xxxl: "112px",
  };
  return sizeMap[size as InitialSize] || "";
};
export const useSize = ({ size, h, w }: SizesProps) => {
  const val_sz = getSv(size);
  const hand_sz = ["xs", "xxs", "xxxs", "sm", "base", "md", "lg", "xl", "xxl", "xxxl"].includes(size as string)
    ? val_sz
    : size;
  const hand_h = typeof h === "number" ? `${h}px` : h;
  const hand_w = typeof w === "number" ? `${w}px` : w;

  return { hand_sz, hand_h, hand_w };
};

export type ArmColor = NamedColor | "currentColor" | (string & {});
export interface ColorProps {
  color?: ArmColor;
}

/** *Initials Values* */
export type _STRING = string & {};

export type Commons = "inherit" | "initial" | "revert" | "unset";
