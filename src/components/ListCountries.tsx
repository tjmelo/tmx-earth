import React, { useEffect, useState } from 'react'
import { apiListCountries } from '../model/api'
import { useDispatch } from 'react-redux'
import { update } from '../feature/country/countrySlice'
import Loading from './Load'

export const ListCountries = () => {
  const dispatch = useDispatch()
  const [data, setData] = useState<[]>([])

  useEffect(() => {
    apiListCountries().then(({ data, status }) => 
      status !== 200 
      ? setData([]) 
      : setData(data))
  }, [])

  const selectCountry = (e: { target: { value: any } }) => {
    dispatch(update(e.target.value))
  }

  return (
    <div className="container">
      <select
        className="form-select form-select-lg my-2 shadow"
        onChange={selectCountry}
      >
        <option value="Select a country">
          {!data ? '' : 'Select a country' }
        </option>
        {data && data.map(({name}: any, idx: number) => (
          <option key={idx}>{name.common}</option>
        ))}
      </select>
      {!data 
        ? <Loading type='danger'>Data not found, notify the administrator!</Loading> 
        : ''
      }
    </div>
  )
}
