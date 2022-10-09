const RESOURCE_TYPES = ['Lab', 'Slide', 'Cheatsheet', 'Article', 'Video', 'Weekend Test'];

const API_URL = process.env.NODE_ENV === 'development'
  ? 'https://localhost:7053/api'
  : 'https://salsa-api.azurewebsites.net/api';

export { RESOURCE_TYPES, API_URL };
