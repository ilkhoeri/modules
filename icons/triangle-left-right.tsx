import { Svg, type SvgProps } from "../components/web/svg";

export function Icon({ ...props }: SvgProps) {
  return (
    <Svg {...props}>
      <path d="m22,12l-7.6,9V3l7.6,9Z" />
      <path d="m2,12L9.6,3v18L2,12Z" />
    </Svg>
  );
}
