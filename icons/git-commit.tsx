import { Svg, type SvgProps } from "../components/web/svg";

export function Icon({ ...props }: SvgProps) {
  return (
    <Svg {...props}>
      <path d="m16.5,12h5.5m-10-4.5c-2.49,0-4.5,2.01-4.5,4.5s2.01,4.5,4.5,4.5,4.5-2.01,4.5-4.5-2.01-4.5-4.5-4.5ZM2,12h5.5" />
    </Svg>
  );
}
