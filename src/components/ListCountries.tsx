import React from 'react'

import { alphabeticalOrderData } from '../utils/alphabeticalOrder'
import { useDispatch } from 'react-redux'
import { update } from '../feature/country/countrySlice'
import Loading from './Load'

import { ICommonName } from '../interfaces'
import { toRequestAll } from '../service/request'
import { useQuery } from 'react-query'

export const ListCountries = () => {
  const dispatch = useDispatch()
  const { data, isError } = useQuery('requestAll', toRequestAll)
  const countries = alphabeticalOrderData(data?.data ?? [])

  const selectCountry = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(update(event.target.value))
  }

  const OptionsCountry = ({name, flag}: ICommonName, idx: number) => (
    <option key={idx} value={name.common}>{`${flag} ${name.common}`}</option>
  )

  if(isError) return <Loading type='danger'>Data not found, notify the administrator!</Loading> 
  
  return (
    <div className="container">
      {!data 
        ? <Loading type='info'>Waiting for list countries</Loading> 
        : <select
            className="form-select form-select-lg my-2 shadow"
            onChange={selectCountry}
            aria-label="select-country"
          >
            <option value="Select a country">Select a country</option>
            {countries.map(OptionsCountry)}
          </select>
      }
    </div>
  )
}