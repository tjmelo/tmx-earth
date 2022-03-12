import axios from 'axios';

export const api = axios.create({
    baseURL: 'https://restcountries.com/v3.1/all',
    timeout: 5000  
})

// Export exclusive list of the name coutries...
export const apiListCoutries = () => 
    api
    .get('https://restcountries.com/v3.1/all?fields=name')
    .catch(error => error.response)