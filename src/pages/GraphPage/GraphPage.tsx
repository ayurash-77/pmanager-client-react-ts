import { skipToken } from '@reduxjs/toolkit/query'
import { useGetProjectQuery } from 'entities/projects/projects.api'
import { useGetReelsQuery } from 'entities/reels/reels.api'
import { IReel } from 'entities/reels/reels.interfaces'
import { ShotCard } from 'entities/shots/ShotCard'
import { useGetShotsQuery } from 'entities/shots/shots.api'
import { IShot } from 'entities/shots/shots.interfaces'
import { useParams } from 'react-router'
import styled from 'styled-components'
import { setActiveShotId, setDragShotId, setDropReelId } from 'store/reducers/entities.reducer'
import { useAppDispatch, useAppSelector } from 'hooks/redux'
import { BodyContainer } from 'components/layout/BodyContainer'
import { HeaderProject } from 'components/layout/HeaderProject'
import { MainbarContainer } from 'components/layout/MainbarContainer'
import { Sidebar } from 'components/layout/sidebar/Sidebar'
import { SidebarShots } from 'components/layout/sidebar/sidebar-shots/SidebarShots'
import { Timeline } from 'components/layout/timelines/Timeline'

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
                    <ShotCard entity={shot} isSelected={activeShotId === shot.id} />
                  </div>
                ))}
              </Timeline>
            </div>
          ))}
          <div>
            <SidebarShots shots={shots} project={project} />
          </div>
        </BodyContainer>
      </MainbarContainer>
      <Sidebar project={project} isLoadingProject={isLoadingProject} />
    </>
  )
}
