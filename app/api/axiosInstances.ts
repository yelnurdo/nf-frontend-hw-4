// app/api/axiosInstances.ts
import axios from 'axios';

export const productAPI = axios.create({
  baseURL: 'https://fakestoreapi.com',
});

productAPI.interceptors.request.use(config => config, error => Promise.reject(error));
productAPI.interceptors.response.use(response => response, error => Promise.reject(error));

export const fileAPI = axios.create({
  baseURL: 'https://fakeapi.platzi.com/en/rest/files',
});

fileAPI.interceptors.request.use(config => config, error => Promise.reject(error));
fileAPI.interceptors.response.use(response => response, error => Promise.reject(error));
