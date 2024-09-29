import axios, { AxiosInstance } from 'axios';

export const api: AxiosInstance = axios.create({
    baseURL: 'https://restcountries.com/v3.1',
    timeout: 10000  
})
