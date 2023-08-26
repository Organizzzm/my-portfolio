import BasePlotter from '~/src/entities/StoryPlotter';
import Circle from './CircleLayer';
import Interaction from './InteractionLayer';

export default class StoryPlotter implements BasePlotter {
  absWidth: number;
  absHeight: number;

  circle: Circle;
  interaction: Interaction;

  RADIUS_SHIFT = 0.8;

  constructor(id: string, w: number, h: number) {
    this.circle = new Circle(id, (h / 2) * this.RADIUS_SHIFT, w / 2, h / 2);
    this.interaction = new Interaction(id + '-interaction', (h / 2) * this.RADIUS_SHIFT, w / 2, h / 2);

    this.absWidth = w;
    this.absHeight = h;
  }

  draw() {
    this.circle.plot();
    this.interaction.plot();
  }
}
