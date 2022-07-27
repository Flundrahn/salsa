const prod = {
  API_URL: 'https://ordina-web-api.azurewebsites.net/api',
};
const dev = {
  API_URL: 'https://localhost:7053/api',
};

const config = process.env.NODE_ENV === 'development' ? dev : prod;
export default config;
