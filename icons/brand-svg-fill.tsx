import { Svg, type SvgProps } from "../components/web/svg";

export function Icon({ fill = "#fbb03c", ...props }: SvgProps) {
  return (
    <Svg currentFill="fill" {...{ fill, ...props }}>
      <path d="m22.41,10.58c-.79-.79-2.06-.79-2.85,0h-4.12l2.91-2.91c1.11,0,2.01-.9,2.01-2.01s-.9-2.01-2.01-2.01-2.01.9-2.01,2.01l-2.91,2.91v-4.12c.79-.79.79-2.06,0-2.85s-2.06-.79-2.85,0-.79,2.06,0,2.85v4.12l-2.91-2.91c0-1.11-.9-2.01-2.01-2.01s-2.01.9-2.01,2.01.9,2.01,2.01,2.01l2.91,2.91h-4.12c-.79-.79-2.06-.79-2.85,0s-.79,2.06,0,2.85,2.06.79,2.85,0h4.12l-2.91,2.91c-1.11,0-2.01.9-2.01,2.01s.9,2.01,2.01,2.01,2.01-.9,2.01-2.01l2.91-2.91v4.12c-.79.79-.79,2.06,0,2.85s2.06.79,2.85,0,.79-2.06,0-2.85v-4.12l2.91,2.91c0,1.11.9,2.01,2.01,2.01s2.01-.9,2.01-2.01-.9-2.01-2.01-2.01l-2.91-2.91h4.12c.79.79,2.06.79,2.85,0s.79-2.06,0-2.85" />
    </Svg>
  );
}