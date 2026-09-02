import React from 'react'
import { ISectionList } from '../../interfaces'

export const SectionList: React.FC<ISectionList> = ({ data, children, subdata }) => {
  return (
    <div className="country-detail-row">
      <span className="country-detail-label">{children}</span>
      <div className="country-detail-value-wrap">
        <strong className="country-detail-value">
          {data}
          {subdata ? <sup>{subdata}</sup> : ''}
        </strong>
      </div>
    </div>
  )
}
