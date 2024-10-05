import { SetStateAction, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { AxiosResponse } from 'axios';
import { AppLoading } from '../../components/Skeleton';

import MountListCountries from '../Mount';
import Loading from '../Load';

import { ICountry } from '../../interfaces';
import { toRequestOne } from '../../service';

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
        setInfo(<AppLoading />)

        if (!country.length || country === 'Type the name of a country'){
            setInfo(<Loading type='warning'>Type the name of a country!</Loading>)
        } else {
            const data = toRequestOne(country)
            getData(data)
        }
    }, [country])

    return(
        <section className="container">
            { info }
        </section>
    )
}
