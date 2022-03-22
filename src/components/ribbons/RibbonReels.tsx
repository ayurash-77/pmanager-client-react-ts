import { useTranslate } from '../../hooks/useTranslate'
import { IReelsType } from '../../interfaces/IReelsType'
import { EntityCardReelsType } from '../entity-card/EntityCardReelsType'
import { RibbonWrapper } from './RibbonWrapper'
import { IReel } from '../../interfaces/IReel'
import { EntityCardReel } from '../entity-card/EntityCardReel'
import { useState } from 'react'
import { IProject } from '../../interfaces/IProject'

export const RibbonReels = ({ entities, project }: { entities: IReel[]; project: IProject }) => {
  const { text } = useTranslate()
  const count = entities?.length
  const [isReelsModalShow, setReelsModalShow] = useState(false)
  return (
    <>
      <RibbonWrapper
        variant={'reel'}
        title={text.project.reels}
        count={count}
        onClick={() => setReelsModalShow(true)}
      >
        {entities?.map(entity => (
          <EntityCardReel key={entity.id} entity={entity} />
        ))}
      </RibbonWrapper>
    </>
  )
}
