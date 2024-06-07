import { Svg, SvgProps } from "./utils";

export const ExperimentIcon = ({ ...props }: SvgProps) => {
  return (
    <Svg {...props}>
      <path d="M12.77 10.82c.45 0 .81.36.81.81s-.36.81-.81.81-.81-.36-.81-.81.36-.81.81-.81zM9.7 2.5a1.3 1.3 0 0 0-1.3 1.3c0 .72.53 1.25 1.2 1.29v4.1l-6.05 7.72-.03.04-.02.04c-.22.39-.44.93-.44 1.59a2.94 2.94 0 0 0 2.92 2.92h12.04a2.93 2.93 0 0 0 2.92-2.92c0-.74-.33-1.3-.49-1.59l-.02-.04-6.03-7.62V5.08c.63-.09 1.11-.63 1.11-1.28a1.3 1.3 0 1 0-2.6 0 1.32 1.32 0 0 0 .11.53v5.48l2.86 3.61s-2.03-1.43-4.16.63c-1.9 1.83-4.33.23-4.33.23l3.45-4.42.15-.19V4.05c.02-.08.02-.16.02-.25a1.3 1.3 0 0 0-1.3-1.3h0z" />
    </Svg>
  );
};
