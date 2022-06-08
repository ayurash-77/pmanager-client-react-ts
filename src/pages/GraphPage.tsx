import styled from 'styled-components'
import { useParams } from 'react-router'
import { Timeline } from '../components/timelines/Timeline'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { EntityCardShot } from '../components/entity-card/EntityCardShot'
import { IShot } from '../interfaces/IShot'
import { IReel } from '../interfaces/IReel'
import { setActiveShotId, setDragShotId, setDropReelId } from '../store/reducers/entities.reducer'
import { ShotsBlock } from '../components/shots-block/ShotsBlock'
import { MainbarContainer } from '../layout/MainbarContainer'
import { Sidebar } from '../layout/sidebar/Sidebar'
import { HeaderProject } from '../layout/HeaderProject'
import { BodyContainer } from '../layout/BodyContainer'
import { useGetShotsByProjectId } from '../hooks/api/useShotsApi'
import { useGetReelsByProjectId, useUpdateReel } from '../hooks/api/useReelsApi'
import { useGetProjectQuery } from '../store/api/projects.api'
import { skipToken } from '@reduxjs/toolkit/query'

export const DraggableItem = styled.div`
  cursor: grab;
`

////////////////////////////////////////////////////////////////////////
// GraphPage
////////////////////////////////////////////////////////////////////////

export const GraphPage = () => {
  const { id } = useParams()
  const dispatch = useAppDispatch()

  const { data: project, isLoading: isLoadingProject } = useGetProjectQuery(+id ?? skipToken)

  const { activeShotId, dragShot, dropReel } = useAppSelector(state => state.entities)

  const { data: reels } = useGetReelsByProjectId(+id)
  const { data: shots } = useGetShotsByProjectId(+id)

  const { mutateAsync: updateReel, isSuccess } = useUpdateReel()

  const onDragStartHandler = (e, shot: IShot, reel?: IReel) => {
    dispatch(setDragShotId(shot.id))
    dispatch(setActiveShotId(shot.id))
    if (reel) dispatch(setDropReelId(reel.id))
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
    if (reel) dispatch(setDropReelId(reel.id))
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
              <Timeline reelInit={reel}>
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
            <ShotsBlock shots={shots} project={project} />
          </div>
        </BodyContainer>
      </MainbarContainer>
      <Sidebar project={project} isLoadingProject={isLoadingProject} />
    </>
  )
}
