import React, { useMemo, useState } from 'react'

import { alphabeticalOrderData } from '../utils/alphabeticalOrder'
import { useDispatch, useSelector } from 'react-redux'
import { update } from '../feature/country/countrySlice'
import Loading from './Load'

import { toRequestAll } from '../service/request'
import { useQuery } from 'react-query'
import { Country, ICommonName } from '../interfaces'

export const ListCountries = () => {
  const dispatch = useDispatch()
  const selectedCountry = useSelector((state: any) => state.country?.country)
  const { data, isError, isLoading } = useQuery('requestAll', toRequestAll)
  const [query, setQuery] = useState('')

  const resolvedCountries = Array.isArray(data)
    ? data
    : (data as { data?: Country[] } | undefined)?.data ?? []

  const countries = alphabeticalOrderData(resolvedCountries as Country[])

  const getDisplayName = (country: Country) => {
    const common = country?.name?.common
    const official = country?.name?.official
    const cca3 = country?.cca3

    if (typeof common === 'string' && common !== 'Unavailable' && common.trim() !== '') return common
    if (typeof official === 'string' && official !== 'Unavailable' && official.trim() !== '') return official
    if (typeof cca3 === 'string' && cca3.trim() !== '') return cca3
    return 'Unavailable'
  }

  const visibleCountries = countries.filter((c) => getDisplayName(c) !== 'Unavailable')
  const filteredCountries = useMemo(() => {
    const term = query.trim().toLowerCase()
    if (!term) return visibleCountries

    return visibleCountries.filter((country) => getDisplayName(country).toLowerCase().includes(term))
  }, [query, visibleCountries])

  const selectCountry = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value
    if (value) {
      dispatch(update(value))
    }
  }

  if (isError) {
    return <Loading type='danger'>Data not found, notify the administrator!</Loading>
  }

  return (
    <div className="container country-list-panel">
      {isLoading && !data ? (
        <Loading type='info'>Waiting for list countries</Loading>
      ) : (
        <div className="country-selector-shell">
          <label className="country-selector-label" htmlFor="country-select">
            SELECIONE UM PAÍS
          </label>
          <div className="select-field-wrap">
            <select
              id="country-select"
              className="country-selector"
              onChange={selectCountry}
              aria-label="select-country"
              value={selectedCountry || 'Angola'}
            >
              <option value="">Selecione um país</option>
              {filteredCountries.length > 0 ? (
                filteredCountries.map((country: ICommonName & Country, idx: number) => {
                  const display = String(getDisplayName(country))
                  const value = String(display)
                  return (
                    <option key={`${value}-${idx}`} value={value}>
                      {display}
                    </option>
                  )
                })
              ) : (
                <option value="">Nenhum país encontrado</option>
              )}
            </select>
            <span className="select-chevron" aria-hidden="true">⌄</span>
          </div>
        </div>
      )}
    </div>
  )
}
