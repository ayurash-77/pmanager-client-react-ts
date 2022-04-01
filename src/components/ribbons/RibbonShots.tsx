import { useTranslate } from '../../hooks/useTranslate'
import { RibbonWrapper } from './RibbonWrapper'
import { IShot } from '../../interfaces/IShot'
import { EntityCardShot } from '../entity-card/EntityCardShot'
import { useState } from 'react'
import { IProject } from '../../interfaces/IProject'
import NewShotModal from '../../modal/NewShotModal'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { setActiveShotId } from '../../store/reducers/entities.reducer'
import { useDeleteShotMutation } from '../../store/api/shots.api'

export const RibbonShots = ({ entities, project }: { entities: IShot[]; project: IProject }) => {
  const { text } = useTranslate()
  const count = entities?.length

  const [deleteShot, { isError, error }] = useDeleteShotMutation()
  const { activeShotId } = useAppSelector(state => state.entities)
  const dispatch = useAppDispatch()

  const [isModalShow, setModalShow] = useState(false)

  const onClickItemHandler = id => {
    dispatch(setActiveShotId(activeShotId === id ? null : id))
  }

  const onClickMinusHandler = id => {
    deleteShot(id)
    dispatch(setActiveShotId(null))
  }

  return (
    <>
      <NewShotModal isOpen={isModalShow} closeAction={() => setModalShow(false)} project={project} />
      <RibbonWrapper
        variant={'shot'}
        title={text.project.shots}
        count={count}
        onClickPlus={() => setModalShow(true)}
        onClickMinus={() => onClickMinusHandler(activeShotId)}
        activeItemId={activeShotId}
        disableActiveItem={() => dispatch(setActiveShotId(null))}
      >
        {entities?.map(entity => (
          <EntityCardShot
            key={entity.id}
            entity={entity}
            isSelected={activeShotId === entity.id}
            onClick={() => onClickItemHandler(entity.id)}
            disabled={entity.reels?.length === 0}
          />
        ))}
      </RibbonWrapper>
    </>
  )
}
