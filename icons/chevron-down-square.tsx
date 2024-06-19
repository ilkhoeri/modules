import { Svg, SvgProps } from "./utils";

export const ChevronDownSquareIcon = ({ ...props }: SvgProps) => {
  return (
    <Svg {...props}>
      <path d="M15 11l-3 3l-3 -3" />
      <path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9 -9 9s-9 -1.8 -9 -9s1.8 -9 9 -9z" data-d="square" />
    </Svg>
  );
};
