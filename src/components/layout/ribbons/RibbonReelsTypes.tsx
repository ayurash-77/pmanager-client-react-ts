import { IReelsType } from 'entities/reelsTypes/reelsTypes.interfaces'
import { FC } from 'react'
import { useDispatch } from 'react-redux'
import { ReelsTypeCard } from '../../../entities/reelsTypes/ReelsTypeCard'
import ReelsTypeModal from '../../../entities/reelsTypes/ReelsTypeModal'
import { DeleteReelsTypeModal } from '../../../entities/reelsTypes/deleteReelsTypeModal'
import { useOnReelsTypeClick } from '../../../entities/reelsTypes/useOnReelsTypeClick'
import { useOnRibbonReelsTypeClick } from '../../../entities/reelsTypes/useOnRibbonReelsTypeClick'
import { useAppSelector } from '../../../hooks/redux'
import { useTranslate } from '../../../hooks/useTranslate'
import { setReelsTypeModal } from '../../../store/reducers/modals.reducer'
import { ContextMenu } from '../../ui/ContextMenu/ContextMenu'
import { RibbonWrapper } from './RibbonWrapper'

export const RibbonReelsTypes: FC<{ entities: IReelsType[] }> = ({ entities }) => {
  const dispatch = useDispatch()
  const { text } = useTranslate()
  const count: number = entities?.length || 0

  const { activeReelsTypeId } = useAppSelector(state => state.entities)

  const activeReelsType = entities?.find(entity => entity.id === activeReelsTypeId) || null

  const { showCommonMenu, isCommonMenuShow, commonMenuData, position } = useOnRibbonReelsTypeClick()
  const { showItemMenu, isItemMenuShow, itemMenuData } = useOnReelsTypeClick()

  return (
    <>
      <ReelsTypeModal />
      <DeleteReelsTypeModal item={activeReelsType} />

      <ContextMenu show={isItemMenuShow} data={itemMenuData} position={position} />
      <ContextMenu show={!isItemMenuShow && isCommonMenuShow} data={commonMenuData} position={position} />

      <RibbonWrapper
        variant={'reelsType'}
        title={text.project.reelsTypes}
        count={count}
        onClickPlus={() => dispatch(setReelsTypeModal({ isOpen: true, mode: 'create' }))}
        onClickMinus={() => dispatch(setReelsTypeModal({ isOpen: true, mode: 'delete' }))}
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
