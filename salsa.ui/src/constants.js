const RESOURCE_TYPES = ['Lab', 'Slide', 'Cheatsheet', 'Article', 'Video', 'Weekend Test'];

const API_URL = process.env.NODE_ENV === 'development'
  ? 'https://salsa-api.azurewebsites.net/api'
  : 'https://localhost:7053/api';

export { RESOURCE_TYPES, API_URL };
