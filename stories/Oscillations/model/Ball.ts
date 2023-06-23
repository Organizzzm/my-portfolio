export default class Ball {
  canvas!: HTMLCanvasElement;
  ctx!: CanvasRenderingContext2D;
  x = 0;
  y = 0;
  radius = 10;
  bodyColor = '#045BA8';
  glareColor = '#1588D4';

  constructor(canvasId: string) {
    this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
  }

  update(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  draw() {
    const { ctx } = this;

    ctx.beginPath();
    ctx.fillStyle = this.bodyColor;
    ctx.strokeStyle = this.glareColor;
    ctx.ellipse(this.x, this.y, this.radius, this.radius, 0, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.fillStyle = this.glareColor;
    ctx.ellipse(this.x - 3, this.y - 3, this.radius / 3, this.radius / 3, 0, 0, 2 * Math.PI);
    ctx.fill();
  }
}
