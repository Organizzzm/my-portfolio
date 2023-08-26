type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
type HEX = `#${string}`;

type Color = RGB | RGBA | HEX;

export type LineParams = {
  x0: number;
  y0: number;
  x1: number;
  y1: number;
  color: Color;
  width?: number;
};

export type AngleParams = {
  x0: number;
  y0: number;
  color: Color;
  degrees: number;
  radianDegrees: number;
  r?: number;
};

export type TextParams = {
  text: string;
  x: number;
  y: number;
  options?: Partial<CanvasRenderingContext2D>;
};

export default class Painter {
  private ctx: CanvasRenderingContext2D;

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
  }

  drawLine({ x0, y0, x1, y1, color, width = 2 }: LineParams) {
    this.ctx.lineWidth = width;
    this.ctx.strokeStyle = color;

    this.ctx.beginPath();
    this.ctx.moveTo(x0, y0);
    this.ctx.lineTo(x1, y1);
    this.ctx.stroke();
  }

  drawAngle({ x0, y0, color, r = 30, degrees, radianDegrees }: AngleParams) {
    this.ctx.save();
    this.ctx.fillStyle = color;
    this.ctx.globalAlpha = 0.2;

    if (degrees === 90) {
      this.ctx.moveTo(x0, y0);
      this.ctx.rect(x0, y0, r, -r);
    } else {
      this.ctx.moveTo(x0, y0);
      this.ctx.arc(x0, y0, r, 0, radianDegrees, true);
    }

    this.ctx.fill();
    this.ctx.restore();
  }

  drawText({ text, x, y, options }: TextParams) {
    if (options) this.ctx = Object.assign(this.ctx, options);
    this.ctx.fillText(text, x, y);
  }

  defineStyles(options: Partial<CanvasRenderingContext2D>) {
    this.ctx = Object.assign(this.ctx, options);
  }
}
