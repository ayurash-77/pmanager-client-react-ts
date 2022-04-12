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
import { setActiveShotId, setDragShot, setDropReel } from '../store/reducers/entities.reducer'
import { useGetProjectByIdQuery } from '../store/api/projects.api'
import { ShotsBlock } from '../layout/shots-block/ShotsBlock'
import { MainbarContainer } from '../layout/MainbarContainer'
import { Sidebar } from '../layout/sidebar/Sidebar'
import { HeaderProject } from '../layout/HeaderProject'
import { BodyContainer } from '../layout/BodyContainer'
import cn from 'classnames'
import { useGetPostsByProjectIdQuery } from '../store/api/posts.api'
import { Sendbar } from '../layout/sendbar/Sendbar'
import { Post } from '../components/post/Post'
import { Link } from 'react-router-dom'

export const DraggableItem = styled.div`
  cursor: grab;
`

////////////////////////////////////////////////////////////////////////
// GraphPage
////////////////////////////////////////////////////////////////////////

export const ReelsPage = () => {
  const dispatch = useAppDispatch()

  const { id } = useParams()
  const { data: project } = useGetProjectByIdQuery(+id)
  const { data: posts, refetch: refetchPosts } = useGetPostsByProjectIdQuery(+id)

  const { activeShotId, dragShot, dropReel, activeReelId } = useAppSelector(state => state.entities)

  const { data: reels, refetch: refetchReels } = useGetReelsByProjectIdQuery(+id)
  const { data: shots, refetch: refetchShots } = useGetShotsByProjectIdQuery(+id)

  const [updateReel, { isSuccess }] = useUpdateReelMutation()

  const reelsFiltered = activeReelId ? reels?.filter(reel => reel.id === activeReelId) : reels
  const postsFiltered = activeReelId ? posts?.filter(post => post.reel?.id === activeReelId) : posts

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

  useEffect(() => {
    if (isSuccess) {
      dispatch(setDragShot(null))
      dispatch(setDropReel(null))
      dispatch(setActiveShotId(null))
      refetchReels()
      refetchShots()
      refetchPosts()
    }
  }, [dispatch, isSuccess, refetchPosts, refetchReels, refetchShots])

  ////////////////////////////////////////////////////////////////////////

  return (
    <>
      <MainbarContainer>
        <HeaderProject project={project} />

        <BodyContainer>
          {reelsFiltered?.map(reel => (
            <div key={reel.id} onDrop={e => onDropHandler(e, reel)} onDragOver={e => e.preventDefault()}>
              <TimelineWrapper title={`${reel.code}`} reel={reel}>
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
              </TimelineWrapper>
            </div>
          ))}

          {postsFiltered?.map(post => (
            <Post
              key={post.id}
              id={post.id}
              message={post.message}
              createdAt={post.createdAt}
              updatedAt={post.updatedAt}
              createdBy={post.createdBy}
              reel={post.reel}
            >
              {post.message}
            </Post>
          ))}
        </BodyContainer>

        <Sendbar projectId={+id} />
      </MainbarContainer>
      <Sidebar
        project={project}
        removeShotHandler={removeShotHandler}
        onDragStartHandler={onDragStartHandler}
      />
    </>
  )
}
