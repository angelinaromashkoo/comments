import axios from 'axios';

export const tracker = axios.create({
  baseURL: 'http://ed3fc999e3dd.ngrok.io',
});
