import cn from 'classnames'
import { FC } from 'react'
import * as CommonIcons from '../../assets/icons/common-icons'
import * as ToolbarIcons from '../../assets/icons/toolbar-icons'
import { InfoDateTime } from '../../components/info-elements'
import { ContextMenu } from '../../components/ui/ContextMenu/ContextMenu'
import { ContextMenuItem, IContextMenuItem } from '../../components/ui/ContextMenu/ContextMenuItem'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { useContextMenu } from '../../hooks/useContextMenu'
import { setActiveReelsIds, setActiveShotId } from '../../store/reducers/entities.reducer'
import { setActiveMenu } from '../../store/reducers/ui.reducer'
import { UserPic } from '../users/user-pic/UserPic'
import css from './Post.module.scss'
import { useDeletePostMutation } from './posts.api'
import { IPost } from './posts.interfaces'

export const Post: FC<IPost> = props => {
  const { id, createdBy, createdAt, reels = [], shots = [], message } = props

  const [deletePost] = useDeletePostMutation()
  const { authUser } = useAppSelector(state => state.auth)

  const currentUser = authUser.id === createdBy?.id ? authUser : createdBy

  const fullName = `${currentUser?.name} ${currentUser?.surname}`
  const printName = fullName.trim().length > 0 ? fullName : currentUser?.username
  const dispatch = useAppDispatch()

  const onReelClickHandler = reelId => {
    dispatch(setActiveMenu('reels'))
    dispatch(setActiveReelsIds([reelId]))
  }

  const onShotClickHandler = shotId => {
    dispatch(setActiveMenu('shots'))
    dispatch(setActiveShotId(shotId))
    // navigate(`/project/${activeProjectId}/shots/${shotId}`)
  }

  const userCanEdit = authUser.isAdmin || authUser.id === createdBy?.id

  const deletePostHandler = () => {
    return userCanEdit && deletePost(id)
  }

  const editPostHandler = () => {
    userCanEdit && console.log('Edit Post clicked')
  }

  const { showContextMenu, position, isMenuShow } = useContextMenu()

  const postContextMenuData: IContextMenuItem[] = [
    {
      title: 'Edit Post',
      icon: <ToolbarIcons.Gear />,
      shortcut: 'Ctrl+E',
      action: editPostHandler,
      disabled: !userCanEdit,
    },
    {
      title: 'Delete Post',
      icon: <CommonIcons.Trash />,
      variant: 'accent',
      shortcut: 'Ctrl+Del',
      action: deletePostHandler,
      disabled: !userCanEdit,
    },
  ]

  return (
    <div className={'flex gap-2'}>
      <UserPic user={currentUser} />
      <div className={'flex flex-col w-full'} onClick={showContextMenu} onContextMenu={showContextMenu}>
        <div className={css.header}>
          <div className={css.username}>{printName}</div>
          <InfoDateTime dateTime={createdAt} />

          <ContextMenu show={isMenuShow} position={position}>
            {postContextMenuData.map(item => (
              <ContextMenuItem
                key={item.title}
                title={item.title}
                icon={item.icon}
                entityType={item.entityType}
                variant={item.variant}
                disabled={item.disabled}
                shortcut={item.shortcut}
                action={item.action}
              />
            ))}
          </ContextMenu>
        </div>
        <div className={css.messageContainer}>
          <div className={'whitespace-pre-wrap'}>{message}</div>

          <div className={css.tags}>
            {reels?.map(reel => (
              <div key={reel.id} className={css.tag} onClick={() => onReelClickHandler(reel.id)}>
                {reel.code}
              </div>
            ))}
            {shots?.map(shot => (
              <div
                key={shot.id}
                className={cn(css.tag, css.shot)}
                onClick={() => onReelClickHandler(shot.id)}
              >
                {shot.code}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
