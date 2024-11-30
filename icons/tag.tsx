import { Svg, type SvgProps } from "../components/web/svg";

export function Icon({ ...props }: SvgProps) {
  return (
    <Svg {...props}>
      <path d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
    </Svg>
  );
}
