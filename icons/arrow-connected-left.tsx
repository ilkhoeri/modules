import { Svg, type SvgProps } from "../components/web/svg";

export function Icon({ ...props }: SvgProps) {
  return (
    <Svg {...props}>
      <path d="m13.11,11.99H2m3.33,3.34l-3.33-3.33,3.33-3.33m12.23,3.32c0-1.23.99-2.22,2.22-2.22s2.22.99,2.22,2.22-.99,2.22-2.22,2.22-2.22-.99-2.22-2.22Z" />
    </Svg>
  );
}
