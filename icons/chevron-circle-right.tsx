import { Svg, type SvgProps } from "../components/web/svg/svg";

export const ChevronCircleRightIcon = ({ ...props }: SvgProps) => {
  return (
    <Svg {...props}>
      <path d="M11 9l3 3l-3 3" />
      <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0z" />
    </Svg>
  );
};
