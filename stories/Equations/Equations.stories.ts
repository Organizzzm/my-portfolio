import equations from './Equations';

// More on how to set up stories at: https://storybook.js.org/docs/html/writing-stories/introduction
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
          const xA = [] as number[];
          const yA = [] as number[];
      
          for (let i = 0; i <= 100; i++) {
            xA[i] = (i - 50) * 0.08;
            yA[i] = f(xA[i]); // f(x)
          }
      
          const graph = new Graph('eq-canvas', -4, 4, -20, 20, 300, 260, 550, 460);
      
          graph.drawgrid(1, 0.2, 5, 1);
          graph.drawaxes('x', 'y');
          graph.plot(xA, yA, '#ff0000', false, true);`;
        },
      },
    },
  },
};

// More on writing stories with args: https://storybook.js.org/docs/html/writing-stories/args
export const Primary = {};
