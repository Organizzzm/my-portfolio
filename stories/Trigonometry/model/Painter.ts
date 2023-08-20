export interface ILineParams {
  x0: number;
  y0: number;
  x1: number;
  y1: number;
  color: string;
  width?: number;
}
export interface IAngleParams {
  x0: number;
  y0: number;
  color: string;
  r?: number;
  degrees: number;
  radianDegrees: number;
}

export default class Painter {
  ctx: CanvasRenderingContext2D;

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
  }

  drawLine({ x0, y0, x1, y1, color, width = 2 }: ILineParams) {
    this.ctx.lineWidth = width;
    this.ctx.strokeStyle = color;

    this.ctx.beginPath();
    this.ctx.moveTo(x0, y0);
    this.ctx.lineTo(x1, y1);
    this.ctx.stroke();
  }

  drawAngle({ x0, y0, color, r = 30, degrees, radianDegrees }: IAngleParams) {
    this.ctx.save();
    this.ctx.fillStyle = color;
    this.ctx.globalAlpha = 0.2;

    this.ctx.beginPath();

    if (degrees === 90) {
      this.ctx.moveTo(x0, y0);
      this.ctx.rect(x0, y0, r, r);
    } else {
      this.ctx.moveTo(x0, y0);
      this.ctx.arc(x0, y0, r, 0, radianDegrees, true);
    }

    this.ctx.fill();
    this.ctx.restore();
  }
}
