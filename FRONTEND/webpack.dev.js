const path = require('path');
const common = require('./webpack.common.js');
const { merge } = require('webpack-merge');

module.exports = merge(common, {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
    ],
  },
  devServer: {
    static: path.resolve(__dirname, 'dist'),
    port: 9000,
    // Serve over HTTPS to avoid insecure password field warnings
    server: 'https',
    // Proxy API calls to backend to avoid mixed content
    proxy: [
      {
        context: ['/api'],
        target: 'http://localhost:7000',
        changeOrigin: true,
        secure: false,
      },
    ],
    client: {
      overlay: {
        errors: true,
        warnings: true,
      },
    },
  },
});
