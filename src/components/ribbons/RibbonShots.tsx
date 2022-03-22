import { useTranslate } from '../../hooks/useTranslate'
import { IReelsType } from '../../interfaces/IReelsType'
import { EntityCardReelsType } from '../entity-card/EntityCardReelsType'
import { RibbonWrapper } from './RibbonWrapper'
import { IReel } from '../../interfaces/IReel'
import { EntityCardReel } from '../entity-card/EntityCardReel'
import { IShot } from '../../interfaces/IShot'
import { EntityCardShot } from '../entity-card/EntityCardShot'
import { useState } from 'react'
import { IProject } from '../../interfaces/IProject'

export const RibbonShots = ({ entities, project }: { entities: IShot[]; project: IProject }) => {
  const { text } = useTranslate()
  const count = entities?.length
  const [isShotsModalShow, setShotsModalShow] = useState(false)

  return (
    <>
      <RibbonWrapper
        variant={'shot'}
        title={text.project.shots}
        count={count}
        onClick={() => setShotsModalShow(true)}
      >
        {entities?.map(entity => (
          <EntityCardShot key={entity.id} entity={entity} />
        ))}
      </RibbonWrapper>
    </>
  )
}
