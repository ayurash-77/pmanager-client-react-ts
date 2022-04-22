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
  setActiveReelId,
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
// GraphPage
////////////////////////////////////////////////////////////////////////

export const ReelsPage = () => {
  const dispatch = useAppDispatch()

  const { id } = useParams()
  const { reelsBlock } = useAppSelector(state => state.ui)
  const { activeShotId, dragShot, dropReel, activeReelsIds } = useAppSelector(state => state.entities)
  const { data: project, isFetching: isFetchingProject } = useGetProjectByIdQuery(+id)
  const { data: posts, refetch: refetchPosts } = useGetPostsByProjectIdQuery(+id)

  const { data: reels, refetch: refetchReels, status: statusReels } = useGetReelsByProjectIdQuery(+id)
  const { data: shots, refetch: refetchShots } = useGetShotsByProjectIdQuery(+id)

  const [updateReel, { isSuccess: isSuccessUpdateReel }] = useUpdateReelMutation()

  const postsByReel =
    activeReelsIds.length === 1
      ? posts?.filter(post => post.reels?.find(reel => reel.id === activeReelsIds[0]))
      : posts

  const postsByShot = activeShotId //
    ? postsByReel?.filter(post => post.shots.find(shot => shot.id === activeShotId))
    : postsByReel

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
    if (reel) {
      dispatch(setDropReel(reel))
      dispatch(setActiveReelsIds([reel.id]))
    }

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

  const [items, setItems] = useState([])

  const bottomDivRef = useRef(null)

  useEffect(() => {
    if (statusReels === 'fulfilled') {
      setItems(reels)
    }
    if (isSuccessUpdateReel) {
      dispatch(setDragShot(null))
      dispatch(setDropReel(null))
      dispatch(setActiveShotId(null))
      // refetchReels()
      // refetchPosts()
    }
  }, [dispatch, isSuccessUpdateReel, reels, refetchPosts, statusReels])

  function timeout(delay: number) {
    return new Promise(res => setTimeout(res, delay))
  }

  useEffect(() => {
    timeout(170).then(r => bottomDivRef.current?.scrollIntoView({ behavior: 'smooth' }))
  }, [items, posts, activeReelsIds])

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
          <Reorder.Group
            as={'div'}
            axis={'y'}
            values={items}
            onReorder={setItems}
            style={{ display: 'flex', flexDirection: 'column', gap: 4 }}
          >
            {project &&
              items?.map(reel => (
                <Reorder.Item key={reel.id} value={reel}>
                  <div onDrop={e => onDropHandler(e, reel)} onDragOver={e => e.preventDefault()}>
                    <Timeline title={`${reel.code}`} reel={reel}>
                      {reel.shots?.map(shot => (
                        <div
                          key={shot.id}
                          draggable={true}
                          className={'draggable'}
                          onClick={() => onShotClickHandler(shot.id)}
                          onDragStart={e => onDragStartHandler(e, shot, reel)}
                          onDragEnd={e => onDragEndHandler(e)}
                          onDragOver={e => e.preventDefault()}
                        >
                          <EntityCardShot entity={shot} isSelected={activeShotId === shot.id} />
                        </div>
                      ))}
                    </Timeline>
                  </div>
                </Reorder.Item>
              ))}
          </Reorder.Group>
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
                    transition={{ type: 'tween', duration: 0.15 }}
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
        isFetchingProject={isFetchingProject}
      />
    </>
  )
}
