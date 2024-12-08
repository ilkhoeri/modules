import { Svg, type SvgProps } from "../components/web/svg";

export function Icon({ ...props }: SvgProps) {
  return (
    <Svg {...props}>
      <path d="m15.6,2L4,12.07l7.45,1.97-3.04,7.96,11.6-10.07-7.45-1.97,3.04-7.96Z" />
    </Svg>
  );
}
