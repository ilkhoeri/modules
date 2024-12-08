import { Svg, type SvgProps } from "../components/web/svg";

export function Icon({ ...props }: SvgProps) {
  return (
    <Svg {...props}>
      <path d="m18.09,4.07c-2.74-2.1-6.49-2.72-9.91-1.3S2.54,7.27,2.09,10.7" />
      <path d="m5.91,19.93c2.74,2.1,6.49,2.72,9.91,1.3s5.63-4.51,6.09-7.93" />
      <line x1="13.85" y1="15.95" x2="18.25" y2="14.13" />
      <path d="m9.12,17.62l1.11-2.69c.61-1.47-.09-3.15-1.56-3.76l-2.69-1.11" />
    </Svg>
  );
}
