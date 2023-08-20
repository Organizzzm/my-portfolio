import makeList from '~/src/UI/utils/make-list';
import UIComponent from '~/src/UI/base-component';
import UIComponetsFactory from '~/src/UI/components/factory';
import { IButtonComponentOptions } from '~/src/UI/components/button';

import './index.css';

export interface IEquationsLayoutOptions {
  id: string;
  width: number;
  height: number;
  btnsList: IButtonComponentOptions[];
}

export default class EquationsLayout extends UIComponent<IEquationsLayoutOptions> {
  create({ id, width, height, btnsList }: IEquationsLayoutOptions): HTMLElement {
    const container = document.createElement('div');
    const listContainer = document.createElement('div');
    const canvas = UIComponetsFactory.create('canvas', { id, width, height });
    const ctrls = makeList(btnsList, (item) => UIComponetsFactory.create('button', item).el);

    container.id = 'container';
    listContainer.id = 'list-container';
    container.appendChild(canvas.el);
    listContainer.appendChild(ctrls);
    container.appendChild(listContainer);

    return container;
  }
}
