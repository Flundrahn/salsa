// const { createProxyMiddleware } = require('http-proxy-middleware');

// const context = [
//   '/weatherforecast',
//   '/weeks',
//   '/topics',
//   '/resources',
// ];

// // TODO use when developing
// // const URL = 'https://localhost:7053/api/';
// const URL = 'https://ordina-web-api.azurewebsites.net/api/';

// module.exports = function (app) {
//   const appProxy = createProxyMiddleware(context, {
//     target: URL,
//     secure: false,
//   });

//   app.use(appProxy);
// };
