import { Svg, SvgProps } from "./utils";

export const ShareSquareIcon = ({ ...props }: SvgProps) => {
  return (
    <Svg {...props}>
      <path d="M8 9h-1a2 2 0 0 0 -2 2v8a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-8a2 2 0 0 0 -2 -2h-1" />
      <path d="M12 14v-11" />
      <path d="M9 6l3 -3l3 3" />
    </Svg>
  );
};
