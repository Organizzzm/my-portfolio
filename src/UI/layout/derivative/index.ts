import UIComponent from '~/src/UI/base-component';
import CanvasComponent from '~/src/UI/components/canvas';

import './index.css';
import ButtonComponent from '~/src/UI/components/button';

export interface IDerivativeLayoutOptions {
  id: string;
  width: number;
  height: number;
}

export default class DerivativeLayout extends UIComponent<IDerivativeLayoutOptions> {
  create({ id, width, height }: IDerivativeLayoutOptions): HTMLElement {
    const container = document.createElement('div');
    const controlPanel = document.createElement('div');
    const canvas = new CanvasComponent({ id, width, height });
    const canvas2 = new CanvasComponent({ id: id + '_2', width, height });
    const button = new ButtonComponent({ text: 'Generate new points' });

    container.id = 'derivative-container';
    controlPanel.id = 'control-panel';
    controlPanel.appendChild(button.el);
    container.appendChild(canvas.el);
    container.appendChild(canvas2.el);
    container.appendChild(controlPanel);

    return container;
  }
}
