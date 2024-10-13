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

export interface ITargetEvent {
    value: string
}

export interface ICommonName {
    name: { common: string }
    flag: string
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
