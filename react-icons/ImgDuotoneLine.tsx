import * as React from "react";
import { SVGProps } from "react";
const SvgImgDuotoneLine = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.width || 24}
    height={props.height || 24}
    fill="none"
    {...props}
  >
    <circle cx={17} cy={6} r={2} fill={props.color || "#222"} />
    <path
      fill="#7E869E"
      fillOpacity={0.25}
      stroke={props.color || "#222"}
      strokeWidth={1.2}
      d="m11.053 12.791-.668-1.56c-.295-.688-.442-1.031-.628-1.255a2 2 0 0 0-2.329-.559c-.266.115-.554.355-1.129.834-.764.636-1.146.955-1.467 1.306a7 7 0 0 0-1.768 3.774C3 15.803 3 16.311 3 17.328c0 .62 0 .93.065 1.179a2 2 0 0 0 1.428 1.428c.25.065.553.065 1.16.065h11.612c.684 0 1.026 0 1.304-.083a2 2 0 0 0 1.348-1.348c.083-.278.083-.62.083-1.304 0-.598 0-.897-.041-1.183a4 4 0 0 0-.753-1.818c-.173-.231-.385-.443-.808-.866l-.21-.21c-.722-.722-1.082-1.082-1.491-1.234a2 2 0 0 0-1.394 0c-.409.152-.77.512-1.49 1.234l-.114.113c-.585.585-.878.878-1.189.932a1 1 0 0 1-.699-.134c-.268-.166-.431-.547-.758-1.308Z"
    />
  </svg>
);
export default SvgImgDuotoneLine;
