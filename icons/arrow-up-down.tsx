import { Svg, type SvgProps } from "../components/web/svg";

export function Icon({
  stroke = "currentColor",
  fill = "none",
  strokeWidth = "1.25",
  ...props
}: SvgProps) {
  return (
    <Svg {...{ stroke, fill, strokeWidth, ...props }}>
      <path d="M12 6l5 4h-10z" />
      <path d="M12 18l-5 -4h10z" />
    </Svg>
  );
}
