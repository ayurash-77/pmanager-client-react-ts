import { useParams } from 'react-router'
import { Timeline } from '../../components/timelines/Timeline'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { useEffect, useRef } from 'react'
import { MainbarContainer } from '../../layout/MainbarContainer'
import { Sidebar } from '../../layout/sidebar/Sidebar'
import { HeaderProject } from '../../layout/HeaderProject'
import { BodyContainer } from '../../layout/BodyContainer'
import { Sendbar } from '../../layout/sendbar/Sendbar'
import { Post } from '../../components/post/Post'
import { RibbonReels } from '../../components/ribbons/RibbonReels'
import { ExpandedBlock } from '../../components/expanded-block/ExpandedBlock'
import { setReelsBlockExpanded } from '../../store/reducers/ui.reducer'
import { useTranslate } from '../../hooks/useTranslate'
import { RibbonReelsTypes } from '../../components/ribbons/RibbonReelsTypes'
import { useGetProjectQuery } from '../../store/api/projects.api'
import { skipToken } from '@reduxjs/toolkit/query'
import { useGetPostsQuery } from '../../store/api/posts.api'
import { useGetReelsQuery } from '../../store/api/reels.api'
import { useGetReelsTypesQuery } from '../../store/api/reelsTypes.api'

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
        <ExpandedBlock
          title={text.common.details}
          expanded={reelsBlock.expanded}
          setExpanded={() => dispatch(setReelsBlockExpanded(!reelsBlock.expanded))}
        >
          {project && reels?.map(reel => <Timeline key={reel.id} reelInit={reel} />)}
        </ExpandedBlock>

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
