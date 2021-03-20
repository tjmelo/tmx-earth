import axios from 'axios';

export const api = axios.create({
    baseURL: 'https://restcountries.eu/rest/v2/all',
    timeout: 5000  
})

// Export exclusive list of the name coutries...
export const apiListCoutries = e => api.get('https://restcountries.eu/rest/v2/all?fields=name') 