import { Svg, type SvgProps } from "../components/web/svg/svg";

export const PickColorIcon = ({ ...props }: SvgProps) => {
  return (
    <Svg {...props}>
      <path d="M11 7l6 6" />
      <path d="M4 16l11.7 -11.7a1 1 0 0 1 1.4 0l2.6 2.6a1 1 0 0 1 0 1.4l-11.7 11.7h-4v-4z" />
    </Svg>
  );
};
