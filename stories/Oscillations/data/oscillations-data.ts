const data = {
  sin: {
    fn: (x: number) => {
      return Math.sin(x * (Math.PI / 180));
    },
    cosfn: (x: number) => {
      return Math.cos(x * (Math.PI / 180));
    },
    params: { xmin: 0, xmax: 1440, ymin: -1, ymax: 1, xstep: 180, ystep: 0.5, pathMax: 150 },
  },
  damped: {
    fn: (x: number) => {
      return Math.sin(x * (Math.PI / 180)) * Math.exp(-0.002 * x);
    },
    cosfn: (x: number) => {
      return Math.cos(x * (Math.PI / 180)) * Math.exp(-0.002 * x);
    },
    params: { xmin: 0, xmax: 1440, ymin: -1, ymax: 1, xstep: 180, ystep: 0.5, pathMax: 150 },
  },
  waves: {
    fn: (x: number) => {
      return 0.5 * Math.sin((3 * x * Math.PI) / 180) + 0.5 * Math.sin((3.5 * x * Math.PI) / 180);
    },
    cosfn: (x: number) => {
      return 0.5 * Math.cos((3 * x * Math.PI) / 180) + 0.5 * Math.cos((3.5 * x * Math.PI) / 180);
    },
    params: { xmin: 0, xmax: 1440, ymin: -1, ymax: 1, xstep: 180, ystep: 0.5, pathMax: 500 },
  },
  fourierSum: {
    fn: (x: number) => {
      let fs = 0;
      const N = 10;
      for (let nn = 1; nn <= N; nn += 2) {
        fs += Math.sin(nn * x * (Math.PI / 180)) / nn;
      }

      return fs;
    },
    cosfn: (x: number) => {
      let fs = 0;
      const N = 10;
      for (let nn = 1; nn <= N; nn += 2) {
        fs += Math.cos(nn * x * (Math.PI / 180)) / nn;
      }

      return fs;
    },
    params: { xmin: 0, xmax: 1440, ymin: -1, ymax: 1, xstep: 180, ystep: 0.5, pathMax: 600 },
  },
};

export default data;
export type IOscillationsDataKeys = keyof typeof data;
