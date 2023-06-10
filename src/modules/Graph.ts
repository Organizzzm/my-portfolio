import { formatNumber } from '~/src/utils/number-format';

interface IConstructorParams {
  id: string;
  width: number;
  height: number;
}

interface IGridParams {
  xmin: number;
  xmax: number;
  ymin: number;
  ymax: number;
  xstep: number;
  ystep: number;
}

export default class Graph {
  // canvas context on which to draw graph instance
  ctx: CanvasRenderingContext2D;

  // original width and height of graph in pixels
  width_orig!: number;
  height_orig!: number;

  // overal width and height of axes in pixels
  x_width!: number;
  y_height!: number;

  // overal padding
  x_padding = 20;
  y_padding = 20;

  // grid dimentions
  xmajor = 1;
  ymajor = 2;
  xminor = 0.2;
  yminor = 0.4;

  // minimum/maximum in pixels
  x_min!: number;
  x_max!: number;
  y_min!: number;
  y_max!: number;

  // // location of origin (in pixels)
  x_orig = 0;
  y_orig = 0;

  // scaling used in displaying values on the axes
  x_displ_scal!: number;
  y_displ_scal!: number;

  // range of grid lines
  x_tick_major = 0;
  x_tick_minor = 0;
  y_tick_major = 0;
  y_tick_minor = 0;

  // axes labels
  xlabel = 'X';
  ylabel = 'Y';

  // width and height of textbox used for displaying values on the axes
  tw = 7;
  th = 7;

  // min and max of x and y relative to origin (in pixels)
  x_min_rel = 0;
  x_max_rel = 0;
  y_min_rel = 0;
  y_max_rel = 0;

  // min and max of x and y absolute (in pixels)
  x_min_abs = 0;
  x_max_abs = 0;
  y_min_abs = 0;
  y_max_abs = 0;

  // // obvious
  // x_tick_major = 0;
  // x_tick_minor = 0;
  // y_tick_major = 0;
  // y_tick_minor = 0;
  // // declarations for quantities to be used later
  // // x_min: number;
  // // x_max: number;
  // // y_min: number;
  // // y_max: number;
  // xx = 0;
  // yy = 0;
  // x_displ = 0;
  // y_displ = 0;
  // txpos: number;
  // typos: number;

  // w_padding = 50;
  // h_padding = 50;
  // x_padding = 25;
  // y_padding = 10;

  constructor({ id, width, height }: IConstructorParams) {
    const canvas = document.getElementById(id) as HTMLCanvasElement;
    this.ctx = canvas.getContext('2d', { alpha: false }) as CanvasRenderingContext2D;

    this.width_orig = width;
    this.height_orig = height;

    this.x_width = width - this.x_padding * 2;
    this.y_height = height - this.y_padding * 2;

    // this.x_orig = width / 2;
    // this.y_orig = height / 2;

    this.x_min = this.x_padding;
    this.x_max = width - this.x_padding;

    this.y_min = this.y_padding;
    this.y_max = height - this.y_padding;

    // // min and max of x and y relative to origin (in pixels)
    // this.x_min_rel = xmin / this.x_displ_scal;
    // this.x_max_rel = xmax / this.x_displ_scal;
    // this.y_min_rel = ymin / this.y_displ_scal;
    // this.y_max_rel = ymax / this.y_displ_scal;
    // // convert to absolute coordinates
    // this.x_min = this.x_min_rel + this.x_orig;
    // this.x_max = this.x_max_rel + this.x_orig;
    // this.y_min = this.y_orig - this.y_min_rel;
    // this.y_max = this.y_orig - this.y_max_rel;
    // this.txpos = this.x_orig - this.tw;
    // this.typos = this.y_orig;
  }

  fillChart({ xmin, xmax, ymin, ymax, xstep, ystep }: IGridParams) {
    this.x_displ_scal = (xmax - xmin) / this.x_width;
    this.y_displ_scal = (ymax - ymin) / this.y_height;

    this.xmajor = xstep;
    this.ymajor = ystep;
    this.xminor = xstep / 5;
    this.yminor = ystep / 5;

    this.x_tick_major = this.xmajor / this.x_displ_scal;
    this.x_tick_minor = this.xminor / this.x_displ_scal;
    this.y_tick_major = this.ymajor / this.y_displ_scal;
    this.y_tick_minor = this.yminor / this.y_displ_scal;

    this.x_min_rel = ~(xmin / this.x_displ_scal) + 1 + this.x_padding;
    this.y_min_rel = ~(ymin / this.y_displ_scal) + 1 + this.y_padding;
    this.x_max_rel = xmax / this.x_displ_scal + this.x_padding;
    this.y_max_rel = ymax / this.y_displ_scal + this.y_padding;

    this.drawgrid();
    this.drawaxes();
  }
  // METHODS
  // DRAW GRID: draw major, minor lines and display values
  drawgrid() {
    let yy = this.y_min;
    let xx = this.x_min;
    let y_displ = 0;
    let x_displ = 0;

    // draw minor grid lines
    this.ctx.strokeStyle = '#dedede';
    this.ctx.lineWidth = 1;
    this.ctx.beginPath();

    do {
      this.ctx.moveTo(this.x_min, yy);
      this.ctx.lineTo(this.x_max, yy);
      yy += this.y_tick_minor;
    } while (yy <= this.y_max);

    do {
      this.ctx.moveTo(xx, this.y_min);
      this.ctx.lineTo(xx, this.y_max);
      xx += this.x_tick_minor;
    } while (xx <= this.x_max);

    this.ctx.stroke();

    // draw major grid lines
    this.ctx.strokeStyle = '#B5B5B5';
    this.ctx.lineWidth = 1;
    this.ctx.beginPath();

    yy = this.y_min;
    xx = this.x_min;

    do {
      this.ctx.moveTo(this.x_min, yy);
      this.ctx.lineTo(this.x_max, yy);
      yy += this.y_tick_major;
    } while (yy <= this.y_max);

    do {
      this.ctx.moveTo(xx, this.y_min);
      this.ctx.lineTo(xx, this.y_max);
      xx += this.x_tick_major;
    } while (xx <= this.x_max);

    this.ctx.stroke();

    // // display values
    this.ctx.font = '10pt Arial';
    this.ctx.fillStyle = '#000000';
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    yy = this.y_min;

    do {
      y_displ = (this.y_max_rel - yy) * this.y_displ_scal;
      this.ctx.fillText(formatNumber(y_displ), this.x_min_rel - this.tw - 5, yy);
      yy = yy + this.y_tick_major;
    } while (Math.round(yy) <= this.y_max);

    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'top';
    xx = this.x_min;

    do {
      x_displ = (xx - this.x_min_rel) * this.x_displ_scal;
      this.ctx.fillText(formatNumber(x_displ), xx, this.y_max_rel + this.th);
      xx += this.x_tick_major;
    } while (Math.round(xx) <= this.x_max);
  }
  // // DRAW AXES: draw axes and labels
  drawaxes() {
    const ctx = this.ctx;

    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;
    ctx.beginPath();

    // x
    ctx.moveTo(this.x_min, this.y_max_rel);
    ctx.lineTo(this.x_max, this.y_max_rel);

    // y
    ctx.moveTo(this.x_min_rel, this.y_min);
    ctx.lineTo(this.x_min_rel, this.y_max);

    ctx.stroke();

    // axis labels
    ctx.font = '12pt Arial';
    ctx.fillStyle = '#cccccc';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';

    ctx.fillText(this.xlabel, this.x_max + 5, this.y_max_rel - this.th);
    ctx.fillText(this.ylabel, this.x_min_rel - this.tw, this.y_min - 20);
  }
  // // PLOT DATA: plot data
  plot(xArr: number[], yArr: number[], pColor = '#0000ff', pDots = true, pLine = true) {
    const ctx = this.ctx;
    let xpos = this.x_min_rel + xArr[0] / this.x_displ_scal;
    let ypos = this.y_max_rel - yArr[0] / this.y_displ_scal;

    ctx.strokeStyle = pColor;
    ctx.lineWidth = 2;
    ctx.fillStyle = pColor;
    ctx.beginPath();
    ctx.moveTo(xpos, ypos);
    ctx.arc(xpos, ypos, 3, 0, 2 * Math.PI, true);
    ctx.fill();
    ctx.moveTo(xpos, ypos);

    for (let i = 1; i < xArr.length; i++) {
      xpos = this.x_min_rel + xArr[i] / this.x_displ_scal;
      ypos = this.y_max_rel - yArr[i] / this.y_displ_scal;
      if (pLine) {
        ctx.lineTo(xpos, ypos);
      } else {
        ctx.moveTo(xpos, ypos);
      }
      if (pDots) {
        ctx.arc(xpos, ypos, 1, 0, 2 * Math.PI, true);
      }
    }

    ctx.stroke();
  }

  clear() {
    this.ctx.clearRect(0, 0, this.width_orig, this.height_orig);
  }
}
