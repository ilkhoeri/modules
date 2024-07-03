import { Svg, type SvgProps } from "../components/web/svg/svg";

export const PencilIcon = ({ ...props }: SvgProps) => {
  return (
    <Svg {...props}>
      <path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" />
      <path d="M13.5 6.5l4 4" />
    </Svg>
  );
};
