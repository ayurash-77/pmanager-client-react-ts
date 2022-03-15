import styled from 'styled-components'
import { IconButton } from '../../components/ui'
import { IPost } from '../../interfaces/IPost'
import { useAppSelector } from '../../hooks/redux'
import { FC, useState } from 'react'
import { useCreatePostMutation } from '../../store/api/posts.api'
import * as CommonIcons from '../../assets/icons/common-icons'

import TextareaAutosize from 'react-textarea-autosize'

const SendbarContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  padding: 10px 8px;
  background-color: var(--sendbar-bg);
`

export interface IPostData extends Partial<IPost> {
  projectId: number
}

interface ISendbar {
  projectId: number
}

export const Sendbar: FC<ISendbar> = ({ projectId }) => {
  const user = useAppSelector(state => state.auth.authUser)
  const [createPost, { data: createdPost, isSuccess, isError, error }] = useCreatePostMutation()

  const postDataInit: IPostData = {
    projectId: projectId,
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
    await createPost(postData)
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
