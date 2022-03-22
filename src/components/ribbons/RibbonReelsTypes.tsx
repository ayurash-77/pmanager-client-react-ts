import { useTranslate } from '../../hooks/useTranslate'
import { IReelsType } from '../../interfaces/IReelsType'
import { EntityCardReelsType } from '../entity-card/EntityCardReelsType'
import { RibbonWrapper } from './RibbonWrapper'
import { useState } from 'react'
import NewReelsTypeModal from '../../modal/NewReelsTypeModal'
import { IProject } from '../../interfaces/IProject'

export const RibbonReelsTypes = ({ entities, project }: { entities: IReelsType[]; project: IProject }) => {
  const { text } = useTranslate()
  const count = entities?.length
  const [isReelsTypesModalShow, setReelsTypesModalShow] = useState(false)
  return (
    <>
      <NewReelsTypeModal
        isOpen={isReelsTypesModalShow}
        closeAction={() => setReelsTypesModalShow(false)}
        project={project}
      />
      <RibbonWrapper
        variant={'reelsType'}
        title={text.project.reelsTypes}
        count={count}
        onClick={() => setReelsTypesModalShow(true)}
      >
        {entities?.map(entity => (
          <EntityCardReelsType key={entity.id} entity={entity} />
        ))}
      </RibbonWrapper>
    </>
  )
}
