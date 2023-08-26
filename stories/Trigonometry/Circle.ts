import { useEffect } from '@storybook/addons';
import StoryPlotter from './model/StoryPlotter';
import UILayoutsFactory from '~/src/UI/layout/factory';

const id = 'trigcircle';
const WIDTH = 700;
const HEIGHT = 500;

export default (): HTMLElement => {
  const layout = UILayoutsFactory.create(id, {
    id,
    width: WIDTH,
    height: HEIGHT,
  });

  let plotter!: StoryPlotter;

  useEffect(() => {
    plotter = new StoryPlotter(id, WIDTH, HEIGHT);
    plotter.draw();

    layout.el.addEventListener('mousemove', update);

    return () => {
      layout.el.removeEventListener('mousemove', update);
      layout.remove();
    };
  }, []);

  function update(e: MouseEvent) {
    plotter.interaction.update(e.offsetX, e.offsetY);
  }

  return layout.el;
};
