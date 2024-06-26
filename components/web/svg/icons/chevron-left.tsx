import { Svg, type SvgProps } from "../svg";

export const ChevronLeftIcon = ({ ...props }: SvgProps) => {
  return (
    <Svg {...props}>
      <path d="m15 18-6-6 6-6" />
    </Svg>
  );
};
