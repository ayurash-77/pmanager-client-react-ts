import { skipToken } from '@reduxjs/toolkit/query'
import { useEffect, useRef } from 'react'
import { useParams } from 'react-router'
import css from 'components/layout/Layout.module.scss'
import { Collapse } from '../../components/layout/collapse/Collapse'
import { HeaderProject } from '../../components/layout/header/HeaderProject'
import { RibbonReels } from '../../components/layout/ribbons/RibbonReels'
import { RibbonReelsTypes } from '../../components/layout/ribbons/RibbonReelsTypes'
import { Sendbar } from '../../components/layout/sendbar/Sendbar'
import { Sidebar } from '../../components/layout/sidebar/Sidebar'
import { Timeline } from '../../components/layout/timelines/Timeline'
import { Post } from '../../entities/posts/Post'
import { useGetPostsQuery } from '../../entities/posts/posts.api'
import { useGetProjectQuery } from '../../entities/projects/projects.api'
import { useGetReelsQuery } from '../../entities/reels/reels.api'
import { useGetReelsTypesQuery } from '../../entities/reelsTypes/reelsTypes.api'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { useTranslate } from '../../hooks/useTranslate'
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
      <div className={css.mainbar}>
        <HeaderProject />

        <div className={'collapses'}>
          <RibbonReelsTypes entities={reelsTypes} />
          <RibbonReels entities={reels} />

          <Collapse
            title={text.common.details}
            expanded={reelsBlock.expanded}
            setExpanded={() => dispatch(setReelsBlockExpanded(!reelsBlock.expanded))}
          >
            {project && reels?.map(reel => <Timeline key={reel.id} reelInit={reel} />)}
          </Collapse>
        </div>
        <div className={css.body}>
          {postsByShot?.map(post => (
            <Post key={post.id} {...post} />
          ))}
          <div ref={bottomDivRef} />
        </div>

        <Sendbar projectId={projectId} />
      </div>
      <Sidebar project={project} isLoadingProject={isLoadingProject} />
    </>
  )
}
