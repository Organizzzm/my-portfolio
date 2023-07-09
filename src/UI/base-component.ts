export type HTMLEntity = HTMLElement & HTMLInputElement;

export interface IUIComponent {
  el: HTMLElement;
  ctrl: { [key: string]: IUIComponent };

  on(eventName: keyof HTMLElementEventMap, callback: (this: HTMLEntity, e?: Event) => void): void;
  off(eventName: keyof HTMLElementEventMap, callback: (this: HTMLEntity, e?: Event) => void): void;
  remove(): void;
}

export default abstract class UIComponent<T> implements IUIComponent {
  public el!: HTMLElement;
  public ctrl!: { [key: string]: IUIComponent };

  constructor(options?: T) {
    this.el = this.create(options);
  }

  protected abstract create(options?: T): HTMLElement;

  on(eventName: keyof HTMLElementEventMap, callback: (this: HTMLEntity, e?: Event) => void) {
    this.el.addEventListener(eventName, callback);
  }

  off(eventName: keyof HTMLElementEventMap, callback: (this: HTMLEntity, e?: Event) => void) {
    this.el.removeEventListener(eventName, callback);
  }

  remove() {
    this.el.remove();
  }
}
