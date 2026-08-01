import { ReactNode } from "react"

export type TName = {
    official?: string
    nativeName?: {
        [index: string]: {
            common: string
        }
    }
    common?: string
}

export interface ICommonName {
    name: {
        common: string
    }
}

export type TCurrencies = {
    [index: string]: {
        name: string
        symbol: string
    }
}

export type TListData = {
    coatOfArms: { svg: string }
    flags: { svg: string }
    currencies: TCurrencies
    name: TName & { common: string; official?: string }
    capital: string
    region: string
    subregion: string
    languages: Record<string, string>
    borders: string[]
    population: number | string
    area: number | string
    tld: string[]
}

export type AppearancePreference = 'light' | 'dark'

export type Country = {
    cca3: string
    name: TName & { common: string; official?: string }
    flags: { svg?: string }
    population?: number | string
    area?: number | string
    region?: string
    capital?: string | string[]
    subregion?: string
    currencies?: TCurrencies
    languages?: Record<string, string>
    borders?: string[]
    tld?: string[]
    coatOfArms?: { svg?: string }
    official?: string
}

export interface ITargetEvent {
    value: string
}

export interface ILoading {
    type: string,
    children: string
}

export interface ICountry {
    country: { country: string }
}
export interface IMountListCountries {
    data: TListData
}
export interface ISectionList{
    data?: ReactNode,
    subdata?: ReactNode,
    children: string | ReactNode
}
