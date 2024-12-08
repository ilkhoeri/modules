import { Svg, type SvgProps } from "../components/web/svg";

export function Icon({ ...props }: SvgProps) {
  return (
    <Svg {...props}>
      <path d="m7,21c-1.84,0-3.33-1.15-3.33-2.57v-5.14l-1.67-1.29,1.67-1.29v-5.14c0-1.42,1.49-2.57,3.33-2.57m10,18c1.84,0,3.33-1.15,3.33-2.57v-5.14l1.67-1.29-1.67-1.29v-5.14c0-1.42-1.49-2.57-3.33-2.57m-4.99,12.04v-6.08m-3.38,3.04h6.75" />
    </Svg>
  );
}
