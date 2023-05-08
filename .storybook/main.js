/** @type { import('@storybook/html-webpack5').StorybookConfig } */
import FantasticonPlugin from 'fantasticon-webpack-plugin';

const config = {
  stories: ["../stories/**/*.mdx", "../stories/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  webpackFinal: async (config) => {
    config.plugins.push(new FantasticonPlugin({
      runOnComplete: false, //optional
      // onComplete: (fontConfig) => { }, //optional
      configPath: '.fantasticonrc.js', //optional
      //config: { ... } //optional
    }));
    return config;
  },
  // staticDirs: ['../public'],
  // staticDirs: [{ from: '../icon-dist', to: '/static' }],
  framework: {
    name: "@storybook/html-webpack5",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
};
export default config;
