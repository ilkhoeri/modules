import { Svg, type SvgProps } from "../svg";

export const CSSIcon = ({ ...props }: SvgProps) => {
  return (
    <Svg {...props}>
      <path d="M20 4l-2 14.5l-6 2l-6 -2l-2 -14.5z" />
      <path d="M8.5 8h7l-4.5 4h4l-.5 3.5l-2.5 .75l-2.5 -.75l-.1 -.5" />
    </Svg>
  );
};
