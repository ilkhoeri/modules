import { Svg, type SvgProps } from "../components/web/svg";

export function Icon({ fill, role = "img", ...props }: SvgProps) {
  return (
    <Svg
      currentFill="fill"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...{ fill, role, ...props }}
    >
      <defs>
        <linearGradient
          id="triangle"
          x1="3.45"
          y1="17.82"
          x2="16.22"
          y2=".47"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#41d1ff" />
          <stop offset="1" stopColor="#bd34fe" />
        </linearGradient>
        <linearGradient
          id="blitz"
          x1="12.56"
          y1="24.75"
          x2="14.88"
          y2="8.81"
          gradientTransform="translate(0 26) scale(1 -1)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#ffea83" />
          <stop offset=".08" stopColor="#ffdd35" />
          <stop offset="1" stopColor="#ffa800" />
        </linearGradient>
      </defs>
      <path
        d="m22.32,3.43l-5.43.99-.49,1.68,1.84-.35c.05,0,.1-.01.15-.01.27,0,.52.14.66.37.14.23.16.52.03.76l-6.22,12.42s-.02.03-.03.05l-.11.17c-.14.22-.39.36-.65.36-.24,0-.47-.11-.61-.29-.15-.18-.2-.42-.16-.65l.93-4.5-.96.29c-.07.02-.15.03-.23.03-.23,0-.45-.1-.6-.29-.15-.18-.21-.42-.16-.65l.56-2.76-1.79.41c-.06.01-.12.02-.18.02-.21,0-.42-.09-.57-.25-.15-.16-.22-.37-.21-.58l.36-6.03L1.67,3.43c-.47-.08-.82.42-.59.83l10.53,18.46c.22.38.76.38.98,0L22.91,4.26c.23-.41-.12-.91-.59-.83Z"
        fill={fill || "url(#triangle)"}
      />
      <path
        d="m16.93,1.01l-7.64,1.5c-.13.02-.22.13-.23.26l-.47,7.94c-.01.19.16.33.34.29l2.13-.49c.2-.05.38.13.34.33l-.63,3.09c-.04.21.15.39.36.32l1.31-.4c.2-.06.4.12.36.33l-1,4.86c-.06.3.34.47.51.21l.11-.17,6.22-12.42c.1-.21-.08-.45-.3-.4l-2.19.42c-.21.04-.38-.15-.32-.35l1.43-4.95c.06-.2-.12-.39-.32-.35Z"
        fill={fill || "url(#blitz)"}
      />
    </Svg>
  );
}
