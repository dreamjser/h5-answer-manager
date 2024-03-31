const path = require('path')

module.exports = {
  // 别名
  alias: {
    '@': path.resolve(__dirname, 'src'),
    '@tmp': path.resolve(__dirname, '.tmp'),
  },
  devPort: '3003',
  outputPath: 'dist',
  modulePrefix: 'inner_',
  proxyTable: {
    '/answer-manager-api/': {
      target: 'http://localhost:3000',
      // target: 'http://localhost:4002',
      changeOrigin: true
    }
  },
}
