import style from "./components.module.css"

export const MountListCountries = ({ data }) => {
  console.log(data.flags.svg)

  const parseNumber = element => {
    let number = element.toString().split(""),
      qtdeDivisor = Math.floor(number.length / 3),
      arr = []

    for (let i = 0; i < qtdeDivisor; i++) {
      let ind = number.length - 3 * (i + 1) - 1
      if (ind !== -1) arr.push(ind)
    }

    for (let i = 0; i < arr.length; i++)
      number.splice(arr[i] + 1, 0, ".")
    return number.join("")
  }

  let population = parseNumber(data.population),
    area = parseNumber(data.area)

  return (
    <div className="row">
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
      </div>

      <div className={`col-xs-12 my-3 border-bottom`}>
        <span className="text-secondary">
          Native name:{" "}
        </span>{" "}
        <br />
        <strong className="text-primary">
          {Object.values(data.name.nativeName)[0].common ||
            "------"}
        </strong>{" "}
        <br />
      </div>

      <div className={`col-xs-12 my-3 border-bottom`}>
        <span className="text-secondary">Capital: </span>{" "}
        <br />
        {
          <strong className="text-primary">
            {data.capital || "------"}
          </strong>
        }
        <br />
      </div>

      <div className={`col-xs-12 my-3 border-bottom`}>
        <span className="text-secondary">Region: </span>{" "}
        <br />
        <strong className="text-primary">
          {data.region || "-----"}
        </strong>{" "}
        <br />
      </div>

      <div className={`col-xs-12 border-bottom my-3`}>
        <span className="text-secondary">Subregion: </span>{" "}
        <br />
        <strong className="text-primary">
          {data.subregion || "-----"}
        </strong>{" "}
        <br />
      </div>

      <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4 mb-3">
        <span className="text-secondary">Languages: </span>{" "}
        <br />
        <strong className="text-primary">
          {Object.values(data.languages)[0]}
        </strong>
      </div>

      <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4 mb-3">
        <span className="text-secondary">Currencies: </span>{" "}
        <br />
        <strong className="text-primary">
          {Object.values(data.currencies)[0].name}
          <sup>
            {Object.values(data.currencies)[0].symbol}
          </sup>
        </strong>
      </div>

      <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4 mb-3">
        <span className="text-secondary">Borders: </span>{" "}
        <br />
        {data.borders ? (
          data.borders.map((border, idx) => {
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

      <div className="col-xs-12 my-3 border-bottom">
        <span className="text-secondary">Poulation: </span>{" "}
        <br />
        <strong className="text-primary">
          {population || "-----"}
        </strong>
      </div>

      <div className={`col-xs-12 my-3 border-bottom`}>
        <span className="text-secondary">Area: </span>{" "}
        <br />
        <strong className="text-primary">
          {area || "-----"}
        </strong>{" "}
        <br />
      </div>

      <div
        className={`col-xs-12 col-sm-6 col-md-2 col-lg-2 mb-3`}
      >
        <span className="text-secondary">Domain: </span>{" "}
        <br />
        <strong className="text-primary">
          {data.tld || "-----"}
        </strong>{" "}
        <br />
      </div>

      <div
        className={`col-xs-12 col-sm-6 col-md-2 col-lg-2 mb-3`}
      >
        <img
          width={50}
          src={data.coatOfArms.svg}
          alt={data.name.official}
        />
      </div>
    </div>
  )
}
