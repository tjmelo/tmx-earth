import React, { useEffect, useState } from 'react'
import { apiListCoutries } from '../model/api'
import { useDispatch } from 'react-redux'
import { update } from '../feature/country/countrySlice'
import Loading from './Load'

export const ListCoutries = props => {
  const dispatch = useDispatch()
  const [data, setData] = useState([])

  useEffect(() => {
    apiListCoutries().then(({ data, status }) => 
      status !== 200 
      ? setData(false) 
      : setData(data))
  }, [])

  const selectCountry = e => {
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
        {data && data.map(({name}, idx) => (
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
