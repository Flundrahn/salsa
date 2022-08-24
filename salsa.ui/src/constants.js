const prod = {
  API_URL: 'https://salsa-web-api.azurewebsites.net/api', // TODO Make sure this URL is correct
};
const dev = {
  API_URL: 'https://localhost:7053/api',
};

const config = process.env.NODE_ENV === 'development' ? dev : prod;
export default config;
