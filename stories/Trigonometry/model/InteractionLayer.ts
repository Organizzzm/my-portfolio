import { cosByRadians, getQuadrant, sinByRadians, tgByRadians } from '~/src/utils/math';
import Painter from '~/stories/Trigonometry/model/Painter';

export default class Interaction {
  private ctx: CanvasRenderingContext2D;
  private painter: Painter;

  private top: number;
  private left: number;
  private r: number;

  private x: number;
  private y: number;

  private minTextWidth = 20;
  private colors = {
    angle: '#E06BFD',
    radius: '#C1C1C1',
    sin: '#36E275',
    cos: '#4954F8',
    tg: '#FFBF00',
    ctg: '#F41B1B',
    sec: '#FE85B2',
    csc: '#80CCFF',
  } as const;

  private quadrant!: number;
  private centerOfTangentX!: number;
  private centerOfTangentY!: number;
  private tgTextPosX!: number;
  private secTextPosX!: number;
  private scsTextPosY!: number;
  private isTgQuadrant!: boolean;
  private isCtgQuadrant!: boolean;

  constructor(id: string, radius: number, left: number, top: number) {
    const canvas = document.getElementById(id) as HTMLCanvasElement;
    this.ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

    this.painter = new Painter(this.ctx);

    this.top = top;
    this.left = left;
    this.r = radius;

    this.x = radius;
    this.y = 0;
  }

  private get radianDegrees() {
    return Math.atan2(this.y, this.x);
  }

  private get tangentPos() {
    return {
      x: this.r * Math.cos(this.radianDegrees),
      y: this.r * Math.sin(this.radianDegrees),
    };
  }

  private get secX() {
    return this.r / Math.cos(this.radianDegrees);
  }

  private get cscY() {
    return this.r / Math.sin(this.radianDegrees);
  }

  private get degrees() {
    let angleInDegrees = (-this.radianDegrees * 180) / Math.PI;

    if (angleInDegrees < 0) {
      angleInDegrees += 360;
    }

    /** 0 degress show as 360 */
    if (Math.round(angleInDegrees) === 0) {
      angleInDegrees = 360;
    }

    return angleInDegrees;
  }

  plot(): void {
    const { ctx, left, top, tangentPos, radianDegrees, degrees, painter, minTextWidth, secX, cscY, colors } = this;
    this.quadrant = getQuadrant(radianDegrees);
    this.centerOfTangentX = tangentPos.x / 2;
    this.centerOfTangentY = tangentPos.y / 2;
    this.secTextPosX = secX / 2;
    this.scsTextPosY = (cscY - tangentPos.y) / 2 + tangentPos.y;
    this.tgTextPosX = (secX - tangentPos.x) / 2 + tangentPos.x;
    this.isTgQuadrant = this.quadrant == 2 || this.quadrant === 3;
    this.isCtgQuadrant = this.quadrant < 3;

    ctx.clearRect(0, 0, left * 2, top * 2);

    ctx.save();
    ctx.translate(left, top);

    painter.defineStyles({
      textAlign: 'center',
      textBaseline: 'middle',
      font: 'normal 14px Helvetica, Arial, sans-serif',
    });

    // Draw radius
    painter.drawLine({ x0: 0, y0: 0, x1: tangentPos.x, y1: tangentPos.y, color: colors.radius });

    // Draw cos
    painter.drawLine({ x0: 0, y0: 0, x1: tangentPos.x, y1: 0, color: colors.cos });
    painter.drawText({ text: 'Cos', x: this.centerOfTangentX, y: -10, options: { fillStyle: colors.cos } });

    // Draw sin
    painter.drawLine({ x0: tangentPos.x, y0: 0, x1: tangentPos.x, y1: tangentPos.y, color: colors.sin });
    painter.drawText({
      text: 'Sin',
      x: tangentPos.x - minTextWidth,
      y: this.centerOfTangentY,
      options: { fillStyle: colors.sin },
    });

    // Draw tg
    painter.drawLine({ x0: tangentPos.x, y0: tangentPos.y, x1: secX, y1: 0, color: colors.tg });
    painter.drawText({
      text: 'Tg',
      x: this.isTgQuadrant ? this.tgTextPosX - minTextWidth : this.tgTextPosX + minTextWidth,
      y: this.centerOfTangentY,
      options: { fillStyle: colors.tg },
    });

    // Draw ctg
    painter.drawLine({ x0: tangentPos.x, y0: tangentPos.y, x1: 0, y1: cscY, color: colors.ctg });
    painter.drawText({
      text: 'Ctg',
      x: this.centerOfTangentX,
      y: this.isCtgQuadrant ? this.scsTextPosY - minTextWidth : this.scsTextPosY + minTextWidth,
      options: { fillStyle: colors.ctg },
    });

    // Draw sec
    painter.drawLine({ x0: tangentPos.x, y0: 0, x1: secX, y1: 0, color: colors.sec });
    painter.drawText({ text: 'Sec', x: this.secTextPosX, y: 10, options: { fillStyle: colors.sec } });

    // Draw csc
    painter.drawLine({ x0: 0, y0: 0, x1: 0, y1: cscY, color: colors.csc });
    painter.drawText({ text: 'Csc', x: -minTextWidth, y: cscY / 2, options: { fillStyle: colors.csc } });

    // Draw angle
    painter.drawAngle({ x0: 0, y0: 0, color: colors.angle, degrees, radianDegrees });

    // Draw legend
    painter.defineStyles({
      textAlign: 'right',
      textBaseline: 'middle',
      font: 'normal 18px Helvetica, Arial, sans-serif',
    });

    painter.drawText({
      text: `Sin(${degrees.toFixed()}°) = ${-sinByRadians(radianDegrees)}`,
      x: left,
      y: -top + 20,
      options: { fillStyle: colors.sin },
    });

    painter.drawText({
      text: `Cos(${degrees.toFixed()}°) = ${cosByRadians(radianDegrees)}`,
      x: left,
      y: -top + 50,
      options: { fillStyle: colors.cos },
    });

    painter.drawText({
      text: `Tg(${degrees.toFixed()}°) = ${-tgByRadians(radianDegrees)}`,
      x: left,
      y: -top + 80,
      options: { fillStyle: colors.tg },
    });

    ctx.restore();
  }

  update(x: number, y: number): void {
    this.x = x - this.left;
    this.y = y - this.top;

    this.plot();
  }
}
