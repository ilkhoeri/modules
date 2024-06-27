import { Svg, type SvgProps } from "../svg";

export const BracketsIcon = ({ ...props }: SvgProps) => {
  return (
    <Svg {...props}>
      <path d="M9 12h6" />
      <path d="M12 9v6" />
      <path d="M6 19a2 2 0 0 1 -2 -2v-4l-1 -1l1 -1v-4a2 2 0 0 1 2 -2" />
      <path d="M18 19a2 2 0 0 0 2 -2v-4l1 -1l-1 -1v-4a2 2 0 0 0 -2 -2" />
    </Svg>
  );
};
