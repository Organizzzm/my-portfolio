import UIComponent from '~/src/UI/base-component';
import './index.css';

export interface IRangeComponentOptions {
  label?: string;
  name?: string;
  min?: string;
  max?: string;
  step?: string;
  value?: string;
}

export default class RangeComponent extends UIComponent<IRangeComponentOptions> {
  create({ label, name, min, max, step, value }: IRangeComponentOptions): HTMLElement {
    const container = document.createElement('span');
    const input = document.createElement('input');

    container.className = 'range range' + '-' + name;
    input.className = 'range-ctrl';
    input.type = 'range';
    input.value = value || '0';

    container.appendChild(input);

    if (label) {
      const labelEl = document.createElement('label');
      labelEl.className = 'range-label';
      labelEl.innerHTML = label;
      container.appendChild(labelEl);
    }

    if (min) input.setAttribute('min', min);
    if (max) input.setAttribute('max', max);
    if (step) input.setAttribute('step', step);
    if (name) input.setAttribute('name', name);

    return container;
  }

  on(eventName: string, fn: (this: HTMLInputElement) => void) {
    this.el.firstChild?.addEventListener(eventName, fn);
  }

  off(eventName: string, fn: (this: HTMLInputElement) => void) {
    this.el.firstChild?.removeEventListener(eventName, fn);
  }
}
