export default class CouplingRod {
  canvas!: HTMLCanvasElement;
  ctx!: CanvasRenderingContext2D;
  xMin = 0;
  xMax = 0;
  y = 0;
  lineColor = '#069628';

  constructor(canvasId: string) {
    this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
  }

  draw() {
    const { ctx, xMin, xMax, y } = this;

    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = this.lineColor;
    ctx.setLineDash([5]);
    ctx.moveTo(xMin, y);
    ctx.lineTo(xMax, y);
    ctx.stroke();
    ctx.restore();
  }
}
