module.exports = [
  {
    name: 'Observable',
    path: './esm/index.js',
    limit: '1.1KB'
  },
  {
    name: 'Total',
    path: [
      './esm/index.js',
      './esm/observable/index.js',
      './esm/operators/index.js'
    ]
  }
]
