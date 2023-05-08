import * as React from "react";
import { SVGProps } from "react";
const SvgImgFill = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.width || 24}
    height={props.height || 24}
    fill="none"
    {...props}
  >
    <circle cx={17} cy={6} r={2} fill={props.color || "#222"} />
    <path
      fill={props.color || "#222"}
      stroke={props.color || "#222"}
      strokeWidth={2}
      d="M5.226 11.145 3.72 12.4c-.354.295-.531.443-.626.644-.094.202-.094.432-.094.893V16c0 1.886 0 2.828.586 3.414C4.172 20 5.114 20 7 20h9c1.886 0 2.828 0 3.414-.586C20 18.828 20 17.886 20 16v-.172c0-.408 0-.613-.076-.796-.076-.184-.22-.329-.51-.618l-1.113-1.113c-.828-.828-1.242-1.242-1.723-1.387a2 2 0 0 0-1.156 0c-.48.145-.895.559-1.723 1.387-.585.585-.878.878-1.189.932a1 1 0 0 1-.699-.134c-.268-.166-.431-.547-.758-1.308l-.118-.276c-.799-1.864-1.198-2.796-1.95-3.108a2 2 0 0 0-.61-.147c-.812-.063-1.59.586-3.149 1.885Z"
    />
  </svg>
);
export default SvgImgFill;
