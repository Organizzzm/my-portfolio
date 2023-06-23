import { useEffect } from '@storybook/addons';
import { storiesCanvas } from '~/stories/utils';
import Plotter from '~/stories/Equations/Plotter';
import makeList from './partials/selectors';
import { IEquationsDataKeys } from './data/equations-data';
import './Equations.css';

let plotter!: Plotter;
const container = document.createElement('div');
const canvas = storiesCanvas('eq-canvas', { width: 600, height: 500 });
const list = makeList([
  { formula: '𝑦 = 𝑥²', name: 'square_x' },
  { formula: '𝑦 = 2𝑥 + 1', name: 'two_x_plus_one' },
  { formula: '𝑦 = 10 * sin𝑥', name: 'sin' },
  { formula: '𝑦 = -0.5*𝑥⁵ + 3*𝑥³ + 𝑥*𝑥 - 2*𝑥 - 3', name: 'polynomial_curve' },
  { formula: '𝑦 = 𝑒𝑥𝑝(–𝑥²)', name: 'exp' },
  { formula: 'Multiplying a polynomial and a Gaussian', name: 'hills' },
]);

container.id = 'eq-container';
container.appendChild(canvas);
container.insertAdjacentHTML('beforeend', list);

function eventHandler(this: HTMLElement, e: Event) {
  if (!(e.target instanceof HTMLButtonElement)) return;
  plotter.draw(e.target.dataset.name as IEquationsDataKeys);
}

export default (): HTMLElement => {
  useEffect(() => {
    /** First drawing */
    if (plotter) return;
    plotter = new Plotter('eq-canvas');
    plotter.draw('square_x');

    document.querySelector('.formulas-list')?.addEventListener('click', eventHandler);
  });

  return container;
};
