import styled from 'styled-components'
import { Button, Input, Textarea } from '../ui'
import { IPost } from '../../interfaces/IPost'
import { useAppSelector } from '../../hooks/redux'
import { FC, useState } from 'react'
import { useCreatePostMutation } from '../../store/api/posts.api'
import { IProject } from '../../interfaces/IProject'
import { number } from 'prop-types'
import TextareaAutosize from 'react-textarea-autosize'

const SendbarContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  padding: 10px 8px;
  //min-height: auto;
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
      {/* <form onSubmit={onSubmitHandler}> */}
      <div>ICO</div>
      <TextareaAutosize
        style={{ padding: 2 }}
        value={message}
        onChange={e => onChangeHandler('message', e.target)}
      />
      <Button onClick={onSubmitHandler} type="submit">
        Send
      </Button>
      {/* </form> */}
    </SendbarContainer>
  )
}
