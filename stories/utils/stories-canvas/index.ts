import './index.css';

export default ({ width, height }: { width: number; height: number }): HTMLCanvasElement => {
  const canvas = document.createElement('canvas');
  canvas.id = 'eq-canvas';
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
};
