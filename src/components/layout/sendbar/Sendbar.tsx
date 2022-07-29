import { FC, useState } from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import { CommonIcons } from '../../../assets/icons/common-icons'
import { useCreatePostMutation } from '../../../entities/posts/posts.api'
import { IPostData } from '../../../entities/posts/posts.interfaces'
import { useGetShotsQuery } from '../../../entities/shots/shots.api'
import { useAppSelector } from '../../../hooks/redux'
import { IconButton } from '../../ui'
import css from './Sendbar.module.scss'

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
    <div className={css.container}>
      <IconButton
        icon={CommonIcons.clip()}
        size={22}
        variant={'secondary'}
        onClick={() => console.log('CLIP CLICKED')}
      />
      <TextareaAutosize
        style={{ padding: 2 }}
        value={message}
        onChange={e => onChangeHandler('message', e.target)}
      />
      <IconButton icon={CommonIcons.send()} size={22} variant={'primary'} onClick={onSubmitHandler} />
    </div>
  )
}
