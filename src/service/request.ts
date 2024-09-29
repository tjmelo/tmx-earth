import axios from "axios"
import { api } from "../model/api"

export const toRequestAll = async () => {
    const { data, status } = await api.get('/all')
    return { data, status }
}

export const toRequestOne = (country: string) => {
    const data = axios.get(`https://restcountries.com/v3.1/name/${country}?fullText=true`)
    return data
}