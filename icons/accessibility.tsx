import { Svg, type SvgProps } from "../components/web/svg";

export function Icon({ ...props }: SvgProps) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="10" strokeMiterlimit="10" />
      <path d="m12,2c5.52,0,10,4.48,10,10s-4.48,10-10,10S2,17.52,2,12,6.48,2,12,2Zm4,7.32s-1.79,1.35-4,1.35-4-1.35-4-1.35m7.05,8.68l-2.16-4.11v-3.22h-1.78v3.22l-2.16,4.11m3.05-12c.37,0,.67.3.67.67s-.3.67-.67.67-.67-.3-.67-.67.3-.67.67-.67Z" />
    </Svg>
  );
}
