import styled from 'styled-components'
import { IconButton } from '../../components/ui'
import { IPost } from '../../interfaces/IPost'
import { useAppSelector } from '../../hooks/redux'
import { FC, useState } from 'react'
import { useCreatePostMutation } from '../../store/api/posts.api'
import * as CommonIcons from '../../assets/icons/common-icons'

import TextareaAutosize from 'react-textarea-autosize'
import { useGetReelsByProjectIdQuery } from '../../store/api/reels.api'
import { useGetShotsByProjectIdQuery } from '../../store/api/shots.api'

const SendbarContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  padding: 10px 8px;
  background-color: var(--sendbar-bg);
`

export interface IPostData extends Partial<IPost> {
  projectId: number
  reelId?: number
  reelsIds?: number[]
  shotId?: number
  shotsIds?: number[]
}

export const Sendbar: FC<IPostData> = ({ projectId }) => {
  const user = useAppSelector(state => state.auth.authUser)
  const { activeReelId, activeShotId, activeProjectId } = useAppSelector(state => state.entities)
  const { data: reels, refetch: refetchReels } = useGetReelsByProjectIdQuery(activeProjectId)
  const { data: shots, refetch: refetchShots } = useGetShotsByProjectIdQuery(activeProjectId)
  // const { data: shot, refetch: refetchShot } = useGetShot
  const [createPost, { data: createdPost, isSuccess, isError, error }] = useCreatePostMutation()

  const reelsIds = shots?.find(shot => shot.id === activeShotId)?.reels?.map(reel => reel.id) || []

  const postDataInit: IPostData = {
    projectId: projectId,
    reelId: activeReelId || null,
    shotId: activeShotId || null,
    shotsIds: [activeShotId] || null,
    createdBy: user,
  }

  const [message, setMessage] = useState('')
  const [postData, setPostData] = useState(postDataInit)

  const onChangeHandler = (key, target) => {
    setMessage(target.value)
    setPostData({ ...postData, [key]: target.value })
  }

  const onSubmitHandler = async e => {
    e.preventDefault()

    await createPost({ ...postData, shotsIds: [activeShotId], reelsIds: [...reelsIds, activeReelId] })
    setMessage('')
    setPostData(postDataInit)
  }

  return (
    <SendbarContainer>
      <IconButton
        icon={<CommonIcons.Clip />}
        size={22}
        variant={'secondary'}
        onClick={() => console.log('CLIP CLICKED')}
      />
      <TextareaAutosize
        style={{ padding: 2 }}
        value={message}
        onChange={e => onChangeHandler('message', e.target)}
      />
      <IconButton icon={<CommonIcons.Send />} size={22} variant={'primary'} onClick={onSubmitHandler} />
    </SendbarContainer>
  )
}
