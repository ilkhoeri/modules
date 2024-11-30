import { Svg, type SvgProps } from "../components/web/svg";

export function Icon({ ...props }: SvgProps) {
  return (
    <Svg {...props}>
      <path d="m5,7l5,5-5,5" />
      <path d="m12,18.5h7" />
    </Svg>
  );
}
