/* eslint import/no-extraneous-dependencies: "off" */
/* eslint no-console: "off" */

const webpack = require('webpack');
const values = require('postcss-modules-values');

const sauceLaunchers = {
  'chrome-latest-mac': {
    base: 'SauceLabs',
    browserName: 'chrome',
    version: 'latest',
    platform: 'macOS 10.12',
  },
  'chrome-previous-mac': {
    base: 'SauceLabs',
    browserName: 'chrome',
    version: 'latest-1',
    platform: 'macOS 10.12',
  },
  'firefox-latest-mac': {
    base: 'SauceLabs',
    browserName: 'firefox',
    version: 'latest',
    platform: 'macOS 10.12',
  },
  'firefox-previous-mac': {
    base: 'SauceLabs',
    browserName: 'firefox',
    version: 'latest-1',
    platform: 'macOS 10.12',
  },
  'safari-latest-mac': {
    base: 'SauceLabs',
    browserName: 'safari',
    version: 'latest',
    platform: 'macOS 10.12',
  },
  'edge-latest-win10': {
    base: 'SauceLabs',
    browserName: 'microsoftedge',
    version: 'latest',
    platform: 'Windows 10',
  },
  'safari-ios-10.0': {
    base: 'SauceLabs',
    browserName: 'safari',
    platformName: 'iOS',
    platformVersion: '10.0',
    deviceName: 'iPad Air 2 Simulator',
    appiumVersion: '1.6.0',
  },
};

const getTestFiles = (config) => {
  if (config.file) {
    return config.file.split(',');
  }

  return ['test/index.js'];
};

module.exports = function karma(config) {
  let browsers = [];
  let customLaunchers = {};

  if (process.env.TRAVIS_BUILD_NUMBER) {
    if (process.env.TRAVIS_SECURE_ENV_VARS === 'true' &&
        process.env.SAUCE_USERNAME &&
        process.env.SAUCE_ACCESS_KEY) {
      // We're on Travis, and Sauce Labs environment variables are available.
      // Run on the Sauce Labs cloud using the full set of browsers.

      console.log('Running on Sauce Labs.');

      customLaunchers = sauceLaunchers;
      browsers = Object.keys(customLaunchers);
    } else {
      // We're on Travis, but Sauce Labs environment variables aren't available.
      // Run on Travis, using Firefox.

      console.log('Running on Travis.');

      browsers = [
        'Firefox',
      ];
    }
  } else {
    // This is a local run. Use Chrome.

    console.log('Running locally.');

    browsers = [
      'Chrome',
    ];
  }

  config.set({
    browsers,
    customLaunchers,
    files: getTestFiles(config),

    frameworks: [
      'mocha',
      'chai',
    ],

    reporters: [
      'mocha',
      'coverage',
      'saucelabs',
    ],

    autoWatch: true,
    singleRun: config.singleRun === 'true',

    preprocessors: {
      'test/**/*.+(js|jsx)': [
        'webpack',
        'sourcemap',
      ],
    },

    webpack: {
      devtool: 'cheap-module-inline-source-map',
      module: {
        loaders: [
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            loader: 'babel',
          },
          {
            test: /\.css$/,
            loader: 'style-loader!css-loader?modules&importLoaders=1&localIdentName=[folder]-[name]--[local]!postcss-loader',
          },
          {
            test: /\.(png|jpg|svg)$/,
            loader: 'url-loader',
          },
        ],
      },
      postcss: [
        values,
      ],
      plugins: [
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        }),
      ],
      resolve: {
        extensions: ['', '.js', '.jsx'],
      },
    },

    // Make webpack output less verbose, so Travis can display the entire log.

    webpackMiddleware: {
      stats: {
        chunks: false,
      },
    },

    port: 9876,
    colors: true,

    // Code will have been instrumented via Babel and babel-plugin-istanbul
    // when NODE_ENV is 'test' (see .babelrc).

    coverageReporter: {
      type: 'json',
      dir: 'coverage/',
    },

    // Sauce Labs configuration.

    sauceLabs: {
      testName: 'cspace-layout tests',
      recordScreenshots: false,
      public: true,
    },

    // Tolerate Sauce Labs slowness/flakiness.

    browserDisconnectTimeout: 10000,
    browserDisconnectTolerance: 1,
    browserNoActivityTimeout: 4 * 60 * 1000,
    captureTimeout: 4 * 60 * 1000,
  });
};
