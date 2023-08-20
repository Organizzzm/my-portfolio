import UIComponent from '~/src/UI/base-component';
import UIComponetsFactory from '~/src/UI/components/factory';

import './index.css';

export interface IOscillationsLayoutOptions {
  id: string;
  canvasData: [{ width: number; height: number }, { width: number; height: number }];
}

export default class OscillationsLayout extends UIComponent<IOscillationsLayoutOptions> {
  create({ id, canvasData }: IOscillationsLayoutOptions): HTMLElement {
    const container = document.createElement('div');
    const canvas = UIComponetsFactory.create('canvas', {
      id,
      width: canvasData[0].width,
      height: canvasData[0].height,
    });
    const canvas2 = UIComponetsFactory.create('canvas', {
      id: id + '_2',
      width: canvasData[1].width,
      height: canvasData[1].height,
    });

    container.id = 'osci-container';
    container.appendChild(canvas.el);
    container.appendChild(canvas2.el);

    return container;
  }
}
