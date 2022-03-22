import { FC, useMemo } from 'react'

import styled from 'styled-components'
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
import { useGetProjectQuery } from '../store/api/projects.api'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1px;
  height: 100%;
  min-height: 0;
  min-width: 0;
`

const Body = styled.div`
  display: flex;
  flex-direction: column;
  z-index: 1;
  padding: 10px;
  gap: 20px;
  height: 100%;
  overflow: auto;
`

const ProjectOverviewPage: FC = () => {
  const { id } = useParams()

  const { data: posts } = useGetPostsByProjectIdQuery(+id, { refetchOnFocus: true, pollingInterval: 30000 })
  const { data: reelsTypes } = useGetReelsTypesByProjectIdQuery(+id, {
    refetchOnFocus: true,
    pollingInterval: 30000,
  })
  const { data: reels } = useGetReelsByProjectIdQuery(+id, {
    refetchOnFocus: true,
    pollingInterval: 30000,
  })
  const { data: shots } = useGetShotsByProjectIdQuery(+id, {
    refetchOnFocus: true,
    pollingInterval: 30000,
  })
  const { data: project } = useGetProjectQuery(+id, { refetchOnFocus: true, pollingInterval: 30000 })

  const sortedPosts = useMemo(() => {
    const sortedPosts = posts?.slice()
    sortedPosts?.sort((a, b) => a.createdAt.toString().localeCompare(b.createdAt.toString()))
    return sortedPosts
  }, [posts])

  const postsJsx = sortedPosts?.map(post => (
    <Post
      key={post.id}
      id={post.id}
      message={post.message}
      createdAt={post.createdAt}
      updatedAt={post.updatedAt}
      createdBy={post.createdBy}
    >
      {post.message}
    </Post>
  ))

  ////////////////////////////////////////////////////////////////////////

  return (
    <Container>
      <RibbonReelsTypes entities={reelsTypes} project={project} />
      <RibbonReels entities={reels} project={project} />
      <RibbonShots entities={shots} project={project} />
      <Body>{postsJsx}</Body>
      <Sendbar projectId={+id} />
    </Container>
  )
}

export default ProjectOverviewPage
