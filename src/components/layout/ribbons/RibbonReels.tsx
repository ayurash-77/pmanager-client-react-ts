import { ReelCard } from 'entities/reels/ReelCard'
import { IReel } from 'entities/reels/reels.interfaces'
import { useOnReelClick } from 'entities/reels/useOnReelClick'
import { FC } from 'react'
import { useDispatch } from 'react-redux'
import { useAppSelector } from 'hooks/redux'
import { useTranslate } from 'hooks/useTranslate'
import { InfoReelBlock } from 'components/info-elements/InfoReelBlock'
import { ContextMenu } from 'components/ui/ContextMenu/ContextMenu'
import { DeleteReelModal } from '../../../entities/reels/DeleteReelModal'
import { ReelModal } from '../../../entities/reels/ReelModal'
import { useOnRibbonReelClick } from '../../../entities/reels/useOnRibbonReelClick'
import { setReelModal } from '../../../store/reducers/modals.reducer'
import { RibbonWrapper } from './RibbonWrapper'

export const RibbonReels: FC<{ entities: IReel[] }> = ({ entities }) => {
  const dispatch = useDispatch()
  const { text } = useTranslate()

  const count: number = entities?.length || 0
  const { activeReelsIds } = useAppSelector(state => state.entities)

  const activeReel = entities?.find(entity => activeReelsIds.includes(entity.id)) || null
  const detailsJsx = activeReel && <InfoReelBlock {...activeReel} />

  const { showCommonMenu, isCommonMenuShow, commonMenuData, position } = useOnRibbonReelClick()
  const { showItemMenu, isItemMenuShow, itemMenuData } = useOnReelClick()

  return (
    <>
      <ReelModal />
      <DeleteReelModal />

      <ContextMenu show={isItemMenuShow} data={itemMenuData} position={position} />
      <ContextMenu show={!isItemMenuShow && isCommonMenuShow} data={commonMenuData} position={position} />

      <RibbonWrapper
        variant={'reel'}
        title={text.project.reels}
        count={count}
        onClickPlus={() => dispatch(setReelModal({ isOpen: true }))}
        onClickMinus={() => dispatch(setReelModal({ isOpen: true, mode: 'delete' }))}
        activeItemsIds={activeReelsIds}
        onContextMenu={showCommonMenu}
      >
        {entities?.map(entity => (
          <ReelCard
            key={entity.id}
            reel={entity}
            isSelected={activeReelsIds.includes(entity.id)}
            onClick={e => showItemMenu(e, entity.id)}
            onContextMenu={e => showItemMenu(e, entity.id)}
          />
        ))}
      </RibbonWrapper>
    </>
  )
}
