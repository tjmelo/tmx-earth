import { parseNumber } from '../../utils'
import { SectionList } from './sectionList';
import { useEffect, useState } from "react";

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
        <figure>
          <img
            src={data.flags.svg}
            alt={data.name.official}
          />
        </figure>
        <span className={`text-primary ${style.name}`}>
          {data.name.common}
        </span>
        { data.coatOfArms.svg 
          && (
            <img
              width={30}
              height={30}
              src={data.coatOfArms.svg}
              alt={data.name.official}
            />
          )
        }
      </div>

      <SectionList 
        data={nativeName ? data.name.nativeName[nativeName].common: ''}>
        Native name:
      </SectionList>

      <SectionList 
        data={ data.capital || "-----" }>
        Capital:
      </SectionList>

      <SectionList 
        data={ data.region || "-----" }>
        Region:
      </SectionList>

      <SectionList 
        data={ data.subregion || "-----" }>
        Subregion:
      </SectionList>

      <SectionList 
        data={ data.languages ? Object.values(data.languages)[0] : "-----" }>
        Languages:
      </SectionList>

      <SectionList 
        data={ currencies && data.currencies[currencies].name }
        subdata={currencies && data.currencies[currencies].symbol}>
        Currencies:
      </SectionList>

      <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4 mb-3 border-bottom">
        <span className="text-secondary">Borders: </span>{" "}
        <br />
        {data.borders ? (
          data.borders.map((border: any, idx: any) => {
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
          <strong className="text-primary">-----</strong>
        )}
      </div>

      <SectionList 
        data={ parseNumber(data.population) || "-----" }>
        Poulation:
      </SectionList>

      <SectionList 
        data={ parseNumber(data.area) || "-----" }>
        Area:
      </SectionList>

      <SectionList 
        data={ data.tld || "-----" }>
        Domain:
      </SectionList>
        
    </div>
  )
}
