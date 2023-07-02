import { useEffect } from '@storybook/addons';
import { IOscillationsDataKeys } from '~/stories/Oscillations/data/oscillations-data';
import StoryPlotter from './model/StoryPlotter';
import UILayoutsFactory from '~/src/UI/factory';

export default (id: string, type: IOscillationsDataKeys): HTMLElement => {
  const layoutComponent = UILayoutsFactory.create('oscillations', {
    id,
    canvasData: [
      { width: 600, height: 250 },
      { width: 958, height: 250 },
    ],
  });

  useEffect(() => {
    const storyPlotter = new StoryPlotter(id);
    storyPlotter.draw(type);

    return () => {
      layoutComponent.remove();
    };
  }, []);

  return layoutComponent.el;
};
