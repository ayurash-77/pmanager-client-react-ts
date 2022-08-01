import { IReelsType } from 'entities/reelsTypes/reelsTypes.interfaces'
import { FC, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { ReelsTypeCard } from '../../../entities/reelsTypes/ReelsTypeCard'
import ReelsTypeModal from '../../../entities/reelsTypes/ReelsTypeModal'
import { useDeleteReelsTypeMutation } from '../../../entities/reelsTypes/reelsTypes.api'
import { useOnReelsTypeClick } from '../../../entities/reelsTypes/useOnReelsTypeClick'
import { useOnRibbonReelsTypeClick } from '../../../entities/reelsTypes/useOnRibbonReelsTypeClick'
import { useAppSelector } from '../../../hooks/redux'
import { useTranslate } from '../../../hooks/useTranslate'
import { setActiveReelsTypeId } from '../../../store/reducers/entities.reducer'
import { setReelsTypeModal } from '../../../store/reducers/modals.reducer'
import { InfoReelsTypeBlock } from '../../info-elements/InfoReelsTypeBlock'
import DeleteModal from '../../modal/DeleteModal'
import { ContextMenu } from '../../ui/ContextMenu/ContextMenu'
import { RibbonWrapper } from './RibbonWrapper'

export const RibbonReelsTypes: FC<{ entities: IReelsType[] }> = ({ entities }) => {
  const dispatch = useDispatch()
  const { text } = useTranslate()
  const count: number = entities?.length || 0

  const [deleteReelsType, { error, isSuccess, reset }] = useDeleteReelsTypeMutation()

  const { activeReelsTypeId } = useAppSelector(state => state.entities)

  const [isDeleteModalShow, setDeleteModalShow] = useState(false)

  const activeReelsType = entities?.find(entity => entity.id === activeReelsTypeId) || null
  const detailsJsx = activeReelsType && <InfoReelsTypeBlock {...activeReelsType} />

  const { showCommonMenu, isCommonMenuShow, commonMenuData, position } = useOnRibbonReelsTypeClick()
  const { showItemMenu, isItemMenuShow, itemMenuData } = useOnReelsTypeClick()

  const onDeleteHandler = async e => {
    e.preventDefault()
    await deleteReelsType(activeReelsTypeId)
  }

  const onCancelHandler = () => {
    reset()
    setDeleteModalShow(false)
  }

  useEffect(() => {
    if (isSuccess) {
      setDeleteModalShow(false)
      dispatch(setActiveReelsTypeId(null))
    }
  }, [dispatch, isSuccess])

  return (
    <>
      <ReelsTypeModal />
      <DeleteModal
        isOpen={isDeleteModalShow}
        closeAction={onCancelHandler}
        deleteItem={activeReelsType}
        deleteAction={onDeleteHandler}
        error={error}
        detailsJsx={detailsJsx}
        title={`${text.actions.deleteReelsType} ${activeReelsType?.code}?`}
      />

      <ContextMenu show={isItemMenuShow} data={itemMenuData} position={position} />
      <ContextMenu show={!isItemMenuShow && isCommonMenuShow} data={commonMenuData} position={position} />

      <RibbonWrapper
        variant={'reelsType'}
        title={text.project.reelsTypes}
        count={count}
        onClickPlus={() => dispatch(setReelsTypeModal({ isOpen: true }))}
        onClickMinus={() => setDeleteModalShow(true)}
        activeItemsIds={activeReelsTypeId && [activeReelsTypeId]}
        onContextMenu={showCommonMenu}
      >
        {entities?.map(entity => (
          <ReelsTypeCard
            key={entity.id}
            entity={entity}
            isSelected={activeReelsTypeId === entity.id}
            onClick={e => showItemMenu(e, entity.id)}
            onContextMenu={e => showItemMenu(e, entity.id)}
          />
        ))}
      </RibbonWrapper>
    </>
  )
}
