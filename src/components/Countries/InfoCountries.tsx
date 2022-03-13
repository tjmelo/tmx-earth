import { SetStateAction, useEffect, useState } from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';
import axios from 'axios';

import MountListCountries from '../Mount';
import Loading from '../Load';

export const InfoCountries = () => {

    const country = useSelector((state: RootStateOrAny) => state.country.country);
    const [info, setInfo] = useState<[]|SetStateAction<any>>([]);

    useEffect(() => {    
        // Export all details by countries...
        setInfo(<div className="alert alert-primary">Getting data...</div>)

        if(country.length === 0 || country === 'Select a country'){
            setInfo(<Loading type='warning'>Select a country!</Loading>)
        }else{
            const data = axios.get(`https://restcountries.com/v3.1/name/${country}?fullText=true`)
            data.then(({data}) => {
                setInfo(data.map((el:{}, idx: number) => <MountListCountries data={el} key={idx}/> ))
            }).catch(e => console.error(e));
        }
    }, [country])

    return(
        <section className="container">
            { info }
        </section>
    )
}
