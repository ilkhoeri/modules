import { Svg, type SvgProps } from "../components/web/svg/svg";

export const ArrowConnectedLeftIcon = ({ ...props }: SvgProps) => {
  return (
    <Svg {...props}>
      <path d="M13 12h-10" />
      <path d="M6 15l-3 -3l3 -3" />
      <path d="M17 12a2 2 0 1 1 4 0a2 2 0 0 1 -4 0z" />
    </Svg>
  );
};
