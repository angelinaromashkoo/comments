import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getToken = () => AsyncStorage.getItem('token');
export const token = getToken();

export default axios.create({
  baseURL: 'http://2ecef8cc4022.ngrok.io',
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
