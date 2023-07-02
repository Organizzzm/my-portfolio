export interface IUIComponent {
  el: HTMLElement;
  on(event: keyof HTMLElementEventMap, callback: (this: HTMLElement, e: Event) => void): void;
  off(event: keyof HTMLElementEventMap, callback: (this: HTMLElement, e: Event) => void): void;
  remove(): void;
}

export default abstract class UIComponent<T> implements IUIComponent {
  public el!: HTMLElement;

  constructor(options?: T) {
    this.el = this.create(options);
  }

  protected abstract create(options?: T): HTMLElement;

  on(event: keyof HTMLElementEventMap, callback: (this: HTMLElement, e: Event) => void) {
    this.el.addEventListener(event, callback);
  }

  off(event: keyof HTMLElementEventMap, callback: (this: HTMLElement, e: Event) => void) {
    this.el.removeEventListener(event, callback);
  }

  remove() {
    this.el.remove();
  }
}
