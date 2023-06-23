export default class Path {
  canvas!: HTMLCanvasElement;
  ctx!: CanvasRenderingContext2D;
  x = 10;
  y = 10;
  lineColor = '#ff0000';

  constructor(canvasId: string) {
    this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
  }

  draw(x: number[], y: number[], time: number) {
    const { ctx, lineColor } = this;

    ctx.beginPath();
    ctx.strokeStyle = lineColor;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    ctx.moveTo(x[0], y[0]);

    for (let i = 1; i < time; i++) {
      ctx.lineTo(x[i], y[i]);
    }

    ctx.stroke();
  }
}
