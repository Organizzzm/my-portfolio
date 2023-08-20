export default class Circle {
  ctx: CanvasRenderingContext2D;

  top: number;
  left: number;
  r: number;
  minR: number;

  indicesNumber = 360 / 15; // Count of indices with step 15 degrees.
  indiceLength = 10; // px
  indiceStepSize = (Math.PI * 2) / 24;

  constructor(id: string, radius: number, left: number, top: number) {
    const canvas = document.getElementById(id) as HTMLCanvasElement;
    this.ctx = canvas.getContext('2d', { alpha: false }) as CanvasRenderingContext2D;

    this.top = top;
    this.left = left;
    this.r = radius;
    this.minR = radius - this.indiceLength;
  }

  plot() {
    const { ctx, left, top, r, minR, indiceStepSize, indicesNumber } = this;

    ctx.save();
    ctx.translate(left, top);

    // Draw cross
    ctx.save();
    ctx.strokeStyle = '#E06BFD';
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.moveTo(0, r);
    ctx.lineTo(0, -r);
    ctx.moveTo(r, 0);
    ctx.lineTo(-r, 0);
    ctx.closePath();
    ctx.stroke();

    ctx.restore();

    // Draw indices.
    ctx.save();
    ctx.strokeStyle = '#EEEEEE';
    ctx.beginPath();
    ctx.arc(0, 0, r, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.stroke();
    ctx.restore();

    for (let i = 1; i <= indicesNumber; i++) {
      ctx.save();
      ctx.beginPath();
      ctx.rotate(i * indiceStepSize);
      ctx.moveTo(r, 0);
      ctx.lineTo(minR, 0);
      ctx.closePath();
      ctx.stroke();
      ctx.restore();
    }

    // Draw numbers
    ctx.save();
    ctx.font = '10pt Arial';
    ctx.fillStyle = '#024F8C';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    for (let n = 0; n < indicesNumber; n++) {
      const theta = -n * indiceStepSize;
      const x = r * 1.08 * Math.cos(theta);
      const y = r * 1.08 * Math.sin(theta);
      ctx.fillText((n * 15).toString() + '°', x, y + 2);
    }

    ctx.restore();

    ctx.restore();
  }
}
