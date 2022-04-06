import { FC, useEffect, useMemo } from 'react'

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
import { useGetProjectByIdQuery } from '../store/api/projects.api'

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

export const ProjectOverviewPage: FC = () => {
  const { id } = useParams()

  const { data: project } = useGetProjectByIdQuery(+id)
  const { data: posts } = useGetPostsByProjectIdQuery(+id)
  const { data: reelsTypes, refetch: refetchReelsTypes } = useGetReelsTypesByProjectIdQuery(+id)
  const { data: reels, refetch: refetchReels } = useGetReelsByProjectIdQuery(+id)
  const { data: shots, refetch: refetchShots } = useGetShotsByProjectIdQuery(+id)

  useEffect(() => {
    refetchReelsTypes()
    refetchReels()
    refetchShots()
  }, [reelsTypes, reels, shots, refetchReelsTypes, refetchReels, refetchShots])

  ////////////////////////////////////////////////////////////////////////

  return (
    <Container>
      <RibbonReelsTypes entities={reelsTypes} project={project} />
      <RibbonReels entities={reels} project={project} />
      <RibbonShots entities={shots} project={project} />
      <Body>
        {posts?.map(post => (
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
        ))}
      </Body>
      <Sendbar projectId={+id} />
    </Container>
  )
}

export default ProjectOverviewPage
