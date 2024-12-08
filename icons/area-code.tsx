import { Svg, type SvgProps } from "../components/web/svg";

export function Icon({ ...props }: SvgProps) {
  return (
    <Svg {...props} data-icon="area-code">
      <path d="m18.67,18.75c1.84,0,3.33-1.48,3.33-3.32V6.57c0-1.84-1.49-3.32-3.33-3.32H5.33c-1.84,0-3.33,1.48-3.33,3.32v8.86c0,1.84,1.49,3.32,3.33,3.32" />
      <path d="m10.5,16.75l-2,2,2,2" />
      <path d="m13.5,20.75l2-2-2-2" />
    </Svg>
  );
}
