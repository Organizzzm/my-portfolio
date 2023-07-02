import { useEffect } from '@storybook/addons';
import Plotter from '~/stories/Equations/Plotter';
import UILayoutsFactory from '~/src/UI/factory';
import { IEquationsDataKeys } from './data/equations-data';

let plotter!: Plotter;
const canvasID = 'equation-canvas';

function eventHandler(this: HTMLElement, e: Event) {
  if (!(e.target instanceof HTMLButtonElement)) return;
  plotter.draw(e.target.dataset.attr as IEquationsDataKeys);
}

export default (): HTMLElement => {
  const layoutComponent = UILayoutsFactory.create('equations', {
    id: canvasID,
    width: 600,
    height: 500,
    btnsList: [
      { text: '𝑦 = 𝑥²', name: 'square_x' },
      { text: '𝑦 = 2𝑥 + 1', name: 'two_x_plus_one' },
      { text: '𝑦 = 10 * sin𝑥', name: 'sin' },
      { text: '𝑦 = -0.5*𝑥⁵ + 3*𝑥³ + 𝑥*𝑥 - 2*𝑥 - 3', name: 'polynomial_curve' },
      { text: '𝑦 = 𝑒𝑥𝑝(–𝑥²)', name: 'exp' },
      { text: 'Multiplying a polynomial and a Gaussian', name: 'hills' },
    ],
  });

  useEffect(() => {
    plotter = new Plotter(canvasID);
    plotter.draw('square_x');

    layoutComponent.on('click', eventHandler);

    return () => {
      layoutComponent.off('click', eventHandler);
      layoutComponent.remove();
    };
  });

  return layoutComponent.el;
};
