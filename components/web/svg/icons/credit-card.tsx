import { Svg, type SvgProps } from "../svg";

export const CreditCardIcon = ({ ...props }: SvgProps) => {
  return (
    <Svg {...props}>
      <path d="M3 5m0 3a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v8a3 3 0 0 1 -3 3h-12a3 3 0 0 1 -3 -3z" />
      <path d="M3 10l18 0" />
      <path d="M7 15l.01 0" />
      <path d="M11 15l2 0" />
    </Svg>
  );
};
