import React, { ReactNode, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { AxiosResponse } from 'axios';
import { AppLoading } from '../../components/Skeleton';

import MountListCountries from '../Mount';
import Loading from '../Load';

import { ICountry } from '../../interfaces';
import { toRequestOne } from '../../service';
import { DEFAULT } from '../../constants';

export const InfoCountries = () => {

    const country = useSelector((state: ICountry ) => state.country.country);
    const [info, setInfo] = useState<ReactNode>([]);

    const getData = async (fetchData: Promise<AxiosResponse<[], Element>>) => {
        try {
            const { data } = await fetchData;
            setInfo(data?.map((el) => <MountListCountries data={el} key={JSON.stringify(el)}/>))
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        setInfo(<AppLoading />)

        if (!country.length || country === DEFAULT.title){
            setInfo(<Loading type='warning'>{DEFAULT.title}</Loading>)
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
