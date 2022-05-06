import styled from 'styled-components'
import { useParams } from 'react-router'
import { useGetReelsByProjectIdQuery, useUpdateReelMutation } from '../store/api/reels.api'
import { Timeline } from '../components/timelines/Timeline'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { useGetShotsByProjectIdQuery } from '../store/api/shots.api'
import { EntityCardShot } from '../components/entity-card/EntityCardShot'
import { IShot } from '../interfaces/IShot'
import { useEffect, useState } from 'react'
import { IReel } from '../interfaces/IReel'
import { setActiveShotId, setDragShot, setDropReel } from '../store/reducers/entities.reducer'
import { useGetProjectByIdQuery } from '../store/api/projects.api'
import { ShotsBlock } from '../layout/shots-block/ShotsBlock'
import { MainbarContainer } from '../layout/MainbarContainer'
import { Sidebar } from '../layout/sidebar/Sidebar'
import { HeaderProject } from '../layout/HeaderProject'
import { BodyContainer } from '../layout/BodyContainer'
import cn from 'classnames'

export const DraggableItem = styled.div`
  cursor: grab;
`

////////////////////////////////////////////////////////////////////////
// GraphPage
////////////////////////////////////////////////////////////////////////

export const GraphPage = () => {
  const { id } = useParams()
  const dispatch = useAppDispatch()

  const { data: project, isFetching: isFetchingProject } = useGetProjectByIdQuery(+id)

  const { activeShotId, dragShot, dropReel } = useAppSelector(state => state.entities)

  const { data: reels, refetch: refetchReels } = useGetReelsByProjectIdQuery(+id)
  const { data: shots, refetch: refetchShots } = useGetShotsByProjectIdQuery(+id)

  const [updateReel, { isSuccess }] = useUpdateReelMutation()

  const onDragStartHandler = (e, shot: IShot, reel?: IReel) => {
    dispatch(setDragShot(shot))
    dispatch(setActiveShotId(shot.id))
    if (reel) dispatch(setDropReel(reel))
  }

  const onDragLeaveHandler = (e, shot) => {
    //
  }

  const onDragEndHandler = e => {
    // console.log('DragEnd', e.target)
  }

  const onDragOverHandler = e => {
    e.preventDefault()
  }

  const onDropHandler = (e, reel: IReel) => {
    if (reel) dispatch(setDropReel(reel))
    e.preventDefault()

    const updatedShots = [...reel.shots, dragShot]
    const updatedReel = { ...reel, shots: updatedShots }
    updateReel(updatedReel)
  }

  const removeShotHandler = e => {
    e.preventDefault()
    if (dropReel) {
      const updatedShots: IShot[] = dropReel?.shots?.filter(shot => shot.id !== dragShot.id)
      const updatedReel: IReel = { ...dropReel, shots: updatedShots }
      updateReel(updatedReel)
    }
  }

  // useEffect(() => {
  //   if (isSuccess) {
  //     dispatch(setDragShot(null))
  //     dispatch(setDropReel(null))
  //     dispatch(setActiveShotId(null))
  //     refetchReels()
  //     refetchShots()
  //   }
  // }, [dispatch, isSuccess, refetchReels, refetchShots])

  ////////////////////////////////////////////////////////////////////////

  return (
    <>
      <MainbarContainer>
        <HeaderProject project={project} />

        <BodyContainer>
          {reels?.map(reel => (
            <div key={reel.id} onDrop={e => onDropHandler(e, reel)} onDragOver={e => e.preventDefault()}>
              <Timeline title={`${reel.code}`} reel={reel}>
                {reel.shots?.map(shot => (
                  <div
                    key={shot.id}
                    draggable={true}
                    className={'draggable'}
                    onClick={() => dispatch(setActiveShotId(activeShotId === shot.id ? null : shot.id))}
                    onDragStart={e => onDragStartHandler(e, shot, reel)}
                    onDragEnd={e => onDragEndHandler(e)}
                    onDragOver={e => e.preventDefault()}
                  >
                    <EntityCardShot entity={shot} isSelected={activeShotId === shot.id} />
                  </div>
                ))}
              </Timeline>
            </div>
          ))}
          <div>
            <ShotsBlock
              shots={shots}
              project={project}
              onDragStartHandler={onDragStartHandler}
              removeShotHandler={removeShotHandler}
            />
          </div>
        </BodyContainer>
      </MainbarContainer>
      <Sidebar
        project={project}
        removeShotHandler={removeShotHandler}
        onDragStartHandler={onDragStartHandler}
        isLoadingProject={isFetchingProject}
      />
    </>
  )
}
