import { mergeConfig } from 'vite';
import path from 'path';

const config = {
  stories: ['../stories/**/*.mdx', '../stories/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-interactions'],
  staticDirs: ['../public'],
  // staticDirs: [{ from: '../public', to: '/' }],
  core: {},
  framework: {
    name: '@storybook/html-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
    defaultName: 'Expo',
  },
  async viteFinal(config) {
    // Merge custom configuration into the default config
    return mergeConfig(config, {
      resolve: {
        alias: [{ find: '~', replacement: path.resolve(__dirname, '..') }],
      },
    });
  },
};
export default config;
