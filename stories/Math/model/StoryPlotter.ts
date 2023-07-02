import BasePlotter from '~/src/entities/StoryPlotter';
import Graph from '~/src/modules/Graph';
import generateSmoothGraph from '~/src/utils/graph-data-generator';

export default class StoryPlotter implements BasePlotter {
  private graph!: Graph;
  private xA!: number[];
  private yA!: number[];

  private numPoints = 200;
  private xRange = 12;
  private xStep = 0;

  // private canvasID!: string;
  // private canvas2ID!: string;

  constructor(id: string) {
    // this.canvasID = id;
    // this.canvas2ID = id + '_2';
    this.xStep = this.xRange / this.numPoints;
    this.graph = new Graph({ id, width: 900, height: 400 });
  }

  draw() {
    this.generatePoints();
    this.renderChart();
  }

  renderChart() {
    const { xA, yA } = this;
    const { graph } = this;

    if (graph) graph.clear();

    graph.fillChart({ xmin: -6, xmax: 6, ymin: -10, ymax: 10, xstep: 1, ystep: 5 });

    graph.plot(xA, yA, '#AB06D4', false, true); // plot function
  }

  generatePoints() {
    const { numPoints, xRange, xStep } = this;

    this.xA = new Array(numPoints).fill(0).map((_p: number, i: number) => (i - numPoints / 2) * xStep);
    this.yA = generateSmoothGraph(xRange, -9, 9, numPoints / 10);
  }
}

// function generatePoints() {
//   xA = new Array(numPoints).fill(0).map((_p: number, i: number) => (i - numPoints / 2) * xStep);
//   yA = generateSmoothGraph(xRange, -9, 9, numPoints / 10);
// }

// function renderGraph() {
//   if (graph) graph.clear();

//   graph = new Graph({ id: canvasID, width: 900, height: 400 });
//   graph.fillChart({ xmin: -6, xmax: 6, ymin: -10, ymax: 10, xstep: 1, ystep: 5 });

//   graph.plot(xA, yA, '#AB06D4', false, true); // plot function
// }
