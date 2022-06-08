import styled from 'styled-components'
import { SidebarBlockTitle } from '../../layout/sidebar/Sidebar.styles'
import { FlexRow, IconButton } from '../ui'
import * as CommonIcons from '../../assets/icons/common-icons'
import { EntityCardShot } from '../entity-card/EntityCardShot'
import { IShot } from '../../interfaces/IShot'
import { FC, useState } from 'react'
import NewShotModal from '../../modal/NewShotModal'
import { IProject } from '../../interfaces/IProject'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import cn from 'classnames'
import DeleteModal from '../../modal/DeleteModal'
import { useDeleteShot } from '../../hooks/useDeleteShot'
import { InfoShotBlock } from '../info-elements/InfoShotBlock'
import Loader from '../ui/Loader'
import { useOnShotClickHandler } from '../../hooks/useOnClickHandlers'
import { setActiveShotId, setDragShotId } from '../../store/reducers/entities.reducer'
import { useTranslate } from '../../hooks/useTranslate'
import { useGetReelsQuery } from '../../store/api/reels.api'
import { skipToken } from '@reduxjs/toolkit/query'

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
  border: solid 1px var(--group-border);
  background: var(--group-bg);
  border-radius: 5px;
  padding: 10px;
  .draggable {
    cursor: grab;
  }
`

interface IShotsBlock {
  project: IProject
  shots: IShot[]
  isLoadingShots?: boolean
}

////////////////////////////////////////////////////////////////////////
// ShotsBlock
////////////////////////////////////////////////////////////////////////

export const ShotsBlock: FC<IShotsBlock> = props => {
  const { project, shots, isLoadingShots } = props
  const { text } = useTranslate()
  const dispatch = useAppDispatch()
  const { onShotClickHandler } = useOnShotClickHandler()

  const [isNewShotModalShow, setNewShotModalShow] = useState(false)

  const { activeShotId, activeProjectId, activeReelsIds, dropReel } = useAppSelector(state => state.entities)
  const { data: reels } = useGetReelsQuery(activeProjectId ?? skipToken)

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

  const onDragStartHandler = (shotId: number) => {
    dispatch(setDragShotId(shotId))
    dispatch(setActiveShotId(shotId))
  }
  const onDragEndHandler = () => {
    dispatch(setDragShotId(null))
  }

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
          {text.project.shots}
          <FlexRow gap={6}>
            {canDeleteItem && (
              <IconButton
                icon={<CommonIcons.Trash />}
                disabled={!activeShot}
                // variant={activeItemId ? 'accent' : null}
                variant={'accent'}
                onClick={activeShot ? () => setDeleteModalShow(true) : null}
              />
            )}
            <IconButton icon={<CommonIcons.Plus />} onClick={() => setNewShotModalShow(true)} />
          </FlexRow>
        </SidebarBlockTitle>
        <ShotsContainer onDragOver={e => e.preventDefault()}>
          {isLoadingShots && <Loader size={32} />}
          {shots?.map(shot => (
            <EntityCardShot
              key={shot.id}
              entity={shot}
              isSelected={activeShotId === shot.id}
              disabled={shot.reels?.length === 0}
              onClick={() => onShotClickHandler(shot.id)}
            />
          ))}
        </ShotsContainer>
      </Container>
    </>
  )
}
