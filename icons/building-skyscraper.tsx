import { Svg, type SvgProps } from "../components/web/svg/svg";

export const BuildingSkyscraperIcon = ({ ...props }: SvgProps) => {
  return (
    <Svg {...props}>
      <path d="M3 21l18 0" />
      <path d="M5 21v-14l8 -4v18" />
      <path d="M19 21v-10l-6 -4" />
      <path d="M9 9l0 .01" />
      <path d="M9 12l0 .01" />
      <path d="M9 15l0 .01" />
      <path d="M9 18l0 .01" />
    </Svg>
  );
};
