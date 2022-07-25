const { createProxyMiddleware } = require('http-proxy-middleware');

const context = [
  '/weatherforecast',
  '/weeks',
  '/topics',
  '/resources',
];

const URL_DEVELOPMENT = 'https://localhost:7053/api';
const URL_PRODUCTION = 'https://ordina-web-api.azurewebsites.net/api/';

module.exports = function (app) {
  const appProxy = createProxyMiddleware(context, {
    target: process.env.NODE_ENV === 'development' ? URL_DEVELOPMENT : URL_PRODUCTION,
    secure: false,
  });

  app.use(appProxy);
};
