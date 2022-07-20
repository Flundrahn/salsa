const { createProxyMiddleware } = require('http-proxy-middleware');

const context = [
  '/weatherforecast',
  '/weeks',
  '/topics',
  '/resources',
];

module.exports = function (app) {
  const appProxy = createProxyMiddleware(context, {
    target: 'https://localhost:7053/api',
    secure: false,
  });

  app.use(appProxy);
};
