import { useEffect } from '@storybook/addons';
import StoryPlotter from './model/StoryPlotter';
import UILayoutsFactory from '~/src/UI/factory';

// function grad(x1: number, x2: number) {
//   return (f(x2) - f(x1)) / (x2 - x1); // (y2 - y1) / (x2 - x1)
// }

// function f(x: number) {
//   return (a * x) ^ (2 + b * x * Math.random());
// }

// function integf(x: number) {
//   return 4 * x;
// }

export default (id: string): HTMLElement => {
  const layoutComponent = UILayoutsFactory.create('derivative', {
    id,
    width: 900,
    height: 400,
  });

  let plotter!: StoryPlotter;

  useEffect(() => {
    plotter = new StoryPlotter(id);
    plotter.draw();

    layoutComponent.on('click', eventHandler);

    // // calculate gradient function using forward method
    // const xAr = [];
    // const gradA = [];

    // for (let j = 0; j < numPoints; j++) {
    //   xAr[j] = xA[j];
    //   gradA[j] = grad(xA[j], xA[j + numGrad]);
    // }

    // graph.plot(xAr, gradA, '#0000ff', false, true); // plot gradient function

    // const xArc = [];
    // const gradAc = [];

    // for (let k = numGrad; k < numPoints; k++) {
    //   xArc[k - numGrad] = xA[k];
    //   gradAc[k - numGrad] = grad(xA[k - numGrad], xA[k + numGrad]);
    // }

    // graph.plot(xArc, gradAc, '#00CB2F', false, true); // plot gradient function

    // const xAi = [];
    // const integA = [];
    // xAi[0] = -3;
    // integA[0] = 8;

    // for (let k = 1; k < numPoints; k++) {
    //   xAi[k] = xA[k];
    //   integA[k] = integA[k - 1] + integf(xA[k - 1]) * (xA[k] - xA[k - 1]);
    // }
    // graph.plot(xAi, integA, '#B300FF', false, true); // plot integral

    return () => {
      layoutComponent.off('click', eventHandler);
      layoutComponent.remove();
    };
  }, []);

  function eventHandler(this: HTMLElement, e: Event) {
    if (!(e.target instanceof HTMLButtonElement)) return;
    plotter.draw();
  }

  return layoutComponent.el;
};
