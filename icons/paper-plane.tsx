import { Svg, type SvgProps } from "../components/web/svg";

export function Icon({ ...props }: SvgProps) {
  return (
    <Svg {...props}>
      <path d="m12,13v5m0-15L2,21l10-3,10,3L12,3Z" />
    </Svg>
  );
}
