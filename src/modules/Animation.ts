export default class Animation {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  t: number;
  timeInterval: number;
  startTime: number;
  lastTime: number;
  frame: number;
  animating: boolean;
  stage!: () => void;
  stages: (() => void)[] = [];
  stageNumber = 0;

  constructor(canvasId: string) {
    this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    this.context = this.canvas.getContext('2d') as CanvasRenderingContext2D;
    this.t = 0;
    this.timeInterval = 0;
    this.startTime = 0;
    this.lastTime = 0;
    this.frame = 0;
    this.animating = false;
  }

  getContext() {
    return this.context;
  }

  getCanvas() {
    return this.canvas;
  }

  clear() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  setStage(func: () => void) {
    this.stages.push(func);
    return this;
  }

  clearStages() {
    this.stages = [];
    this.stageNumber = 0;
  }

  isAnimating() {
    return this.animating;
  }

  getFrame() {
    return this.frame;
  }

  nextStage() {
    this.stage = this.stages[++this.stageNumber];
    this.start();
  }

  start() {
    this.animating = true;
    const date = new Date();
    this.startTime = date.getTime();
    this.lastTime = this.startTime;
    this.stage = this.stages[this.stageNumber];

    if (this.stage !== undefined) {
      this.stage();
    }

    this.animationLoop();
  }

  stop() {
    this.animating = false;
  }

  resetTime() {
    this.t = 0;
  }

  getTimeInterval() {
    return this.timeInterval;
  }

  getTime() {
    return this.t;
  }

  getFPS() {
    return this.timeInterval > 0 ? 1000 / this.timeInterval : 0;
  }

  animationLoop() {
    this.frame++;
    const date = new Date();
    const thisTime = date.getTime();
    this.timeInterval = thisTime - this.lastTime;
    this.t += this.timeInterval;
    this.lastTime = thisTime;

    // if (this.stage !== undefined) {
    this.stage();
    // }

    if (this.animating) {
      requestAnimationFrame(() => this.animationLoop());
    }
  }
}
