import React, { useEffect, useState } from 'react'
import { apiListCountries } from '../model/api'
import { useDispatch } from 'react-redux'
import { update } from '../feature/country/countrySlice'
import Loading from './Load'

import { ICommonName, ITargetEvent } from '../interfaces'

export const ListCountries = () => {
  const dispatch = useDispatch()
  const [data, setData] = useState<[]>([])

  useEffect(() => {
    apiListCountries().then(({ data, status }) => 
      status !== 200 ? setData([]) : setData(data))
  }, [])

  const selectCountry = (event: ITargetEvent) => {
    dispatch(update(event.target.value))
  }

  const OptionsCountry = ({name}: ICommonName, idx: number) => (
    <option key={idx}>{name.common}</option>
  )

  return (
    <div className="container">
      {!data 
        ? <Loading type='danger'>Data not found, notify the administrator!</Loading> 
        : <select
            className="form-select form-select-lg my-2 shadow"
            onChange={selectCountry}
          >
            <option value="Select a country">Select a country</option>
            {data && data.map(OptionsCountry)}
          </select>
      }
    </div>
  )
}
