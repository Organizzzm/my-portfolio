import * as React from "react";
import { SVGProps } from "react";
const SvgImgOutBoxDuotoneLine = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.width || 24}
    height={props.height || 24}
    fill="none"
    {...props}
  >
    <mask
      id="Img_out-box_duotone_line_svg__a"
      width={18}
      height={18}
      x={3}
      y={3}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: "alpha",
      }}
    >
      <path
        fill="#000"
        d="M3 11c0-3.771 0-5.657 1.172-6.828C5.343 3 7.229 3 11 3h2c3.771 0 5.657 0 6.828 1.172C21 5.343 21 7.229 21 11v2c0 3.771 0 5.657-1.172 6.828C18.657 21 16.771 21 13 21h-2c-3.771 0-5.657 0-6.828-1.172C3 18.657 3 16.771 3 13v-2Z"
      />
    </mask>
    <g mask="url(#Img_out-box_duotone_line_svg__a)">
      <path
        fill="#7E869E"
        fillOpacity={0.25}
        stroke={props.color || "#222"}
        strokeLinecap="round"
        strokeWidth={1.2}
        d="M12.898 14.788 4.366 5.402A1.228 1.228 0 0 0 3.456 5 2.457 2.457 0 0 0 1 7.457V15.5c0 3.771 0 5.657 1.172 6.828C3.343 23.501 5.229 23.501 9 23.501h8.034c.504 0 .755 0 .975-.024a4 4 0 0 0 3.422-2.936c.057-.214.095-.462.172-.96h0c.052-.337.078-.505.09-.665a4 4 0 0 0-1.192-3.149 8.847 8.847 0 0 0-.507-.439h0l-1.817-1.514a5.491 5.491 0 0 0-.414-.329 2 2 0 0 0-2.783.582c-.06.093-.123.218-.248.468h0c-.07.142-.106.213-.139.262a1 1 0 0 1-1.49.206 2.92 2.92 0 0 1-.205-.215h0Z"
      />
    </g>
    <path
      stroke={props.color || "#222"}
      strokeWidth={1.2}
      d="M21 11v2c0 3.771 0 5.657-1.172 6.828C18.657 21 16.771 21 13 21h-2c-3.771 0-5.657 0-6.828-1.172C3 18.657 3 16.771 3 13v-2c0-3.771 0-5.657 1.172-6.828C5.343 3 7.229 3 11 3h1"
    />
    <path
      fill={props.color || "#222"}
      d="M21 3v-.6h.6V3H21Zm-4.625 4.469a.6.6 0 1 1-.75-.938l.75.938ZM20.4 8V3h1.2v5h-1.2Zm.6-4.4h-5V2.4h5v1.2Zm.375-.131-5 4-.75-.938 5-4 .75.938Z"
    />
  </svg>
);
export default SvgImgOutBoxDuotoneLine;
