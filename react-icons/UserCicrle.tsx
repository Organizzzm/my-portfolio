import * as React from "react";
import { SVGProps } from "react";
const SvgUserCicrle = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.width || 24}
    height={props.height || 24}
    fill="none"
    {...props}
  >
    <path
      fill="#33363F"
      fillRule="evenodd"
      d="M12 8a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-4 2a4 4 0 1 1 8 0 4 4 0 0 1-8 0Z"
      clipRule="evenodd"
    />
    <path
      fill="#33363F"
      d="M17.78 18.826a.286.286 0 0 0 .134-.355c-.386-.966-1.128-1.818-2.133-2.438C14.697 15.363 13.367 15 12 15s-2.697.363-3.781 1.033c-1.005.62-1.747 1.471-2.133 2.438a.286.286 0 0 0 .133.355 12.011 12.011 0 0 0 11.561 0Z"
    />
    <path
      fill="#33363F"
      fillRule="evenodd"
      d="M12 4a8 8 0 1 0 0 16 8 8 0 0 0 0-16ZM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Z"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgUserCicrle;
