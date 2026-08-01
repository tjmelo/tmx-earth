import { api } from "../model/api"
import { Country } from "../interfaces"

const UNAVAILABLE = 'Unavailable'

const getStringValue = (value: unknown): string | undefined => {
    return typeof value === 'string' && value.trim() ? value : undefined
}

const getSafeString = (value: unknown) => getStringValue(value) ?? UNAVAILABLE

const getCommonName = (safeName: Partial<Country['name']> | undefined) => {
    return getSafeString(safeName?.common ?? safeName?.official)
}

const getCapitalValue = (country: Partial<Country> | null | undefined) => {
    const capital = country?.capital
    if (Array.isArray(capital)) {
        return capital.join(', ')
    }

    return getSafeString(capital)
}

const getSafeObject = (value: unknown) => {
    return value && typeof value === 'object' ? value as Record<string, unknown> : {}
}

export const normalizeCountry = (country: Partial<Country> | null | undefined): Country => {
    const safeName = getSafeObject(country?.name) as Partial<Country['name']>
    const commonName = getCommonName(safeName)

    const safeFlags = getSafeObject(country?.flags)
    const safeCoatOfArms = getSafeObject(country?.coatOfArms)
    const safeCapital = getCapitalValue(country)

    return {
        cca3: getSafeString(country?.cca3),
        name: {
            common: commonName,
            official: getSafeString(safeName.official),
            nativeName: safeName.nativeName || {},
        },
        flags: {
            svg: getSafeString(safeFlags.svg),
        },
        population: getStringValue(country?.population) ?? (typeof country?.population === 'number' ? country.population : UNAVAILABLE),
        area: getStringValue(country?.area) ?? (typeof country?.area === 'number' ? country.area : UNAVAILABLE),
        region: getSafeString(country?.region),
        capital: safeCapital,
        subregion: getSafeString(country?.subregion),
        currencies: country?.currencies || {},
        languages: country?.languages || {},
        borders: Array.isArray(country?.borders) ? country.borders : [],
        tld: Array.isArray(country?.tld) ? country.tld : [],
        coatOfArms: {
            svg: getSafeString(safeCoatOfArms.svg),
        },
    }
}

export const normalizeCountryResponse = (response: unknown): Country[] => {
    if (Array.isArray(response)) {
        return response.filter(Boolean).map((country) => normalizeCountry(country as Partial<Country>))
    }

    if (response && typeof response === 'object') {
        return [normalizeCountry(response as Partial<Country>)]
    }

    return []
}

export const toRequestAll = async () => {
    const { data, status } = await api.get('/countries')
    return { data: normalizeCountryResponse(data), status }
}

/**
 * Fetch a single country by name using the shared REST Countries API instance.
 * Preserves the existing API contract with fields: name.common, population, area, region, flags, cca3
 * 
 * @param country - The country name to search for
 * @returns Promise with country data from the API
 */
export const toRequestOne = async (country: string) => {
    const { data, status } = await api.get(`/countries/name/${country}`)
    return { data: normalizeCountryResponse(data), status }
}