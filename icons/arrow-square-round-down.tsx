import { Svg, type SvgProps } from "../components/web/svg";

export function Icon({ ...props }: SvgProps) {
  return (
    <Svg {...props}>
      <path d="m7.56,12l4.44,4.44,4.44-4.44" />
      <path d="m12,7.56v8.89" />
      <path d="m12,2c8,0,10,2,10,10s-2,10-10,10-10-2-10-10S4,2,12,2Z" />
    </Svg>
  );
}
