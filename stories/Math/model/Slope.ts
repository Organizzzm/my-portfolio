interface ISlopeCtor {
  id: string;
  width: number;
  height: number;
  xRange: number;
  yRange: number;
  slope: string;
  points: string;
  incLine: string;
  decLine: string;
}

export default class Slope {
  readonly ctx: CanvasRenderingContext2D;

  private width_orig: number;
  private height_orig: number;
  private slopeColor: string;
  private pointsColor: string;
  private incLineColor: string;
  private decLineColor: string;
  private x0: number;
  private y0: number;
  private xPadding = 30;
  private yPadding = 20;
  xStep: number;
  yStep: number;

  constructor({ id, width, height, xRange, yRange, slope, points, incLine, decLine }: ISlopeCtor) {
    const canvas = document.getElementById(id) as HTMLCanvasElement;
    this.ctx = canvas.getContext('2d', { alpha: false }) as CanvasRenderingContext2D;

    this.width_orig = width;
    this.height_orig = height;
    this.slopeColor = slope;
    this.pointsColor = points;
    this.incLineColor = incLine;
    this.decLineColor = decLine;

    this.x0 = width / 2;
    this.y0 = height - this.yPadding;

    this.xStep = (width - this.xPadding * 2) / xRange;
    this.yStep = (height - this.yPadding * 2) / yRange;
  }

  plot(x1: number, x2: number, y1: number, y2: number) {
    const { ctx, pointsColor, slopeColor, incLineColor, decLineColor, xStep, yStep, x0, y0 } = this;

    ctx.clearRect(0, 0, this.width_orig, this.height_orig);

    const derivative = ((y2 - y1) * yStep) / ((x2 - x1) * xStep);
    const angle = Math.atan(derivative);

    // First poin
    const x = x0 + x1 * xStep;
    const y = y0 - y1 * yStep;

    // Second point
    const xA = x0 + x2 * xStep;
    const yA = y0 - y2 * yStep;

    // Tangent
    const t0x = x - 100 * Math.cos(angle);
    const t0y = y + 100 * Math.sin(angle);
    const tx = xA + 100 * Math.cos(angle);
    const ty = yA - 100 * Math.sin(angle);

    // Draw tangent
    ctx.strokeStyle = getTangentColor(angle, slopeColor, incLineColor, decLineColor);
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';

    ctx.beginPath();
    ctx.moveTo(t0x, t0y);
    ctx.lineTo(tx, ty);
    ctx.stroke();
    ctx.closePath();

    // Draw slope
    ctx.strokeStyle = slopeColor;
    ctx.lineWidth = 3;

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(xA, yA);
    ctx.stroke();

    // Draw poins
    ctx.fillStyle = pointsColor;
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 3;

    // * first point
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.arc(x, y, 5, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();

    // * second point
    ctx.moveTo(xA, yA);
    ctx.arc(xA, yA, 5, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();
  }
}

function getTangentColor(angle: number, middle: string, inc: string, dec: string): string {
  if (angle > 0) return inc;
  if (angle < 0) return dec;
  return middle;
}
