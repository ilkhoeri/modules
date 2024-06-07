import * as React from "react";
import { useSize, _SVGType } from "./index";

const Svg = ({
  size,
  h,
  w,
  fill = "none",
  stroke = "currentColor",
  strokeWidth = "2",
  "aria-hidden": ariaHidden = "true",
  viewBox = "0 0 24 24",
  strokeLinecap = "round",
  strokeLinejoin = "round",
  height,
  width,
  ref,
  ...props
}: _SVGType) => {
  const { hand_sz, hand_h, hand_w } = useSize({ size, h, w });

  const rest = {
    ref,
    fill,
    stroke,
    viewBox,
    strokeWidth,
    strokeLinecap,
    strokeLinejoin,
    height: height || hand_h || hand_sz || "1em",
    width: width || hand_w || hand_sz || "1em",
    xmlns: "http://www.w3.org/2000/svg",
    "aria-hidden": ariaHidden,
    "data-icon": "aoeri",
    ...props,
  };

  return <svg {...rest} />;
};
Svg.displayName = "Svg";

export { Svg };
