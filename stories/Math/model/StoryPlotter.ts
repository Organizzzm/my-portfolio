import BasePlotter from '~/src/entities/StoryPlotter';
import Graph from '~/src/modules/Graph';
import generateSmoothGraph from '~/src/utils/graph-data-generator';
import Slope from '~/stories/Math/model/Slope';

interface ICoords {
  xA: number[];
  yA: number[];
}

export default class StoryPlotter implements BasePlotter {
  private graph!: Graph;
  private slope!: Slope;
  private numPoints = 1000;
  private xRange = 12;
  private xStep = 0;
  private coords!: ICoords;
  private startPos = 50;
  private range = 20;

  constructor(id: string) {
    this.xStep = this.xRange / this.numPoints;
    this.graph = new Graph({ id, width: 900, height: 400 });
    this.slope = new Slope({
      id: id + '_2',
      width: 900,
      height: 400,
      xRange: 12,
      yRange: 10,
      slope: '#F4A300',
      points: '#F4A300',
      incLine: '#0BCE52',
      decLine: '#CE0735',
    });
  }

  changePosition(pos: number) {
    const secondPointPos = pos + this.range;
    this.startPos = pos;

    if (secondPointPos > this.numPoints) return;

    this.drawTangent(pos, secondPointPos);
  }

  changeRange(range: number) {
    this.range = range;

    if (this.startPos + range > this.numPoints) return;
    if (this.startPos + range <= this.startPos) this.range = 1;

    this.drawTangent(this.startPos, this.startPos + this.range);
  }

  draw() {
    const { numPoints, xRange, xStep, startPos, range } = this;
    const coords = StoryPlotter.generatePoints({ numPoints, xRange, xStep });

    // Save coordinates
    this.coords = coords;

    this.drawChart(coords);
    this.drawTangent(startPos, startPos + range);
  }

  drawTangent(p0: number, p1: number) {
    this.slope.plot(this.coords.xA[p0], this.coords.xA[p1], this.coords.yA[p0], this.coords.yA[p1]);
  }

  drawChart({ xA, yA }: { xA: number[]; yA: number[] }) {
    const { graph } = this;

    if (graph) graph.clear();

    graph.fillChart({ xmin: -6, xmax: 6, ymin: 0, ymax: 10, xstep: 1, ystep: 2 });
    graph.plot(xA, yA, '#AB06D4', false, true);
  }

  static generatePoints({ numPoints, xRange, xStep }: { numPoints: number; xRange: number; xStep: number }) {
    return {
      xA: new Array(numPoints + 1).fill(0).map((_p: number, i: number) => (i - numPoints / 2) * xStep),
      yA: generateSmoothGraph(xRange + 1, 0, 9, numPoints / 10),
    };
  }
}
