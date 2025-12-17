const path = require('path');
const common = require('./webpack.common.js');
const { merge } = require('webpack-merge');

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) || 9000 : 9000;

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
    port: PORT,
    host: 'localhost',
    // Use HTTP instead of HTTPS for better proxy stability
    // Proxy API calls to backend
    proxy: [
      {
        context: ['/api'],
        target: 'http://localhost:7000',
        changeOrigin: true,
        secure: false,
        logLevel: 'debug',
        onProxyReq: (proxyReq, req, res) => {
          console.log(`[Proxy] ${req.method} ${req.url} -> http://localhost:7000${req.url}`);
        },
        onError: (err, req, res) => {
          console.error('[Proxy Error]', err.message);
          res.writeHead(500, {
            'Content-Type': 'application/json',
          });
          res.end(JSON.stringify({ error: 'Proxy error', message: err.message }));
        },
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
