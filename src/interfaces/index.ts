import { ReactNode } from "react"

export interface ITargetEvent {
    target: { value: string }
}

export interface ICommonName {
    name: { common: string }
}

export interface ILoading {
    type: string,
    children: string
}

export interface ICountry {
    country: { country: string }
}

export interface IMountListCountries {
    data: any
}
export interface ISectionList{
    data: ReactNode | any,
    subdata?: ReactNode,
    children: string
}
