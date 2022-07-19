import { FC } from 'react'
import { IProject } from '../../interfaces/IProject'
import { InfoAgency } from './InfoAgency'
import { InfoBrand } from './InfoBrand'
import { InfoClient } from './InfoClient'
import { InfoDeadline } from './InfoDeadline'
import { InfoOwner } from './InfoOwner'
import { InfoProgress } from './InfoProgress'
import { InfoStartAt } from './InfoStartAt'
import { InfoStatus } from './InfoStatus'

export const InfoProjectBlock: FC<Partial<IProject>> = project => {
  return (
    <>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'space-evenly' }}>
        <div className={'grid grid-cols-2'}>
          <InfoBrand brand={project.brand} />
          <InfoClient client={project.client} />
          <InfoAgency agency={project.agency} />
          <InfoOwner owner={project.owner} />
        </div>
        <div className={'grid grid-cols-2'}>
          <InfoStartAt startAt={project.startAt} />
          <InfoDeadline deadline={project.deadline} />
          <InfoStatus status={project.status} />
          <InfoProgress progress={project.progress} status={project.status} withLabel withValue />
        </div>
      </div>
    </>
  )
}
