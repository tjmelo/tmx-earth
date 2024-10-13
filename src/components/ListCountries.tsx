import React, { SyntheticEvent } from 'react'

import { alphabeticalOrderData } from '../utils/alphabeticalOrder'
import { useDispatch } from 'react-redux'
import { update } from '../feature/country/countrySlice'
import Loading from './Load'

import TextField from '@mui/material/TextField';
import Autocomplete, { AutocompleteChangeReason } from '@mui/material/Autocomplete';

import { ICommonName, ITargetEvent } from '../interfaces'
import { toRequestAll } from '../service/request'
import { useQuery } from 'react-query'

export const ListCountries = () => {
  const dispatch = useDispatch()

  const { data , isLoading, isError } = useQuery('requestAll', toRequestAll)

  const countries = alphabeticalOrderData(data?.data ?? [])

  const selectCountry = (
    event:SyntheticEvent, 
    value: ITargetEvent | null, 
    reason:AutocompleteChangeReason
  ) => value && dispatch(update(value.value))

  const OptionsCountry = ({name, flag}: ICommonName,  idx: number) => {
    return { label:`${flag} ${name.common}`, id: idx, value: name.common }
  }

  if(isError) return <Loading type='danger'>Data not found, notify the administrator!</Loading> 

  return (
    <div className="container">
      <Autocomplete
        sx={{ width: 1 }}
        id="country"
        onChange={selectCountry}
        data-testid="test-country"
        autoHighlight
        options={countries.map(OptionsCountry)}
        renderInput={(params) => <TextField {...params} label= { isLoading ? "Loading countries..." : "Country" } />}
      /> 
    </div>
  )
}
