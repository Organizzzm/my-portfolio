const data = {
  square_x: {
    fn: (x: number) => {
      return x * x;
    },
    params: { xmin: -4, xmax: 4, ymin: 0, ymax: 20, xstep: 1, ystep: 5 },
  },
  two_x_plus_one: {
    fn: (x: number) => {
      return 2 * x + 1;
    },
    params: { xmin: -4, xmax: 4, ymin: -10, ymax: 10, xstep: 1, ystep: 5 },
  },
  sin: {
    fn: (x: number) => {
      return 10 * Math.sin(x);
    },
    params: { xmin: -4, xmax: 4, ymin: -15, ymax: 15, xstep: 1, ystep: 5 },
  },
  polynomial_curve: {
    fn: (x: number) => {
      return -0.5 * Math.pow(x, 5) + 3 * Math.pow(x, 3) + x * x - 2 * x - 3;
    },
    params: { xmin: -2.5, xmax: 2.5, ymin: -10, ymax: 10, xstep: 0.5, ystep: 5 },
  },
  exp: {
    fn: (x: number) => {
      return Math.exp(-x * x);
    },
    params: { xmin: -3, xmax: 3, ymin: 0, ymax: 1, xstep: 1, ystep: 0.2 },
  },
  hills: {
    fn: (x: number) => {
      return (x + 3.6) * (x + 2.5) * (x + 1) * (x - 0.5) * (x - 2) * (x - 3.5) * Math.exp((-x * x) / 4);
    },
    params: { xmin: -10, xmax: 10, ymin: -50, ymax: 50, xstep: 2, ystep: 10 },
  },
};

export default data;
export type IEquationsDataKeys = keyof typeof data;
