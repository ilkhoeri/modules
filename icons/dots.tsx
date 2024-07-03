import { Svg, type SvgProps } from "../components/web/svg/svg";

export const DotsIcon = ({ ...props }: SvgProps) => {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="1" />
      <circle cx="19" cy="12" r="1" />
      <circle cx="5" cy="12" r="1" />
    </Svg>
  );
};
