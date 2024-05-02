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