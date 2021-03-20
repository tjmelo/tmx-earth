import React, { useEffect, useState } from 'react';
import { apiListCoutries } from '../api/api';
import { useDispatch } from 'react-redux';
import { update } from '../feature/county/countrySlice';

export const ListCoutries = props => {

    const dispatch = useDispatch();

    const [data, setData] = useState([]);
    useEffect(() => {
       apiListCoutries().then(res => setData(res.data));
    },[data])
    
    const selectCountry = e => {
        dispatch(update(e.target.value));
    }

    return (
        <div className="container">
            <select className='form-select form-select-lg my-2 shadow' onChange={selectCountry}>
                <option value="Select a country">Select a country</option>
                { data.map((list, idx) => <option key={idx}>{list.name}</option>) }
            </select>
        </div>
    )
}