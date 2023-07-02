import UIComponent from '~/src/UI/base-component';
import './index.css';

export interface ICanvasComponentOptions {
  id: string;
  width: number;
  height: number;
}

export default class CanvasComponent extends UIComponent<ICanvasComponentOptions> {
  create({ id, width, height }: ICanvasComponentOptions): HTMLElement {
    const canvas = document.createElement('canvas');
    canvas.id = id;
    const ctx = canvas.getContext('2d');
    const canvasW = width;
    const canvasH = height;
    const dpr = window.devicePixelRatio;

    // Set the "actual" size of the canvas
    canvas.width = canvasW * dpr;
    canvas.height = canvasH * dpr;

    if (ctx) {
      // Scale the context to ensure correct drawing operations
      ctx.scale(dpr, dpr);

      // Set the "drawn" size of the canvas
      canvas.style.width = `${canvasW}px`;
      canvas.style.height = `${canvasH}px`;
    }

    return canvas;
  }
}
