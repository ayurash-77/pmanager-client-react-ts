import { FC } from 'react'
import { IProject } from '../../interfaces/IProject'
import * as s from './InfoGrid'
import { InfoBrand } from './InfoBrand'
import { InfoClient } from './InfoClient'
import { InfoAgency } from './InfoAgency'
import { InfoOwner } from './InfoOwner'
import { InfoStartAt } from './InfoStartAt'
import { InfoDeadline } from './InfoDeadline'
import { InfoStatus } from './InfoStatus'
import { InfoProgress } from './InfoProgress'
import { InfoGrid } from './InfoGrid'

export const InfoProjectBlock: FC<Partial<IProject>> = project => {
  return (
    <>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'space-evenly' }}>
        <InfoGrid>
          <InfoBrand brand={project.brand} />
          <InfoClient client={project.client} />
          <InfoAgency agency={project.agency} />
          <InfoOwner owner={project.owner} />
        </InfoGrid>
        <s.InfoGrid>
          <InfoStartAt startAt={project.startAt} />
          <InfoDeadline deadline={project.deadline} />
          <InfoStatus status={project.status} />
          <InfoProgress progress={project.progress} status={project.status} withLabel withValue />
        </s.InfoGrid>
      </div>
    </>
  )
}
