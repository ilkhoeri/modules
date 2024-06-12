import { Svg, SvgProps } from "./utils";

export const ArrowDownSquareIcon = ({ ...props }: SvgProps) => {
  return (
    <Svg {...props}>
      <path d="M8 12l4 4l4 -4" />
      <path d="M12 8v8" />
      <path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9 -9 9s-9 -1.8 -9 -9s1.8 -9 9 -9z" data-path="square" />
    </Svg>
  );
};