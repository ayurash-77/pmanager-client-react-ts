import { useParams } from 'react-router'
import { Timeline } from '../components/timelines/Timeline'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { IShot } from '../interfaces/IShot'
import { useEffect, useRef, useState } from 'react'
import { IReel } from '../interfaces/IReel'
import {
  setActiveReelsIds,
  setActiveShotId,
  setDragShotId,
  setDropReelId,
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
import { useGetPostsByProjectId } from '../hooks/api/usePostsApi'
import { useGetReelsByProjectId, useUpdateReel } from '../hooks/api/useReelsApi'
import { useTranslate } from '../hooks/useTranslate'
import { RibbonReelsTypes } from '../components/ribbons/RibbonReelsTypes'
import { useGetReelsTypesByProjectId } from '../hooks/api/useReelsTypesApi'
import { useGetProjectQuery } from '../store/api/projects.api'
import { skipToken } from '@reduxjs/toolkit/query'

////////////////////////////////////////////////////////////////////////
// ReelsPage
////////////////////////////////////////////////////////////////////////

export const ReelsPage = () => {
  const { text } = useTranslate()
  const dispatch = useAppDispatch()

  const bottomDivRef = useRef(null)

  const { id } = useParams()
  const { reelsBlock } = useAppSelector(state => state.ui)
  const { activeShotId, activeReelsIds, activeProjectId, dragShot } = useAppSelector(state => state.entities)
  const { data: project, isLoading: isLoadingProject } = useGetProjectQuery(activeProjectId ?? skipToken)
  const { data: posts } = useGetPostsByProjectId(activeProjectId)
  const {
    data: reelsTypes,
    refetch: refetchReelsTypes,
    isError,
  } = useGetReelsTypesByProjectId(activeProjectId)
  const { data: reels, refetch: refetchReels } = useGetReelsByProjectId(activeProjectId)

  const postsByReel =
    activeReelsIds.length === 1
      ? posts?.filter(post => post.reels?.find(reel => reel.id === activeReelsIds[0]))
      : posts

  const postsByShot = activeShotId
    ? postsByReel?.filter(post => post.shots.find(shot => shot.id === activeShotId))
    : postsByReel

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
    // bottomDivRef.current?.scrollIntoView({ behavior: 'smooth' })
    bottomDivRef.current?.scrollIntoView()
  }, [reels, posts, activeReelsIds])

  ////////////////////////////////////////////////////////////////////////

  return (
    <>
      <MainbarContainer>
        <HeaderProject project={project} />

        <RibbonReelsTypes entities={reelsTypes} project={project} />
        <RibbonReels entities={reels} project={project} />
        <ExpandedBlock
          title={text.common.details}
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
                <Timeline reelInit={reel} />
              </div>
            ))}
        </ExpandedBlock>

        <BodyContainer>
          {postsByShot?.map(post => (
            <Post key={post.id} {...post} />
          ))}
          <div ref={bottomDivRef} />
        </BodyContainer>

        <Sendbar projectId={activeProjectId} />
      </MainbarContainer>
      <Sidebar project={project} isLoadingProject={isLoadingProject} />
    </>
  )
}
