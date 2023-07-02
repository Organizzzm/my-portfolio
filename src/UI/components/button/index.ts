import UIComponent from '~/src/UI/base-component';
import './index.css';

export interface IButtonComponentOptions {
  text: string;
  name?: string;
}

export default class ButtonComponent extends UIComponent<IButtonComponentOptions> {
  create({ text, name }: IButtonComponentOptions): HTMLElement {
    const btn = document.createElement('button');
    btn.className = 'button-ctrl';
    btn.innerText = text;

    if (name) btn.dataset.attr = name;

    return btn;
  }
}
