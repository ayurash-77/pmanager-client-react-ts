import { useParams } from 'react-router'
import { useGetReelsByProjectIdQuery, useUpdateReelMutation } from '../store/api/reels.api'
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
import { motion, AnimatePresence, AnimateSharedLayout, Reorder } from 'framer-motion'
import { setReelsBlockExpanded } from '../store/reducers/ui.reducer'
import { useGetProject } from '../hooks/useProjectsData'
import { useGetShotsByProjectId } from '../hooks/useShotsData'
import { useGetPostsByProjectId } from '../hooks/usePostsData'

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
  const { data: project, isFetching: isFetchingProject } = useGetProject(activeProjectId)
  const { data: posts, refetch: refetchPosts } = useGetPostsByProjectId(activeProjectId)

  const {
    data: reels,
    refetch: refetchReels,
    status: statusReels,
  } = useGetReelsByProjectIdQuery(activeProjectId)
  const { data: shots, refetch: refetchShots, status: statusShots } = useGetShotsByProjectId(activeProjectId)

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

  const onDragEndHandler = e => {
    // console.log('DragEnd', e.target)
  }

  const onDropHandler = (e, reel: IReel) => {
    e.preventDefault()
    if (reel) {
      dispatch(setDropReel(reel))
      dispatch(setActiveReelsIds([reel.id]))
    }
    const updatedReel = { ...reel, shots: { ...reel.shots, dragShot } }
    updateReel(updatedReel)
  }

  const removeShotHandler = e => {
    e.preventDefault()
    if (dropReel) {
      const updatedShots: IShot[] = dropReel?.shots?.filter(shot => shot.id !== dragShot.id)
      const updatedReel: IReel = { ...dropReel, shots: updatedShots }
      updateReel(updatedReel)
      dispatch(setActiveReelsIds([dropReel.id]))
    }
  }
  // const reelsIds = shots?.find(shot => shot.id === activeShotId)?.reels?.map(reel => reel.id) || []

  const onShotClickHandler = id => {
    const currentShotId = activeShotId === id ? null : id
    dispatch(setActiveShotId(currentShotId))
    const reelsIds = reels
      ?.filter(reel => reel.shots?.find(shot => shot.id === currentShotId))
      .map(reel => reel.id)
    dispatch(setActiveReelsIds(reelsIds))
  }

  useEffect(() => {
    if (statusReels === 'fulfilled') {
      setReelsOrdered(reels)
    }
    if (isSuccessUpdateReel) {
      dispatch(setDragShot(null))
      dispatch(setDropReel(null))
      dispatch(setActiveShotId(null))
      refetchReels()
    }
  }, [dispatch, isSuccessUpdateReel, reels, refetchPosts, statusReels])

  function timeout(delay: number) {
    return new Promise(res => setTimeout(res, delay))
  }

  useEffect(() => {
    timeout(200).then(r => bottomDivRef.current?.scrollIntoView({ behavior: 'smooth' }))
  }, [reelsOrdered, posts, activeReelsIds])

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
            reelsOrdered?.map(reel => (
              <div
                key={reel.id} //
                // onDrop={e => onDropHandler(e, reel)}
                // onDragOver={e => e.preventDefault()}
              >
                <Timeline title={`${reel.code}`} reel={reel} />
              </div>
            ))}
        </ExpandedBlock>

        <BodyContainer>
          <AnimateSharedLayout>
            <motion.div layout>
              <AnimatePresence initial={false}>
                {postsByShot?.map(post => (
                  <motion.div
                    key={post.id}
                    initial={{ height: 0, opacity: 0 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ type: 'tween', duration: 0.1 }}
                    animate={{ height: 'auto', opacity: 1 }}
                  >
                    <Post
                      id={post.id}
                      message={post.message}
                      createdAt={post.createdAt}
                      updatedAt={post.updatedAt}
                      createdBy={post.createdBy}
                      reels={post.reels}
                      shots={post.shots}
                    >
                      {post.message}
                    </Post>
                    <div style={{ height: 10 }} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </AnimateSharedLayout>
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
