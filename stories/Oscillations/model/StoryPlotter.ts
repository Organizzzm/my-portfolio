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
  lineLenght = 200;
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
    let { pathLenght } = this;

    const {
      graph,
      path,
      gColor,
      animator,
      ball,
      couplingRod,
      duration,
      pathBlockMinX,
      lineLenght,
      ocsillatedBallShift,
      overallHeight,
    } = this;

    const {
      fn,
      cosfn,
      params: { xmax },
    } = data[oscillationName];

    // Draw main chart
    const xA = [] as number[];
    const yA = [] as number[];

    for (let i = 0; i <= lineLenght; i++) {
      xA[i] = i * (xmax / lineLenght);
      yA[i] = fn(xA[i]);
    }

    graph.fillChart(data[oscillationName].params);
    graph.plot(xA, yA, gColor, false, true);

    pathLenght = data[oscillationName].params.pathMax;

    let x = 0;
    let y = 0;
    const tick = graph.x_width / duration;
    const graphMinX = graph.x_min_rel;
    const amplitude = graph.y_height / 2;
    const pathHeight = graph.y_height;
    const xStep = xmax / graph.x_width;
    const yCenter = overallHeight / 2;
    const ocsillatedBallX = pathBlockMinX + pathHeight + ocsillatedBallShift;
    const pathStep = pathLenght / duration;

    // Cache path points
    for (let i = 0; i <= pathLenght; i++) {
      xA[i] = -amplitude * cosfn((xmax / pathLenght) * i) + pathBlockMinX + amplitude;
      yA[i] = -amplitude * fn((xmax / pathLenght) * i) + yCenter;
    }

    // Animate
    animator.setStage(() => {
      if (animator.getTime() >= duration) {
        animator.stop();
        animator.resetTime();
        animator.start();
        return;
      }

      animator.clear();

      // Draw graph ball
      x = tick * animator.getTime();
      y = -amplitude * fn(xStep * x) + yCenter;

      ball.update(graphMinX + x, y);
      ball.draw();

      // Draw coupling rod
      couplingRod.xMin = graphMinX + x;
      couplingRod.xMax = ocsillatedBallX;
      couplingRod.y = y;
      couplingRod.draw();

      // Draw path ball
      x = -amplitude * cosfn(xStep * x) + pathBlockMinX + amplitude;

      // - path
      path.draw(xA, yA, pathStep * animator.getTime());

      // - ball
      ball.update(x, y);
      ball.draw();

      // Draw oscillated ball
      ball.update(ocsillatedBallX, y);
      ball.draw();
    });

    animator.start();
  }
}
