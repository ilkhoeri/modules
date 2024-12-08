import { Svg, type SvgProps } from "../components/web/svg";

export function Icon({ role = "img", ...props }: SvgProps) {
  return (
    <Svg currentFill="fill" {...{ role, ...props }}>
      <path d="m14.05,10.32L22.06,1h-1.9l-6.96,8.09L7.65,1H1.24l8.4,12.23L1.24,23h1.9l7.35-8.54,5.87,8.54h6.41l-8.72-12.68h0Zm-2.6,3.02l-.85-1.22L3.82,2.43h2.92l5.47,7.82.85,1.22,7.11,10.17h-2.92l-5.8-8.3h0Z" />
    </Svg>
  );
}
