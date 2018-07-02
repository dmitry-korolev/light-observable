import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'

export default {
  input: './es/index.js',
  output: {
    file: './lib/index.js',
    format: 'cjs'
  },
  plugins: [
    commonjs(),
    resolve()
  ]
}
