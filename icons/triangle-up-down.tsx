import { Svg, type SvgProps } from "../components/web/svg";

export function Icon({ ...props }: SvgProps) {
  return (
    <Svg {...props}>
      <path d="m12,22L3,14.4h18l-9,7.6Z" />
      <path d="m12,2l9,7.6H3L12,2Z" />
    </Svg>
  );
}
