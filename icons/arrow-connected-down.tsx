import { Svg, type SvgProps } from "../components/web/svg";

export function Icon({ ...props }: SvgProps) {
  return (
    <Svg {...props}>
      <path d="m12.01,10.89v11.11m-3.34-3.33l3.33,3.33,3.33-3.33m-3.32-12.23c1.23,0,2.22-.99,2.22-2.22s-.99-2.22-2.22-2.22-2.22.99-2.22,2.22.99,2.22,2.22,2.22Z" />
    </Svg>
  );
}
