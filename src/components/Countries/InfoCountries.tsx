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
    const country = useSelector((state: ICountry) => state.country.country);
    const [info, setInfo] = useState<ReactNode>([]);
    const [lastLoadedCountry, setLastLoadedCountry] = useState<string | null>(null);
    const [isLoadingDetails, setIsLoadingDetails] = useState(false);

    const getData = async (fetchData: Promise<AxiosResponse<[], Element>>, selectedCountry: string) => {
        try {
            const { data } = await fetchData;
            if (selectedCountry !== country) {
                return;
            }
            setInfo(data?.map((el) => <MountListCountries data={el} key={JSON.stringify(el)} />) ?? [])
            setLastLoadedCountry(selectedCountry)
            setIsLoadingDetails(false)
        } catch (e) {
            console.error(e)
            if (selectedCountry === country) {
                if (!lastLoadedCountry) {
                    setInfo(<Loading type='danger'>Unable to load country details right now.</Loading>)
                }
                setLastLoadedCountry(lastLoadedCountry)
                setIsLoadingDetails(false)
            }
        }
    }

    useEffect(() => {
        if (!country || country === DEFAULT.title || country === '') {
            setLastLoadedCountry(null)
            setIsLoadingDetails(false)
            setInfo(<Loading type='warning'>{DEFAULT.title}</Loading>)
            return
        }

        if (!lastLoadedCountry || lastLoadedCountry === country) {
            setInfo(<AppLoading />)
        }
        setIsLoadingDetails(true)

        const data = toRequestOne(country)
        getData(data, country)
    }, [country])

    return (
        <section className="container">
            {isLoadingDetails && lastLoadedCountry && lastLoadedCountry !== country ? (
                <Loading type='info'>{`Loading details for ${country}...`}</Loading>
            ) : null}
            {info}
        </section>
    )
}
