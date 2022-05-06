import { useParams } from 'react-router'
import { useGetReelsByProjectIdQuery, useUpdateReelMutation } from '../store/api/reels.api'
import { Timeline } from '../components/timelines/Timeline'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { useGetShotsByProjectIdQuery } from '../store/api/shots.api'
import { EntityCardShot } from '../components/entity-card/EntityCardShot'
import { IShot } from '../interfaces/IShot'
import { useEffect, useRef, useState } from 'react'
import { IReel } from '../interfaces/IReel'
import {
  setActiveReelsIds,
  setActiveShotId,
  setDragShot,
  setDropReel,
} from '../store/reducers/entities.reducer'
import { useGetProjectByIdQuery } from '../store/api/projects.api'
import { MainbarContainer } from '../layout/MainbarContainer'
import { Sidebar } from '../layout/sidebar/Sidebar'
import { HeaderProject } from '../layout/HeaderProject'
import { BodyContainer } from '../layout/BodyContainer'
import { useGetPostsByProjectIdQuery } from '../store/api/posts.api'
import { Sendbar } from '../layout/sendbar/Sendbar'
import { Post } from '../components/post/Post'
import { RibbonReels } from '../components/ribbons/RibbonReels'
import { ExpandedBlock } from '../components/expanded-block/ExpandedBlock'
import { motion, AnimatePresence, AnimateSharedLayout, Reorder } from 'framer-motion'
import { setReelsBlockExpanded } from '../store/reducers/ui.reducer'

////////////////////////////////////////////////////////////////////////
// ReelsPage
////////////////////////////////////////////////////////////////////////

export const ReelsPage = () => {
  const dispatch = useAppDispatch()
  const bottomDivRef = useRef(null)

  const { id } = useParams()
  const { reelsBlock } = useAppSelector(state => state.ui)
  const { activeShotId, dragShot, dropReel, activeReelsIds, activeProjectId } = useAppSelector(
    state => state.entities
  )
  const { data: project, isFetching: isFetchingProject } = useGetProjectByIdQuery(activeProjectId)
  const { data: posts, refetch: refetchPosts } = useGetPostsByProjectIdQuery(activeProjectId)

  const {
    data: reels,
    refetch: refetchReels,
    status: statusReels,
  } = useGetReelsByProjectIdQuery(activeProjectId)

  const [updateReel, { isSuccess: isSuccessUpdateReel }] = useUpdateReelMutation()

  const postsByReel =
    activeReelsIds.length === 1
      ? posts?.filter(post => post.reels?.find(reel => reel.id === activeReelsIds[0]))
      : posts

  const postsByShot = activeShotId
    ? postsByReel?.filter(post => post.shots.find(shot => shot.id === activeShotId))
    : postsByReel

  const [reelsOrdered, setReelsOrdered] = useState([])

  const onDragStartHandler = (e, shot: IShot, reel?: IReel) => {
    dispatch(setDragShot(shot))
    dispatch(setActiveShotId(shot.id))
    if (reel) dispatch(setDropReel(reel))
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

  useEffect(() => {
    bottomDivRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [reels, posts, activeReelsIds])

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
          {/* {project && */}
          {/*   reels?.map(reel => ( */}
          {/*     <div */}
          {/*       key={reel.id} // */}
          {/*       // onDrop={e => onDropHandler(e, reel)} */}
          {/*       // onDragOver={e => e.preventDefault()} */}
          {/*     > */}
          {/*       <Timeline title={`${reel.code}`} reel={reel} /> */}
          {/*     </div> */}
          {/*   ))} */}
          {project && reels && reels.length > 0 && (
            <div
              key={reels[1].id} //
              // onDrop={e => onDropHandler(e, reel)}
              // onDragOver={e => e.preventDefault()}
            >
              {reels[1] && (
                <Timeline title={`${reels[1].code}`} reel={reels[1]} refetchReels={refetchReels} />
              )}
            </div>
          )}
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
        removeShotHandler={removeShotHandler}
        onDragStartHandler={onDragStartHandler}
        isLoadingProject={isFetchingProject}
      />
    </>
  )
}
