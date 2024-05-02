import axios, { AxiosInstance } from 'axios';

export const api: AxiosInstance = axios.create({
    baseURL: 'https://restcountries.com/v3.1/all',
    timeout: 5000  
})

// Export exclusive list of the name countries...
export const apiListCountries = () => 
    api
    .get('https://restcountries.com/v3.1/all?fields=name')
    .catch(error => error.response)
    