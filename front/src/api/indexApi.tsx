import axios from 'axios';
import initAuthApi from './initAuthApi';
import initChatApi from './initChatApi';
import initPostApi from './initPostApi';

const instance = axios.create({
  baseURL: 'http://localhost:8080',
});

console.log('call instance');

instance.defaults.headers.common['X-Auth-Token'] =
  'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxOTI5NjA5MDA1IiwibWVtYmVyX2lkIjoyLCJyb2xlIjoiUk9MRV9VU0VSIiwiaWF0IjoxNjM2MjgzNTM2LCJleHAiOjE2Mzg4NzU1MzZ9.xYeOjxGlCQa2ToTpHymQ2l9RPMChZgapoMZH3NgpFUg';

export const authApi = initAuthApi(instance);
export const postApi = initPostApi(instance);
export const chatApi = initChatApi(instance);
