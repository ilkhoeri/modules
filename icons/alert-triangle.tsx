import { Svg, type SvgProps } from "../components/web/svg";

export function Icon({ ...props }: SvgProps) {
  return (
    <Svg {...props}>
      <path d="m10.36,4.18L2.26,17.85c-.53.92-.22,2.11.7,2.64.28.17.61.26.94.26h16.22c1.06-.01,1.9-.89,1.89-1.96,0-.33-.09-.66-.26-.94L13.64,4.18c-.55-.91-1.72-1.2-2.63-.65-.26.16-.49.39-.65.65h0Z" />
      <polygon points="11.76 8.35 12 14.25 12.24 8.35 11.76 8.35" />
      <path d="m12,17.65h.01" />
    </Svg>
  );
}
