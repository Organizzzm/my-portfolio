import UIComponent from '~/src/UI/base-component';
import UIComponetsFactory from '~/src/UI/components/factory';

import './index.css';

export interface ITangentLayoutOptions {
  id: string;
  width: number;
  height: number;
  startPos: number;
  range: number;
  numPoints: number;
}

export default class TangentLayout extends UIComponent<ITangentLayoutOptions> {
  create({ id, width, height, startPos, range, numPoints }: ITangentLayoutOptions): HTMLElement {
    const container = document.createElement('div');
    const controlPanel = document.createElement('div');
    const canvas = UIComponetsFactory.create('canvas', { id, width, height });
    const canvas2 = UIComponetsFactory.create('canvas', { id: id + '_2', width, height });
    const button = UIComponetsFactory.create('button', { text: 'Generate new points' });
    const startRnage = UIComponetsFactory.create('range', {
      label: 'Position',
      min: '0',
      max: numPoints.toString(),
      step: '1',
      value: startPos.toString(),
      name: 'position',
    });

    const lenghtRange = UIComponetsFactory.create('range', {
      label: 'Range',
      min: '0',
      max: numPoints.toString(),
      step: '1',
      value: range.toString(),
      name: 'range',
    });

    container.id = 'tangent-container';
    controlPanel.id = 'control-panel';
    controlPanel.appendChild(button.el);
    controlPanel.appendChild(startRnage.el);
    controlPanel.appendChild(lenghtRange.el);
    container.appendChild(canvas.el);
    container.appendChild(canvas2.el);
    container.appendChild(controlPanel);

    this.ctrl = {
      button,
      startRnage,
      lenghtRange,
    };

    return container;
  }
}
