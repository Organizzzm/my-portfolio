import * as React from "react";
import { SVGProps } from "react";
const SvgXxx = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.width || 24}
    height={props.height || 24}
    fill="none"
    {...props}
  >
    <path fill={props.color || "#222"} d="M8 7a2 2 0 1 1 4 0 2 2 0 0 1-4 0Z" />
    <path
      fill={props.color || "#222"}
      fillRule="evenodd"
      d="M0 10C0 4.477 4.477 0 10 0s10 4.477 10 10a9.977 9.977 0 0 1-3.443 7.55 7 7 0 0 0-13.114 0A9.977 9.977 0 0 1 0 10Zm10-7a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z"
      clipRule="evenodd"
    />
    <path
      fill={props.color || "#222"}
      d="m14.83 18.706.013.045A9.955 9.955 0 0 1 10 20a9.955 9.955 0 0 1-4.843-1.249 5 5 0 0 1 9.672-.045Z"
    />
    <path
      fill={props.color || "#222"}
      fillRule="evenodd"
      d="M1 10a9 9 0 1 0 18 0 9 9 0 0 0-18 0Zm9-10C4.477 0 0 4.477 0 10s4.477 10 10 10 10-4.477 10-10S15.523 0 10 0Z"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgXxx;
