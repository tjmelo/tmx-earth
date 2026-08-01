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
          {countries.map((country: ICommonName & Country, idx: number) => (
            <option key={`${country.cca3}-${idx}`} value={country.name.common || country.name.official || 'Unavailable'}>
              {country.name.common || country.name.official || 'Unavailable'}
            </option>
          ))}
        </select>
      )}
    </div>
  )
}
