import { SetStateAction, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios, { AxiosResponse } from 'axios';

import MountListCountries from '../Mount';
import Loading from '../Load';

import { ICountry } from '../../interfaces';

export const InfoCountries = () => {

    const country = useSelector((state: ICountry ) => state.country.country);
    const [info, setInfo] = useState<[] | SetStateAction<any>>([]);

    const getData = async (fetchData: Promise<AxiosResponse<any, any>>) => {
        try {
            const { data } = await fetchData;
            setInfo(data?.map((el:{cca2: string}) => <MountListCountries data={el} key={el.cca2}/> ))
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {    
        setInfo(<div className="alert alert-primary my-2">Getting data...</div>)

        if (!country.length || country === 'Type the name of a country'){
            setInfo(<Loading type='warning'>Type the name of a country!</Loading>)
        } else {
            const data = axios.get(`https://restcountries.com/v3.1/name/${country}?fullText=true`)
            getData(data)
        }
    }, [country])

    return(
        <section className="container">
            { info }
        </section>
    )
}
