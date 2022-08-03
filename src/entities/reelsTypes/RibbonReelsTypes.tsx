import { IReelsType } from 'entities/reelsTypes/reelsTypes.interfaces'
import { FC } from 'react'
import { useDispatch } from 'react-redux'
import { RibbonWrapper } from '../../components/layout/ribbons/RibbonWrapper'
import { ContextMenu } from '../../components/ui/ContextMenu/ContextMenu'
import { useAppSelector } from '../../hooks/redux'
import { useTranslate } from '../../hooks/useTranslate'
import { setReelsTypeModal } from '../../store/reducers/modals.reducer'
import { DeleteReelsTypeModal } from './modals/DeleteReelsTypeModal'
import { EditReelsTypeModal } from './modals/EditReelsTypeModal'
import NewReelsTypeModal from './modals/NewReelsTypeModal'
import { ReelsTypeCard } from './reelsTypeCard/ReelsTypeCard'
import { useOnReelsTypeClick } from './useOnReelsTypeClick'
import { useOnRibbonReelsTypeClick } from './useOnRibbonReelsTypeClick'

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
      <NewReelsTypeModal />
      {activeReelsType && <EditReelsTypeModal item={activeReelsType} />}
      {activeReelsType && <DeleteReelsTypeModal item={activeReelsType} />}

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
