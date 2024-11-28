import { Svg, type SvgProps } from "../components/web/svg";

export const MapPinIcon = ({ ...props }: SvgProps) => {
  return (
    <Svg {...props}>
      <path d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
      <path d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z" />
    </Svg>
  );
};
