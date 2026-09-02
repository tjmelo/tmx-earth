import React from 'react'
import { IMountListCountries } from '../../interfaces'

export const MountListCountries: React.FC<IMountListCountries> = ({ data }: IMountListCountries) => {
  const renderName = (countryName?: { common?: string; official?: string }) => countryName?.common || countryName?.official || 'Unavailable'
  const renderValue = (value: string | number | undefined | null, fallback = 'Unavailable') => value === undefined || value === null || value === '' ? fallback : value

  const getLanguageValue = (languages?: Record<string, unknown> | null) => {
    if (!languages || typeof languages !== 'object') {
      return undefined
    }

    const firstValue = Object.values(languages)[0]

    if (typeof firstValue === 'string' && firstValue.trim()) {
      return firstValue
    }

    if (firstValue && typeof firstValue === 'object') {
      const candidate = (firstValue as Record<string, unknown>).common || (firstValue as Record<string, unknown>).official || (firstValue as Record<string, unknown>).name
      if (typeof candidate === 'string' && candidate.trim()) {
        return candidate
      }
    }

    return undefined
  }

  const renderStatIcon = (type: 'people' | 'area' | 'capital' | 'language') => {
    const commonProps = {
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      strokeWidth: 1.8,
      strokeLinecap: 'round' as const,
      strokeLinejoin: 'round' as const,
      'aria-hidden': true,
    }

    switch (type) {
      case 'people':
        return (
          <svg {...commonProps}>
            <path d="M16 19v-1a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v1" />
            <circle cx="10" cy="7" r="3" />
            <path d="M20 19v-1a4 4 0 0 0-3-3.87" />
            <path d="M16 4.13a4 4 0 0 1 0 7.75" />
          </svg>
        )
      case 'area':
        return (
          <svg {...commonProps}>
            <path d="M12 3.5 19.5 18.5H4.5L12 3.5Z" />
            <path d="M12 7.5v6.5" />
            <path d="M9.5 13.5h5" />
          </svg>
        )
      case 'capital':
        return (
          <svg {...commonProps}>
            <path d="M4 20V8.5L12 4l8 4.5V20" />
            <path d="M9 20v-5h6v5" />
            <path d="M7 10h10" />
            <path d="M7 13h10" />
          </svg>
        )
      case 'language':
        return (
          <svg {...commonProps}>
            <path d="M6 18.5V5.5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13l-4-2.5-4 2.5Z" />
            <path d="M8.5 8.5h7" />
            <path d="M8.5 11.5h7" />
          </svg>
        )
      default:
        return null
    }
  }

  const countryName = renderName(data.name)
  const officialName = data.name?.official || 'País'
  const nativeName = Object.values(data.name?.nativeName || {})[0]?.common || 'Indisponível'
  const capital = Array.isArray(data.capital) ? data.capital.join(', ') : (data.capital || 'Indisponível')
  const region = renderValue(data.region)
  const subregion = renderValue(data.subregion)
  const language = getLanguageValue(data.languages)
  const currencyKey = data.currencies ? Object.keys(data.currencies)[0] : undefined
  const currency = currencyKey ? data.currencies?.[currencyKey] : undefined
  const population = Number(data.population ?? 0).toLocaleString('pt-BR') || 'Indisponível'
  const area = Number(data.area ?? 0).toLocaleString('pt-BR') || 'Indisponível'
  return (
    <div className="country-profile">
      <div className="country-hero">
        <div className="flag-frame">
          {data.flags?.svg ? (
            <img src={data.flags.svg} alt={countryName} />
          ) : (
            <div className="flag-placeholder">Bandeira indisponível</div>
          )}
          <span className="flag-caption">Bandeira oficial de {countryName}</span>
        </div>

        <div className="country-overview">
          <h2>{countryName}</h2>

          <div className="country-badges">
            <span>{officialName}</span>
            <span className="badge-muted">País</span>
          </div>
          <div className="country-stat-grid">
            <div className="stat-card">
              <span className="stat-icon people" aria-hidden="true">{renderStatIcon('people')}</span>
              <div>
                <small>POPULAÇÃO</small>
                <strong>{population}</strong>
                <em>habitantes</em>
              </div>
            </div>

            <div className="stat-card">
              <span className="stat-icon area" aria-hidden="true">{renderStatIcon('area')}</span>
              <div>
                <small>ÁREA</small>
                <strong>{area}</strong>
                <em>km²</em>
              </div>
            </div>

            <div className="stat-card">
              <span className="stat-icon capital" aria-hidden="true">{renderStatIcon('capital')}</span>
              <div>
                <small>CAPITAL</small>
                <strong>{capital}</strong>
              </div>
            </div>

            {language && (
              <div className="stat-card">
                <span className="stat-icon language" aria-hidden="true">{renderStatIcon('language')}</span>
                <div>
                  <small>IDIOMA OFICIAL</small>
                  <strong>{language}</strong>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="country-info-grid">
        <div className="info-panel">
          <div className="panel-title">INFORMAÇÕES GERAIS</div>
          <div className="row-list">
            <div className="row-item"><span className="row-label">CAPITAL</span><span className="row-value">{capital}</span></div>
            <div className="row-item"><span className="row-label">REGIÃO</span><span className="row-value">{region}</span></div>
            <div className="row-item"><span className="row-label">SUB-REGIÃO</span><span className="row-value">{subregion}</span></div>
            {language && <div className="row-item"><span className="row-label">LÍNGUA OFICIAL</span><span className="row-value">{language}</span></div>}
            <div className="row-item"><span className="row-label">MOEDA</span><span className="row-value">{currency ? `${currency.name} (${currency.symbol || currencyKey})` : 'Indisponível'}</span></div>
          </div>
        </div>

        <div className="info-panel map-panel">
          <div className="panel-title">LOCALIZAÇÃO</div>
          <div className="map-block">
            <div className="map-dot" aria-hidden="true" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default MountListCountries

