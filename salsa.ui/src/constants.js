const RESOURCE_TYPES = ['Lab', 'Slide', 'Cheatsheet', 'Article', 'Video', 'Weekend Test'];

const prod = {
  API_URL: 'https://salsa-api.azurewebsites.net/api', // TODO Make sure this URL is correct
  RESOURCE_TYPES,
};
const dev = {
  API_URL: 'https://localhost:7053/api',
  RESOURCE_TYPES,
};

const constants = process.env.NODE_ENV === 'development' ? dev : prod;
export default constants;
