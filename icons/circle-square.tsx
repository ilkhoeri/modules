import { Svg, type SvgProps } from "../components/web/svg/svg";

export const CircleSquareIcon = ({ ...props }: SvgProps) => {
  return (
    <Svg {...props}>
      <path d="M9.5 9.5m-6.5 0a6.5 6.5 0 1 0 13 0a6.5 6.5 0 1 0 -13 0" />
      <path d="M10 10m0 2a2 2 0 0 1 2 -2h7a2 2 0 0 1 2 2v7a2 2 0 0 1 -2 2h-7a2 2 0 0 1 -2 -2z" />
    </Svg>
  );
};
