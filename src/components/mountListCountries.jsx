import style from './components.module.css';

export const MountListCountries = ({data}) => {
       
    const parseNumber = element => {
        let number = element.toString().split(''),
            qtdeDivisor = Math.floor(number.length / 3),
            arr = [];

        for(let i=0; i<qtdeDivisor;i++){
            let ind = number.length - (3*(i+1))-1;
            if(ind !== -1) arr.push(ind)
        }
        
        for(let i=0; i<arr.length; i++) number.splice(arr[i]+1, 0, '.')
        return number.join('');
    }

    let population = parseNumber(data.population),
        area = parseNumber(data.area);

    return (
        <div className="row">
                                            
            <div className={`col-xs-12 d-flex mb-2 ${style.flag}`}>
                <figure>
                    <img src={data.flag} alt={data.nativeName}/>
                </figure>
                <span className={`text-primary ${style.name}`}>
                    {data.name}
                </span> 
                <sup>{data.alpha3Code}</sup>
                <sup>{data.alpha2Code}</sup>
                <sup>{data.numericCode}</sup>
                <br/>
            </div>

            <div className={`col-xs-12 col-sm-6 col-md-3 col-lg-3 mb-3`}>
                <span className="text-secondary">Native name: </span> <br/>
                <strong className="text-primary">{data.nativeName || '-----'}</strong> <br/>
            </div>

            <div className={`col-xs-12 col-sm-6 col-md-3 col-lg-3 mb-3`}>
                <span className="text-secondary">Capital: </span> <br/>
                {<strong className="text-primary">{data.capital || '-----'}</strong> }<br/>
            </div>

            <div className={`col-xs-12 col-sm-6 col-md-3 col-lg-3 mb-3`}>
                <span className="text-secondary">Region: </span> <br/>
                <strong className="text-primary">{data.region || '-----'}</strong> <br/>
            </div>

            <div className={`col-xs-12 col-sm-6 col-md-3 col-lg-3 mb-3`}>
                <span className="text-secondary">Subregion: </span> <br/>
                <strong className="text-primary">{data.subregion || '-----'}</strong> <br/>
            </div>

            <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4 mb-3">  
                <span className="text-secondary">Languages: </span> <br/>
                {data.languages.map((language, idx )=> {
                    return  <strong key={idx} className="text-primary">
                                { language.name } | { language.nativeName }
                                <sup>{ language.iso639_1 }</sup> <br/>
                            </strong>
                })}
            </div>

            <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4 mb-3">
                <span className="text-secondary">Currencies: </span> <br/>
                {data.currencies.map((currencie, idx )=> {
                    return  <strong key={idx} className="text-primary">
                                { currencie.name } 
                                <sup>{ currencie.symbol }</sup>
                                <sup>{ currencie.code }</sup><br/>
                            </strong>
                })}    
            </div>
            
            <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4 mb-3">
                <span className="text-secondary">Borders: </span> <br/>
                {data.borders.map((border, idx )=> {
                    return  <strong key={idx} className={`text-primary ${style.borders}`}>
                                <b>{ border } </b>
                            </strong>
                })}    
            </div>

            <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4 mb-3">
                <span className="text-secondary">Regional Blocs: </span> <br/>
                {data.regionalBlocs.map((regional, idx )=> {
                    return  <strong key={idx} className={`text-primary ${style.borders}`}>
                                { regional.acronym }
                                <sup>{regional.name}</sup> <br/>
                            </strong>
                })}    
            </div>

            <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3 mb-3">    
                <span className="text-secondary">Poulation: </span> <br/>
                <strong className="text-primary">{population || '-----'}</strong>
            </div>

            <div className={`col-xs-12 col-sm-6 col-md-3 col-lg-3 mb-3`}>
                <span className="text-secondary">Area: </span> <br/>
                <strong className="text-primary">{area || '-----'}</strong> <br/>
            </div>

            <div className={`col-xs-12 col-sm-6 col-md-2 col-lg-2 mb-3`}>
                <span className="text-secondary">Domain: </span> <br/>
                <strong className="text-primary">{data.topLevelDomain || '-----'}</strong> <br/>
            </div>

        </div>
    )
}