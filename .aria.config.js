const alias = require('rollup-plugin-strict-alias')
const vue = require('rollup-plugin-vue')

module.exports.rollupPlugins = [
  alias({
    vue: 'node_modules/vue/dist/vue.js'
  }),
  vue()
]