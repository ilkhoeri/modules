import { Svg, type SvgProps } from "../svg";

export const GoogleColorIcon = ({ ...props }: SvgProps) => {
  return (
    <Svg {...props}>
      <path
        fill="#ffc107"
        d="M21.8 13.98c.05-.27.2-1.64.2-1.98l-.04-.86c0-.09-.02-.18-.03-.27L21.8 10H12v4h5.65c-.1.28-.52 1.06-.59 1.18a12.82 12.82 0 0 1-.6.8c-.07.08-.51.51-.66.63-1.04.86-2.35 1.39-3.8 1.39-3.31 0-6-2.69-6-6s2.69-6 6-6a5.98 5.98 0 0 1 3.98 1.52l2.83-2.83C17.02 3.03 14.63 2 12 2 6.48 2 2 6.48 2 12s4.48 10 10 10a9.93 9.93 0 0 0 6.7-2.6c-.15.14 2.33-1.72 3.08-5.33 0-.03.01-.06.02-.09z"
      />
      <path
        fill="#ff3d00"
        d="M3.15 7.35l3.29 2.41C7.33 7.56 9.48 6 12 6a5.98 5.98 0 0 1 3.98 1.52l2.83-2.83C17.02 3.03 14.63 2 12 2 8.16 2 4.83 4.17 3.15 7.35z"
      />
      <path
        fill="#4caf50"
        d="M12 22a9.93 9.93 0 0 0 6.7-2.6l-3.1-2.62A5.95 5.95 0 0 1 11.99 18c-2.6 0-4.81-1.66-5.64-3.97l-3.26 2.51C4.74 19.78 8.11 22 11.99 22z"
      />
      <path
        fill="#1976d2"
        d="M21.8 10H12v4h5.65a6.14 6.14 0 0 1-2.04 2.79l3.1 2.62c-.22.2 3.3-2.4 3.3-7.4 0-1.01-.2-2-.2-2z"
      />
    </Svg>
  );
};