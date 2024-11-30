import { Svg, type SvgProps } from "../components/web/svg";

export function Icon({ ...props }: SvgProps) {
  return (
    <Svg {...props}>
      <path d="m6.34,4.37h-1.98c-1.31,0-2.37,1.06-2.37,2.37v10.53c0,1.31,1.06,2.37,2.37,2.37h1.98m11.31,0h1.98c1.31,0,2.37-1.06,2.37-2.37V6.73c0-1.31-1.06-2.37-2.37-2.37h-1.98" />
      <path d="m6.52,7.5l3.91,3.91-3.91,3.91" />
      <path d="m12,16.5h5.48" />
    </Svg>
  );
}
