import { Svg, type SvgProps } from "../components/web/svg";

export function Icon({ ...props }: SvgProps) {
  return (
    <Svg {...props}>
      <path d="m11.99,13.11V2m3.34,3.33l-3.33-3.33-3.33,3.33m3.32,12.23c-1.23,0-2.22.99-2.22,2.22s.99,2.22,2.22,2.22,2.22-.99,2.22-2.22-.99-2.22-2.22-2.22Z" />
    </Svg>
  );
}
