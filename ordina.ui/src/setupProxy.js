const { createProxyMiddleware } = require('http-proxy-middleware');

const context = [
  '/weatherforecast',
  '/weeks',
  '/topics',
  '/resources',
];

// const URL_DEVELOPMENT = 'https://localhost:7053/api/'; TODO use when developing
const URL_PRODUCTION = 'https://ordina-web-api.azurewebsites.net/api/';

module.exports = function (app) {
  const appProxy = createProxyMiddleware(context, {
    target: URL_PRODUCTION,
    secure: false,
  });

  app.use(appProxy);
};
