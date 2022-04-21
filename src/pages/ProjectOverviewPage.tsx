import { FC, useEffect } from 'react'

import { useParams } from 'react-router'
import { Sendbar } from '../layout/sendbar/Sendbar'
import { Post } from '../components/post/Post'
import { useGetPostsByProjectIdQuery } from '../store/api/posts.api'
import { useGetReelsTypesByProjectIdQuery } from '../store/api/reelsTypes.api'
import { useGetReelsByProjectIdQuery } from '../store/api/reels.api'
import { useGetShotsByProjectIdQuery } from '../store/api/shots.api'
import { RibbonReelsTypes } from '../components/ribbons/RibbonReelsTypes'
import { RibbonReels } from '../components/ribbons/RibbonReels'
import { RibbonShots } from '../components/ribbons/RibbonShots'
import { useGetProjectByIdQuery } from '../store/api/projects.api'
import { MainbarContainer } from '../layout/MainbarContainer'
import { Sidebar } from '../layout/sidebar/Sidebar'
import { HeaderProject } from '../layout/HeaderProject'
import { BodyContainer } from '../layout/BodyContainer'

export const ProjectOverviewPage: FC = () => {
  const { id } = useParams()

  const { data: project, isFetching: isFetchingProject } = useGetProjectByIdQuery(+id)
  const { data: posts, refetch: refetchPosts } = useGetPostsByProjectIdQuery(+id)
  const { data: reelsTypes, refetch: refetchReelsTypes } = useGetReelsTypesByProjectIdQuery(+id)
  const { data: reels, refetch: refetchReels } = useGetReelsByProjectIdQuery(+id)
  const { data: shots, refetch: refetchShots } = useGetShotsByProjectIdQuery(+id)

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
      <Sidebar project={project} isFetchingProject={isFetchingProject} />
    </>
  )
}

export default ProjectOverviewPage
