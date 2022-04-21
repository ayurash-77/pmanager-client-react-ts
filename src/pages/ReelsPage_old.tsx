import { useParams } from 'react-router'
import { useGetReelsByProjectIdQuery, useUpdateReelMutation } from '../store/api/reels.api'
import { Timeline } from '../components/timelines/Timeline'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { useGetShotsByProjectIdQuery } from '../store/api/shots.api'
import { EntityCardShot } from '../components/entity-card/EntityCardShot'
import { IShot } from '../interfaces/IShot'
import { useEffect, useState } from 'react'
import { IReel } from '../interfaces/IReel'
import {
  // setActiveReelId,
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

////////////////////////////////////////////////////////////////////////
// GraphPage
////////////////////////////////////////////////////////////////////////

export const ReelsPage = () => {
  const dispatch = useAppDispatch()

  const { id } = useParams()
  const { data: project, isFetching: isFetchingProject } = useGetProjectByIdQuery(+id)
  const { data: posts, refetch: refetchPosts } = useGetPostsByProjectIdQuery(+id)

  const { activeShotId, dragShot, dropReel, activeReelId } = useAppSelector(state => state.entities)

  const { data: reels, refetch: refetchReels } = useGetReelsByProjectIdQuery(+id)
  const { data: shots, refetch: refetchShots } = useGetShotsByProjectIdQuery(+id)

  const [updateReel, { isSuccess: isSuccessUpdateReel }] = useUpdateReelMutation()

  // const reelsFiltered = activeReelId ? reels?.filter(reel => reel.id === activeReelId) : reels
  const reelsFiltered = reels

  const postsByReel = activeReelId //
    ? posts?.filter(post => post.reels?.find(reel => reel.id === activeReelId))
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
    if (reel) dispatch(setDropReel(reel))
    e.preventDefault()

    const updatedShots = [...reel.shots, dragShot]
    const updatedReel = { ...reel, shots: updatedShots }
    updateReel(updatedReel)
  }

  const onDropHandler2 = (reel: IReel) => {
    if (reel) dispatch(setDropReel(reel))

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

  // const reelsIds = shots?.find(shot => shot.id === activeShotId)?.reels?.map(reel => reel.id) || []

  const onShotClickHandler = id => {
    const currentShotId = activeShotId === id ? null : id
    dispatch(setActiveShotId(currentShotId))
    const reelsIds = reels
      ?.filter(reel => reel.shots?.find(shot => shot.id === currentShotId))
      .map(reel => reel.id)
    dispatch(setActiveReelsIds(reelsIds))
  }

  const initialItems = [
    { id: 1, code: 'xxx_010' },
    { id: 2, code: 'xxx_020' },
    { id: 3, code: 'xxx_030' },
  ]

  const [items, setItems] = useState(initialItems)

  useEffect(() => {
    if (isSuccessUpdateReel) {
      dispatch(setDragShot(null))
      dispatch(setDropReel(null))
      dispatch(setActiveShotId(null))
      refetchReels()
      refetchShots()
      refetchPosts()
    }
  }, [dispatch, isSuccessUpdateReel, refetchPosts, refetchReels, refetchShots])

  ////////////////////////////////////////////////////////////////////////

  return (
    <>
      <MainbarContainer>
        <HeaderProject project={project} />

        <RibbonReels entities={reels} project={project} />
        <ExpandedBlock title={'Details'}>
          {project &&
            reelsFiltered?.map(reel => (
              // <div key={reel.id} onDrop={e => onDropHandler(e, reel)} onDragOver={e => e.preventDefault()}>
              <div key={reel.id}>
                {/* <Timeline title={`${reel.code}`} reel={reel}> */}
                {/*   {reel.shots?.map(shot => ( */}
                {/*     <div */}
                {/*       key={shot.id} */}
                {/*       draggable={true} */}
                {/*       className={'draggable'} */}
                {/*       onClick={() => onShotClickHandler(shot.id)} */}
                {/*       onDragStart={e => onDragStartHandler(e, shot, reel)} */}
                {/*       onDragEnd={e => onDragEndHandler(e)} */}
                {/*       onDragOver={e => e.preventDefault()} */}
                {/*     > */}
                {/*       <EntityCardShot entity={shot} isSelected={activeShotId === shot.id} /> */}
                {/*     </div> */}
                {/*   ))} */}
                {/* </Timeline> */}
                <Reorder.Group as={'div'} axis={'x'} values={items} onReorder={setItems}>
                  <Timeline title={`${reel.code}`} reel={reel}>
                    {/* <div style={{ display: 'flex' }}> */}
                    {items?.map(shot => (
                      <Reorder.Item key={shot.code} value={shot}>
                        {/* <div */}
                        {/*   // draggable={true} */}
                        {/*   className={'draggable'} */}
                        {/*   onClick={() => onShotClickHandler(shot.id)} */}
                        {/* > */}

                        <EntityCardShot entity={shot} isSelected={activeShotId === shot.id} />
                        {/* </div> */}
                      </Reorder.Item>
                    ))}
                    {/* </div> */}
                  </Timeline>
                </Reorder.Group>
              </div>
            ))}
        </ExpandedBlock>

        <BodyContainer>
          <AnimateSharedLayout>
            <motion.div layout>
              <AnimatePresence initial={true}>
                {postsByShot?.map(post => (
                  <motion.div
                    key={post.id}
                    initial={{ height: 0, opacity: 0 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ type: 'tween', duration: 0.2 }}
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
