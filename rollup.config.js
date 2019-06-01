import alias from 'rollup-plugin-strict-alias'
import vue from 'rollup-plugin-vue';
import buble from 'rollup-plugin-buble';

import { terser, nodeResolve, commonjs } from 'aria-build'

const plugins = [
  alias({
    vue: 'node_modules/vue/dist/vue.js'
  }),
  nodeResolve(),
  vue({
    template: {
      isProduction: true
    },
    css: true
  }),
  commonjs(),
  buble(),
  terser()
];

export default {
  external: [],
  plugins,
  input: [ 
    'src/main.js'
  ],
  output: [
    {
      globals: {},
      dir: 'dist',
      format: 'umd',
      sourcemap: true
    }
  ]
};
