import { defineConfig } from "cypress";
import { devServer } from '@cypress/webpack-dev-server';

import * as Webpack from 'webpack';
import * as path from 'path';

const webpackConfig = (
  cypressConfig: Cypress.PluginConfigOptions
): Webpack.Configuration => {
  return {
    resolve: {
      extensions: ['.js', '.ts', '.tsx'],
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: [/node_modules/],
          use: [
            {
              loader: 'ts-loader',
              options: { transpileOnly: true },
            },
          ],
        },
        {
          test: /\.(js|ts)$/,
          loader: '@jsdevtools/coverage-istanbul-loader',
          options: { esModules: true },
          enforce: 'post',
          include: path.join(__dirname, 'src'),
          exclude: [
            /\.(e2e|spec)\.ts$/,
            /node_modules/,
            /(ngfactory|ngstyle)\.js/,
          ],
        },
      ],
    },
  };
};

const componentDevServerOptions = {
  projectConfig: {
    root: '',
    sourceRoot: 'src',
    buildOptions: {
      outputPath: 'dist',
      index: 'src/index.html',
      main: 'src/main.ts',
      polyfills: 'src/polyfills.ts',
      tsConfig: 'tsconfig.app.json',
      inlineStyleLanguage: 'scss',
      assets: ['src/favicon.ico', 'src/assets'],
      styles: ['src/styles.scss'],
      scripts: [],
      buildOptimizer: false,
      optimization: false,
      vendorChunk: true,
      extractLicenses: false,
      sourceMap: true,
      namedChunks: true,
    },
  },
};

export default defineConfig({
  component: {
    devServer(devServerConfig) {
      return devServer({
        ...devServerConfig,
        framework: 'angular',
        options: componentDevServerOptions,
        webpackConfig: webpackConfig(devServerConfig.cypressConfig),
      });
    },
    specPattern: "**/*.cy.ts",
    setupNodeEvents(on, config) {
      require('@cypress/code-coverage/task')(on, config)

      return config
    },
  },
});
