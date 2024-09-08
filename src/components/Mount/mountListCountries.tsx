import { parseNumber } from '../../utils'
import { SectionList } from './sectionList';
import { useEffect, useState } from "react";
import Skeleton from '@mui/material/Skeleton';

import style from "../../styles/components.module.scss"
import { IMountListCountries } from '../../interfaces';

export const MountListCountries:React.FC<IMountListCountries> = ({ data }) => {
  
  const [nativeName, setNativeName] = useState<string>()
  const [currencies, setCurrencies] = useState<string>()

  useEffect(
    () => {
      const getNative = (data: object) => {
        for( const native in data) return native
      }
      setNativeName(getNative(data.name.nativeName))
      setCurrencies(getNative(data.currencies))
    }, [ data ]
  )

  return (
    <div className="row my-5">
      <div
        className={`col-xs-12 d-flex mb-2 ${style.flag}`}
      >
        { data.flags.svg
          ? (
            <figure>
              <img
                src={data.flags.svg}
                alt={data.name.official}
              />
            </figure>
          ) : (
            <Skeleton variant="rectangular" width={100} height={80} />
          )

        }
        <span className={`text-primary ${style.name}`}>
          {data.name.common}
        </span>
        { data.coatOfArms.svg
          ? (
            <img
              width={30}
              height={30}
              src={data.coatOfArms.svg}
              alt={data.name.official}
            />
          ) : (
            <Skeleton variant="circular" width={30} height={30} />
          )
        }
      </div>

      <SectionList 
        data={nativeName ? data.name.nativeName[nativeName].common : <Skeleton width={100} />}>
        Native name:
      </SectionList>

      <SectionList 
        data={ data.capital || <Skeleton width={100} /> }>
        Capital:
      </SectionList>

      <SectionList 
        data={ data.region || <Skeleton width={100} /> }>
        Region:
      </SectionList>

      <SectionList 
        data={ data.subregion || <Skeleton width={100} /> }>
        Subregion:
      </SectionList>

      <SectionList 
        data={ data.languages ? Object.values(data.languages)[0] : <Skeleton width={100} /> }>
        Languages:
      </SectionList>

      <SectionList 
        data={ currencies ? data.currencies[currencies].name : <Skeleton width={100} /> }
        subdata={currencies && data.currencies[currencies].symbol}>
        Currencies:
      </SectionList>

      <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4 mb-3 border-bottom">
        <span className="text-secondary">Borders: </span>{" "}
        <br />
        {data.borders ? (
          data.borders.map((border: string, idx: number) => {
            return (
              <strong
                key={idx}
                className={`text-primary ${style.borders}`}
              >
                <b>{border} </b>
              </strong>
            )
          })
        ) : (
          <Skeleton width={100} />
        )}
      </div>

      <SectionList 
        data={ parseNumber(data.population) || <Skeleton width={100} /> }>
        Poulation:
      </SectionList>

      <SectionList 
        data={ parseNumber(data.area) || <Skeleton width={100} /> }>
        Area:
      </SectionList>

      <SectionList 
        data={ data.tld || <Skeleton width={100} /> }>
        Domain:
      </SectionList>
        
    </div>
  )
}
