import UIComponent from '~/src/UI/base-component';
import CanvasComponent from '~/src/UI/components/canvas';

import './index.css';

export interface IOscillationsLayoutOptions {
  id: string;
  canvasData: [{ width: number; height: number }, { width: number; height: number }];
}

export default class OscillationsLayout extends UIComponent<IOscillationsLayoutOptions> {
  create({ id, canvasData }: IOscillationsLayoutOptions): HTMLElement {
    const container = document.createElement('div');
    const canvas = new CanvasComponent({ id, width: canvasData[0].width, height: canvasData[0].height });
    const canvas2 = new CanvasComponent({ id: id + '_2', width: canvasData[1].width, height: canvasData[1].height });

    container.id = 'osci-container';
    container.appendChild(canvas.el);
    container.appendChild(canvas2.el);

    return container;
  }
}
