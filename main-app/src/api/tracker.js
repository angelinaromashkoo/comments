import axios from 'axios';

export const tracker = axios.create({
  baseURL: 'http://e2c3f893bf73.ngrok.io',
});
