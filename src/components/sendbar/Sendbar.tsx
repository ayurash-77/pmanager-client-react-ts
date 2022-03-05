import styled from 'styled-components'
import { Button, Input, Textarea } from '../ui'
import { IPost } from '../../interfaces/IPost'
import { useAppSelector } from '../../hooks/redux'
import { FC, useState } from 'react'
import { useCreatePostMutation } from '../../store/api/posts.api'
import { IProject } from '../../interfaces/IProject'

const Container = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  padding: 0 8px;
  min-height: 50px;
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

  const onChangeHandler = (key, value) => {
    setMessage(value)
    setPostData({ ...postData, [key]: value })
  }

  const onSubmitHandler = async e => {
    e.preventDefault()
    await createPost(postData)
    setMessage('')
    setPostData(postDataInit)
  }

  return (
    <Container>
      {/* <form onSubmit={onSubmitHandler}> */}
      <div>ICO</div>
      {/* <Input width={'100%'} /> */}
      <Textarea width={'100%'} value={message} onChange={e => onChangeHandler('message', e.target.value)} />
      <Button onClick={onSubmitHandler} type="submit">
        Send
      </Button>
      {/* </form> */}
    </Container>
  )
}
