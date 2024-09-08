import React from 'react'
import Skeleton from '@mui/material/Skeleton';

import style from "../../styles/components.module.scss"
import { SectionList } from '../Mount/sectionList';

export const AppLoading: React.FC = () => (
    <div className="row my-5">
      <div
        className={`col-xs-12 d-flex mb-2 ${style.flag}`}
      >
        <Skeleton variant="rectangular" width={100} height={80} />
        <span className={`text-primary ${style.name}`}>
            <Skeleton variant="rectangular" width={100} height={20} />
        </span>
      </div>

      <SectionList
        data={<Skeleton width={200} />}>
        <Skeleton width={100} />
      </SectionList>

      <SectionList
        data={<Skeleton width={200} />}>
        <Skeleton width={100} />
      </SectionList>

      <SectionList
        data={<Skeleton width={200} />}>
        <Skeleton width={100} />
      </SectionList>

      <SectionList
        data={<Skeleton width={200} />}>
        <Skeleton width={100} />
      </SectionList>

      <SectionList
        data={<Skeleton width={200} />}>
        <Skeleton width={100} />
      </SectionList>

      <SectionList
        data={<Skeleton width={200} />}>
        <Skeleton width={100} />
      </SectionList>

      <SectionList
        data={<Skeleton width={200} />}>
        <Skeleton width={100} />
      </SectionList>
        
    </div>
  )