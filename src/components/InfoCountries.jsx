import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

import { MountListCountries } from './mountListCountries';

export const InfoCountries = props => {

    const country = useSelector(state => state.country.country);
    const [info, setInfo] = useState([]);

    useEffect(() => {    
        // Export all details by countries...
        setInfo(<div className="alert alert-primary">Getting data...</div>)

        if(country.length === 0 || country === 'Select a country'){
            setInfo(<div className="alert alert-warning">Select a country!</div>)
        }else{
            const data = axios.get(`https://restcountries.eu/rest/v2/name/${country}?fullText=true`)
            data.then(d => {
                setInfo(d.data.map((el, idx) => <MountListCountries data={el} key={idx}/> ))
            }).catch(e => console.error(e));
        }
    }, [country])

    return(
        <section className="container my-5">
            { info }
        </section>
    )
}