import oscillations from './Oscillations';

export default {
  title: 'Charts/Oscillations',
};

export const Sin = {
  render: () => oscillations('osci-canvas-sin', 'sin'),
};

export const damped = {
  render: () => oscillations('osci-canvas-damped', 'damped'),
};

export const waves = {
  render: () => oscillations('osci-canvas-waves', 'waves'),
};

export const fourierSum = {
  render: () => oscillations('osci-canvas-fourier-sum', 'fourierSum'),
};
