export default class Graph {
  // canvas context on which to draw graph instance
  ctx: CanvasRenderingContext2D;
  // width and height of textbox used for displaying values on the axes
  tw = 15;
  th = 20;
  // location of origin (in pixels) in parent document
  x_orig = 0;
  y_orig = 0;
  // overall width and height of graph in pixels
  x_width = 0;
  y_height = 0;
  // scaling used in displaying values on the axes
  x_displ_scal: number;
  y_displ_scal: number;
  // min and max of x and y relative to origin (in pixels)
  x_min_rel: number;
  x_max_rel: number;
  y_min_rel: number;
  y_max_rel: number;
  // obvious
  x_tick_major = 0;
  x_tick_minor = 0;
  y_tick_major = 0;
  y_tick_minor = 0;
  // declarations for quantities to be used later
  x_min: number;
  x_max: number;
  y_min: number;
  y_max: number;
  xx = 0;
  yy = 0;
  x_displ = 0;
  y_displ = 0;
  txpos: number;
  typos: number;

  w_padding = 50;
  h_padding = 50;
  x_padding = 25;
  y_padding = 10;

  constructor(
    id: string,
    xmin: number,
    xmax: number,
    ymin: number,
    ymax: number,
    x0: number,
    y0: number,
    xwidth: number,
    ywidth: number
  ) {
    const canvas = document.getElementById(id) as HTMLCanvasElement;
    this.ctx = canvas.getContext('2d', { alpha: false }) as CanvasRenderingContext2D;

    this.x_orig = x0;
    this.y_orig = y0;
    // overall width and height of graph in pixels
    this.x_width = xwidth;
    this.y_height = ywidth;
    // scaling used in displaying values on the axes
    this.x_displ_scal = (xmax - xmin) / xwidth;
    this.y_displ_scal = (ymax - ymin) / ywidth;
    // min and max of x and y relative to origin (in pixels)
    this.x_min_rel = xmin / this.x_displ_scal;
    this.x_max_rel = xmax / this.x_displ_scal;
    this.y_min_rel = ymin / this.y_displ_scal;
    this.y_max_rel = ymax / this.y_displ_scal;
    // convert to absolute coordinates
    this.x_min = this.x_min_rel + this.x_orig;
    this.x_max = this.x_max_rel + this.x_orig;
    this.y_min = this.y_orig - this.y_min_rel;
    this.y_max = this.y_orig - this.y_max_rel;
    this.txpos = this.x_orig - this.tw;
    this.typos = this.y_orig;
  }
  // METHODS
  // DRAW GRID: draw major, minor lines and display values
  drawgrid(xmajor: number, xminor: number, ymajor: number, yminor: number) {
    this.x_tick_major = xmajor / this.x_displ_scal;
    this.x_tick_minor = xminor / this.x_displ_scal;
    this.y_tick_major = ymajor / this.y_displ_scal;
    this.y_tick_minor = yminor / this.y_displ_scal;

    // draw minor grid lines
    this.ctx.strokeStyle = '#dedede';
    this.ctx.lineWidth = 1;
    this.ctx.beginPath();
    this.yy = this.y_max;

    do {
      this.ctx.moveTo(this.x_min, this.yy);
      this.ctx.lineTo(this.x_max, this.yy);
      this.yy += this.y_tick_minor;
    } while (this.yy <= this.y_min);

    this.xx = this.x_min;

    do {
      this.ctx.moveTo(this.xx, this.y_min);
      this.ctx.lineTo(this.xx, this.y_max);
      this.xx += this.x_tick_minor;
    } while (this.xx <= this.x_max);

    this.ctx.stroke();

    // draw major grid lines
    this.ctx.strokeStyle = '#B5B5B5';
    this.ctx.lineWidth = 1;
    this.ctx.beginPath();
    this.yy = this.y_max;

    do {
      this.ctx.moveTo(this.x_min, this.yy);
      this.ctx.lineTo(this.x_max, this.yy);
      this.yy += this.y_tick_major;
    } while (this.yy <= this.y_min);

    this.xx = this.x_min;

    do {
      this.ctx.moveTo(this.xx, this.y_min);
      this.ctx.lineTo(this.xx, this.y_max);
      this.xx += this.x_tick_major;
    } while (this.xx <= this.x_max);

    this.ctx.stroke();

    // display values
    this.ctx.font = '10pt Arial';
    this.ctx.fillStyle = '#000000';
    this.ctx.textAlign = 'right';
    this.ctx.textBaseline = 'middle';
    this.yy = this.y_max;

    do {
      this.y_displ = (this.y_orig - this.yy) * this.y_displ_scal;
      if (this.y_displ !== 0) {
        this.ctx.fillText(this.y_displ.toString(), this.txpos + 5, this.yy);
      }
      this.yy += this.y_tick_major;
    } while (this.yy <= this.y_min);

    this.ctx.textAlign = 'left';
    this.ctx.textBaseline = 'top';
    this.xx = this.x_min;

    do {
      this.x_displ = (this.xx - this.x_orig) * this.x_displ_scal;
      this.ctx.fillText(this.x_displ.toString(), this.xx - this.tw, this.typos + 5);
      this.xx += this.x_tick_major;
    } while (this.xx <= this.x_max);
  }
  // // DRAW AXES: draw axes and labels
  drawaxes(xlabel: 'x', ylabel: 'y') {
    const ctx = this.ctx;

    if (typeof xlabel === 'undefined') xlabel = 'x';
    if (typeof ylabel === 'undefined') ylabel = 'y';
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(this.x_min, this.y_orig);
    ctx.lineTo(this.x_max, this.y_orig);
    ctx.moveTo(this.x_orig, this.y_min);
    ctx.lineTo(this.x_orig, this.y_max);
    ctx.stroke();
    // axis labels
    ctx.font = '12pt Arial';
    ctx.fillStyle = '#cccccc';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText(xlabel, this.x_max + 0.75 * this.tw, this.typos - this.th / 2);
    ctx.fillText(ylabel, this.txpos + this.tw / 2 + 5, this.y_max - 1.5 * this.th);
  }
  // // PLOT DATA: plot data
  plot(xArr: number[], yArr: number[], pColor = '#0000ff', pDots = true, pLine = true) {
    const ctx = this.ctx;
    let xpos = this.x_orig + xArr[0] / this.x_displ_scal;
    let ypos = this.y_orig - yArr[0] / this.y_displ_scal;

    ctx.strokeStyle = pColor;
    ctx.lineWidth = 2;
    ctx.fillStyle = pColor;
    ctx.beginPath();
    ctx.moveTo(xpos, ypos);
    ctx.arc(xpos, ypos, 3, 0, 2 * Math.PI, true);
    ctx.fill();
    ctx.moveTo(xpos, ypos);

    for (let i = 1; i < xArr.length; i++) {
      xpos = this.x_orig + xArr[i] / this.x_displ_scal;
      ypos = this.y_orig - yArr[i] / this.y_displ_scal;
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
}
