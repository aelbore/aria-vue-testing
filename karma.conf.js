const alias = require('rollup-plugin-strict-alias')
const vue = require('rollup-plugin-vue')
const istanbul = require('rollup-plugin-istanbul')

const { nodeResolve, commonjs, typescript2, createTSConfig } = require('aria-build')

module.exports = function(config) {
  config.set({
    frameworks: ['mocha', 'chai'],

    files: [
      'tests/**/*.spec.js'
    ],

    preprocessors: {
      "tests/**/*.spec.js": ["rollup"]
    },

    plugins: [
      'karma-mocha',
      'karma-chai',
      'karma-mocha-reporter',
      'karma-chrome-launcher',
      'karma-coverage-istanbul-reporter',
      'karma-rollup-preprocessor'
    ],

    rollupPreprocessor: {
      plugins: [
        typescript2(createTSConfig()),
        alias({
          vue: 'node_modules/vue/dist/vue.js'
        }),
        nodeResolve(),
        vue(),
        istanbul({ 
          exclude: [
            'tests/**/*.spec.js', 
            "node_modules/**/*"
          ] 
        }),
        commonjs()
      ],
      output: {
        format: 'es',      
        sourcemap: false
      }
    },

    reporters: ['mocha', 'coverage-istanbul'],

    coverageIstanbulReporter: {
      reports: ['lcov', 'text-summary'],
      dir: './coverage',
      combineBrowserReports: true,
      skipFilesWithNoCoverage: true,
      thresholds: {
        global: {
          statements: 70,
          branches: 70,
          functions: 70,
          lines: 70,
        }
      }
    },

    browsers: ['ChromeHeadlessNoSandbox'],

    customLaunchers: {
      ChromeHeadlessNoSandbox: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox']
      }
    },

    singleRun: true,
    concurrency: Infinity
  })
}