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
import { useGetProjectQuery } from '../store/api/projects.api'
import { skipToken } from '@reduxjs/toolkit/query'
import { useGetReelsQuery, useUpdateReelMutation } from '../store/api/reels.api'
import { useGetShotsQuery } from '../store/api/shots.api'

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

  const { activeShotId } = useAppSelector(state => state.entities)

  const { data: reels } = useGetReelsQuery(+id ?? skipToken)
  const { data: shots } = useGetShotsQuery(+id ?? skipToken)

  const onDragStartHandler = (e, shot: IShot, reel?: IReel) => {
    dispatch(setDragShotId(shot.id))
    dispatch(setActiveShotId(shot.id))
    if (reel) dispatch(setDropReelId(reel.id))
  }

  const onDragEndHandler = e => {
    // console.log('DragEnd', e.target)
  }

  ////////////////////////////////////////////////////////////////////////

  return (
    <>
      <MainbarContainer>
        <HeaderProject project={project} />

        <BodyContainer>
          {reels?.map(reel => (
            <div key={reel.id}>
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
