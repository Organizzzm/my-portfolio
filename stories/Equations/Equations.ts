import Graph from '~/src/modules/graph.ts';
import { storiesCanvas } from '~/stories/utils';
import { useEffect } from '@storybook/addons';
import makeList from './partials/selectors';
import './Equations.css';

const container = document.createElement('div');
const canvas = storiesCanvas({ width: 600, height: 500 });
const list = makeList([
  { formula: '𝑦 = 𝑥²', name: 'square_x' },
  { formula: '𝑦 = 2𝑥 + 1', name: 'two_x_plus_one' },
  { formula: '<var>a<sup>2</sup></var>', name: '' },
  { formula: '<var>a<sup>2</sup></var>', name: '' },
  { formula: '<var>a<sup>2</sup></var>', name: '' },
  { formula: '<var>a<sup>2</sup></var>', name: '' },
]);

function f(x: number) {
  return 10 * Math.sin(x);
}

container.id = 'eq-container';
container.appendChild(canvas);
container.insertAdjacentHTML('beforeend', list);

export default (): HTMLElement => {
  useEffect(() => {
    const xA = [] as number[];
    const yA = [] as number[];

    for (let i = 0; i <= 100; i++) {
      xA[i] = (i - 50) * 0.08;
      yA[i] = f(xA[i]);
    }

    const graph = new Graph('eq-canvas', -4, 4, -20, 20, 300, 260, 550, 460);

    graph.drawgrid(1, 0.2, 5, 1);
    graph.drawaxes('x', 'y');
    graph.plot(xA, yA, '#ff0000', false, true);
  });

  return container;
};
