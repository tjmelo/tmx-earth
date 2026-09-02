import React from 'react'

import style from "../../styles/components.module.scss"
import { SectionList } from '../Mount/sectionList';

const skeletonStyle: React.CSSProperties = {
  display: 'block',
  borderRadius: 6,
  background: 'linear-gradient(90deg, #e5e7eb 25%, #f3f4f6 50%, #e5e7eb 75%)',
  backgroundSize: '200% 100%',
  animation: 'pulse 1.4s ease-in-out infinite',
}

export const AppLoading: React.FC = () => (
    <div className="row my-5">
      <div className={`col-xs-12 d-flex mb-2 ${style.flag}`}>
        <div style={{ ...skeletonStyle, width: 100, height: 80 }} />
        <span className={`text-primary ${style.name}`}>
          <div style={{ ...skeletonStyle, width: 100, height: 20, marginTop: 10 }} />
        </span>
      </div>

      {[...Array(7)].map((_, index) => (
        <SectionList key={index} data={<div style={{ ...skeletonStyle, width: 200, height: 20 }} />}>
          <div style={{ ...skeletonStyle, width: 100, height: 20 }} />
        </SectionList>
      ))}
    </div>
  )