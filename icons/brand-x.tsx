import { Svg, type SvgProps } from "../components/web/svg";

export function Icon({ ...props }: SvgProps) {
  return (
    <Svg {...props}>
      <path d="m2.94,22l7.55-8.77m2.62-3.05l7.04-8.18m-3.63,20L2.77,2h4.72l13.74,20h-4.72Z" />
    </Svg>
  );
}
