import Graph from '~/src/modules/Graph';
import Animation from '~/src/modules/Animation';
import data, { IEquationsDataKeys } from './data/equations-data';

type IParams = { xmax: number; xmin: number; ymax: number; ymin: number; xstep: number; ystep: number };

export default class Plotter {
  animator: Animation;
  graph!: Graph;
  gColor = '#ff0000';
  currentParams!: IParams;
  oldParams!: IParams;
  lineLenght = 200;
  gridDuration = 300;
  lineDuration = 500;

  constructor(id: string) {
    this.animator = new Animation(id);
    this.graph = new Graph({
      id,
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

    // Set points with certain step
    const xA = [] as number[];
    const yA = [] as number[];

    for (let i = 0; i <= this.lineLenght; i++) {
      xA[i] = (i - 100) * ((xmax - xmin) / this.lineLenght);
      yA[i] = data[equationName].fn(xA[i]);
    }

    // Save old params and draw chart
    if (!this.oldParams) {
      this.oldParams = { ...data[equationName].params };
      graph.fillChart(this.oldParams);
      graph.plot(xA, yA, gColor, false, true);
      return;
    }

    this.currentParams = { ...data[equationName].params };
    const frameParams = { ...this.oldParams };

    // Grid
    const xmax_per_frame = (this.oldParams.xmax - this.currentParams.xmax) / this.gridDuration;
    const xmin_per_frame = (this.oldParams.xmin - this.currentParams.xmin) / this.gridDuration;
    const ymax_per_frame = (this.oldParams.ymax - this.currentParams.ymax) / this.gridDuration;
    const ymin_per_frame = (this.oldParams.ymin - this.currentParams.ymin) / this.gridDuration;
    const ystep_per_frame = (this.oldParams.ystep - this.currentParams.ystep) / this.gridDuration;
    const xstep_per_frame = (this.oldParams.xstep - this.currentParams.xstep) / this.gridDuration;

    // Line
    const lineLenghtPerFrame = this.lineLenght / this.lineDuration;
    let currentFrameLength = 0;

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

        frameParams.xmax = this.oldParams.xmax - xmax_per_frame * animator.getTime();
        frameParams.xmin = this.oldParams.xmin - xmin_per_frame * animator.getTime();

        frameParams.ymax = this.oldParams.ymax - ymax_per_frame * animator.getTime();
        frameParams.ymin = this.oldParams.ymin - ymin_per_frame * animator.getTime();

        frameParams.xstep = this.oldParams.xstep - xstep_per_frame * animator.getTime();
        frameParams.ystep = this.oldParams.ystep - ystep_per_frame * animator.getTime();

        graph.fillChart(frameParams);
      })
      .setStage(() => {
        if (animator.getTime() >= this.lineDuration) {
          animator.stop();
          animator.resetTime();

          graph.plot(xA, yA, gColor, false, true);
          return;
        }

        currentFrameLength = lineLenghtPerFrame * animator.getTime();
        graph.plot(xA.slice(0, currentFrameLength), yA.slice(0, currentFrameLength), gColor, false, true);
      });

    animator.start();
  }
}
