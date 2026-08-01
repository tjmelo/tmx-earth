import React, { ReactNode, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { AppLoading } from '../../components/Skeleton';

import MountListCountries from '../Mount';
import Loading from '../Load';

import { ICountry, TListData, Country } from '../../interfaces';
import { toRequestOne } from '../../service';
import { DEFAULT } from '../../constants';

interface ICountryResponse {
    data: Country[]
}

export const InfoCountries = () => {
    const country = useSelector((state: ICountry) => state.country.country);
    const [info, setInfo] = useState<ReactNode>([]);
    const [lastLoadedCountry, setLastLoadedCountry] = useState<string | null>(null);
    const [isLoadingDetails, setIsLoadingDetails] = useState(false);

    const getData = async (fetchData: Promise<ICountryResponse>, selectedCountry: string) => {
        try {
            const { data } = await fetchData;
            if (selectedCountry !== country) {
                return;
            }

            const details = data.length > 0
                ? data.map((el, index) => {
                    const detail = el as Country
                    return <MountListCountries data={detail as unknown as TListData} key={`${JSON.stringify(el)}-${index}`} />
                })
                : <Loading type='warning'>{`No details available for ${selectedCountry}.`}</Loading>

            setInfo(details)
            setLastLoadedCountry(selectedCountry)
            setIsLoadingDetails(false)
        } catch (e) {
            console.error(e)
            if (selectedCountry === country) {
                if (!lastLoadedCountry) {
                    setInfo(<Loading type='danger'>Unable to load country details right now.</Loading>)
                }
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
