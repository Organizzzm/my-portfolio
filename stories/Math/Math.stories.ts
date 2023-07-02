import derivative from './Derivative';
import math from './Math';

export default {
  title: 'Charts/Math',
};

export const Derivative = {
  render: () => derivative('derivative'),
};

export const GradientCurve = {
  render: () => math('gradient-surve'),
};
