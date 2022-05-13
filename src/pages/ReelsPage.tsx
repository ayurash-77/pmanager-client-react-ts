import { useParams } from 'react-router'
import { Timeline } from '../components/timelines/Timeline'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { IShot } from '../interfaces/IShot'
import { useEffect, useRef, useState } from 'react'
import { IReel } from '../interfaces/IReel'
import {
  setActiveReelsIds,
  setActiveShotId,
  setDragShot,
  setDropReel,
} from '../store/reducers/entities.reducer'
import { MainbarContainer } from '../layout/MainbarContainer'
import { Sidebar } from '../layout/sidebar/Sidebar'
import { HeaderProject } from '../layout/HeaderProject'
import { BodyContainer } from '../layout/BodyContainer'
import { Sendbar } from '../layout/sendbar/Sendbar'
import { Post } from '../components/post/Post'
import { RibbonReels } from '../components/ribbons/RibbonReels'
import { ExpandedBlock } from '../components/expanded-block/ExpandedBlock'
import { setReelsBlockExpanded } from '../store/reducers/ui.reducer'
import { useGetProject } from '../hooks/api/useProjectsApi'
import { useGetPostsByProjectId } from '../hooks/api/usePostsApi'
import { useGetReelsByProjectId, useUpdateReel } from '../hooks/api/useReelsApi'
import { Reorder, motion, AnimatePresence, AnimateSharedLayout } from 'framer-motion'

////////////////////////////////////////////////////////////////////////
// ReelsPage
////////////////////////////////////////////////////////////////////////

export const ReelsPage = () => {
  const dispatch = useAppDispatch()
  const bottomDivRef = useRef(null)

  const { id } = useParams()
  const { reelsBlock } = useAppSelector(state => state.ui)
  const { activeShotId, activeReelsIds, activeProjectId } = useAppSelector(state => state.entities)
  const { data: project, isLoading: isLoadingProject } = useGetProject(activeProjectId)
  const { data: posts } = useGetPostsByProjectId(activeProjectId)
  const { data: reels } = useGetReelsByProjectId(activeProjectId)

  const postsByReel =
    activeReelsIds.length === 1
      ? posts?.filter(post => post.reels?.find(reel => reel.id === activeReelsIds[0]))
      : posts

  const postsByShot = activeShotId
    ? postsByReel?.filter(post => post.shots.find(shot => shot.id === activeShotId))
    : postsByReel

  const onDragStartHandler = (e, shot: IShot, reel?: IReel) => {
    dispatch(setDragShot(shot))
    dispatch(setActiveShotId(shot.id))
    if (reel) dispatch(setDropReel(reel))
  }

  const onShotClickHandler = id => {
    console.log(id)
    const currentShotId = activeShotId === id ? null : id
    dispatch(setActiveShotId(currentShotId))
    const reelsIds = reels
      ?.filter(reel => reel.shots?.find(shot => shot.id === currentShotId))
      .map(reel => reel.id)
    dispatch(setActiveReelsIds(reelsIds))
  }

  const removeShotHandler = e => {
    e.preventDefault()
    // if (dropReel) {
    //   const updatedShots: IShot[] = dropReel?.shots?.filter(shot => shot.id !== dragShot.id)
    //   const updatedReel: IReel = { ...dropReel, shots: updatedShots }
    //   updateReel(updatedReel)
    //   dispatch(setActiveReelsIds([dropReel.id]))
    // }
  }
  // const reelsIds = shots?.find(shot => shot.id === activeShotId)?.reels?.map(reel => reel.id) || []

  // useEffect(() => {
  //   bottomDivRef.current?.scrollIntoView({ behavior: 'smooth' })
  // }, [reels, posts, activeReelsIds])

  ////////////////////////////////////////////////////////////////////////

  return (
    <>
      <MainbarContainer>
        <HeaderProject project={project} />

        <RibbonReels entities={reels} project={project} />
        <ExpandedBlock
          title={'Details'}
          expanded={reelsBlock.expanded}
          setExpanded={() => dispatch(setReelsBlockExpanded(!reelsBlock.expanded))}
        >
          {project &&
            reels?.map(reel => (
              <div
                key={reel.id} //
                // onDrop={e => onDropHandler(e, reel)}
                // onDragOver={e => e.preventDefault()}
              >
                <Timeline reel={reel} onShotClickHandler={onShotClickHandler} />
              </div>
            ))}
        </ExpandedBlock>

        <BodyContainer>
          {postsByShot?.map(post => (
            <Post key={post.id} {...post} />
          ))}
          <div ref={bottomDivRef} />
        </BodyContainer>

        <Sendbar projectId={+id} />
      </MainbarContainer>
      <Sidebar
        project={project}
        isLoadingProject={isLoadingProject}
        onDragStartHandler={onDragStartHandler}
      />
    </>
  )
}
