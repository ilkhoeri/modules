import { Svg, SvgProps } from "./utils";

export const GalleryHorizontalEndIcon = ({ ...props }: SvgProps) => {
  return (
    <Svg {...props}>
      <path d="M2 7v10" />
      <path d="M6 5v14" />
      <rect width="12" height="18" x="10" y="3" rx="2" />
    </Svg>
  );
};
