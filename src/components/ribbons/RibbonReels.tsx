import { useTranslate } from '../../hooks/useTranslate'
import { RibbonWrapper } from './RibbonWrapper'
import { IReel } from '../../interfaces/IReel'
import { EntityCardReel } from '../entity-card/EntityCardReel'
import { useState } from 'react'
import { IProject } from '../../interfaces/IProject'
import NewReelModal from '../../modal/NewReelModal'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { setActiveReelId } from '../../store/reducers/entities.reducer'
import { useDeleteReelMutation } from '../../store/api/reels.api'

export const RibbonReels = ({ entities, project }: { entities: IReel[]; project: IProject }) => {
  const { text } = useTranslate()
  const count = entities?.length

  const [deleteReel, { isError, error }] = useDeleteReelMutation()
  const { activeReelId } = useAppSelector(state => state.entities)
  const dispatch = useAppDispatch()

  const [isModalShow, setModalShow] = useState(false)

  const onClickItemHandler = id => {
    dispatch(setActiveReelId(activeReelId === id ? null : id))
  }

  const onClickMinusHandler = id => {
    deleteReel(id)
    dispatch(setActiveReelId(null))
  }

  return (
    <>
      <NewReelModal isOpen={isModalShow} closeAction={() => setModalShow(false)} project={project} />
      <RibbonWrapper
        variant={'reel'}
        title={text.project.reels}
        count={count}
        onClickPlus={() => setModalShow(true)}
        onClickMinus={() => onClickMinusHandler(activeReelId)}
        activeItemId={activeReelId}
        disableActiveItem={() => dispatch(setActiveReelId(null))}
      >
        {entities?.map(entity => (
          <EntityCardReel
            key={entity.id}
            entity={entity}
            isSelected={activeReelId === entity.id}
            onClick={() => onClickItemHandler(entity.id)}
          />
        ))}
      </RibbonWrapper>
    </>
  )
}
