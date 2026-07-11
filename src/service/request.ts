import { api } from "../model/api"

export const toRequestAll = async () => {
    const { data, status } = await api.get('/all?fields=name,flags')
    return { data, status }
}

/**
 * Fetch a single country by name using the shared REST Countries API instance.
 * Preserves the existing API contract with fields: name.common, population, area, region, flags, cca3
 * 
 * @param country - The country name to search for
 * @returns Promise with country data from the API
 */
export const toRequestOne = (country: string) => {
    // Uses shared api instance (baseURL: https://restcountries.com/v3.1) to preserve API contract
    const data = api.get(`/name/${country}?fullText=true`)
    return data
}