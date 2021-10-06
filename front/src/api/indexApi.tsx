import axios from 'axios';
import initAuthApi from './initAuthApi';

const instance = axios.create({
  baseURL: 'http://localhost:8080',
});

export const authApi = initAuthApi(instance);
