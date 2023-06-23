import { useEffect } from '@storybook/addons';
import { storiesCanvas } from '~/stories/utils';
import StoryPlotter from './model/StoryPlotter';
import { IOscillationsDataKeys } from '~/stories/Oscillations/data/oscillations-data';
import './Oscillations.css';

export default (id: string, type: IOscillationsDataKeys): HTMLElement => {
  const container = document.createElement('div');
  const canvas = storiesCanvas(id, { width: 600, height: 250 });
  const canvas2 = storiesCanvas(id + '_2', { width: 958, height: 250 });

  container.id = 'osci-container';
  container.appendChild(canvas);
  container.appendChild(canvas2);

  useEffect(() => {
    const storyPlotter = new StoryPlotter(id);
    storyPlotter.draw(type);

    return () => {
      container.remove();
    };
  }, []);

  return container;
};
