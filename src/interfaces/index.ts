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
    cca3?: string
    coatOfArms?: { svg?: string }
    flags?: { svg?: string }
    currencies?: TCurrencies | null
    name: TName & { common: string; official?: string }
    capital?: string
    region?: string
    subregion?: string
    languages?: Record<string, string> | null
    borders?: string[] | null
    population?: number | string
    area?: number | string
    tld?: string[] | null
}

export type AppearancePreference = 'light' | 'dark'

export type Country = {
    cca3?: string
    name: TName & { common: string; official?: string }
    flags?: { svg?: string }
    population?: number | string
    area?: number | string
    region?: string
    capital?: string | string[]
    subregion?: string
    currencies?: TCurrencies | null
    languages?: Record<string, string> | null
    borders?: string[] | null
    tld?: string[] | null
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
