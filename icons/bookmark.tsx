import { Svg, type SvgProps } from "../components/web/svg";

export function Icon({ ...props }: SvgProps) {
  return (
    <Svg {...props}>
      <path d="m4,5.56c0-1.24,0-1.87.25-2.34.22-.42.57-.76,1-.97.49-.24,1.13-.24,2.41-.24h8.69c1.28,0,1.92,0,2.41.24.43.21.78.55,1,.97.25.48.25,1.1.25,2.34v16.44l-8-5.56-8,5.56V5.56Z" />
    </Svg>
  );
}
