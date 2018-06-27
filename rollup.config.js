export default {
  input: './es/index.js',
  output: {
    file: './lib/index.js',
    format: 'cjs'
  },
  external: ['symbol-observable']
}
