const { createKarmaConfig, karmaPlugins } = require('aria-test')
const { alias } = require('aria-build')

const vue = require('rollup-plugin-vue')

module.exports = createKarmaConfig({ 
  frameworks: ['mocha', 'chai'],
  files: [
    'tests/**/*.spec.js'
  ],
  rollup: {
    custom: true,
    plugins: [
      alias({
        vue: 'node_modules/vue/dist/vue.js'
      }),
      vue()
    ]
  },
  preprocessors: {
    'tests/**/*.spec.js': [ 'rollupNode' ]
  }
})