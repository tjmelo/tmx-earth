import { api } from "../model/api"
import { Country } from "../interfaces"

const UNAVAILABLE = 'Unavailable'

const getStringValue = (value: unknown): string | undefined => {
    return typeof value === 'string' && value.trim() ? value : undefined
}

const getSafeString = (value: unknown) => getStringValue(value) ?? UNAVAILABLE

const getCommonName = (country: Partial<Country> | null | undefined) => {
    const rawName = country?.name

    if (typeof rawName === 'string') {
        return getSafeString(rawName)
    }

    const safeName = getSafeObject(rawName) as Partial<Country['name']>

    const candidates: Array<unknown> = [
        safeName?.common,
        safeName?.official,
        (country as any)?.commonName,
        (country as any)?.common,
    ]

    for (const c of candidates) {
        const v = getStringValue(c)
        if (v) return v
    }

    return UNAVAILABLE
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
    const commonName = getCommonName(country)
    const rawName = country?.name
    const safeName = typeof rawName === 'object' && rawName ? (rawName as Partial<Country['name']>) : ({} as Partial<Country['name']>)

    const safeFlags = getSafeObject(country?.flags)
    const safeCoatOfArms = getSafeObject(country?.coatOfArms)
    const safeCapital = getCapitalValue(country)

    return {
        // keep cca3 undefined when provider doesn't supply a usable code
            // keep cca3 as a usable string or mark as Unavailable for UI
        cca3: getSafeString(country?.cca3),
        name: {
            common: commonName,
            // Prefer an explicit official name; if not provided mark as Unavailable
            official: getStringValue(safeName.official) ?? UNAVAILABLE,
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
    // If caller passed a three-letter country code (CCA3), use the alpha endpoint
    const isCca3 = typeof country === 'string' && /^[A-Za-z]{3}$/.test(country)
    const path = isCca3 ? `/countries/alpha/${country}` : `/countries/name/${country}`
    const { data, status } = await api.get(path)
    return { data: normalizeCountryResponse(data), status }
}