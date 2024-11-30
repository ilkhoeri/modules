import { Svg, type SvgProps } from "../components/web/svg";

export function Icon({ ...props }: SvgProps) {
  return (
    <Svg {...props}>
      <path d="M5 12l5 5l10 -10" />
    </Svg>
  );
}
