module.exports = [
  {
    name: 'Observable',
    path: './index.js',
    limit: '1KB'
  },
  {
    name: 'Total',
    path: [
      './index.js',
      './observable/index.js',
      './operators/index.js'
    ]
  }
]
