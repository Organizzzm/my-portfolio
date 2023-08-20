import { useEffect } from '@storybook/addons';
import StoryPlotter from './model/StoryPlotter';
import UILayoutsFactory from '~/src/UI/layout/factory';

export default (id: string): HTMLElement => {
  const layout = UILayoutsFactory.create('tangent', {
    id,
    width: 900,
    height: 400,
    numPoints: 1000,
    startPos: 50,
    range: 20,
  });

  let plotter!: StoryPlotter;

  useEffect(() => {
    plotter = new StoryPlotter(id);
    plotter.draw();

    layout.ctrl.button.on('click', btnEventHandler);
    layout.ctrl.startRnage.on('input', startRangeEventHandler);
    layout.ctrl.lenghtRange.on('input', lenghtRangeEventHandler);

    return () => {
      layout.ctrl.button.off('click', btnEventHandler);
      layout.ctrl.startRnage.off('input', startRangeEventHandler);
      layout.ctrl.lenghtRange.off('input', lenghtRangeEventHandler);
      layout.remove();
    };
  }, []);

  function btnEventHandler() {
    plotter.draw();
  }

  function startRangeEventHandler(this: HTMLInputElement) {
    plotter.changePosition(+this.value);
  }

  function lenghtRangeEventHandler(this: HTMLInputElement) {
    plotter.changeRange(+this.value);
  }

  return layout.el;
};
