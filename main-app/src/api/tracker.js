import axios from 'axios';

export const tracker = axios.create({
  baseURL: 'http://7e0f9822fc79.ngrok.io',
});
