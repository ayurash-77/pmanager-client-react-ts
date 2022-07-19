import { skipToken } from '@reduxjs/toolkit/query'
import { useEffect, useRef } from 'react'
import { useParams } from 'react-router'
import { Post } from '../../components/features/post/Post'
import { BodyContainer } from '../../components/layout/BodyContainer'
import { HeaderProject } from '../../components/layout/HeaderProject'
import { MainbarContainer } from '../../components/layout/MainbarContainer'
import { Collapse } from '../../components/layout/collapse/Collapse'
import { RibbonReels } from '../../components/layout/ribbons/RibbonReels'
import { RibbonReelsTypes } from '../../components/layout/ribbons/RibbonReelsTypes'
import { Sendbar } from '../../components/layout/sendbar/Sendbar'
import { Sidebar } from '../../components/layout/sidebar/Sidebar'
import { Timeline } from '../../components/layout/timelines/Timeline'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { useTranslate } from '../../hooks/useTranslate'
import { useGetPostsQuery } from '../../store/api/posts.api'
import { useGetProjectQuery } from '../../store/api/projects.api'
import { useGetReelsQuery } from '../../store/api/reels.api'
import { useGetReelsTypesQuery } from '../../store/api/reelsTypes.api'
import { setReelsBlockExpanded } from '../../store/reducers/ui.reducer'

// ReelsPage
////////////////////////////////////////////////////////////////////////

export const ReelsPage = () => {
  const { text } = useTranslate()
  const dispatch = useAppDispatch()

  const bottomDivRef = useRef(null)

  const { id } = useParams()
  const projectId = +id
  const { reelsBlock } = useAppSelector(state => state.ui)
  const { activeShotId, activeReelsIds } = useAppSelector(state => state.entities)
  const { data: project, isLoading: isLoadingProject } = useGetProjectQuery(projectId ?? skipToken)
  const { data: posts } = useGetPostsQuery(projectId ?? skipToken)
  const { data: reelsTypes } = useGetReelsTypesQuery(projectId ?? skipToken)
  const { data: reels } = useGetReelsQuery(projectId ?? skipToken)

  const postsByReel =
    activeReelsIds.length === 1
      ? posts?.filter(post => post.reels?.find(reel => reel.id === activeReelsIds[0]))
      : posts

  const postsByShot = activeShotId
    ? postsByReel?.filter(post => post.shots.find(shot => shot.id === activeShotId))
    : postsByReel

  useEffect(() => {
    // bottomDivRef.current?.scrollIntoView({ behavior: 'smooth' })
    bottomDivRef.current?.scrollIntoView()
  }, [reels, posts, activeReelsIds])

  // RENDER
  ////////////////////////////////////////////////////////////////////////

  return (
    <>
      <MainbarContainer>
        <HeaderProject project={project} />

        <RibbonReelsTypes entities={reelsTypes} project={project} />
        <RibbonReels entities={reels} project={project} />
        <Collapse
          title={text.common.details}
          expanded={reelsBlock.expanded}
          setExpanded={() => dispatch(setReelsBlockExpanded(!reelsBlock.expanded))}
        >
          {project && reels?.map(reel => <Timeline key={reel.id} reelInit={reel} />)}
        </Collapse>

        <BodyContainer>
          {postsByShot?.map(post => (
            <Post key={post.id} {...post} />
          ))}
          <div ref={bottomDivRef} />
        </BodyContainer>

        <Sendbar projectId={projectId} />
      </MainbarContainer>
      <Sidebar project={project} isLoadingProject={isLoadingProject} />
    </>
  )
}
