import UIComponent from '~/src/UI/base-component';
import CanvasComponent from '~/src/UI/components/canvas';
import ButtonComponent from '~/src/UI/components/button';
import RangeComponent from '~/src/UI/components/range';

import './index.css';

export interface IDerivativeLayoutOptions {
  id: string;
  width: number;
  height: number;
  startPos: number;
  range: number;
  numPoints: number;
}

export default class DerivativeLayout extends UIComponent<IDerivativeLayoutOptions> {
  create({ id, width, height, startPos, range, numPoints }: IDerivativeLayoutOptions): HTMLElement {
    const container = document.createElement('div');
    const controlPanel = document.createElement('div');
    const canvas = new CanvasComponent({ id, width, height });
    const canvas2 = new CanvasComponent({ id: id + '_2', width, height });
    const button = new ButtonComponent({ text: 'Generate new points' });
    const startRnage = new RangeComponent({
      label: 'Position',
      min: '0',
      max: numPoints.toString(),
      step: '1',
      value: startPos.toString(),
      name: 'position',
    });

    const lenghtRange = new RangeComponent({
      label: 'Range',
      min: '0',
      max: numPoints.toString(),
      step: '1',
      value: range.toString(),
      name: 'range',
    });

    container.id = 'derivative-container';
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
