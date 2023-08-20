import UIComponent from '~/src/UI/base-component';
import UIComponetsFactory from '~/src/UI/components/factory';

import './index.css';

export interface ITrigCircleLayoutOptions {
  id: string;
  width: number;
  height: number;
}

export default class TrigCircleLayout extends UIComponent<ITrigCircleLayoutOptions> {
  create({ id, width, height }: ITrigCircleLayoutOptions): HTMLElement {
    const container = document.createElement('div');
    const circleCanvas = UIComponetsFactory.create('canvas', { id, width, height });
    const interacionCanvas = UIComponetsFactory.create('canvas', { id: id + '-interaction', width, height });

    container.id = 'trig-circle-container';
    container.appendChild(circleCanvas.el);
    container.appendChild(interacionCanvas.el);

    return container;
  }
}
