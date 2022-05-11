import { FC, useEffect } from 'react'

import { useParams } from 'react-router'
import { Sendbar } from '../layout/sendbar/Sendbar'
import { Post } from '../components/post/Post'
import { useGetReelsTypesByProjectIdQuery } from '../store/api/reelsTypes.api'
import { useGetReelsByProjectIdQuery } from '../store/api/reels.api'
import { RibbonReelsTypes } from '../components/ribbons/RibbonReelsTypes'
import { RibbonReels } from '../components/ribbons/RibbonReels'
import { RibbonShots } from '../components/ribbons/RibbonShots'
import { MainbarContainer } from '../layout/MainbarContainer'
import { Sidebar } from '../layout/sidebar/Sidebar'
import { HeaderProject } from '../layout/HeaderProject'
import { BodyContainer } from '../layout/BodyContainer'
import { useGetProject } from '../hooks/useProjectsData'
import { useGetShotsByProjectId } from '../hooks/useShotsData'
import { useGetPostsByProjectId } from '../hooks/usePostsData'

export const ProjectOverviewPage: FC = () => {
  const { id } = useParams()

  const { data: project, isFetching: isFetchingProject } = useGetProject(+id)
  const { data: posts, refetch: refetchPosts } = useGetPostsByProjectId(+id)
  const { data: reelsTypes, refetch: refetchReelsTypes } = useGetReelsTypesByProjectIdQuery(+id)
  const { data: reels, refetch: refetchReels } = useGetReelsByProjectIdQuery(+id)
  const { data: shots, refetch: refetchShots } = useGetShotsByProjectId(+id)

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
      <Sidebar project={project} isLoadingProject={isFetchingProject} />
    </>
  )
}

export default ProjectOverviewPage
