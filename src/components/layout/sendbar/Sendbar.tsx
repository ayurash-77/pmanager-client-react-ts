import { FC, useState } from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import styled from 'styled-components'
import * as CommonIcons from '../../../assets/icons/common-icons'
import { useCreatePostMutation } from '../../../entities/posts/posts.api'
import { IPost } from '../../../entities/posts/posts.interfaces'
import { useGetShotsQuery } from '../../../entities/shots/shots.api'
import { useAppSelector } from '../../../hooks/redux'
import { IconButton } from '../../ui'

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
  const { activeReelsIds, activeShotId, activeProjectId } = useAppSelector(state => state.entities)
  const { data: shots } = useGetShotsQuery(activeProjectId)
  const [createPost] = useCreatePostMutation()

  const reelsIds =
    shots?.find(shot => shot.id === activeShotId)?.reels?.map(reel => reel.id) || activeReelsIds

  const postDataInit: IPostData = {
    projectId: projectId,
    reelsIds: activeReelsIds,
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

    const newPost: IPostData = { ...postData, shotsIds: [activeShotId], reelsIds: [...reelsIds] }
    createPost(newPost)
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
