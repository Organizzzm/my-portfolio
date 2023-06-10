import Graph from '~/src/modules/Graph';
import Animation from '~/src/modules/Animation';
import data, { IEquationsDataKeys } from '../data/equations-data';

type IParams = { xmax: number; xmin: number; ymax: number; ymin: number; xstep: number; ystep: number };

export class Drawer {
  animator: Animation;
  graph!: Graph;
  gColor = '#ff0000';
  currentParams!: IParams;
  oldParams!: IParams;
  lineLenght = 100;
  gridDuration = 300;
  lineDuration = 500;

  constructor() {
    this.animator = new Animation('eq-canvas');
    this.graph = new Graph({
      id: 'eq-canvas',
      width: 600,
      height: 500,
    });
  }

  draw(equationName: IEquationsDataKeys) {
    const { graph, animator, gColor } = this;
    const { xmin, xmax } = data[equationName].params;

    animator.stop();
    animator.resetTime();
    animator.clearStages();

    const xA = [] as number[];
    const yA = [] as number[];

    // Set points with certain step
    for (let i = 0; i <= this.lineLenght; i++) {
      xA[i] = (i - 50) * ((xmax - xmin) / this.lineLenght);
      yA[i] = data[equationName].fn(xA[i]);
    }

    if (!this.oldParams) {
      this.oldParams = { ...data[equationName].params };
      graph.fillChart(this.oldParams);
      graph.plot(xA, yA, gColor, false, true);
      return;
    }

    this.currentParams = { ...data[equationName].params };
    const frameParams = { ...this.oldParams };
    let lineLenghtPerFrame = 0;

    const xmax_diff = this.oldParams.xmax - this.currentParams.xmax;
    const xmin_diff = this.oldParams.xmin - this.currentParams.xmin;
    const ymax_diff = this.oldParams.ymax - this.currentParams.ymax;
    const ymin_diff = this.oldParams.ymin - this.currentParams.ymin;
    const ystep_diff = this.oldParams.ystep - this.currentParams.ystep;
    const xstep_diff = this.oldParams.xstep - this.currentParams.xstep;

    animator
      .setStage(() => {
        graph.clear();

        if (animator.getTime() >= this.gridDuration) {
          animator.stop();
          animator.resetTime();

          this.oldParams = this.currentParams;
          graph.fillChart(this.currentParams);

          animator.nextStage();
          return;
        }

        frameParams.xmax = this.oldParams.xmax - (xmax_diff / this.gridDuration) * animator.getTime();
        frameParams.xmin = this.oldParams.xmin - (xmin_diff / this.gridDuration) * animator.getTime();

        frameParams.ymax = this.oldParams.ymax - (ymax_diff * animator.getTime()) / this.gridDuration;
        frameParams.ymin = this.oldParams.ymin - (ymin_diff * animator.getTime()) / this.gridDuration;

        frameParams.xstep = this.oldParams.xstep - (xstep_diff * animator.getTime()) / this.gridDuration;
        frameParams.ystep = this.oldParams.ystep - (ystep_diff * animator.getTime()) / this.gridDuration;

        graph.fillChart(frameParams);
      })
      .setStage(() => {
        if (animator.getTime() >= this.lineDuration) {
          animator.stop();
          animator.resetTime();

          graph.plot(xA, yA, gColor, false, true);
          return;
        }

        lineLenghtPerFrame = (100 / this.lineDuration) * animator.getTime();
        graph.plot(xA.slice(0, lineLenghtPerFrame), yA.slice(0, lineLenghtPerFrame), gColor, false, true);
      });

    animator.start();
  }
}
