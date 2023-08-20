import Painter from '~/stories/Trigonometry/model/Painter';

export default class Interaction {
  ctx: CanvasRenderingContext2D;
  painter: Painter;

  top: number;
  left: number;
  r: number;

  x: number;
  y: number;

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

  get radianDegrees() {
    return Math.atan2(this.y, this.x);
  }

  get tangentPosition() {
    return {
      x: this.r * Math.cos(this.radianDegrees),
      y: this.r * Math.sin(this.radianDegrees),
    };
  }

  get tg() {
    return this.r / Math.cos(this.radianDegrees);
  }

  get ctg() {
    return this.r / Math.sin(this.radianDegrees);
  }

  get degrees() {
    let angleInDegrees = (-this.radianDegrees * 180) / Math.PI;

    if (angleInDegrees < 0) {
      angleInDegrees += 360;
    }

    return angleInDegrees;
  }

  plot() {
    const { ctx, left, top, tangentPosition, radianDegrees, degrees, painter } = this;

    ctx.clearRect(0, 0, left * 2, top * 2);

    ctx.save();
    ctx.translate(left, top);

    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = 'normal 14px Helvetica, Arial, sans-serif';

    // Draw radius
    painter.drawLine({
      x0: 0,
      y0: 0,
      x1: tangentPosition.x,
      y1: tangentPosition.y,
      color: '#C1C1C1',
    });

    // Draw cos
    painter.drawLine({
      x0: 0,
      y0: 0,
      x1: tangentPosition.x,
      y1: 0,
      color: '#4954F8',
    });

    ctx.fillStyle = '#4954F8';
    ctx.fillText('cos', tangentPosition.x / 2, -10);

    // Draw sin
    painter.drawLine({
      x0: tangentPosition.x,
      y0: 0,
      x1: tangentPosition.x,
      y1: tangentPosition.y,
      color: '#36E275',
    });

    ctx.fillStyle = '#36E275';
    ctx.fillText('sin', tangentPosition.x - ctx.measureText('sin').width + 3, tangentPosition.y / 2);

    // Draw angle
    painter.drawAngle({
      x0: 0,
      y0: 0,
      color: '#E06BFD',
      degrees,
      radianDegrees,
    });

    // Draw tg
    ctx.strokeStyle = '#FFBF00';
    ctx.fillStyle = '#FFBF00';

    ctx.beginPath();
    ctx.moveTo(tangentPosition.x, tangentPosition.y);
    ctx.lineTo(this.tg, 0);
    ctx.stroke();

    if (radianDegrees < -1.5 || radianDegrees > 1.5) {
      ctx.fillText(
        'tg',
        (this.tg - tangentPosition.x) / 2 + tangentPosition.x - ctx.measureText('tg').width - 10,
        tangentPosition.y / 2
      );
    } else {
      ctx.fillText(
        'tg',
        (this.tg - tangentPosition.x) / 2 + tangentPosition.x + ctx.measureText('tg').width + 10,
        tangentPosition.y / 2
      );
    }

    // Draw ctg
    ctx.strokeStyle = '#F41B1B';
    ctx.fillStyle = '#F41B1B';

    ctx.beginPath();
    ctx.moveTo(tangentPosition.x, tangentPosition.y);
    ctx.lineTo(0, this.ctg);
    ctx.stroke();

    if (radianDegrees < 0 || radianDegrees > 3) {
      ctx.fillText(
        'ctg',
        tangentPosition.x / 2,
        (this.ctg - tangentPosition.y) / 2 + tangentPosition.y - ctx.measureText('ctg').width - 5
      );
    } else {
      ctx.fillText(
        'ctg',
        tangentPosition.x / 2,
        (this.ctg - tangentPosition.y) / 2 + tangentPosition.y + ctx.measureText('ctg').width + 5
      );
    }

    // Draw sec
    ctx.strokeStyle = '#FE85B2';
    ctx.fillStyle = '#FE85B2';

    ctx.beginPath();
    ctx.moveTo(tangentPosition.x, 0);
    ctx.lineTo(this.tg, 0);
    ctx.stroke();

    ctx.fillText('sec', (this.tg - tangentPosition.x) / 2 + tangentPosition.x, 10);

    // Draw csc
    ctx.strokeStyle = '#80CCFF';
    ctx.fillStyle = '#80CCFF';

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, this.ctg);
    ctx.stroke();

    ctx.fillText('csc', -ctx.measureText('csc').width, this.ctg / 2);

    ctx.restore();
  }

  update(x: number, y: number) {
    this.x = x - this.left;
    this.y = y - this.top;
  }
}
