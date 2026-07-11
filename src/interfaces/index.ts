import { ReactNode } from "react"

export type TName = {
    official: string
    nativeName: {
        [index: string]: {
            common: string
        }
    }
    common: string
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
    name: TName
    capital: string
    region: string
    subregion: string
    languages: Object
    borders: []
    population: number,
    area: number
    tld: []
}

export type AppearancePreference = 'light' | 'dark'

export type Country = {
    cca3: string
    name: { common: string }
    flags: { svg: string }
    population: number
    area: number
    region: string
    capital: string[]
    subregion?: string
    currencies?: TCurrencies
    languages?: Record<string, string>
    borders?: string[]
    tld?: string[]
}

export interface ITargetEvent {
    value: string
}

export interface ICommonName {
    name: { common: string }
    flags: { svg: string }
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
