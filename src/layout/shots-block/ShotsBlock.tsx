import styled from 'styled-components'
import { SidebarBlockTitle } from '../sidebar/Sidebar.styles'
import { FlexRow, IconButton } from '../../components/ui'
import * as CommonIcons from '../../assets/icons/common-icons'
import { EntityCardShot } from '../../components/entity-card/EntityCardShot'
import { IShot } from '../../interfaces/IShot'
import { FC, useState } from 'react'
import NewShotModal from '../../modal/NewShotModal'
import { IProject } from '../../interfaces/IProject'
import { setActiveShotId } from '../../store/reducers/entities.reducer'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import cn from 'classnames'
import DeleteModal from '../../modal/DeleteModal'
import { useDeleteShot } from '../../hooks/useDeleteShot'
import { InfoShotBlock } from '../../components/info-elements/InfoShotBlock'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  //gap: 10px;
`

const ShotsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 9px;
  //justify-content: space-evenly;
  border: solid 1px var(--timeline-border);
  background: var(--timeline-bg);
  border-radius: 5px;
  padding: 10px;
  .draggable {
    cursor: grab;
  }
`

interface IShotsBlock {
  project: IProject
  shots: IShot[]
  onDragStartHandler: (e, shot) => void
  removeShotHandler?: (e) => void
}

////////////////////////////////////////////////////////////////////////
// ShotsBlock
////////////////////////////////////////////////////////////////////////

export const ShotsBlock: FC<IShotsBlock> = ({ project, shots, removeShotHandler, onDragStartHandler }) => {
  const dispatch = useAppDispatch()

  const [isNewShotModalShow, setNewShotModalShow] = useState(false)

  const { activeShotId, dropReel } = useAppSelector(state => state.entities)

  const activeShot = shots?.find(shot => shot.id === activeShotId) || null

  const {
    isDeleteModalShow,
    setDeleteModalShow,
    canDeleteItem,
    cancelDeleteShotHandler,
    deleteShotHandler,
    errorJsx,
    title,
  } = useDeleteShot(project, activeShot)

  ////////////////////////////////////////////////////////////////////////

  return (
    <>
      <NewShotModal
        isOpen={isNewShotModalShow}
        closeAction={() => setNewShotModalShow(false)}
        project={project}
        shots={shots}
      />
      <DeleteModal
        isOpen={isDeleteModalShow}
        closeAction={cancelDeleteShotHandler}
        deleteItem={activeShot}
        deleteAction={deleteShotHandler}
        errorJsx={errorJsx}
        detailsJsx={activeShot && <InfoShotBlock {...activeShot} />}
        title={title}
      />
      <Container>
        <SidebarBlockTitle>
          Shots bin:
          <FlexRow gap={6}>
            {canDeleteItem && (
              <IconButton
                icon={<CommonIcons.Minus />}
                disabled={!activeShot}
                // variant={activeItemId ? 'accent' : null}
                variant={'accent'}
                onClick={activeShot ? () => setDeleteModalShow(true) : null}
              />
            )}
            <IconButton icon={<CommonIcons.Plus />} onClick={() => setNewShotModalShow(true)} />
          </FlexRow>
        </SidebarBlockTitle>
        <ShotsContainer onDragOver={e => e.preventDefault()} onDrop={e => removeShotHandler(e)}>
          {shots?.map(shot => (
            <div
              key={shot.id}
              draggable={true}
              className={cn({ draggable: dropReel })}
              onClick={() => dispatch(setActiveShotId(activeShotId === shot.id ? null : shot.id))}
              onDragStart={e => onDragStartHandler(e, shot)}
            >
              <EntityCardShot
                entity={shot}
                isSelected={activeShotId === shot.id}
                disabled={shot.reels?.length === 0}
                draggable={true}
              />
            </div>
          ))}
        </ShotsContainer>
      </Container>
    </>
  )
}
