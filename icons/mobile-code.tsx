import { Svg, type SvgProps } from "../components/web/svg";

export const MobileCodeIcon = ({ ...props }: SvgProps) => {
  return (
    <Svg {...props}>
      <path d="M11.5 21h-3.5a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v8" />
      <path d="M20 21l2 -2l-2 -2" />
      <path d="M17 17l-2 2l2 2" />
      <path d="M11 4h2" />
      <path d="M12 17v.01" />
    </Svg>
  );
};
