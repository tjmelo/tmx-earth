import { parseNumber } from '../../utils'
import { SectionList } from './sectionList';
import React, { useEffect, useState } from "react";
import Skeleton from '@mui/material/Skeleton';

import style from "../../styles/components.module.scss"
import { IMountListCountries } from '../../interfaces';

export const MountListCountries:React.FC<IMountListCountries> = ({ data }: IMountListCountries) => {
  
  const [nativeName, setNativeName] = useState<string>()
  const [currencies, setCurrencies] = useState<string>()

  const renderName = (countryName?: { common?: string; official?: string }) => countryName?.common || countryName?.official || 'Unavailable'
  const renderValue = (value: string | number | undefined | null, fallback = 'Unavailable') => value === undefined || value === null || value === '' ? fallback : value

  useEffect(
    () => {
      const getNativeKey = (input?: Record<string, unknown> | null) => {
        if (!input) {
          return ''
        }
        return Object.keys(input)[0] ?? ''
      }

      setNativeName(getNativeKey(data.name.nativeName))
      setCurrencies(getNativeKey(data.currencies as Record<string, unknown>))
    }, [ data ]
  )

  return (
    <div className="row my-5">
      <div
        className={`col-xs-12 d-flex mb-2 ${style.flag}`}
      >
        { data.flags?.svg && data.flags.svg !== 'Unavailable'
          ? (
            <figure>
              <img
                src={data.flags.svg}
                alt={renderName(data.name)}
              />
            </figure>
          ) : (
            <span className="text-secondary">Unavailable</span>
          )

        }
        <span className={`text-primary ${style.name}`}>
          {renderName(data.name)}
        </span>
        { data.coatOfArms?.svg && data.coatOfArms.svg !== 'Unavailable'
          ? (
            <img
              width={30}
              height={30}
              src={data.coatOfArms.svg}
              alt={renderName(data.name)}
            />
          ) : (
            <span className="text-secondary">Unavailable</span>
          )
        }
      </div>

      <SectionList 
        data={nativeName && data.name.nativeName
          ? ((data.name.nativeName as Record<string, { common?: string }>)[nativeName]?.common ?? <Skeleton width={100} />)
          : <Skeleton width={100} />}> 
        Native name:
      </SectionList>

      <SectionList 
        data={ renderValue(data.capital) || <Skeleton width={100} /> }>
        Capital:
      </SectionList>

      <SectionList 
        data={ renderValue(data.region) || <Skeleton width={100} /> }>
        Region:
      </SectionList>

      <SectionList 
        data={ renderValue(data.subregion) || <Skeleton width={100} /> }>
        Subregion:
      </SectionList>

      <SectionList 
        data={ (() => {
          if (!data.languages) return <Skeleton width={100} />
          const vals = Object.values(data.languages)
          const first = vals[0]
          if (typeof first === 'string') return first
          if (first && typeof first === 'object') {
            // attempt common string fields
            return (first as any).name || (first as any).common || JSON.stringify(first)
          }
          return <Skeleton width={100} />
        })() }>
        Languages:
      </SectionList>

      <SectionList 
        data={ currencies ? data.currencies?.[currencies]?.name ?? <Skeleton width={100} /> : <Skeleton width={100} /> }
        subdata={currencies ? data.currencies?.[currencies]?.symbol : undefined}>
        Currencies:
      </SectionList>

      <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4 mb-3 border-bottom">
        <span className="text-secondary">Borders: </span>{" "}
        <br />
        {data.borders && data.borders.length > 0 ? (
          data.borders.map((border: string) => (
              <strong
                key={border}
                className={`text-primary ${style.borders}`}
              >
                <b>{border} </b>
              </strong>
            )
          )) : (
          <span className="text-secondary">Unavailable</span>
        )}
      </div>

      <SectionList 
        data={ parseNumber(data.population) || <Skeleton width={100} /> }>
        Population:
      </SectionList>

      <SectionList 
        data={ parseNumber(data.area) || <Skeleton width={100} /> }>
        Area:
      </SectionList>

      <SectionList 
        data={ data.tld && data.tld.length > 0 ? data.tld : 'Unavailable' }>
        Domain:
      </SectionList>
        
    </div>
  )
}
