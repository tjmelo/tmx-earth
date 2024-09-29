import React, { useEffect, useState, SyntheticEvent } from 'react'

import { api } from '../model/api'
import { alphabeticalOrderData } from '../utils/alphabeticalOrder'
import { useDispatch } from 'react-redux'
import { update } from '../feature/country/countrySlice'
import Loading from './Load'

import TextField from '@mui/material/TextField';
import Autocomplete, { AutocompleteChangeReason } from '@mui/material/Autocomplete';

import { ICommonName, ITargetEvent } from '../interfaces'

export const ListCountries = () => {
  const dispatch = useDispatch()
  
  const [data, setData] = useState<[]>([])
  useEffect(() => {
    (async () => {
      const { data, status } = await api.get('/all')
      status !== 200 
        ? setData([]) 
        : setData(alphabeticalOrderData(data))
    })()
  }, [])
  
  const selectCountry: any = (
    event:SyntheticEvent, 
    value: ITargetEvent, 
    reason:AutocompleteChangeReason
  ) => value && dispatch(update(value.value))

  const OptionsCountry = ({name, flag}: ICommonName,  idx: number) => {
    return { label:`${flag} ${name.common}`, id: idx, value: name.common }
  }

  return (
    <div className="container">
      {!data 
        ? <Loading type='danger'>Data not found, notify the administrator!</Loading> 
        : <Autocomplete
            sx={{ width: 1 }}
            id="country"
            onChange={selectCountry}
            data-testid="test-country"
            autoHighlight
            options={data?.map(OptionsCountry)}
            renderInput={(params) => <TextField {...params} autoFocus label="Country" />}
          /> 
      }
    </div>
  )
}
