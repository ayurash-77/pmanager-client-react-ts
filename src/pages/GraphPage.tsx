import styled from 'styled-components'
import { useParams } from 'react-router'
import { useGetReelsByProjectIdQuery, useUpdateReelMutation } from '../store/api/reels.api'
import { TimelineWrapper } from '../components/timelines/TimelineWrapper'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { useGetShotsByProjectIdQuery } from '../store/api/shots.api'
import { EntityCardShot } from '../components/entity-card/EntityCardShot'
import { IShot } from '../interfaces/IShot'
import { useEffect, useState } from 'react'
import { IReel } from '../interfaces/IReel'
import { setActiveShotId } from '../store/reducers/entities.reducer'
import { useGetProjectByIdQuery } from '../store/api/projects.api'
import { ShotsBlock } from '../layout/shots-block/ShotsBlock'
import { MainbarContainer } from '../layout/MainbarContainer'
import { Sidebar } from '../layout/sidebar/Sidebar'
import { HeaderProject } from '../layout/HeaderProject'
import { BodyContainer } from '../layout/BodyContainer'

export const DraggableItem = styled.div`
  cursor: grab;
`

export const GraphPage = () => {
  const { id } = useParams()

  const { data: project } = useGetProjectByIdQuery(+id)

  const { activeShotId } = useAppSelector(state => state.entities)
  const dispatch = useAppDispatch()

  const [dragShot, setDragShot] = useState<IShot>(null)
  const [dragReel, setDragReel] = useState<IReel>(null)

  const { data: reels, refetch: refetchReels } = useGetReelsByProjectIdQuery(+id)
  const { data: shots, refetch: refetchShots } = useGetShotsByProjectIdQuery(+id)

  const [updateReel, { isSuccess }] = useUpdateReelMutation()

  const onDragStartHandler = (e, shot: IShot, reel?: IReel) => {
    setDragShot(shot)
    dispatch(setActiveShotId(shot.id))
    console.log('DragStart', shot)
    if (reel) setDragReel(reel)
  }

  const onDragLeaveHandler = (e, shot) => {
    //
  }

  const onDragEndHandler = e => {
    console.log('DragEnd')
  }

  const onDragOverHandler = e => {
    e.preventDefault()
  }

  const onDropHandler = (e, reel: IReel) => {
    if (reel) setDragReel(reel)
    e.preventDefault()

    const updatedShots = [...reel.shots, dragShot]
    const updatedReel = { ...reel, shots: updatedShots }
    updateReel(updatedReel)
  }

  const removeShotHandler = e => {
    e.preventDefault()
    const updatedShots: IShot[] = dragReel?.shots?.filter(shot => shot.id !== dragShot.id)
    const updatedReel: IReel = { ...dragReel, shots: updatedShots }
    updateReel(updatedReel)
  }

  useEffect(() => {
    if (isSuccess) {
      setDragReel(null)
      setDragShot(null)
      dispatch(setActiveShotId(null))
      refetchReels()
      refetchShots()
    }
  }, [dispatch, isSuccess, refetchReels, refetchShots])

  ////////////////////////////////////////////////////////////////////////

  return (
    <>
      <MainbarContainer>
        <HeaderProject project={project} />

        <BodyContainer>
          {reels?.map(reel => (
            <div key={reel.id} onDrop={e => onDropHandler(e, reel)} onDragOver={e => e.preventDefault()}>
              <TimelineWrapper title={`${reel.code}`}>
                {reel.shots?.map(shot => (
                  <div
                    onClick={() => dispatch(setActiveShotId(activeShotId === shot.id ? null : shot.id))}
                    className={'draggable'}
                    key={shot.id}
                    draggable={true}
                    onDragStart={e => onDragStartHandler(e, shot, reel)}
                    onDragEnd={e => onDragEndHandler(e)}
                    onDragOver={e => e.preventDefault()}
                  >
                    <EntityCardShot entity={shot} isSelected={activeShotId === shot.id} />
                  </div>
                ))}
              </TimelineWrapper>
            </div>
          ))}
          <div onDrop={e => removeShotHandler(e)} onDragOver={e => e.preventDefault()}>
            <ShotsBlock
              shots={shots}
              project={project}
              onDragStartHandler={onDragStartHandler}
              removeShotHandler={removeShotHandler}
            />
          </div>
        </BodyContainer>
      </MainbarContainer>
      <Sidebar project={project} />
    </>
  )
}
