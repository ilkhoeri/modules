import { Svg, type SvgProps } from "../components/web/svg";

export function Icon({ ...props }: SvgProps) {
  return (
    <Svg {...props}>
      <path d="m16.71,13.48l.69-3.75h-4.01v-1.33c0-1.98.78-2.74,2.79-2.74.62,0,1.13.02,1.42.05v-3.4c-.55-.15-1.89-.3-2.67-.3-4.1,0-5.99,1.94-5.99,6.11v1.62h-2.53v3.75h2.53v8.52h4.45v-8.52h3.32Z" />
    </Svg>
  );
}
