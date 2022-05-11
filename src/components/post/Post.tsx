import { IPost } from '../../interfaces/IPost'
import { UserPic } from '../user-pic/UserPic'
import { FC, useState } from 'react'
import { InfoDateTime } from '../info-elements'
import { setActiveMenu } from '../../store/reducers/ui.reducer'
import { setActiveReelsIds, setActiveShotId } from '../../store/reducers/entities.reducer'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import cn from 'classnames'
import { FlexRow } from '../ui'
import { Container, PostBlock, PostHeader, PostMessage, Username, Tags, PostMenu } from './Post.styles'
import { useDeletePost } from '../../hooks/usePostsData'

export const Post: FC<IPost> = props => {
  const { id, createdBy, createdAt, reels = [], shots = [], message } = props
  // const { activeProjectId } = useAppSelector(state => state.entities)

  const { mutate: deletePost } = useDeletePost()
  const { authUser } = useAppSelector(state => state.auth)
  // const { data: user } = useGetUserByIdQuery(createdBy.id)
  // const [fullName, setFullName] = useState(`${createdBy.name} ${createdBy.surname}`)

  const currentUser = authUser.id === createdBy?.id ? authUser : createdBy

  const fullName = `${currentUser?.name} ${currentUser?.surname}`
  const printName = fullName.trim().length > 0 ? fullName : currentUser?.username
  const dispatch = useAppDispatch()
  // const navigate = useNavigate()

  const onReelClickHandler = reelId => {
    dispatch(setActiveMenu('reels'))
    dispatch(setActiveReelsIds([reelId]))
    // navigate(`/project/${activeProjectId}/reels/${reelId}`)
  }

  const onShotClickHandler = shotId => {
    dispatch(setActiveMenu('shots'))
    dispatch(setActiveShotId(shotId))
    // navigate(`/project/${activeProjectId}/shots/${shotId}`)
  }

  const userCanEdit = authUser.isAdmin || authUser.id === createdBy?.id

  const onClickPlus = () => {
    //
  }
  const deletePostHandler = () => {
    if (menuVisible && userCanEdit) deletePost(id)
  }
  const editPostHandler = () => {
    if (menuVisible && userCanEdit) console.log('editPostHandler clicked')
  }

  const [menuVisible, setMenuVisible] = useState(false)

  return (
    <Container>
      <UserPic user={currentUser} />
      <PostBlock>
        <PostHeader>
          <Username>{printName}</Username>
          <InfoDateTime dateTime={createdAt} />

          <PostMenu>
            {userCanEdit && <div className={'menuOpen'} onClick={() => setMenuVisible(!menuVisible)} />}

            <div className={cn('menu', { hide: !menuVisible })}>
              <div className={'item'} onClick={editPostHandler}>
                Edit post
              </div>
              <div className={'item accent'} onClick={deletePostHandler}>
                Delete post
              </div>
              {/* <div className={'item'}>Еще что то</div> */}
            </div>
          </PostMenu>
        </PostHeader>
        <PostMessage>
          <div className={'message'}>{message}</div>
          <FlexRow align={'space-between'}>
            <Tags>
              {reels?.map(reel => (
                <div key={reel.id} className={'tag'} onClick={() => onReelClickHandler(reel.id)}>
                  {reel.code}
                </div>
              ))}
              {shots?.map(shot => (
                <div key={shot.id} className={cn('tag', 'shot')} onClick={() => onReelClickHandler(shot.id)}>
                  {shot.code}
                </div>
              ))}
            </Tags>
          </FlexRow>
        </PostMessage>
      </PostBlock>
    </Container>
  )
}
