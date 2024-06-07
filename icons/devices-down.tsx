import { Svg, SvgProps } from "./utils";

export const DevicesDownIcon = ({ ...props }: SvgProps) => {
  return (
    <Svg {...props}>
      <path d="M13 16.5v-7.5a1 1 0 0 1 1 -1h6a1 1 0 0 1 1 1v3.5" />
      <path d="M18 8v-3a1 1 0 0 0 -1 -1h-13a1 1 0 0 0 -1 1v12a1 1 0 0 0 1 1h8" />
      <path d="M19 16v6" />
      <path d="M22 19l-3 3l-3 -3" />
      <path d="M16 9h2" />
    </Svg>
  );
};
