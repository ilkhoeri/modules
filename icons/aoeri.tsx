export type AOERIiconProps = {
  h?: number | string;
  w?: number | string;
  size?: number | string;
} & Omit<React.SVGProps<SVGSVGElement>, "children">;

const AOERIicon = ({ size = 36, h, w, className, ...svg }: AOERIiconProps) => {
  return (
    <svg
      fill="currentColor"
      stroke="currentColor"
      aria-label="AOERIicon"
      strokeWidth={0}
      height={h || size}
      width={w || size}
      className={className ?? "__ioeri__"}
      aria-hidden="true"
      viewBox="0 0 48 48"
      xmlns="http://www.w3.org/2000/svg"
      {...svg}
    >
      <path d="M33.6,4.8c5.3,0,9.6,4.3,9.6,9.6v19.2c0,5.3-4.3,9.6-9.6,9.6H14.4c-5.3,0-9.6-4.3-9.6-9.6V14.4 c0-5.3,4.3-9.6,9.6-9.6L33.6,4.8 M33.6,0H14.4C6.4,0,0,6.4,0,14.4v19.2C0,41.6,6.4,48,14.4,48h19.2c8,0,14.4-6.4,14.4-14.4V14.4 C48,6.4,41.6,0,33.6,0L33.6,0z" />
      <path d="M8.5,14.8c-1.1-1.1-1.1-2.9,0-4.1s2.9-1.1,4.1,0l4.4,4.4c3.6,3.6,3.6,9.3,0,12.9l-4.4,4.4 c-1.1,1.1-2.9,1.1-4.1,0c-1.1-1.1-1.1-2.9,0-4.1l4.4-4.4c1.3-1.3,1.3-3.4,0-4.8L8.5,14.8L8.5,14.8z" />
      <path d="M29.3,30.7H18.7c-1.3,0-2.4,1.1-2.4,2.4c0,1.3,1.1,2.4,2.4,2.4h10.6c1.3,0,2.4-1.1,2.4-2.4 C31.7,31.8,30.6,30.7,29.3,30.7z" />
      <path d="M34.1,15.4c-3.4,0-6.2,2.8-6.2,6.2s2.8,6.2,6.2,6.2s6.2-2.8,6.2-6.2S37.5,15.4,34.1,15.4z M34.1,24.5 c-1.6,0-2.9-1.3-2.9-2.9s1.3-2.9,2.9-2.9c1.6,0,2.9,1.3,2.9,2.9S35.7,24.5,34.1,24.5z" />
    </svg>
  );
};
export default AOERIicon;
