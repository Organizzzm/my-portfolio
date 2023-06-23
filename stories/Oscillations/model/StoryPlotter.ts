import Graph from '~/src/modules/Graph';
import data, { IOscillationsDataKeys } from '../data/oscillations-data';
import Ball from '~/stories/Oscillations/model/Ball';
import Animation from '~/src/modules/Animation';
import Path from '~/stories/Oscillations/model/Path';
import CouplingRod from '~/stories/Oscillations/model/CouplingRod';

export default class StoryPlotter {
  graph!: Graph;
  animator!: Animation;
  ball!: Ball;
  path!: Path;
  couplingRod!: CouplingRod;

  // oscillationPlotter!: OscillationPlotter;

  overallHeight = 250;
  duration = 10 * 1000; // ms

  // Graph params
  gColor = '#ff0000';
  graphWidth = 600;
  lineLenght = 100;
  pathLenght = 100;

  // path block params
  pathBlockMinX = 630;
  ocsillatedBallShift = 70;

  constructor(id: string) {
    this.animator = new Animation(id + '_2');
    this.ball = new Ball(id + '_2');
    this.path = new Path(id + '_2');
    this.couplingRod = new CouplingRod(id + '_2');
    this.graph = new Graph({
      id,
      width: this.graphWidth,
      height: this.overallHeight,
    });
  }

  draw(oscillationName: IOscillationsDataKeys) {
    let { lineLenght } = this;

    const {
      graph,
      path,
      gColor,
      animator,
      ball,
      couplingRod,
      duration,
      pathBlockMinX,
      ocsillatedBallShift,
      overallHeight,
    } = this;

    const {
      fn,
      cosfn,
      params: { xmax, ymax, ymin },
    } = data[oscillationName];

    lineLenght = data[oscillationName].params.pathMax;

    const chartX = [] as number[];
    const chartY = [] as number[];
    const pathX = [] as number[];
    const pathY = [] as number[];

    let x = 0;
    let y = 0;
    const amplitude = graph.y_height / 2;
    const graphXStart = graph.x_padding;
    const pathXStart = pathBlockMinX + amplitude;
    const yCenter = overallHeight / 2;
    const ocsillatedBallX = pathBlockMinX + ocsillatedBallShift + amplitude * 2;

    const xscale = xmax / graph.x_width;
    const yscale = (ymax - ymin) / graph.y_height;
    const xStepScale = xmax / lineLenght;

    const chartTick = lineLenght / duration;
    // const pathTick = pathLenght / duration;

    let currentStep = 0;

    // Cache chart points
    for (let i = 0; i <= lineLenght; i++) {
      chartX[i] = i * xStepScale;
      chartY[i] = fn(chartX[i]);
    }

    // Cache path points
    // Draw from cached path because line not smooth if being lag.
    for (let i = 0; i <= lineLenght; i++) {
      pathX[i] = -amplitude * cosfn(i * xStepScale) + pathXStart;
      pathY[i] = -amplitude * fn(i * xStepScale) + yCenter;
    }

    graph.fillChart(data[oscillationName].params);
    graph.plot(chartX, chartY, gColor, false, true);

    // Animate
    animator.setStage(() => {
      if (animator.getTime() >= duration) {
        animator.stop();
        animator.resetTime();
        animator.start();
        return;
      }

      animator.clear();

      currentStep = Math.floor(chartTick * animator.getTime());

      // Draw graph ball
      x = graphXStart + chartX[currentStep] / xscale;
      y = yCenter - chartY[currentStep] / yscale;

      ball.update(x, y);
      ball.draw();

      // // Draw coupling rod
      couplingRod.xMin = x;
      couplingRod.xMax = ocsillatedBallX;
      couplingRod.y = y;
      couplingRod.draw();

      // // Draw path ball
      // - path
      path.draw(pathX, pathY, currentStep);

      // - ball
      x = -amplitude * cosfn(chartX[currentStep]) + pathXStart;
      ball.update(x, y);
      ball.draw();

      // // Draw oscillated ball
      ball.update(ocsillatedBallX, y);
      ball.draw();
    });

    animator.start();
  }
}
