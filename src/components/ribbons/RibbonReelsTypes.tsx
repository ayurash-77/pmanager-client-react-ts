import { useTranslate } from '../../hooks/useTranslate'
import { IReelsType } from '../../interfaces/IReelsType'
import { EntityCardReelsType } from '../entity-card/EntityCardReelsType'
import { RibbonWrapper } from './RibbonWrapper'
import { useEffect, useState } from 'react'
import NewReelsTypeModal from '../../modal/NewReelsTypeModal'
import { IProject } from '../../interfaces/IProject'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { setActiveReelsTypeId } from '../../store/reducers/entities.reducer'
import { useDeleteReelsTypeMutation } from '../../store/api/reelsTypes.api'

export const RibbonReelsTypes = ({ entities, project }: { entities: IReelsType[]; project: IProject }) => {
  const { text } = useTranslate()
  const count = entities?.length

  const [deleteReelsType, { isError, error }] = useDeleteReelsTypeMutation()
  const { activeReelsTypeId } = useAppSelector(state => state.entities)
  const dispatch = useAppDispatch()

  const [isModalShow, setModalShow] = useState(false)

  const onClickItemHandler = id => {
    dispatch(setActiveReelsTypeId(activeReelsTypeId === id ? null : id))
  }

  const onClickMinusHandler = id => {
    deleteReelsType(id)
    dispatch(setActiveReelsTypeId(null))
  }

  useEffect(() => {
    dispatch(setActiveReelsTypeId(null))
  }, [dispatch])

  return (
    <>
      <NewReelsTypeModal isOpen={isModalShow} closeAction={() => setModalShow(false)} project={project} />
      <RibbonWrapper
        variant={'reelsType'}
        title={text.project.reelsTypes}
        count={count}
        onClickPlus={() => setModalShow(true)}
        onClickMinus={() => onClickMinusHandler(activeReelsTypeId)}
        activeItemId={activeReelsTypeId}
        disableActiveItem={() => dispatch(setActiveReelsTypeId(null))}
      >
        {entities?.map(entity => (
          <EntityCardReelsType
            key={entity.id}
            entity={entity}
            isSelected={activeReelsTypeId === entity.id}
            onClick={() => onClickItemHandler(entity.id)}
          />
        ))}
      </RibbonWrapper>
    </>
  )
}
