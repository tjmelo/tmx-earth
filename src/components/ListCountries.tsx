import React from 'react'

import { alphabeticalOrderData } from '../utils/alphabeticalOrder'
import { useDispatch } from 'react-redux'
import { update } from '../feature/country/countrySlice'
import Loading from './Load'

import { toRequestAll } from '../service/request'
import { useQuery } from 'react-query'
import { Country, ICommonName } from '../interfaces'

export const ListCountries = () => {
  const dispatch = useDispatch()
  const { data, isError, isLoading } = useQuery('requestAll', toRequestAll)

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
    <div className="container">
      {isLoading && !data ? (
        <Loading type='info'>Waiting for list countries</Loading>
      ) : (
        <select
          className="form-select form-select-lg my-2 shadow"
          onChange={selectCountry}
          aria-label="select-country"
        >
          <option value="">Select a country</option>
          {visibleCountries.length > 0 ? (
            visibleCountries.map((country: ICommonName & Country, idx: number) => {
              const display = String(getDisplayName(country))
              const value = String(country.cca3 || display)
              return (
                <option key={`${value}-${idx}`} value={value}>
                  {display}
                </option>
              )
            })
          ) : (
            <option value="">Unavailable</option>
          )}
        </select>
      )}
    </div>
  )
}
