import { Svg, type SvgProps } from "../components/web/svg";

export function Icon({ ...props }: SvgProps) {
  return (
    <Svg {...props}>
      <path d="m10.89,12.01h11.11m-3.33-3.34l3.33,3.33-3.33,3.33m-12.23-3.32c0,1.23-.99,2.22-2.22,2.22s-2.22-.99-2.22-2.22.99-2.22,2.22-2.22,2.22.99,2.22,2.22Z" />
    </Svg>
  );
}
