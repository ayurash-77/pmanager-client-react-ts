import { FC, useEffect } from 'react'

import { useParams } from 'react-router'
import { Sendbar } from '../layout/sendbar/Sendbar'
import { Post } from '../components/post/Post'
import { RibbonReelsTypes } from '../components/ribbons/RibbonReelsTypes'
import { RibbonReels } from '../components/ribbons/RibbonReels'
import { RibbonShots } from '../components/ribbons/RibbonShots'
import { MainbarContainer } from '../layout/MainbarContainer'
import { Sidebar } from '../layout/sidebar/Sidebar'
import { HeaderProject } from '../layout/HeaderProject'
import { BodyContainer } from '../layout/BodyContainer'
import { useGetProjectQuery } from '../store/api/projects.api'
import { skipToken } from '@reduxjs/toolkit/query'
import { useGetPostsQuery } from '../store/api/posts.api'
import { useGetReelsQuery } from '../store/api/reels.api'
import { useGetReelsTypesQuery } from '../store/api/reelsTypes.api'
import { useGetShotsQuery } from '../store/api/shots.api'

export const ProjectOverviewPage: FC = () => {
  const { id } = useParams()

  const { data: project, isLoading: isLoadingProject } = useGetProjectQuery(+id ?? skipToken)
  const { data: posts, refetch: refetchPosts } = useGetPostsQuery(+id ?? skipToken)
  const { data: reelsTypes, refetch: refetchReelsTypes } = useGetReelsTypesQuery(+id)
  const { data: reels, refetch: refetchReels } = useGetReelsQuery(+id ?? skipToken)
  const { data: shots, refetch: refetchShots } = useGetShotsQuery(+id ?? skipToken)

  useEffect(() => {
    refetchReelsTypes()
    refetchReels()
    refetchShots()
    refetchPosts()
  }, [reelsTypes, reels, shots, refetchReelsTypes, refetchReels, refetchShots, refetchPosts])

  ////////////////////////////////////////////////////////////////////////

  return (
    <>
      <MainbarContainer>
        <HeaderProject project={project} />

        <RibbonReelsTypes entities={reelsTypes} project={project} />
        <RibbonReels entities={reels} project={project} />
        <RibbonShots entities={shots} project={project} />

        <BodyContainer>{project && posts?.map(post => <Post key={post.id} {...post} />)}</BodyContainer>

        <Sendbar projectId={+id} />
      </MainbarContainer>
      <Sidebar project={project} isLoadingProject={isLoadingProject} />
    </>
  )
}

export default ProjectOverviewPage
