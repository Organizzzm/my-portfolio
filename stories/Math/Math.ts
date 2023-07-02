import { useEffect } from '@storybook/addons';
import { storiesCanvas } from '~/stories/utils';
import Graph from '~/src/modules/Graph';

function grad(x1: number, x2: number) {
  return (f(x2) - f(x1)) / (x2 - x1); // (y2 - y1) / (x2 - x1)
}

function f(x: number) {
  return x * x;
}

function integf(x: number) {
  return 4 * x;
}

export default (id: string, type?: unknown): HTMLElement => {
  const container = document.createElement('div');
  const canvas = storiesCanvas(id, { width: 600, height: 450 });

  container.id = 'math';
  container.className = 'container';
  container.appendChild(canvas);

  useEffect(() => {
    const numPoints = 1000;
    const numGrad = 60;
    const xRange = 6;
    let xStep = 0;

    const graph = new Graph({ id, width: 600, height: 450 });
    graph.fillChart({ xmin: -3, xmax: 3, ymin: -10, ymax: 10, xstep: 1, ystep: 5 });

    const xA = [];
    const yA = [];

    // calculate function
    xStep = xRange / numPoints;

    for (let i = 0; i < numPoints; i++) {
      xA[i] = (i - numPoints / 2) * xStep;
      yA[i] = f(xA[i]);
    }

    graph.plot(xA, yA, '#ff0000', false, true); // plot function

    // calculate gradient function using forward method
    const xAr = [];
    const gradA = [];

    for (let j = 0; j < numPoints; j++) {
      xAr[j] = xA[j];
      gradA[j] = grad(xA[j], xA[j + numGrad]);
    }

    graph.plot(xAr, gradA, '#0000ff', false, true); // plot gradient function

    const xArc = [];
    const gradAc = [];

    for (let k = numGrad; k < numPoints; k++) {
      xArc[k - numGrad] = xA[k];
      gradAc[k - numGrad] = grad(xA[k - numGrad], xA[k + numGrad]);
    }

    graph.plot(xArc, gradAc, '#00CB2F', false, true); // plot gradient function

    const xAi = [];
    const integA = [];
    xAi[0] = -3;
    integA[0] = 8;

    for (let k = 1; k < numPoints; k++) {
      xAi[k] = xA[k];
      integA[k] = integA[k - 1] + integf(xA[k - 1]) * (xA[k] - xA[k - 1]);
    }
    graph.plot(xAi, integA, '#B300FF', false, true); // plot integral

    return () => {
      container.remove();
    };
  }, []);

  return container;
};
