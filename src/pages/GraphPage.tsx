import styled from 'styled-components'
import { useParams } from 'react-router'
import {
  useGetReelByIdQuery,
  useGetReelsByProjectIdQuery,
  useUpdateReelMutation,
} from '../store/api/reels.api'
import { TimelineWrapper } from '../components/timelines/TimelineWrapper'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { useGetShotsByProjectIdQuery } from '../store/api/shots.api'
import { EntityCardShot } from '../components/entity-card/EntityCardShot'
import { IShot } from '../interfaces/IShot'
import { EntityCardDummy } from '../components/entity-card/EntityCardDummy'
import cn from 'classnames'
import { useEffect, useState } from 'react'
import { IReel } from '../interfaces/IReel'
import { setActiveReelId, setActiveReelsTypeId, setActiveShotId } from '../store/reducers/entities.reducer'

const Body = styled.div`
  display: flex;
  flex-direction: column;
  z-index: 1;
  padding: 10px;
  gap: 20px;
  height: 100%;
  overflow: auto;
`

const ContainerGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 9px;
  grid-template-columns: repeat(auto-fill, auto);
  justify-content: space-evenly;
  border: solid 1px var(--timeline-border);
  background: var(--timeline-bg);
  border-radius: 5px;
  padding: 15px 9px;
`

const DraggableItem = styled.div`
  cursor: grab;
`

export const GraphPage = () => {
  const { id } = useParams()

  const { activeShotId } = useAppSelector(state => state.entities)
  const dispatch = useAppDispatch()

  const { data: reels, refetch: refetchReels } = useGetReelsByProjectIdQuery(+id)
  const { data: shots, refetch: refetchShots } = useGetShotsByProjectIdQuery(+id)

  const [updateReel, { isSuccess }] = useUpdateReelMutation()

  const [dragShot, setDragShot] = useState<IShot>(null)
  const [dragReel, setDragReel] = useState<IReel>(null)

  const onClickShotHandler = id => {
    dispatch(setActiveShotId(activeShotId === id ? null : id))
  }

  const onDragStartHandler = (e, shot: IShot, reel?: IReel) => {
    setDragShot(shot)
    dispatch(setActiveShotId(shot.id))
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
    <Body>
      <h3>Project Reels:</h3>
      {reels?.map(reel => {
        return (
          <div key={reel.id} onDrop={e => onDropHandler(e, reel)} onDragOver={e => onDragOverHandler(e)}>
            <TimelineWrapper title={`${reel.code}`}>
              {reel.shots?.map(shot => (
                <DraggableItem
                  onClick={() => onClickShotHandler(shot.id)}
                  className={'draggable'}
                  key={shot.id}
                  draggable={true}
                  onDragStart={e => onDragStartHandler(e, shot, reel)}
                  onDragEnd={e => onDragEndHandler(e)}
                  onDragOver={e => onDragOverHandler(e)}
                  // onDrop={e => onDropHandler(e, shot, reel)}
                >
                  <EntityCardShot entity={shot} isSelected={activeShotId === shot.id} />
                </DraggableItem>
              ))}
            </TimelineWrapper>
          </div>
        )
      })}
      <h3>Project Shots:</h3>
      <ContainerGrid onDrop={e => removeShotHandler(e)} onDragOver={e => onDragOverHandler(e)}>
        {shots?.map(shot => (
          <DraggableItem
            onClick={() => onClickShotHandler(shot.id)}
            key={shot.id}
            draggable={true}
            onDragStart={e => onDragStartHandler(e, shot)}
            // onDragLeave={e => onDragLeaveHandler(e, shot)}
            // onDragEnd={e => onDragEndHandler(e)}
            // onDragOver={e => onDragOverHandler(e)}
            // onDrop={e => onDropHandler(e, shot)}
          >
            <EntityCardShot
              entity={shot}
              isSelected={activeShotId === shot.id}
              disabled={shot.reels?.length === 0}
            />
          </DraggableItem>
        ))}
      </ContainerGrid>
    </Body>
  )
}
