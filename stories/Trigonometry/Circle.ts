import { useEffect } from '@storybook/addons';
import StoryPlotter from './model/StoryPlotter';
import UILayoutsFactory from '~/src/UI/layout/factory';

const id = 'trigcircle';

export default (): HTMLElement => {
  const layout = UILayoutsFactory.create(id, {
    id,
    width: 700,
    height: 500,
  });

  let plotter!: StoryPlotter;

  useEffect(() => {
    plotter = new StoryPlotter(id, 700, 500);
    plotter.draw();

    layout.el.addEventListener('mousemove', update);

    return () => {
      layout.el.removeEventListener('mousemove', update);
      layout.remove();
    };
  }, []);

  function update(e: MouseEvent) {
    plotter.interaction.update(e.offsetX, e.offsetY);
    plotter.interaction.plot();
  }

  return layout.el;
};
