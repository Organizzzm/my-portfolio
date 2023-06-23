import equations from './Equations';

/**
 * ![GitHub](github.svg "GitHub") GitHub: [https://github.com/Organizzzm/resume/blob/main/stories/Equations/Equations.ts](https://github.com/Organizzzm/resume/blob/main/stories/Equations/Equations.ts)
 */

export default {
  title: 'Charts/Equations',
  tags: ['autodocs'],
  render: () => equations(),
  argTypes: null,
  parameters: {
    docs: {
      canvas: {
        sourceState: 'shown',
      },
      source: {
        language: 'typescript',
        format: true,
        transform: () => {
          return `
          /** Simple graph example **/

          const xA = [] as number[];
          const yA = [] as number[];
      
          for (let i = 0; i <= 100; i++) {
            xA[i] = (i - 50) * ((xmax - xmin) / this.lineLenght); // Set points with certain step
            yA[i] = f(xA[i]); // f(x)
          }
      
          const graph = new Graph({id: 'eq-canvas', width: 600, height: 500 });
      
          graph.fillChart({ xmin: -4, xmax: 4, ymin: 0, ymax: 20, xstep: 1, ystep: 5 });
          graph.plot(xA, yA, '#ff0000', false, true);`;
        },
      },
    },
  },
};

export const Graph = {};
