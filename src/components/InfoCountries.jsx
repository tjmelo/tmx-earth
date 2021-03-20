import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

import style from './components.module.css';

export const InfoCountries = props => {

    const country = useSelector(state => state.country.country);
    const [info, setInfo] = useState([]);

    useEffect(() => {
        // Export all details by countries...
        const data = axios.get(`https://restcountries.eu/rest/v2/name/${country}`)
        data.then(d => {
            setInfo(d.data)
        }).catch(e => console.error(e));
    }, [country])
    
    return(
        <section className="container my-5">
                {info.map((el, idx) => {
                    return <div key={idx} className="row">
                                                
                        <div className={`col-xs-12 d-flex mb-2 ${style.flag}`}>
                            <figure>
                                <img src={el.flag} alt={el.nativeName}/>
                            </figure>
                            <span className={`text-primary ${style.name}`}>
                                {el.name}
                            </span> 
                            <sup>{el.alpha3Code}</sup>
                            <sup>{el.alpha2Code}</sup>
                            <sup>{el.numericCode}</sup>
                            <br/>
                        </div>

                        <div className={`col-xs-12 col-sm-6 col-md-3 col-lg-3 mb-3`}>
                            <span className="text-secondary">Native name: </span> <br/>
                            <strong className="text-primary">{el.nativeName || '-----'}</strong> <br/>
                        </div>

                        <div className={`col-xs-12 col-sm-6 col-md-3 col-lg-3 mb-3`}>
                            <span className="text-secondary">Capital: </span> <br/>
                            {<strong className="text-primary">{el.capital || '-----'}</strong> }<br/>
                        </div>

                        <div className={`col-xs-12 col-sm-6 col-md-3 col-lg-3 mb-3`}>
                            <span className="text-secondary">Region: </span> <br/>
                            <strong className="text-primary">{el.region || '-----'}</strong> <br/>
                        </div>

                        <div className={`col-xs-12 col-sm-6 col-md-3 col-lg-3 mb-3`}>
                            <span className="text-secondary">Subregion: </span> <br/>
                            <strong className="text-primary">{el.subregion || '-----'}</strong> <br/>
                        </div>

                        <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4 mb-3">  
                            <span className="text-secondary">Languages: </span> <br/>
                            {el.languages.map((language, idx )=> {
                                return  <strong key={idx} className="text-primary">
                                            { language.name } | { language.nativeName }
                                           <sup>{ language.iso639_1 }</sup> <br/>
                                        </strong>
                            })}
                        </div>

                        <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4 mb-3">
                            <span className="text-secondary">Currencies: </span> <br/>
                            {el.currencies.map((currencie, idx )=> {
                                return  <strong key={idx} className="text-primary">
                                            { currencie.name } 
                                           <sup>{ currencie.symbol }</sup>
                                           <sup>{ currencie.code }</sup><br/>
                                        </strong>
                            })}    
                        </div>
                        
                        <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4 mb-3">
                            <span className="text-secondary">Borders: </span> <br/>
                            {el.borders.map((border, idx )=> {
                                return  <strong key={idx} className={`text-primary ${style.borders}`}>
                                            <b>{ border } </b>
                                        </strong>
                            })}    
                        </div>

                        <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4 mb-3">
                            <span className="text-secondary">Regional Blocs: </span> <br/>
                            {el.regionalBlocs.map((regional, idx )=> {
                                return  <strong key={idx} className={`text-primary ${style.borders}`}>
                                            { regional.acronym }
                                            <sup>{regional.name}</sup> <br/>
                                        </strong>
                            })}    
                        </div>

                        <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3 mb-3">    
                            <span className="text-secondary">Poulation: </span> <br/>
                            <strong className="text-primary">{el.population || '-----'}</strong>
                        </div>

                        <div className={`col-xs-12 col-sm-6 col-md-3 col-lg-3 mb-3`}>
                            <span className="text-secondary">Area: </span> <br/>
                            <strong className="text-primary">{el.area || '-----'}</strong> <br/>
                        </div>

                        <div className={`col-xs-12 col-sm-6 col-md-2 col-lg-2 mb-3`}>
                            <span className="text-secondary">Domain: </span> <br/>
                            <strong className="text-primary">{el.topLevelDomain || '-----'}</strong> <br/>
                        </div>

                    </div>
                        
                })}
            
        </section>
    )
}