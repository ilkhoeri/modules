import { Svg, type SvgProps } from "../components/web/svg";

export function Icon({ ...props }: SvgProps) {
  return (
    <Svg {...props}>
      <path d="m16.44,12.01l-4.44-4.44-4.44,4.44" />
      <path d="m12,16.45V7.56" />
      <path d="m12,2c8,0,10,2,10,10s-2,10-10,10S2,20,2,12,4,2,12,2Z" />
    </Svg>
  );
}
