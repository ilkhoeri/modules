import { Svg, type SvgProps } from "../components/web/svg";

export function Icon({ ...props }: SvgProps) {
  return (
    <Svg {...props}>
      <path d="m5.13,12l3-6,3,6" />
      <path d="m5.88,10.5h4.5" />
      <circle cx="16.25" cy="9.75" r="2.25" />
      <path d="m18.87,7.5v4.5" />
      <path d="m22,13V5c0-1.1-.9-2-2-2H4c-1.1,0-2,.9-2,2v14c0,1.1.9,2,2,2h10" />
      <line x1="17" y1="16" x2="22" y2="21" />
      <line x1="17" y1="21" x2="22" y2="16" />
    </Svg>
  );
}
