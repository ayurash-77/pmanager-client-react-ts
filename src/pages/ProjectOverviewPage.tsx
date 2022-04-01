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

const ProjectOverviewPage: FC = () => {
  const { id } = useParams()

  const { data: project } = useGetProjectByIdQuery(+id)
  const { data: posts } = useGetPostsByProjectIdQuery(+id)
  const { data: reelsTypes, refetch: refetchReelsTypes } = useGetReelsTypesByProjectIdQuery(+id)
  const { data: reels, refetch: refetchReels } = useGetReelsByProjectIdQuery(+id)
  const { data: shots, refetch: refetchShots } = useGetShotsByProjectIdQuery(+id)

  const reelsTypesSorted = useMemo(() => {
    const reelsTypesSorted = reelsTypes?.slice()
    reelsTypesSorted?.sort((a, b) => a.code.localeCompare(b.code))
    return reelsTypesSorted
  }, [reelsTypes])

  const reelsSorted = useMemo(() => {
    const reelsSorted = reels?.slice()
    reelsSorted?.sort((a, b) => a.code.localeCompare(b.code))
    return reelsSorted
  }, [reels])

  const shotsSorted = useMemo(() => {
    const shotsSorted = shots?.slice()
    shotsSorted?.sort((a, b) => a.code.localeCompare(b.code))
    return shotsSorted
  }, [shots])

  const postsSorted = useMemo(() => {
    const sortedPosts = posts?.slice()
    sortedPosts?.sort((a, b) => a.createdAt.toString().localeCompare(b.createdAt.toString()))
    return sortedPosts
  }, [posts])

  useEffect(() => {
    refetchReelsTypes()
    refetchReels()
    refetchShots()
  }, [reelsTypes, reels, shots, refetchReelsTypes, refetchReels, refetchShots])

  ////////////////////////////////////////////////////////////////////////

  return (
    <Container>
      <RibbonReelsTypes entities={reelsTypesSorted} project={project} />
      <RibbonReels entities={reelsSorted} project={project} />
      <RibbonShots entities={shotsSorted} project={project} />
      <Body>
        {postsSorted?.map(post => (
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
