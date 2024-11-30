import { Svg, type SvgProps } from "../components/web/svg";

export function Icon({ ...props }: SvgProps) {
  return (
    <Svg {...props}>
      <g data-d="server">
        <path d="M3 4m0 3a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v2a3 3 0 0 1 -3 3h-12a3 3 0 0 1 -3 -3z" />
        <path d="M12 20h-6a3 3 0 0 1 -3 -3v-2a3 3 0 0 1 3 -3h10.5" />
        <path d="M7 8v.01" />
        <path d="M7 16v.01" />
      </g>
      <g data-d="cog">
        <path d="M18 18m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
        <path d="M18 14.5v1.5" />
        <path d="M18 20v1.5" />
        <path d="M21.032 16.25l-1.299 .75" />
        <path d="M16.27 19l-1.3 .75" />
        <path d="M14.97 16.25l1.3 .75" />
        <path d="M19.733 19l1.3 .75" />
      </g>
    </Svg>
  );
}
